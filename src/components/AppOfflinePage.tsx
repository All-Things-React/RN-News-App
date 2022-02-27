import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppOfflinePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.heading}>You are offline</Text>
      <Text style={styles.text}>Please check your network connection</Text>
    </View>
  );
};

export default AppOfflinePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    marginTop: 20,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  text: {
    marginTop: 15,
    fontSize: 18,
    color: 'grey',
  },
});
