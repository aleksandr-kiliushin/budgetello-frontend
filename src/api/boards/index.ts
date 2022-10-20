import * as Types from '../types';

import { gql } from '@apollo/client';
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


export const GetBoardsDocument = gql`
    query GetBoards($iAmAdminOf: Boolean, $iAmMemberOf: Boolean, $ids: [Int!], $name: String, $subjectsIds: [Int!]) {
  boards(
    iAmAdminOf: $iAmAdminOf
    iAmMemberOf: $iAmMemberOf
    ids: $ids
    name: $name
    subjectsIds: $subjectsIds
  ) {
    admins {
      id
      username
    }
    id
    members {
      id
      username
    }
    name
    subject {
      id
      name
    }
  }
}
    `;

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
    admins {
      id
      username
    }
    id
    members {
      id
      username
    }
    name
    subject {
      id
      name
    }
  }
}
    `;

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