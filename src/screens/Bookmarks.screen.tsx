import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {gql, useQuery} from 'urql';
import Story from '../components/Story';
import {StorySummaryFields} from '../graphql/fragments';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../graphql/__generated__/operationTypes';

const BOOKMARKS_QUERY = gql`
  query AllBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }

  ${StorySummaryFields}
`;

const BookmarksScreen: React.FC = () => {
  const [{data, fetching, error}] = useQuery<
    AllBookmarksQuery,
    AllBookmarksQueryVariables
  >({query: BOOKMARKS_QUERY});

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
      data={data?.bookmarks}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => <Story item={item.story} />}
    />
  );
};

export default BookmarksScreen;

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

  flatlist: {
    paddingHorizontal: 20,
  },

  error: {
    color: 'red',
  },
});
