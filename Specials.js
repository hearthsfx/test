import React from 'react';
import SoundButton from './SoundButton';
import SoundDivider from './SoundDivider';
import { View, Text } from 'react-native';

const Specials = (props) => {

  if (props.cardID == 'OG_280') {return (<Cthun cardID={props.cardID}/>)}
  else if (props.cardID == 'LOOT_108') {return (<Aluneth cardID={props.cardID}/>)}
  else if (props.cardID == 'LOOT_420') {return (<SkullOfTheManari cardID={props.cardID}/>)}
  else if (props.cardID == 'KAR_114') {return (<Barnes cardID={props.cardID}/>)}
  else if (props.cardID == 'DAL_058') {return (<Hecklebot cardID={props.cardID}/>)}
  else if (props.cardID == 'LOOT_013') {return (<VulgarHomunculus cardID={props.cardID}/>)}
  else if (props.cardID == 'AT_114') {return (<EvilHeckler cardID={props.cardID}/>)}
  else if (props.cardID == 'DAL_085') {return (<DalaranCrusader cardID={props.cardID}/>)}
  else {
    return (
      <></>
    )
  }
}

const Cthun = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Whisper\n(1)'} cardID={props.cardID} sound='SP1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(2)'} cardID={props.cardID} sound='SP2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(3)'} cardID={props.cardID} sound='SP3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(4)'} cardID={props.cardID} sound='SP4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(5)'} cardID={props.cardID} sound='SP5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Whisper\n(6)'} cardID={props.cardID} sound='SP6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(7)'} cardID={props.cardID} sound='SP7' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(8)'} cardID={props.cardID} sound='SP8' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(9)'} cardID={props.cardID} sound='SP9' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(10)'} cardID={props.cardID} sound='SP10' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Whisper\n(11)'} cardID={props.cardID} sound='SP11' />
          <View style={{padding: 4}} />
          <SoundButton title={'Whisper\n(12)'} cardID={props.cardID} sound='SP12' />
        </View>
      </View>
    </View>
  )
}

const Aluneth = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='SP1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='SP2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(3)'} cardID={props.cardID} sound='SP3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(1)'} cardID={props.cardID} sound='SP4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(2)'} cardID={props.cardID} sound='SP5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Trigger\n(3)'} cardID={props.cardID} sound='SP6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(4)'} cardID={props.cardID} sound='SP7' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(5)'} cardID={props.cardID} sound='SP8' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(6)'} cardID={props.cardID} sound='SP9' />
          <View style={{padding: 4}} />
          <SoundButton title={'Death\n(1)'} cardID={props.cardID} sound='SP10' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Death\n(2)'} cardID={props.cardID} sound='SP11' />
          <View style={{padding: 4}} />
          <SoundButton title={'Death\n(3)'} cardID={props.cardID} sound='SP12' />
        </View>
      </View>
    </View>
  )
}

const SkullOfTheManari = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='SP1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='SP2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(3)'} cardID={props.cardID} sound='SP3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(1)'} cardID={props.cardID} sound='SP4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Trigger\n(2)'} cardID={props.cardID} sound='SP5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Trigger\n(3)'} cardID={props.cardID} sound='SP6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Death\n(1)'} cardID={props.cardID} sound='SP7' />
          <View style={{padding: 4}} />
          <SoundButton title={'Death\n(2)'} cardID={props.cardID} sound='SP8' />
        </View>
      </View>
    </View>
  )
}

const Barnes = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='P1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='P2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(3)'} cardID={props.cardID} sound='P3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(4)'} cardID={props.cardID} sound='P4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(5)'} cardID={props.cardID} sound='P5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Play\n(6)'} cardID={props.cardID} sound='P6' />
        </View>
      </View>
    </View>
  )
}

const Hecklebot = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='P1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='P2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(3)'} cardID={props.cardID} sound='P3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(4)'} cardID={props.cardID} sound='P4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(5)'} cardID={props.cardID} sound='P5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'start-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(6)'} cardID={props.cardID} sound='P6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(7)'} cardID={props.cardID} sound='P7' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(8)'} cardID={props.cardID} sound='P8' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(9)'} cardID={props.cardID} sound='P9' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Attack\n(1)'} cardID={props.cardID} sound='A1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(2)'} cardID={props.cardID} sound='A2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(3)'} cardID={props.cardID} sound='A3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(4)'} cardID={props.cardID} sound='A4' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(5)'} cardID={props.cardID} sound='A5' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'start-around', marginBottom: 8}}>
          <SoundButton title={'Attack\n(6)'} cardID={props.cardID} sound='A6' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(7)'} cardID={props.cardID} sound='A7' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(8)'} cardID={props.cardID} sound='A8' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(9)'} cardID={props.cardID} sound='A9' />
        </View>
      </View>
    </View>
  )
}

const VulgarHomunculus = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='P1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='P2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(3)'} cardID={props.cardID} sound='P3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(4)'} cardID={props.cardID} sound='P4' />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8}}>
          <SoundButton title={'Attack\n(1)'} cardID={props.cardID} sound='A1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(2)'} cardID={props.cardID} sound='A2' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(3)'} cardID={props.cardID} sound='A3' />
          <View style={{padding: 4}} />
          <SoundButton title={'Attack\n(4)'} cardID={props.cardID} sound='A4' />
        </View>
      </View>
    </View>
  )
}

const EvilHeckler = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='P1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='P2' />
        </View>
      </View>
    </View>
  )
}

const DalaranCrusader = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{alignSelf: 'flex-start', paddingRight: 8, fontWeight: 'bold', width: 80}}>Special</Text>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8}}>
          <SoundButton title={'Play\n(1)'} cardID={props.cardID} sound='P1' />
          <View style={{padding: 4}} />
          <SoundButton title={'Play\n(2)'} cardID={props.cardID} sound='P2' />
        </View>
      </View>
    </View>
  )
}

export default Specials
