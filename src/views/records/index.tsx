import { css } from '@emotion/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Loader from '#components/Loader'
import { getCategoriesTc, getRecordsTc } from '#models/finance'
import { LoadingStatus } from '#src/constants/shared'
import { useAppDispatch, useAppSelector } from '#utils/hooks'

import RecordFormModal from './RecordFormModal'
import RecordTableRow from './RecordTableRow'

const Records: FC = () => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()

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

    return (): void => {
      if (loaderRef.current !== null) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [getRecordsTc, isTrash, loaderRef])

  const onIsTrashClick = (event: ChangeEvent<HTMLInputElement>): void => {
    navigate(`/records?isTrash=${event.target.checked}`)
  }

  const openRecordCreationModal = (): void => {
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
            {records.status === LoadingStatus.Completed ? null : (
              <Loader Component={'tr'} ref={loaderRef} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isRecordCreatingModalShown ? (
        <RecordFormModal
          categories={categories.items}
          closeModal={(): void => setIsRecordCreatingModalShown(false)}
          record={null}
        />
      ) : null}
    </Fragment>
  )
}

export default Records
