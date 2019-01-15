import { gql } from 'apollo-boost'

export const PROJECTS = gql`
    query projects{
        projects{
            id
            title
            rulebook
        }
    }
`