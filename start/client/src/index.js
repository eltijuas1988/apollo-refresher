import React from 'react'
import ReactDOM from 'react-dom'
import gql from 'graphql-tag'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {ApolloProvider, Query} from 'react-apollo'
import injectStyles from './styles';
import Pages from './pages'
import Login from './pages/login'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})
const client = new ApolloClient({
  cache,
  link,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  }
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

injectStyles()
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({data}) => (data.isLoggedIn ? <Pages/> : <Login/>)}
    </Query>
  </ApolloProvider>, document.getElementById('root')
);
