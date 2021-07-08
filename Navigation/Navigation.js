// Navigation/Navigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'

const Stack = createStackNavigator();

const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name={'Recherche'}
          component={Search}
          options={{
            headerShown: true,
          }}
        />        
        <Stack.Screen
        name={'FilmDetail'}
        component={FilmDetail}
        options={{
          headerShown: true,
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
