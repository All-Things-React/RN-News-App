import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StoryDetailsModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>StoryDetailsModal</Text>
    </View>
  );
};

export default StoryDetailsModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
