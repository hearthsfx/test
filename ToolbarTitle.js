import React from 'react';
import { useFonts, Roboto_900Black, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import {Text} from 'react-native';

const ToolbarTitle = () => {

  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });

  if(!fontsLoaded) {
    return (<></>)
  }
  else {
    return (<Text style={{fontFamily: Roboto_700Bold, fontSize: 20, color: 'white', fontWeight: '500'}}>HearthSFX</Text>)
  }
}

export default ToolbarTitle
