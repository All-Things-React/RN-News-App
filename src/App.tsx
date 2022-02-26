import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {createClient, Provider as UrqlProvider} from 'urql';
import RootNavigator from './screens/Root.navigator';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

const App = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar hidden />
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};

export default App;
