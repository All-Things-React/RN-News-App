import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  StorySummaryFieldsFragment,
} from '../graphql/__generated__/operationTypes';
import {gql, useMutation} from 'urql';
import {StorySummaryFields} from '../graphql/fragments';

const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
  }

  ${StorySummaryFields}
`;

const Story: React.FC<{item: StorySummaryFieldsFragment}> = ({item}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [{fetching: isAddingBookmark}, addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(ADD_BOOKMARK_MUTATION);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetails', {
          id: item.id,
          title: item.title,
        })
      }>
      <View style={styles.row}>
        <Text style={styles.title}>
          {item.title} {item.bookmarkId ? '🔖' : ''}
        </Text>
        {!item.bookmarkId && !isAddingBookmark ? (
          <Pressable onPress={() => addBookmark({storyId: item.id})}>
            <Text style={styles.bookmarkText}>Add bookmark</Text>
          </Pressable>
        ) : null}
        {isAddingBookmark ? <ActivityIndicator /> : null}
      </View>
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
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookmarkText: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 5,
    color: '#555353',
    borderColor: '#555353',
  },
});
