import React from 'react';
import SoundButton from './SoundButton';
import SoundDivider from './SoundDivider'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import heroes from './assets/heroes.json';
import tokens from './assets/tokens.json';

const TokensFlatList = (props) => {

  // Need a scroll to top when new card is clicked.

  const tokenIDs = tokens.map(a => a.parentID)
  const hasTokens = tokenIDs.includes(props.cardID)

  return (
    <>
    {hasTokens
      ?
      <>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start', width: 512}}>
          <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Related</Text>
            <FlatList
              horizontal='true'
              data={tokens.filter(x => x.parentID == props.cardID)}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {props.openNewCard(item.tokenID)}}>
                    <TokenImage cardID={item.tokenID}/>
                  </TouchableOpacity>
              ) }
            />
      </View>
      <SoundDivider/>
      </>
      : <></>
    }
    </>
  )
}

const TokenImage = (props) => {
  const heroIDs = heroes.map(a => a.id)
  const isHero = heroIDs.includes(props.cardID)
  const imgSrc = ((isHero || props.cardID == 'EX1_323h') ?
    'https://hearthstonesounds.s3.amazonaws.com/' :
    'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/')
    + props.cardID + '.png'

  return (
    <View style={{padding: 10}}>
    {isHero
      ? <Image source={{uri: imgSrc}} style={{width: 128, height: 176.64, resizeMode:'stretch'}}/>
      : <Image source={{uri: imgSrc}} style={{width: 128, height: 194, resizeMode:'stretch'}}/>
    }
    </View>
  )
}

export default TokensFlatList
