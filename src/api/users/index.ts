import * as Types from '../types';

import { gql } from '@apollo/client';
import { UserFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
  passwordConfirmation: Types.Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, username: string, administratedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }>, participatedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }> } };

export type GetUsersQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  username?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, username: string, administratedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }>, participatedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }> }> };

export type GetUserQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']>;
  username?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, administratedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }>, participatedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }> } };


export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!, $passwordConfirmation: String!) {
  createUser(
    input: {username: $username, password: $password, passwordConfirmation: $passwordConfirmation}
  ) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers($ids: [Int!], $username: String) {
  users(ids: $ids, username: $username) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: Int, $username: String) {
  user(id: $id, username: $username) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;