import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      transactionDate
      type
      value
      categoryId
      category {
        id
        title
        icon
        color
      }
    }
  }
`
