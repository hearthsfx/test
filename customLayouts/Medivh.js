import React from 'react';
import SoundButton from '../SoundButton';
import SoundDivider from '../SoundDivider';
import { View, Text } from 'react-native';

const Medivh = (props) => {
  return (
    <View style={{alignSelf: 'flex-start', width: 512}}>
      <GameplaySounds cardID={props.cardID} />
      <SoundDivider />
      <EmoteSounds cardID={props.cardID} />
      <SoundDivider />
      <ErrorSounds cardID={props.cardID} />
      <SoundDivider />
      <HolidaySounds cardID={props.cardID} />
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
          <SoundButton title='Opening' cardID={props.cardID} sound='S1' />
          <View style={{padding: 4}} />
          <SoundButton title='Opening (Mirror)' cardID={props.cardID} sound='S2' />
          <View style={{padding: 4}} />
          <SoundButton title='Attack' cardID={props.cardID} sound='A1' />
          <View style={{padding: 4}} />
          <SoundButton title='Concede' cardID={props.cardID} sound='C' />
          <View style={{padding: 4}} />
          <SoundButton title='Death' cardID={props.cardID} sound='D' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title='Out of Time' cardID={props.cardID} sound='T' />
          <View style={{padding: 4}} />
          <SoundButton title={'Thinking (1)'} cardID={props.cardID} sound='T1' />
          <View style={{padding: 4}} />
          <SoundButton title='Thinking (2)' cardID={props.cardID} sound='T2' />
          <View style={{padding: 4}} />
          <SoundButton title='Thinking (3)' cardID={props.cardID} sound='T3' />
          <View style={{padding: 4}} />
          <SoundButton title='Low on Cards' cardID={props.cardID} sound='LC' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title='Out of Cards' cardID={props.cardID} sound='NC' />
          <View style={{padding: 4}} />
          <SoundButton title='Chosen in Arena' cardID={props.cardID} sound='PA' />
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
          <SoundButton title={'Oops'} cardID={props.cardID} sound='EM_O' />
          <View style={{padding: 4}} />
          <SoundButton title='Sorry' cardID={props.cardID} sound='EM_S1' />
        </View>
      </View>
    </View>
  )
}

const ErrorSounds = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Errors</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title='Need Weapon' cardID={props.cardID} sound='E1' />
          <View style={{padding: 4}} />
          <SoundButton title='Mana' cardID={props.cardID} sound='E2' />
          <View style={{padding: 4}} />
          <SoundButton title='Minion Attacked' cardID={props.cardID} sound='E3' />
          <View style={{padding: 4}} />
          <SoundButton title='Hero Attacked' cardID={props.cardID} sound='E4' />
          <View style={{padding: 4}} />
          <SoundButton title='Summon Sickness' cardID={props.cardID} sound='E5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title='Full Hand' cardID={props.cardID} sound='E6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Too Many Manions'} cardID={props.cardID} sound='E7' />
          <View style={{padding: 4}} />
          <SoundButton title='Stealth Minion' cardID={props.cardID} sound='E8' />
          <View style={{padding: 4}} />
          <SoundButton title={'Can\'t Play'} cardID={props.cardID} sound='E9' />
          <View style={{padding: 4}} />
          <SoundButton title='Invalid Target' cardID={props.cardID} sound='E10' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title='Taunt Minon' cardID={props.cardID} sound='E11' />
          <View style={{padding: 4}} />
          <SoundButton title={'Generic'} cardID={props.cardID} sound='E12' />
        </View>
      </View>
    </View>
  )
}

const HolidaySounds = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Holidays</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'New\nYear'} cardID={props.cardID} sound='H_NY' />
          <View style={{padding: 4}} />
          <SoundButton title={'Lunar\nNew Year'} cardID={props.cardID} sound='H_LNY' />
          <View style={{padding: 4}} />
          <SoundButton title={'Noble\nGarden'} cardID={props.cardID} sound='H_NG' />
          <View style={{padding: 4}} />
          <SoundButton title={'Hallow\'s End'} cardID={props.cardID} sound='H_HE' />
          <View style={{padding: 4}} />
          <SoundButton title={'Winter\nVeil'} cardID={props.cardID} sound='H_WV' />
        </View>
      </View>
    </View>
  )
}

export default Medivh
