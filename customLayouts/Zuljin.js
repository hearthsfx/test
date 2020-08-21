import React from 'react';
import SoundButton from '../SoundButton';
import SoundDivider from '../SoundDivider';
import { View, Text } from 'react-native';

const Zuljin = (props) => {
  return (
    <View style={{alignSelf: 'flex-start', width: 512}}>
      <GameplaySounds cardID={props.cardID} />
      <SoundDivider />
      <EmoteSounds cardID={props.cardID} />
      <SoundDivider />
    </View>
  )
}

const GameplaySounds = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Gameplay</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title='Summon' cardID={props.cardID} sound='S1' />
          <View style={{padding: 4}} />
          <SoundButton title='Attack' cardID={props.cardID} sound='A1' />
          <View style={{padding: 4}} />
          <SoundButton title='Concede' cardID={props.cardID} sound='C' />
          <View style={{padding: 4}} />
          <SoundButton title='Death' cardID={props.cardID} sound='D' />
          <View style={{padding: 4}} />
          <SoundButton title='Out of Time' cardID={props.cardID} sound='T' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Thinking (1)'} cardID={props.cardID} sound='T1' />
          <View style={{padding: 4}} />
          <SoundButton title='Thinking (2)' cardID={props.cardID} sound='T2' />
          <View style={{padding: 4}} />
          <SoundButton title='Thinking (3)' cardID={props.cardID} sound='T3' />
          <View style={{padding: 4}} />
          <SoundButton title='Low on Cards' cardID={props.cardID} sound='LC' />
          <View style={{padding: 4}} />
          <SoundButton title='Out of Cards' cardID={props.cardID} sound='NC' />
        </View>
      </View>
    </View>
  )
}

const EmoteSounds = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Emotes</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title='Thanks' cardID={props.cardID} sound='EM_TH1' />
          <View style={{padding: 4}} />
          <SoundButton title='Greetings' cardID={props.cardID} sound='EM_G1' />
          <View style={{padding: 4}} />
          <SoundButton title='Greetings (Mirror)' cardID={props.cardID} sound='EM_G2' />
          <View style={{padding: 4}} />
          <SoundButton title='Wow' cardID={props.cardID} sound='EM_W' />
          <View style={{padding: 4}} />
          <SoundButton title='Threaten' cardID={props.cardID} sound='EM_T' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Well\nPlayed'} cardID={props.cardID} sound='EM_WP' />
          <View style={{padding: 4}} />
          <SoundButton title={'Oops'} cardID={props.cardID} style={{minHeight: 52}} sound='EM_O' />
        </View>
      </View>
    </View>
  )
}

export default Zuljin
