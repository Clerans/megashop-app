import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';


function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;
