import { gql } from "apollo-boost"

export const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`

export const LOGOUT = gql`
  mutation logout {
    logout {
      username
    }
  }
`

export const SIGNUP = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      token
    }
  }
`

export const CREATEPROJECT = gql`
  mutation createProject(
    $title: String!
    $description: String
    $rulebook: Rulebook!
  ) {
    createProject(
      title: $title
      description: $description
      rulebook: $rulebook
    ) {
      id
      title
      description
      rulebook
    }
  }
`

export const DELETEPROJECT = gql`
  mutation deleteProject($id: ID!){
    deleteProject(id: $id){
      id
      title
      description
      rulebook
    }
  }
`

export const CREATECREATURE = gql`
  mutation createCreature($data: CreatureInput!) {
    createCreature(data: $data) {
      id
      name
      race
      shadow
      Conditions {
        physical {
          fitness {
            toughness
            painThreshold
          }
        }
        spiritual {
          corruption {
            current
            threshold
            permanent
          }
        }
      }
      attributes {
        accurate
        cunning
        discreet
        persuasive
        quick
        resolute
        strong
        vigilant
        defense
      }
    }
  }
`

export const DELETECREATURE = gql`
  mutation deleteCreature($id: ID!){
    deleteCreature(id: $id){
      id
      name
      race
      rulebook
    }
  }
`

export const CREATEEVENT = gql`
  mutation createEvent($data: EventInput!){
    createEvent(data: $data){
      id
      title
      eventRole
      index
    }
  }
`

export const DELETEEVENT = gql`
  mutation deleteEvent($id: ID!){
    deleteEvent(id: $id){
      id
      title
      eventRole
      index
    }
  }
`

export const UPDATEEVENT = gql`
  mutation updateEvent($id: ID!, $data: uEventInput){
    updateEvent(id: $id, data: $data){
      id
      title
      eventRole
      index
    }
  }
`