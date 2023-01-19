import * as Types from '../types';

import { gql } from '@apollo/client';
import { BoardFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBoardsQueryVariables = Types.Exact<{
  iAmAdminOf?: Types.InputMaybe<Types.Scalars['Boolean']>;
  iAmMemberOf?: Types.InputMaybe<Types.Scalars['Boolean']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  subjectsIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type GetBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }> };

export type GetBoardQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetBoardQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } } };

export type AddBoardMemberMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int'];
  userId: Types.Scalars['Int'];
}>;


export type AddBoardMemberMutation = { __typename?: 'Mutation', addBoardMember: { __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } } };

export type RemoveBoardMemberMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int'];
  memberId: Types.Scalars['Int'];
}>;


export type RemoveBoardMemberMutation = { __typename?: 'Mutation', removeBoardMember: { __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } } };

export type UpdateBoardMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  subjectId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } } };


export const GetBoardsDocument = gql`
    query GetBoards($iAmAdminOf: Boolean, $iAmMemberOf: Boolean, $ids: [Int!], $name: String, $subjectsIds: [Int!]) {
  boards(
    iAmAdminOf: $iAmAdminOf
    iAmMemberOf: $iAmMemberOf
    ids: $ids
    name: $name
    subjectsIds: $subjectsIds
  ) {
    ...boardFields
  }
}
    ${BoardFieldsFragmentDoc}`;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *      iAmAdminOf: // value for 'iAmAdminOf'
 *      iAmMemberOf: // value for 'iAmMemberOf'
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *      subjectsIds: // value for 'subjectsIds'
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetBoardDocument = gql`
    query GetBoard($id: Int!) {
  board(id: $id) {
    ...boardFields
  }
}
    ${BoardFieldsFragmentDoc}`;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
export const AddBoardMemberDocument = gql`
    mutation AddBoardMember($boardId: Int!, $userId: Int!) {
  addBoardMember(input: {boardId: $boardId, userId: $userId}) {
    ...boardFields
  }
}
    ${BoardFieldsFragmentDoc}`;
export type AddBoardMemberMutationFn = Apollo.MutationFunction<AddBoardMemberMutation, AddBoardMemberMutationVariables>;

/**
 * __useAddBoardMemberMutation__
 *
 * To run a mutation, you first call `useAddBoardMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBoardMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBoardMemberMutation, { data, loading, error }] = useAddBoardMemberMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddBoardMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddBoardMemberMutation, AddBoardMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBoardMemberMutation, AddBoardMemberMutationVariables>(AddBoardMemberDocument, options);
      }
export type AddBoardMemberMutationHookResult = ReturnType<typeof useAddBoardMemberMutation>;
export type AddBoardMemberMutationResult = Apollo.MutationResult<AddBoardMemberMutation>;
export type AddBoardMemberMutationOptions = Apollo.BaseMutationOptions<AddBoardMemberMutation, AddBoardMemberMutationVariables>;
export const RemoveBoardMemberDocument = gql`
    mutation RemoveBoardMember($boardId: Int!, $memberId: Int!) {
  removeBoardMember(input: {boardId: $boardId, memberId: $memberId}) {
    ...boardFields
  }
}
    ${BoardFieldsFragmentDoc}`;
export type RemoveBoardMemberMutationFn = Apollo.MutationFunction<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>;

/**
 * __useRemoveBoardMemberMutation__
 *
 * To run a mutation, you first call `useRemoveBoardMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBoardMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBoardMemberMutation, { data, loading, error }] = useRemoveBoardMemberMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useRemoveBoardMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>(RemoveBoardMemberDocument, options);
      }
export type RemoveBoardMemberMutationHookResult = ReturnType<typeof useRemoveBoardMemberMutation>;
export type RemoveBoardMemberMutationResult = Apollo.MutationResult<RemoveBoardMemberMutation>;
export type RemoveBoardMemberMutationOptions = Apollo.BaseMutationOptions<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($id: Int!, $name: String, $subjectId: Int) {
  updateBoard(input: {id: $id, name: $name, subjectId: $subjectId}) {
    ...boardFields
  }
}
    ${BoardFieldsFragmentDoc}`;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      subjectId: // value for 'subjectId'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;