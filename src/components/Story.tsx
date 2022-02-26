import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {StorySummaryFieldsFragment} from '../graphql/__generated__/operationTypes';

const Story: React.FC<{item: StorySummaryFieldsFragment}> = ({item}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetails', {
          id: item.id,
          title: item.title,
        })
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </Pressable>
  );
};

export default Story;

const styles = StyleSheet.create({
  summary: {
    fontSize: 18,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
});
