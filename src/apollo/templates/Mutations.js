import { gql } from 'apollo-boost'

export const LOGIN = gql`
mutation login($data: LoginInput!){
  login(data: $data) {
    token
  }
}
`

export const LOGOUT = gql `
mutation logout{
  logout {
    username
  }
}
`

export const SIGNUP = gql`
mutation signup($data: SignupInput!){
    signup(data: $data){
        token
    }
}
`

export const CREATEPROJECT = gql`
mutation createProject($title: String!, $description: String, $rulebook: Rulebook!){
  createProject(title: $title, description: $description, rulebook: $rulebook){
    id
    title
    description
    rulebook
  }
}
`