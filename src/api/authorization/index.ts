import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAuthorizationTokenMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type CreateAuthorizationTokenMutation = { __typename?: 'Mutation', createAuthorizationToken: string };


export const CreateAuthorizationTokenDocument = gql`
    mutation CreateAuthorizationToken($username: String!, $password: String!) {
  createAuthorizationToken(input: {username: $username, password: $password})
}
    `;
export type CreateAuthorizationTokenMutationFn = Apollo.MutationFunction<CreateAuthorizationTokenMutation, CreateAuthorizationTokenMutationVariables>;

/**
 * __useCreateAuthorizationTokenMutation__
 *
 * To run a mutation, you first call `useCreateAuthorizationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthorizationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthorizationTokenMutation, { data, loading, error }] = useCreateAuthorizationTokenMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAuthorizationTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuthorizationTokenMutation, CreateAuthorizationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuthorizationTokenMutation, CreateAuthorizationTokenMutationVariables>(CreateAuthorizationTokenDocument, options);
      }
export type CreateAuthorizationTokenMutationHookResult = ReturnType<typeof useCreateAuthorizationTokenMutation>;
export type CreateAuthorizationTokenMutationResult = Apollo.MutationResult<CreateAuthorizationTokenMutation>;
export type CreateAuthorizationTokenMutationOptions = Apollo.BaseMutationOptions<CreateAuthorizationTokenMutation, CreateAuthorizationTokenMutationVariables>;