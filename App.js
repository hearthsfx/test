import React from 'react';
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

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Battlegrounds" component={CardListTab} initialParams = {{cardSet: null, typeFilter: "BATTLEGROUNDS"}} />
        <Tab.Screen name="Cards" component={CardListTab} initialParams = {{cardSet: null, typeFilter: "MINION"}} />
        <Tab.Screen name="Heroes" component={CardListTab} initialParams = {{cardSet: null, typeFilter: "HERO"}} />
        <Tab.Screen name="Sets" component={SetList}/>
       </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
