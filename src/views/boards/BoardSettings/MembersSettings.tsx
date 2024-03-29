import {
  PersonAddOutlined as PersonAddOutlinedIcon,
  PersonRemoveOutlined as PersonRemoveOutlinedIcon,
} from "@mui/icons-material"
import { Button, Table, TableCell, TableHead, TableRow } from "@mui/material"
import { FC } from "react"
import { useParams } from "react-router-dom"

import { useAddBoardMemberMutation, useGetBoardQuery, useRemoveBoardMemberMutation } from "#api/boards/index.generated"
import { useGetUsersQuery } from "#api/users/index.generated"
import { DataLayout } from "#components/DataLayout"
import { TableBody } from "#components/TableBody"

export const MembersSettings: FC = () => {
  const params = useParams<{ boardId: string }>()

  const getUsersResult = useGetUsersQuery()
  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  const [addBoardMember] = useAddBoardMemberMutation()
  const [removeBoardMember] = useRemoveBoardMemberMutation()

  const users = getUsersResult.data?.users ?? []
  const boardMembers = getBoardResult.data?.board.members ?? []

  return (
    <>
      <DataLayout>
        <DataLayout.Heading variant="h2">Members</DataLayout.Heading>
        <DataLayout.TableContainer columnsWidths={["90%", "10%"]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Username</TableCell>
                <TableCell variant="head" />
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {boardMembers.some((member) => member.id === user.id) ? (
                      <Button
                        aria-label={`Remove ${user.username} member from board`}
                        color="error"
                        onClick={() => {
                          removeBoardMember({ variables: { boardId: Number(params.boardId), memberId: user.id } })
                        }}
                        size="small"
                        startIcon={<PersonRemoveOutlinedIcon />}
                      />
                    ) : (
                      <Button
                        aria-label={`Add ${user.username} member to board`}
                        color="success"
                        onClick={() => {
                          addBoardMember({ variables: { boardId: Number(params.boardId), userId: user.id } })
                        }}
                        size="small"
                        startIcon={<PersonAddOutlinedIcon />}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataLayout.TableContainer>
      </DataLayout>
    </>
  )
}
