import { gql } from 'apollo-boost'

export const LOGIN = 
gql`
mutation login($data: LoginInput!){
  login(data: $data) {
    token
  }
}
`