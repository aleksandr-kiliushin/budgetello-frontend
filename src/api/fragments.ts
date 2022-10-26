import * as Types from './types';

import { gql } from '@apollo/client';
export type BudgetCategoryTypeFieldsFragment = { __typename?: 'BudgetCategoryType', id: number, name: string };

export type BudgetCategoryFieldsFragment = { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } };

export type BudgetRecordFieldsFragment = { __typename?: 'BudgetRecord', amount: number, date: string, id: number, isTrashed: boolean, category: { __typename?: 'BudgetCategory', id: number, name: string, board: { __typename?: 'Board', id: number, name: string }, type: { __typename?: 'BudgetCategoryType', id: number, name: string } }, currency: { __typename?: 'Currency', name: string, slug: string, symbol: string } };

export type UserFieldsFragment = { __typename?: 'User', id: number, username: string, administratedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }>, participatedBoards: Array<{ __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } }> };

export type BoardFieldsFragment = { __typename?: 'Board', id: number, name: string, admins: Array<{ __typename?: 'User', id: number, username: string }>, members: Array<{ __typename?: 'User', id: number, username: string }>, subject: { __typename?: 'BoardSubject', id: number, name: string } };

export type CurrencyFieldsFragment = { __typename?: 'Currency', name: string, slug: string, symbol: string };

export const BudgetCategoryTypeFieldsFragmentDoc = gql`
    fragment budgetCategoryTypeFields on BudgetCategoryType {
  id
  name
}
    `;
export const BudgetCategoryFieldsFragmentDoc = gql`
    fragment budgetCategoryFields on BudgetCategory {
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
    `;
export const BudgetRecordFieldsFragmentDoc = gql`
    fragment budgetRecordFields on BudgetRecord {
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
  currency {
    name
    slug
    symbol
  }
  date
  id
  isTrashed
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  administratedBoards {
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
  id
  participatedBoards {
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
  username
}
    `;
export const BoardFieldsFragmentDoc = gql`
    fragment boardFields on Board {
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
    `;
export const CurrencyFieldsFragmentDoc = gql`
    fragment currencyFields on Currency {
  name
  slug
  symbol
}
    `;