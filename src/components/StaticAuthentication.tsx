'use client';

import React from 'react';
import AuthenticationForm from '@/components/AuthenticationForm';
import { useReadLocalStorage } from 'usehooks-ts';
import { AUTH_LOCAL_STORAGE_KEY } from '@/constants';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface StaticAuthenticationState {
  username: string;
  jobTitle: string;
}

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const StaticAuthentication: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { username, jobTitle } = useReadLocalStorage<StaticAuthenticationState>(AUTH_LOCAL_STORAGE_KEY) ?? {};

  if (!username || !jobTitle) {
    return <AuthenticationForm h='100vh' />;
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default StaticAuthentication;
