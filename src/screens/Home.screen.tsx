import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {gql, useQuery} from 'urql';
import {
  AllStoriesQuery,
  AllStoriesQueryVariables,
} from '../graphql/__generated__/operationTypes';
import {RootStackParamList} from '../types';

const STORIES_QUERY = gql`
  query AllStories {
    stories {
      id
      title
      author
      summary
    }
  }
`;

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [{data, error, fetching}] = useQuery<
    AllStoriesQuery,
    AllStoriesQueryVariables
  >({query: STORIES_QUERY});

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

  return (
    <FlatList
      contentContainerStyle={styles.flatlistContainer}
      style={styles.flatlist}
      data={data?.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => (
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
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatlistContainer: {
    paddingVertical: 30,
  },

  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },

  summary: {
    fontSize: 18,
    color: 'gray',
  },

  flatlist: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },

  error: {
    color: 'red',
  },
});
