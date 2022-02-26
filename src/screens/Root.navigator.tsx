import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabs.navigator';

const RootStack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabsNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
