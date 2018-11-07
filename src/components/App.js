import React, { Component } from 'react';
import logo from '../public/logo.svg';
import '../public/styles/App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

export const client = new ApolloClient({
  uri: 'https://overseer-db.herokuapp.com/overseer/dev' //TODO add own GraphQL URI to the ApolloClient
});

//TESTING A QUERY - WORKS
/* client.
        query({
                query: gql`
                    {
                      users{
                        id,
                        name
                      }
                    }
                `
            })
                .then((result) => {
                    console.log(result);
                }); */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
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
    );
  }
}

export default App;
