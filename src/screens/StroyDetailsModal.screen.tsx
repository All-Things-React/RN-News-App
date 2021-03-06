import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../types';
import {useQuery, gql} from 'urql';
import {
  StroyByIdQuery,
  StroyByIdQueryVariables,
} from '../graphql/__generated__/operationTypes';

const STORY_BY_ID = gql`
  query StroyById($id: ID!) {
    story(id: $id) {
      id
      title
      author
      summary
      text
    }
  }
`;

const StoryDetailsModal: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryDetails'>>();

  const [{data, fetching, error}] = useQuery<
    StroyByIdQuery,
    StroyByIdQueryVariables
  >({
    query: STORY_BY_ID,
    variables: {id: route.params.id},
  });

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={'grey'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Something went wrong {error.message}</Text>
      </View>
    );
  }

  if (!data?.story) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Story not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.author}>by {data.story.author}</Text>
      <Text style={styles.summary}>{data.story.summary}</Text>
      <Text style={styles.text}>{data.story.text}</Text>
    </ScrollView>
  );
};

export default StoryDetailsModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  scrollView: {
    padding: 20,
  },

  error: {
    color: 'red',
  },

  author: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'grey',
    marginBottom: 20,
  },

  summary: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 25,
    textAlign: 'justify',
  },

  text: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'justify',
  },
});
