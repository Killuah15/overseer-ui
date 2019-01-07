import React, { Component } from 'react'
import logo from '../public/logo.svg'
import client from '../apollo/client'
import { ApolloProvider, Query, Mutation } from 'react-apollo'
import '../public/styles/App.scss'

import { LOGIN, CP } from '../apollo/templates/Mutations'
import { USERS, EVENTS, PROJECTS } from '../apollo/templates/Queries'

//TESTING A MUTATION - WORKS
/* const signup = gql`
  mutation {
    login(data: { email: "riesen.bla@web.de", password: "123456789" }) {
      token
    }
  }
`
 */

//NOTE: LOGIN mit input variablen (TODO: benutzen von Mutation react-apollo Components wäre cooler)

client
  .mutate({
    mutation: LOGIN,
    variables: {
      data: {
        email: 'robin.duerhager@web.de',
        password: '12345678'
      }
    }
  })
  .then(result => {
    //sessionStorage.setItem('token', result.data.login.token)
    //console.log(sessionStorage.getItem('token'));
  })

/*  client
  .mutate({
    mutation: CP,
    variables: {
      title: 'bla'
    }
  })
  .then(result => {
    console.log('done: ' + result);
  }) */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Query query={PROJECTS}>
              {({ loading, error, data }) => {
                if (loading) return `loading...`
                if (error) return `Error! ${error.message}`

                const { projects } = data
                return projects.map(project => (
                  <h1 key={project.id}>{project.title}</h1>
                ))
              }}
            </Query>
            <Mutation
              mutation={CP}
              update={(cache, { data: { createProject } }) => {
                const { projects } = cache.readQuery({ query: PROJECTS })

                cache.writeQuery({
                  query: PROJECTS,
                  data: {
                    projects: projects.concat(createProject)
                  }
                })
              }}
            >
              {createProject => (
                <div>
                  <form
                    onSubmit={async e => {
                      e.preventDefault()
                      await createProject({ variables: { title: 'bla2' } })
                    }}
                  >
                    <button type="submit">createProject</button>
                  </form>
                </div>
              )}
            </Mutation>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
