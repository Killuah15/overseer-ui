import { gql } from 'apollo-boost'

export const USERS = gql`
    {
        users{
            id
            username
            email
        }
    }
`

export const EVENTS = gql`
    {
        events{
            id
            title
        }
    }
`

export const PROJECTS = gql`
{
    projects{
        id
        title
    }
}
`