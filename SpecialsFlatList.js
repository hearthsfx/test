import React from 'react';
import SoundButton from './SoundButton';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import heroes from './assets/heroes.json';
import specials from './assets/specials.json';

const SpecialsFlatList = (props) => {

  // Need a scroll to top when new card is clicked.

  const specialIDs = specials.map(a => a.parentID)
  const hasSpecials = specialIDs.includes(props.cardID)

  return (
    <>
    {hasSpecials
      ?
      <View style={{flexDirection: 'row', alignSelf: 'flex-start', width: 512}}>
        <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
          <FlatList
            horizontal='true'
            data={specials.filter(x => x.parentID == props.cardID)}
            renderItem={({ item, index }) => (
                <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                  <TouchableOpacity onPress={() => {props.openNewCard(item.specialID)}} style={{marginBottom: -24}}>
                    <SpecialImage cardID={item.specialID}/>
                  </TouchableOpacity>
                  <SoundButton title={item.action} cardID={item.parentID} sound={'SP'+(index+1)} />
                </View>
            ) }
          />
      </View>
      : <></>
    }
    </>
  )
}

const SpecialImage = (props) => {
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

export default SpecialsFlatList
