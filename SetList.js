import React from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList} from 'react-native';
import FlatListItemSeparator from './FlatListItemSeparator';
import SmallSetImage from './SmallSetImage';
import cardsets from './assets/cardsets.json';
import { Toolbar } from 'react-native-material-ui';
import ToolbarTitle from './ToolbarTitle'
import * as Analytics from 'expo-firebase-analytics';

const SetList = ({ navigation }) => {
  Analytics.setCurrentScreen('SetListTab')

  const cardSets = cardsets.filter(x => x.craftable === 1)

  return (
    <>
    <Toolbar centerElement={<ToolbarTitle/>}/>
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={cardSets}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress= {e => {
              navigation.navigate('Cards', {
                cardSet: item.set,
                cardID: ''
              })
            }
          }>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'
          , justifyContent: 'space-between'
          , marginTop: 4, marginBottom: 4, marginRight: 8}}>
            <SmallSetImage cardSet={item.set}/>
            <Text style={{flexGrow: 1}}>{item.name}</Text>
          </View>
          </TouchableWithoutFeedback>
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
    </>
  );
}

export default SetList
