import { gql } from 'apollo-boost'

export const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      token
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

export const CP = gql`
  mutation createProject($title: String!, $description: String) {
    createProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`