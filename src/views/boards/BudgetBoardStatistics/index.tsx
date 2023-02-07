import { addDays, format as formatDate, isAfter, parse as parseDate } from "date-fns"
import { FC, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { useGetBudgetRecordsQuery } from "#api/budget"
import { useGetCurrenciesQuery } from "#api/currencies"
import { Currency } from "#api/types"

interface IDateData {
  date: string
  sumByCurrencySlug: Record<Currency["slug"], number>
}

const colors = ["red", "magenta", "violet", "#8884d8", "#82ca9d", "blue"]

export const BudgetBoardStatistics: FC = () => {
  const params = useParams<{ boardId: string }>()

  const getCurrenciesResult = useGetCurrenciesQuery()
  const getRecordsResult = useGetBudgetRecordsQuery({
    variables: {
      boardsIds: [Number(params.boardId)],
      isTrashed: false,
      orderingByDate: "ASC",
      orderingById: "ASC",
    },
  })

  const currencies = getCurrenciesResult.data?.currencies
  const records = getRecordsResult.data?.budgetRecords

  const [usdRates, setUsdRates] = useState<Record<Currency["name"], number>>({})
  useEffect(() => {
    if (currencies === undefined) return
    fetch(
      `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/?date=${formatDate(new Date(), "yyyy-MM-dd")}`
    )
      .then((response) => response.json())
      .then((data) => {
        const apiCurrencies: { code: string; quantity: number; rate: number }[] = data[0].currencies
        const gelToCurrencies: Record<Currency["name"], number> = { GEL: 1 }
        for (const apiCurrency of apiCurrencies) {
          if (currencies.every((currency) => currency.name !== apiCurrency.code)) continue
          gelToCurrencies[apiCurrency.code] = apiCurrency.rate / apiCurrency.quantity
        }
        for (const currencyName in gelToCurrencies) {
          gelToCurrencies[currencyName] = gelToCurrencies[currencyName] / gelToCurrencies.USD
        }
        setUsdRates(gelToCurrencies)
      })
  }, [currencies])

  console.log(usdRates)

  const chartBuildingData = useMemo<IDateData[]>(() => {
    if (records === undefined) return []
    if (currencies === undefined) return []
    if (Object.entries(usdRates).length === 0) return []

    const firstDate = parseDate(records[0].date, "yyyy-MM-dd", new Date())
    const endDate = new Date()

    let date = firstDate
    const result: IDateData[] = []
    while (!isAfter(date, endDate)) {
      result.push({
        date: formatDate(date, "yyyy-MM-dd"),
        sumByCurrencySlug: {},
      })
      date = addDays(date, 1)
    }

    const accumulatedAmountByCurrencySlug: Record<Currency["slug"], number> = {}
    for (const currency of currencies) {
      accumulatedAmountByCurrencySlug[currency.name] = 0
    }

    for (const dateData of result) {
      const dateRecords = records.filter((record) => record.date === dateData.date)
      for (const record of dateRecords) {
        const amountDifference = record.category.type.name === "income" ? record.amount : -record.amount
        accumulatedAmountByCurrencySlug[record.currency.name] += amountDifference
      }
      for (const currency of currencies) {
        dateData.sumByCurrencySlug[currency.name] =
          accumulatedAmountByCurrencySlug[currency.name] * usdRates[currency.name]
      }
    }

    return result
  }, [currencies, usdRates, records])

  return (
    <ResponsiveContainer height="96%" width="100%">
      <LineChart data={chartBuildingData} height={300} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} width={500}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis angle={5} dataKey="date" tickMargin={0} />
        <YAxis />
        <Tooltip />
        {currencies?.map((currency, index) => (
          <Line
            dataKey={`sumByCurrencySlug.${currency.name}`}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dot={() => null}
            key={currency.name}
            stroke={colors[index]}
            strokeWidth="2px"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
