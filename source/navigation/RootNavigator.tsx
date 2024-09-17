import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationConstants } from './NavigationConstants';
import { CustomerInfoScreen, DetailDeviceScreen, DevicesScreen, SummaryScreen, TotalScreen } from '../screens';

const RootNavigator = () =>  {
   const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator
    initialRouteName={NavigationConstants.CustomerInfoScreen}
      screenOptions={{
         headerShown: false,
         statusBarTranslucent: true,
         statusBarColor: 'transparent',
         statusBarStyle: 'dark',
   }}>
      <RootStack.Screen name={NavigationConstants.CustomerInfoScreen} component={CustomerInfoScreen}/>
      <RootStack.Screen name={NavigationConstants.DevicesScreen} component={DevicesScreen}/>
      <RootStack.Screen name={NavigationConstants.SummaryScreen} component={SummaryScreen}/>
      <RootStack.Screen name={NavigationConstants.TotalScreen} component={TotalScreen}/>
      <RootStack.Screen name={NavigationConstants.DetailDeviceScreen} component={DetailDeviceScreen}/>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
