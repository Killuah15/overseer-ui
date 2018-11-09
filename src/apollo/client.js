import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://glacial-hollows-99325.herokuapp.com/'
  });

  /* 
  NOTE:

  FÜR DEV: muss für development mit http://localhost:4000 (also overseer-db npm run dev) abgerufen werden.
  FÜR DEV: https://glacial-hollows-99325.herokuapp.com/ ist eine heroku app vom udemy Kurs um einfach mit querys zu spielen
  FÜR PROD: https://still-fortress-67589.herokuapp.com/ ist der Endpoint welcher dann letztendlich für Production hier als URL angegeben werden sollte
  */

  export default client