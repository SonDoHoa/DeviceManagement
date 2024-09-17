import { NavigationContainer } from '@react-navigation/native';
import React  from 'react';
import {
  StatusBar,
} from 'react-native';
import RootNavigator from './source/navigation/RootNavigator';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <NavigationContainer>
         <RootNavigator/>
      </NavigationContainer>
    </>
  );
};

// const styles = StyleSheet.create({});

export default App;
