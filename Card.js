import React from 'react';
import MinionSounds from './MinionSounds';
import HeroSounds from './HeroSounds';
import TokensFlatList from './TokensFlatList'
import SpecialsFlatList from './SpecialsFlatList';
import Specials from './Specials';
import SoundDivider from './SoundDivider'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import heroes from './assets/heroes.json';
import { Ionicons } from '@expo/vector-icons';

const Card = (props) => {

  const scrollViewRef = React.useRef()

  const heroIDs = heroes.map(a => a.id)
  const isHero = heroIDs.includes(props.card.id)
  const imgSrc = ((isHero || props.card.id == 'EX1_323h') ?
    'https://hearthstonesounds.s3.amazonaws.com/' :
    'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/')
     + props.card.id + '.png'

  function goToTop() {
      scrollViewRef.current.scrollTo({ animated: true, x: 0 })
  }

  function findFlavor() {
    return isHero
      ? heroes.find(x => x.id == props.card.id).flavorText
      : props.card.flavor
  }

  const openNewCard = (newID) => {
    goToTop()
    props.openNewCard(newID)
  }

  const closeCards = () => {
    props.closeCards()
  }

  const SoundLayout = (props) => {
    if (props.card.type == 'MINION') {return (<MinionSounds card={props.card}/>)}
    else if (props.card.type == 'HERO') {return(<HeroSounds cardID={props.card.id}/>)}
    else {return (<></>)}
  }

  return (
    <>
      {props.previousCardExists ?
        <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, zIndex : 1}} onPress={() => {
            goToTop()
            props.returnToPreviousCard()}}
            >
          <Ionicons name="md-arrow-round-back" size={36} color="#bdbdbd" />
        </TouchableOpacity>
        : <></>
      }
      <TouchableOpacity style={{position: 'absolute', top: 0, right: 0, zIndex : 1}} onPress={() => {
          props.closeCards()}}
          >
        <Ionicons name="md-close" size={36} color="#bdbdbd" />
      </TouchableOpacity>
      <View style={{ flex: 1, padding: 8, alignItems: 'center'}}>
      {isHero
        ? <Image source={{uri: imgSrc}} style={{width: 250, height: 345}}/>
        : <Image source={{uri: imgSrc}} style={{width: 256, height: 388}}/>
      }
      <ScrollView style={{width: 512}} ref={scrollViewRef}>
          <Text style={{width: 512, padding: 16}}>{findFlavor()}</Text>
          <SoundDivider/>
          <SoundLayout card={props.card}/>
          <TokensFlatList cardID={props.card.id} openNewCard={openNewCard} closeCard={closeCards}/>
          <SpecialsFlatList cardID={props.card.id} openNewCard={openNewCard} closeCard={closeCards}/>
          <Specials cardID={props.card.id}/>
      </ScrollView>
      </View>
    </>
  )
}



export default Card
