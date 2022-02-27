import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  gql,
  Provider as UrqlProvider,
} from 'urql';
import {offlineExchange} from '@urql/exchange-graphcache';
import RootNavigator from './screens/Root.navigator';
import schema from './graphql/graphql.schema.json';
import {
  AddBookmarkMutation,
  AllBookmarksQuery,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
} from './graphql/__generated__/operationTypes';
import {BOOKMARKS_QUERY} from './screens/Bookmarks.screen';
import {useNetInfo} from '@react-native-community/netinfo';
import AppOfflineMessage from './components/AppOfflineMessage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {makeAsyncStorage} from '@urql/storage-rn';

const storage = makeAsyncStorage({
  dataKey: 'my-app-data',
  metadataKey: 'my-app-metadata',
  maxAge: 5,
});

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    offlineExchange({
      storage,
      schema: schema as any,
      resolvers: {
        Query: {
          story: (_, args) => ({
            __typename: 'Story',
            id: args.id,
          }),
        },
      },
      updates: {
        Mutation: {
          addBookmark: (result: AddBookmarkMutation, args, cache) => {
            if (result.addBookmark) {
              cache.updateQuery(
                {query: BOOKMARKS_QUERY},
                (data: AllBookmarksQuery | null) => {
                  if (data && data.bookmarks && result.addBookmark) {
                    data.bookmarks?.push(result.addBookmark);
                  }
                  return data;
                },
              );
            }
          },
          removeBookmark: (
            result: RemoveBookmarkMutation,
            args: RemoveBookmarkMutationVariables,
            cache,
          ) => {
            if (result.removeBookmark) {
              let storyId = null;
              cache.updateQuery(
                {query: BOOKMARKS_QUERY},
                (data: AllBookmarksQuery | null) => {
                  if (data?.bookmarks) {
                    storyId = data.bookmarks.find(
                      item => item.id === args.bookmarkId,
                    )?.story.id;
                    data.bookmarks = data.bookmarks.filter(
                      item => item.id !== args.bookmarkId,
                    );
                  }

                  return data;
                },
              );

              if (storyId) {
                const fragment = gql`
                  fragment _ on Story {
                    id
                    bookmarkId
                  }
                `;
                cache.writeFragment(fragment, {
                  id: storyId,
                  bookmarkId: null,
                });
              }
            }
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const App = () => {
  const {isConnected} = useNetInfo();

  return (
    <SafeAreaProvider>
      <UrqlProvider value={client}>
        <NavigationContainer>
          <StatusBar hidden />
          <RootNavigator />
        </NavigationContainer>
        {isConnected === false ? <AppOfflineMessage /> : null}
      </UrqlProvider>
    </SafeAreaProvider>
  );
};

export default App;
