import React from 'react';
import {StatusBar} from 'react-native';
import {createClient, Provider as UrqlProvider} from 'urql';
import Stories from './Stories';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

const App = () => {
  return (
    <UrqlProvider value={client}>
      <StatusBar hidden />
      <Stories />
    </UrqlProvider>
  );
};

export default App;
