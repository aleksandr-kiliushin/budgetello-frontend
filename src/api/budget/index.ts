import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBudgetCategoriesQueryVariables = Types.Exact<{
  boardsIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type GetBudgetCategoriesQuery = { __typename?: 'Query', budgetCategories: Array<{ __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }> };

export type GetBudgetCategoryTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBudgetCategoryTypesQuery = { __typename?: 'Query', budgetCategoryTypes: Array<{ __typename?: 'BudgetCategoryType', id: number, name: string }> };

export type GetBudgetRecordsQueryVariables = Types.Exact<{
  amount?: Types.InputMaybe<Types.Scalars['Float']>;
  boardsIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  categoriesIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  dates?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  isTrashed?: Types.InputMaybe<Types.Scalars['Boolean']>;
  orderingByDate?: Types.InputMaybe<Types.Scalars['String']>;
  orderingById?: Types.InputMaybe<Types.Scalars['String']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetBudgetRecordsQuery = { __typename?: 'Query', budgetRecords: Array<{ __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } }> };

export type CreateBudgetCategoryMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int'];
  name: Types.Scalars['String'];
  typeId: Types.Scalars['Int'];
}>;


export type CreateBudgetCategoryMutation = { __typename?: 'Mutation', createBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type CreateBudgetRecordMutationVariables = Types.Exact<{
  amount: Types.Scalars['Float'];
  categoryId: Types.Scalars['Int'];
  date: Types.Scalars['String'];
}>;


export type CreateBudgetRecordMutation = { __typename?: 'Mutation', createBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } } };

export type DeleteBudgetCategoryMutationVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type DeleteBudgetCategoryMutation = { __typename?: 'Mutation', deleteBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type DeleteBudgetRecordMutationVariables = Types.Exact<{
  recordId: Types.Scalars['Int'];
}>;


export type DeleteBudgetRecordMutation = { __typename?: 'Mutation', deleteBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } } };

export type UpdateBudgetRecordMutationVariables = Types.Exact<{
  amount?: Types.InputMaybe<Types.Scalars['Float']>;
  categoryId?: Types.InputMaybe<Types.Scalars['Int']>;
  date?: Types.InputMaybe<Types.Scalars['String']>;
  id: Types.Scalars['Int'];
  isTrashed?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type UpdateBudgetRecordMutation = { __typename?: 'Mutation', updateBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } } };


export const GetBudgetCategoriesDocument = gql`
    query GetBudgetCategories($boardsIds: [Int!], $ids: [Int!]) {
  budgetCategories(boardsIds: $boardsIds, ids: $ids) {
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

/**
 * __useGetBudgetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetBudgetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetCategoriesQuery({
 *   variables: {
 *      boardsIds: // value for 'boardsIds'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetBudgetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>(GetBudgetCategoriesDocument, options);
      }
export function useGetBudgetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>(GetBudgetCategoriesDocument, options);
        }
export type GetBudgetCategoriesQueryHookResult = ReturnType<typeof useGetBudgetCategoriesQuery>;
export type GetBudgetCategoriesLazyQueryHookResult = ReturnType<typeof useGetBudgetCategoriesLazyQuery>;
export type GetBudgetCategoriesQueryResult = Apollo.QueryResult<GetBudgetCategoriesQuery, GetBudgetCategoriesQueryVariables>;
export const GetBudgetCategoryTypesDocument = gql`
    query GetBudgetCategoryTypes {
  budgetCategoryTypes {
    id
    name
  }
}
    `;

/**
 * __useGetBudgetCategoryTypesQuery__
 *
 * To run a query within a React component, call `useGetBudgetCategoryTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetCategoryTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetCategoryTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBudgetCategoryTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetCategoryTypesQuery, GetBudgetCategoryTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetCategoryTypesQuery, GetBudgetCategoryTypesQueryVariables>(GetBudgetCategoryTypesDocument, options);
      }
export function useGetBudgetCategoryTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetCategoryTypesQuery, GetBudgetCategoryTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetCategoryTypesQuery, GetBudgetCategoryTypesQueryVariables>(GetBudgetCategoryTypesDocument, options);
        }
