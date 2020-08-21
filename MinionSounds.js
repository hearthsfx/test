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
    {['SCH_239','SCH_271t','SCH_357t','SCH_605','SCH_612t','SCH_616','SCH_711','SCH_714'].includes(props.card.id) ?
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
