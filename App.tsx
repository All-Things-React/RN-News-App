import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {createClient, Provider as UrqlProvider} from 'urql';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

const App = () => {
  return (
    <UrqlProvider value={client}>
      <SafeAreaView>
        <StatusBar />
        <Text>App.tsx</Text>
      </SafeAreaView>
    </UrqlProvider>
  );
};

export default App;
