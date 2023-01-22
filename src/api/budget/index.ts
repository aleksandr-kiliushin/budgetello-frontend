import * as Types from '../types';

import { gql } from '@apollo/client';
import { BudgetCategoryFieldsFragmentDoc, BudgetCategoryTypeFieldsFragmentDoc, BudgetRecordFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBudgetCategoriesQueryVariables = Types.Exact<{
  boardsIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  orderingById?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetBudgetCategoriesQuery = { __typename?: 'Query', budgetCategories: Array<{ __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }> };

export type GetBudgetCategoryQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetBudgetCategoryQuery = { __typename?: 'Query', budgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

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


export type GetBudgetRecordsQuery = { __typename?: 'Query', budgetRecords: Array<{ __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }, currency: { __typename?: 'Currency', name: string, slug: string, symbol: string } }> };

export type CreateBudgetCategoryMutationVariables = Types.Exact<{
  boardId: Types.Scalars['Int'];
  name: Types.Scalars['String'];
  typeId: Types.Scalars['Int'];
}>;


export type CreateBudgetCategoryMutation = { __typename?: 'Mutation', createBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type CreateBudgetRecordMutationVariables = Types.Exact<{
  amount: Types.Scalars['Float'];
  categoryId: Types.Scalars['Int'];
  currencySlug: Types.Scalars['String'];
  date: Types.Scalars['String'];
}>;


export type CreateBudgetRecordMutation = { __typename?: 'Mutation', createBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }, currency: { __typename?: 'Currency', name: string, slug: string, symbol: string } } };

export type DeleteBudgetCategoryMutationVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type DeleteBudgetCategoryMutation = { __typename?: 'Mutation', deleteBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type DeleteBudgetRecordMutationVariables = Types.Exact<{
  recordId: Types.Scalars['Int'];
}>;


export type DeleteBudgetRecordMutation = { __typename?: 'Mutation', deleteBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }, currency: { __typename?: 'Currency', name: string, slug: string, symbol: string } } };

export type UpdateBudgetCategoryMutationVariables = Types.Exact<{
  boardId?: Types.InputMaybe<Types.Scalars['Int']>;
  id: Types.Scalars['Int'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  typeId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UpdateBudgetCategoryMutation = { __typename?: 'Mutation', updateBudgetCategory: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } } };

export type UpdateBudgetRecordMutationVariables = Types.Exact<{
  amount?: Types.InputMaybe<Types.Scalars['Float']>;
  categoryId?: Types.InputMaybe<Types.Scalars['Int']>;
  currencySlug?: Types.InputMaybe<Types.Scalars['String']>;
  date?: Types.InputMaybe<Types.Scalars['String']>;
  id: Types.Scalars['Int'];
  isTrashed?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type UpdateBudgetRecordMutation = { __typename?: 'Mutation', updateBudgetRecord: { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }, currency: { __typename?: 'Currency', name: string, slug: string, symbol: string } } };


export const GetBudgetCategoriesDocument = gql`
    query GetBudgetCategories($boardsIds: [Int!], $ids: [Int!], $orderingById: String) {
  budgetCategories(boardsIds: $boardsIds, ids: $ids, orderingById: $orderingById) {
    ...budgetCategoryFields
  }
}
    ${BudgetCategoryFieldsFragmentDoc}`;

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
 *      orderingById: // value for 'orderingById'
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
export const GetBudgetCategoryDocument = gql`
    query GetBudgetCategory($id: Int!) {
  budgetCategory(id: $id) {
    ...budgetCategoryFields
  }
}
    ${BudgetCategoryFieldsFragmentDoc}`;

/**
 * __useGetBudgetCategoryQuery__
 *
 * To run a query within a React component, call `useGetBudgetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBudgetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetBudgetCategoryQuery, GetBudgetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetCategoryQuery, GetBudgetCategoryQueryVariables>(GetBudgetCategoryDocument, options);
      }
export function useGetBudgetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetCategoryQuery, GetBudgetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetCategoryQuery, GetBudgetCategoryQueryVariables>(GetBudgetCategoryDocument, options);
        }
export type GetBudgetCategoryQueryHookResult = ReturnType<typeof useGetBudgetCategoryQuery>;
export type GetBudgetCategoryLazyQueryHookResult = ReturnType<typeof useGetBudgetCategoryLazyQuery>;
export type GetBudgetCategoryQueryResult = Apollo.QueryResult<GetBudgetCategoryQuery, GetBudgetCategoryQueryVariables>;
export const GetBudgetCategoryTypesDocument = gql`
    query GetBudgetCategoryTypes {
  budgetCategoryTypes {
    ...budgetCategoryTypeFields
  }
}
    ${BudgetCategoryTypeFieldsFragmentDoc}`;

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
    ...budgetRecordFields
  }
}
    ${BudgetRecordFieldsFragmentDoc}`;

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
    ...budgetCategoryFields
  }
}
    ${BudgetCategoryFieldsFragmentDoc}`;
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
    mutation CreateBudgetRecord($amount: Float!, $categoryId: Int!, $currencySlug: String!, $date: String!) {
  createBudgetRecord(
    input: {amount: $amount, categoryId: $categoryId, currencySlug: $currencySlug, date: $date}
  ) {
    ...budgetRecordFields
  }
}
    ${BudgetRecordFieldsFragmentDoc}`;
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
 *      currencySlug: // value for 'currencySlug'
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
    ...budgetCategoryFields
  }
}
    ${BudgetCategoryFieldsFragmentDoc}`;
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
    ...budgetRecordFields
  }
}
    ${BudgetRecordFieldsFragmentDoc}`;
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
export const UpdateBudgetCategoryDocument = gql`
    mutation UpdateBudgetCategory($boardId: Int, $id: Int!, $name: String, $typeId: Int) {
  updateBudgetCategory(
    input: {boardId: $boardId, id: $id, name: $name, typeId: $typeId}
  ) {
    ...budgetCategoryFields
  }
}
    ${BudgetCategoryFieldsFragmentDoc}`;
export type UpdateBudgetCategoryMutationFn = Apollo.MutationFunction<UpdateBudgetCategoryMutation, UpdateBudgetCategoryMutationVariables>;

/**
 * __useUpdateBudgetCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateBudgetCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBudgetCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBudgetCategoryMutation, { data, loading, error }] = useUpdateBudgetCategoryMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      typeId: // value for 'typeId'
 *   },
 * });
 */
export function useUpdateBudgetCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBudgetCategoryMutation, UpdateBudgetCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBudgetCategoryMutation, UpdateBudgetCategoryMutationVariables>(UpdateBudgetCategoryDocument, options);
      }
export type UpdateBudgetCategoryMutationHookResult = ReturnType<typeof useUpdateBudgetCategoryMutation>;
export type UpdateBudgetCategoryMutationResult = Apollo.MutationResult<UpdateBudgetCategoryMutation>;
export type UpdateBudgetCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateBudgetCategoryMutation, UpdateBudgetCategoryMutationVariables>;
export const UpdateBudgetRecordDocument = gql`
    mutation UpdateBudgetRecord($amount: Float, $categoryId: Int, $currencySlug: String, $date: String, $id: Int!, $isTrashed: Boolean) {
  updateBudgetRecord(
    input: {amount: $amount, categoryId: $categoryId, currencySlug: $currencySlug, date: $date, id: $id, isTrashed: $isTrashed}
  ) {
    ...budgetRecordFields
  }
}
    ${BudgetRecordFieldsFragmentDoc}`;
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
 *      currencySlug: // value for 'currencySlug'
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