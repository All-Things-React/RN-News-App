import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BookmarksScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarks.screen</Text>
    </View>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
