import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home.screen';
import BookmarksScreen from './Bookmarks.screen';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={HomeScreen} />
      <BottomTabs.Screen name="Bookmarks" component={BookmarksScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
