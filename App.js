/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';
const Stack = createStackNavigator();

export default class App extends Component {
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
