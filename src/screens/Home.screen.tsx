import React, {useCallback, useEffect, useState} from 'react';
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
  AllStoriesQuery,
  AllStoriesQueryVariables,
} from '../graphql/__generated__/operationTypes';

const STORIES_QUERY = gql`
  query AllStories {
    stories {
      ...StorySummaryFields
    }
  }

  ${StorySummaryFields}
`;

const HomeScreen: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [{data, error, fetching}, refreshStories] = useQuery<
    AllStoriesQuery,
    AllStoriesQueryVariables
  >({query: STORIES_QUERY});

  const handleRefreshStories = useCallback(() => {
    setIsRefreshing(true);
    refreshStories({requestPolicy: 'network-only'});
  }, [refreshStories]);

  useEffect(() => {
    if (!fetching) {
      setIsRefreshing(false);
    }
  }, [fetching]);

  if (fetching && !isRefreshing) {
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
      refreshing={isRefreshing}
      onRefresh={handleRefreshStories}
      contentContainerStyle={styles.flatlistContainer}
      style={styles.flatlist}
      data={data?.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => <Story item={item} cta="add" />}
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

  flatlist: {
    paddingHorizontal: 20,
  },

  error: {
    color: 'red',
  },
});
