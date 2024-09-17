import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
   StatusBar,
} from 'react-native';
import RootNavigator from './source/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './source/redux/Store.ts';

const App = () => {

   return (
      <Provider store={store}>
         <StatusBar
            barStyle={'dark-content'}
            translucent
            backgroundColor={'transparent'}
         />
         <NavigationContainer>
            <RootNavigator />
         </NavigationContainer>
      </Provider>
   );
};

export default App;
