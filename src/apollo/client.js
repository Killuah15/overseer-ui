import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'https://overseer-db.herokuapp.com/overseer-db/dev',
    fetchOptions: {
      credentials: 'include'
    },
    request: async (operation) => {
      //will be fetched on each query, so after login it should be okay
      const token = await sessionStorage.getItem('token')

      operation.setContext({
        headers: {
          //authorization: token ? `Bearer ${token}` : ''
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJvdmVyc2Vlci1kYkBkZXYiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQ2NzA0OTIzLCJleHAiOjE1NDczMDk3MjN9.tMK4LgHJuqFWI9s0sg1z8cuz0lrJCwvf5rreWWnzbRc"
        }
      })
    }
  })

  //request: nimmt sich bei jeder Query/Mutation/Subscription aus dem SessionStorage den token und sendet ihn im express - request object mit
  //fetchOptions: credentials: 'include' um cookies mit zu senden (wahrscheinlich gar nicht nötig, aber nice to have)

  /* 
  NOTE:

  FÜR DEV: muss für development mit http://localhost:4000 (also overseer-db npm run dev) abgerufen werden.
  FÜR DEV: https://glacial-hollows-99325.herokuapp.com/ ist eine heroku app vom udemy Kurs um einfach mit querys zu spielen
  FÜR PROD: https://still-fortress-67589.herokuapp.com/ ist der Endpoint welcher dann letztendlich für Production hier als URL angegeben werden sollte
  */

  export default client