import React from 'react';
import SoundButton from './SoundButton';
import SoundDivider from './SoundDivider'
import { Text, View } from 'react-native';
import nonLegendaryStingers from './assets/nonLegendaryStingers.json'
import triggers from './assets/triggers.json'

const MinionSounds = (props) => {

  const hasStinger = nonLegendaryStingers.map(a => a.cardID).includes(props.card.id) || props.card.rarity == 'LEGENDARY'
  const hasTrigger = triggers.map(a => a.cardID).includes(props.card.id)

  return (
    <>
    <View style={{justifyContent: 'space-around'}}>
    {(hasStinger || hasTrigger) ?
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center'}}>
        {hasStinger ?
          <>
            <SoundButton title='Intro' cardID={props.card.id} sound='S'/>
          </>
          : <></>
        }
        {(hasStinger && hasTrigger) ? <View style={{padding: 4}} /> : <></>}
        {hasTrigger ?
          <SoundButton title='Trigger' cardID={props.card.id} sound='TR' />
          : <></>
        }
      </View>
      : <></>
    }
    {['DAL_357t','LOOT_131t1','BGS_046t'].includes(props.card.id)
      ? (['UNG_065t','DAL_357t','BGS_046t'].includes(props.card.id)) ?
          <View style = {{paddingBottom: 8, alignItems: 'center'}}>
            <Text>{"This card has no sounds!"}</Text>
          </View>
        :
          <View style = {{paddingBottom: 8, alignItems: 'center'}}>
            <Text>{"I haven't found these card sounds yet, please check back later!"}</Text>
          </View>

      :

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center'}}>
        {['DAL_085','KAR_114','DAL_058','LOOT_013','AT_114'].includes(props.card.id) ? <></> :
          <>
            <><SoundButton title='Play' cardID={props.card.id} sound='P' /></>
            <><View style={{padding: 4}} /></>
          </>
        }
        {(props.card.id == 'DAL_058' || props.card.id == 'LOOT_013') ? <></> :
          <>
            <SoundButton title='Attack' cardID={props.card.id} sound='A' />
            <View style={{padding: 4}} />
          </>
        }
        <SoundButton title='Death' cardID={props.card.id} sound='D' />
      </View>
    }
    </View>
    <SoundDivider/>
    </>

  )
}

export default MinionSounds