export type GetBudgetCategoryTypesQueryHookResult = ReturnType<typeof useGetBudgetCategoryTypesQuery>;
export type GetBudgetCategoryTypesLazyQueryHookResult = ReturnType<typeof useGetBudgetCategoryTypesLazyQuery>;
export type GetBudgetCategoryTypesQueryResult = Apollo.QueryResult<GetBudgetCategoryTypesQuery, GetBudgetCategoryTypesQueryVariables>;
export const GetBudgetRecordsDocument = gql`
    query GetBudgetRecords($amount: Float, $boardsIds: [Int!], $categoriesIds: [Int!], $dates: [String!], $ids: [Int!], $isTrashed: Boolean, $orderingByDate: String, $orderingById: String, $skip: Int, $take: Int) {
  budgetRecords(
    amount: $amount
    boardsIds: $boardsIds
    categoriesIds: $categoriesIds
    dates: $dates
    ids: $ids
    isTrashed: $isTrashed
    orderingByDate: $orderingByDate
    orderingById: $orderingById
    skip: $skip
    take: $take
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

/**
 * __useGetBudgetRecordsQuery__
 *
 * To run a query within a React component, call `useGetBudgetRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetRecordsQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *      boardsIds: // value for 'boardsIds'
 *      categoriesIds: // value for 'categoriesIds'
 *      dates: // value for 'dates'
 *      ids: // value for 'ids'
 *      isTrashed: // value for 'isTrashed'
 *      orderingByDate: // value for 'orderingByDate'
 *      orderingById: // value for 'orderingById'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetBudgetRecordsQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetRecordsQuery, GetBudgetRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetRecordsQuery, GetBudgetRecordsQueryVariables>(GetBudgetRecordsDocument, options);
      }
export function useGetBudgetRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetRecordsQuery, GetBudgetRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetRecordsQuery, GetBudgetRecordsQueryVariables>(GetBudgetRecordsDocument, options);
        }
export type GetBudgetRecordsQueryHookResult = ReturnType<typeof useGetBudgetRecordsQuery>;
export type GetBudgetRecordsLazyQueryHookResult = ReturnType<typeof useGetBudgetRecordsLazyQuery>;
export type GetBudgetRecordsQueryResult = Apollo.QueryResult<GetBudgetRecordsQuery, GetBudgetRecordsQueryVariables>;
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
export const UpdateBudgetRecordDocument = gql`
    mutation UpdateBudgetRecord($amount: Float, $categoryId: Int, $date: String, $id: Int!, $isTrashed: Boolean) {
  updateBudgetRecord(
    input: {amount: $amount, categoryId: $categoryId, date: $date, id: $id, isTrashed: $isTrashed}
  ) {
    amount
    category {
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
export type UpdateBudgetRecordMutationFn = Apollo.MutationFunction<UpdateBudgetRecordMutation, UpdateBudgetRecordMutationVariables>;

/**
 * __useUpdateBudgetRecordMutation__
 *
 * To run a mutation, you first call `useUpdateBudgetRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBudgetRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBudgetRecordMutation, { data, loading, error }] = useUpdateBudgetRecordMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      categoryId: // value for 'categoryId'
 *      date: // value for 'date'
 *      id: // value for 'id'
 *      isTrashed: // value for 'isTrashed'
 *   },
 * });
 */
export function useUpdateBudgetRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBudgetRecordMutation, UpdateBudgetRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBudgetRecordMutation, UpdateBudgetRecordMutationVariables>(UpdateBudgetRecordDocument, options);
      }
export type UpdateBudgetRecordMutationHookResult = ReturnType<typeof useUpdateBudgetRecordMutation>;
export type UpdateBudgetRecordMutationResult = Apollo.MutationResult<UpdateBudgetRecordMutation>;
export type UpdateBudgetRecordMutationOptions = Apollo.BaseMutationOptions<UpdateBudgetRecordMutation, UpdateBudgetRecordMutationVariables>;