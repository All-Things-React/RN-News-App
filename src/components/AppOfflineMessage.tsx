import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AppOfflineMessage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingBottom: insets.bottom, marginTop: -insets.bottom / 2},
      ]}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

export default AppOfflineMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  text: {
    color: 'white',
  },
});
