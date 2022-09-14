import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import Loader from "#components/Loader"
import { getCategoriesTc, getRecordsTc } from "#models/finances"
import { LoadingStatus } from "#src/constants/shared"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import RecordFormModal from "./RecordFormModal"
import RecordTableRow from "./RecordTableRow"
import { Header, StyledTableContainer, StyledTableHead } from "./components"

const Records: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const [isRecordCreatingModalShown, setIsRecordCreatingModalShown] = useState(false)

  const categories = useAppSelector((state) => state.finances.categories)
  const records = useAppSelector((state) => state.finances.records[isTrash ? "trashed" : "notTrashed"])

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

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate to="/records?isTrash=false" />
  }

  const onIsTrashClick = (event: ChangeEvent<HTMLInputElement>): void => {
    navigate(`/records?isTrash=${event.target.checked}`)
  }

  const openRecordCreationModal = (): void => {
    setIsRecordCreatingModalShown(true)
  }

  return (
    <Fragment>
      <Header>
        <Typography variant="h1">Finance records</Typography>
        <FormControlLabel
          control={<Switch checked={isTrash} onChange={onIsTrashClick} />}
          label="Trash"
          labelPlacement="start"
          name="isTrash"
          sx={{ margin: 0 }}
        />
      </Header>
      <StyledTableContainer>
        <Table size="small">
          <StyledTableHead>
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
                  <Button id="add-record" onClick={openRecordCreationModal} variant="outlined">
                    +New
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {records.items.map((record) => (
              <RecordTableRow categories={categories.items} isTrash={isTrash} key={record.id} record={record} />
            ))}
            {records.status === LoadingStatus.Completed ? null : <Loader Component={"tr"} ref={loaderRef} />}
          </TableBody>
        </Table>
      </StyledTableContainer>
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
