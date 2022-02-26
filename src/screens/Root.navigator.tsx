import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabs.navigator';
import StoryDetailsModal from './StroyDetailsModal.screen';
import {RootStackParamList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabsNavigator}
      />
      <RootStack.Screen
        options={{presentation: 'modal'}}
        name="StoryDetails"
        component={StoryDetailsModal}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
