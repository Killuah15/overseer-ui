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

export const EVENTS = gql`
    query events($projectID: ID, $projectTitle: String){
        events(projectID: $projectID, projectTitle: $projectTitle){
            id
            title
            eventRole
            index
        }
    }
`