import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import Loader from '#components/Loader'
import { useAppDispatch, useAppSelector } from '#utils/hooks'
import { getCategoriesTc } from '#models/finance'
import { getRecordsTc } from '#models/finance'

import RecordFormModal from './RecordFormModal'
import RecordTableRow from './RecordTableRow'

const Records = () => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const { push } = useHistory()

  const query = new URLSearchParams(search)
  const isTrash = query.get('isTrash') === 'true'

  const [isRecordCreatingModalShown, setIsRecordCreatingModalShown] = useState(false)

  const categories = useAppSelector((state) => state.finance.categories)
  const records = useAppSelector(
    (state) => state.finance.records[isTrash ? 'trashed' : 'notTrashed'],
  )

  const loaderRef = useRef(null)

  useEffect(() => {
    dispatch(getCategoriesTc())
    dispatch(getRecordsTc({ isTrash: false }))
    dispatch(getRecordsTc({ isTrash: true }))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(() => dispatch(getRecordsTc({ isTrash })))

    if (loaderRef.current !== null) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current !== null) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [getRecordsTc, isTrash, loaderRef])

  const onIsTrashClick = (event: ChangeEvent<HTMLInputElement>) => {
    push(`/records?isTrash=${event.target.checked}`)
  }

  const openRecordCreationModal = () => {
    setIsRecordCreatingModalShown(true)
  }

  return (
    <Fragment>
      <Box
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 100vw;
        `}
      >
        <Typography variant="h1">Finance records</Typography>
        <FormControlLabel
          control={<Switch checked={isTrash} onChange={onIsTrashClick} />}
          label="Trash"
          labelPlacement="start"
          sx={{ margin: 0 }}
        />
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head" width="23%">
                Amount
              </TableCell>
              <TableCell variant="head" width="29%">
                Category
              </TableCell>
              <TableCell variant="head" width="24%">
                Date
              </TableCell>
              <TableCell colSpan={2} width="24%">
                {isTrash ? null : (
                  <Button onClick={openRecordCreationModal} variant="outlined">
                    +New
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.items.map((record) => (
              <RecordTableRow
                categories={categories.items}
                isTrash={isTrash}
                key={record.id}
                record={record}
              />
            ))}
            {records.status === 'completed' ? null : <Loader Component={'tr'} ref={loaderRef} />}
          </TableBody>
        </Table>
      </TableContainer>

      {isRecordCreatingModalShown ? (
        <RecordFormModal
          categories={categories.items}
          closeModal={() => setIsRecordCreatingModalShown(false)}
          record={null}
        />
      ) : null}
    </Fragment>
  )
}

export default Records
