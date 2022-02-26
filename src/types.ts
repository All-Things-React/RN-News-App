import {NavigatorScreenParams} from '@react-navigation/core';

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  StoryDetails: {id: string; title: string};
};
