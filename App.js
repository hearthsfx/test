import React from 'react';
import * as Linking from 'expo-linking';
import CardListTab from './CardListTab';
import Card from './Card';
import SetList from './SetList';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationEvents } from "react-navigation";



const App = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const config = {
    screens: {
      Battlegrounds: 'battlegrounds/:cardID?',
      Cards: 'cards/:cardSet?/:cardID?',
      Heroes: 'heroes/:cardID?',
      Sets: 'sets'
    }
  }
  const linking = {
    prefixes: ['https://hearthsfx.github.io/'],
    config: config
  }

  return (

    <NavigationContainer linking={linking}>
      <Tab.Navigator>
        <Tab.Screen name="Battlegrounds" component={CardListTab} initialParams = {{}} />
        <Tab.Screen name="Cards" component={CardListTab} initialParams = {{cardSet: 'all'}} />
        <Tab.Screen name="Heroes" component={CardListTab} initialParams = {{}} />
        <Tab.Screen name="Sets" component={SetList}/>
       </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
