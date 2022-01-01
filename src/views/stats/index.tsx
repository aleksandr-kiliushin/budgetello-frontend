import { Chart, registerables } from 'chart.js'
import { useEffect, useRef } from 'react'

import { getChartDataTc } from '#models/finance'
import { useAppDispatch, useAppSelector } from '#utils/hooks'

const Stats = () => {
  const dispatch = useAppDispatch()

  const chartData = useAppSelector((state) => state.finance.chartData)

  const canvasRef = useRef(null)

  useEffect(() => {
    dispatch(getChartDataTc())
  }, [])

  useEffect(() => {
    if (chartData.status === 'idle') return

    const { items } = chartData

    const canvas = canvasRef.current as HTMLCanvasElement | null

    if (canvas === null) return

    const ctx = canvas.getContext('2d')

    if (ctx === null) return

    Chart.register(...registerables)

    const endDate = new Date()

    const isDesktop = document.body.clientWidth > 768

    if (isDesktop) {
      const mapSumToDate: {
        x: string
        y: number
      }[] = []

      const currentDate = new Date(items[0].date)
      let currentSum = 1_277_000
      while (currentDate <= endDate) {
        const stringifiedCurrentDate = currentDate.toISOString().split('T')[0]
        currentSum = items
          .filter((record) => record.date === stringifiedCurrentDate)
          .reduce((dateSum, record) => {
            if (record.category.type.name === 'expense') {
              return (dateSum -= record.amount)
            }
            return (dateSum += record.amount)
          }, currentSum)

        mapSumToDate.push({
          x: stringifiedCurrentDate,
          y: currentSum,
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }
      new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              borderColor: 'darkgreen',
              borderWidth: 1,
              data: Object.values(mapSumToDate),
              fill: true,
              label: 'Your finance, RUB',
              pointBorderColor: 'darkgreen',
              pointRadius: 0,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // So chart takes the available height.
          scales: {
            x: {
              ticks: {
                callback: (tickValue) => {
                  if (typeof tickValue !== 'number') return 'error'
                  const timeStamp = new Date(items[0].date).setDate(
                    currentDate.getDate() + tickValue,
                  )
                  return new Date(timeStamp).toLocaleString('default', {
                    month: 'short',
                    year: '2-digit',
                  })
                },
                maxRotation: 90,
                minRotation: 90,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (tickValue) =>
                  typeof tickValue === 'number' ? tickValue / 1_000_000 : 'error',
                padding: 1,
              },
            },
          },
        },
      })

      return
    }

    const mapSumToDate: {
      x: number
      y: string
    }[] = []

    const currentDate = new Date(items[0].date)
    let currentSum = 1_277_000
    while (currentDate <= endDate) {
      const stringifiedCurrentDate = currentDate.toISOString().split('T')[0]

      currentSum = items
        .filter((record) => record.date === stringifiedCurrentDate)
        .reduce((dateSum, record) => {
          if (record.category.type.name === 'expense') {
            return (dateSum -= record.amount)
          }
          return (dateSum += record.amount)
        }, currentSum)

      mapSumToDate.push({
        x: currentSum,
        y: stringifiedCurrentDate,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            borderColor: 'steelblue',
            borderWidth: 2,
            data: Object.values(mapSumToDate),
            label: 'Your finance, RUB',
            pointBorderColor: 'darkgreen',
            pointRadius: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // So chart takes the available height.
        scales: {
          y: {
            ticks: {
              callback: (tickValue) => {
                if (typeof tickValue !== 'number') return 'error'

                const timeStamp = new Date(items[0].date).setDate(currentDate.getDate() + tickValue)

                return new Date(timeStamp).toLocaleString('default', {
                  month: 'short',
                  year: '2-digit',
                })
              },
            },
            type: 'category',
          },
          x: {
            beginAtZero: true,
            position: 'top',
            ticks: {
              callback: (tickValue) =>
                typeof tickValue === 'number' ? tickValue / 1_000_000 : 'error',
            },
            type: 'linear',
          },
        },
      },
    })
  }, [chartData])

  if (chartData.status === 'idle') return null

  return <canvas ref={canvasRef} />
}

export default Stats
