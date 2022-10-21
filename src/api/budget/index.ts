import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBudgetCategoryMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int'];
  name: Types.Scalars['String'];
  typeId: Types.Scalars['Int'];
}>;


export type CreateBudgetCategoryMutation = { __typename?: 'Mutation', createBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type DeleteBudgetCategoryMutationVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type DeleteBudgetCategoryMutation = { __typename?: 'Mutation', deleteBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type CreateBudgetRecordMutationVariables = Types.Exact<{
  amount: Types.Scalars['Float'];
  categoryId: Types.Scalars['Int'];
  date: Types.Scalars['String'];
}>;


export type CreateBudgetRecordMutation = { __typename?: 'Mutation', createBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } } };

export type DeleteBudgetRecordMutationVariables = Types.Exact<{
  recordId: Types.Scalars['Int'];
}>;


export type DeleteBudgetRecordMutation = { __typename?: 'Mutation', deleteBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } } };


export const CreateBudgetCategoryDocument = gql`
    mutation CreateBudgetCategory($boardId: Int!, $name: String!, $typeId: Int!) {
  createBudgetCategory(input: {boardId: $boardId, name: $name, typeId: $typeId}) {
    board {
      id
      name
    }
    id
    name
    type {
      id
      name
    }
  }
}
    `;
export type CreateBudgetCategoryMutationFn = Apollo.MutationFunction<CreateBudgetCategoryMutation, CreateBudgetCategoryMutationVariables>;

/**
 * __useCreateBudgetCategoryMutation__
 *
 * To run a mutation, you first call `useCreateBudgetCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBudgetCategoryMutation, { data, loading, error }] = useCreateBudgetCategoryMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *      typeId: // value for 'typeId'
 *   },
 * });
 */
export function useCreateBudgetCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateBudgetCategoryMutation, CreateBudgetCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBudgetCategoryMutation, CreateBudgetCategoryMutationVariables>(CreateBudgetCategoryDocument, options);
      }
export type CreateBudgetCategoryMutationHookResult = ReturnType<typeof useCreateBudgetCategoryMutation>;
export type CreateBudgetCategoryMutationResult = Apollo.MutationResult<CreateBudgetCategoryMutation>;
export type CreateBudgetCategoryMutationOptions = Apollo.BaseMutationOptions<CreateBudgetCategoryMutation, CreateBudgetCategoryMutationVariables>;
export const DeleteBudgetCategoryDocument = gql`
    mutation DeleteBudgetCategory($categoryId: Int!) {
  deleteBudgetCategory(id: $categoryId) {
    board {
      id
      name
    }
    id
    name
    type {
      id
      name
    }
  }
}
    `;
export type DeleteBudgetCategoryMutationFn = Apollo.MutationFunction<DeleteBudgetCategoryMutation, DeleteBudgetCategoryMutationVariables>;

/**
 * __useDeleteBudgetCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteBudgetCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBudgetCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBudgetCategoryMutation, { data, loading, error }] = useDeleteBudgetCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteBudgetCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBudgetCategoryMutation, DeleteBudgetCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBudgetCategoryMutation, DeleteBudgetCategoryMutationVariables>(DeleteBudgetCategoryDocument, options);
      }
export type DeleteBudgetCategoryMutationHookResult = ReturnType<typeof useDeleteBudgetCategoryMutation>;
export type DeleteBudgetCategoryMutationResult = Apollo.MutationResult<DeleteBudgetCategoryMutation>;
export type DeleteBudgetCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteBudgetCategoryMutation, DeleteBudgetCategoryMutationVariables>;
export const CreateBudgetRecordDocument = gql`
    mutation CreateBudgetRecord($amount: Float!, $categoryId: Int!, $date: String!) {
  createBudgetRecord(
    input: {amount: $amount, categoryId: $categoryId, date: $date}
  ) {
    amount
    category {
      board {
        id
        name
      }
      id
      name
      type {
        id
        name
      }
    }
    date
    id
    isTrashed
  }
}
    `;
export type CreateBudgetRecordMutationFn = Apollo.MutationFunction<CreateBudgetRecordMutation, CreateBudgetRecordMutationVariables>;

/**
 * __useCreateBudgetRecordMutation__
 *
 * To run a mutation, you first call `useCreateBudgetRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBudgetRecordMutation, { data, loading, error }] = useCreateBudgetRecordMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      categoryId: // value for 'categoryId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateBudgetRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreateBudgetRecordMutation, CreateBudgetRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBudgetRecordMutation, CreateBudgetRecordMutationVariables>(CreateBudgetRecordDocument, options);
      }
export type CreateBudgetRecordMutationHookResult = ReturnType<typeof useCreateBudgetRecordMutation>;
export type CreateBudgetRecordMutationResult = Apollo.MutationResult<CreateBudgetRecordMutation>;
export type CreateBudgetRecordMutationOptions = Apollo.BaseMutationOptions<CreateBudgetRecordMutation, CreateBudgetRecordMutationVariables>;
export const DeleteBudgetRecordDocument = gql`
    mutation DeleteBudgetRecord($recordId: Int!) {
  deleteBudgetRecord(id: $recordId) {
    amount
    category {
      board {
        id
        name
      }
      id
      name
      type {
        id
        name
      }
    }
    date
    id
    isTrashed
  }
}
    `;
export type DeleteBudgetRecordMutationFn = Apollo.MutationFunction<DeleteBudgetRecordMutation, DeleteBudgetRecordMutationVariables>;

/**
 * __useDeleteBudgetRecordMutation__
 *
 * To run a mutation, you first call `useDeleteBudgetRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBudgetRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBudgetRecordMutation, { data, loading, error }] = useDeleteBudgetRecordMutation({
 *   variables: {
 *      recordId: // value for 'recordId'
 *   },
 * });
 */
export function useDeleteBudgetRecordMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBudgetRecordMutation, DeleteBudgetRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBudgetRecordMutation, DeleteBudgetRecordMutationVariables>(DeleteBudgetRecordDocument, options);
      }
export type DeleteBudgetRecordMutationHookResult = ReturnType<typeof useDeleteBudgetRecordMutation>;
export type DeleteBudgetRecordMutationResult = Apollo.MutationResult<DeleteBudgetRecordMutation>;
export type DeleteBudgetRecordMutationOptions = Apollo.BaseMutationOptions<DeleteBudgetRecordMutation, DeleteBudgetRecordMutationVariables>;