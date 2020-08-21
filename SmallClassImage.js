import React, { useState, useEffect } from 'react';
import {View, Animated, Image} from 'react-native';

const SmallClassImage = (props) => {


  const cardClass = props.cardClass
  const multiClassGroup = props.multiClassGroup
  var img = 'class_small_neutral'

  function cardImage() {
    switch (cardClass) {
      case 'DEMONHUNTER': return require('./assets/img/class_small_demonhunter.png')
      case 'DRUID':       return require('./assets/img/class_small_druid.png')
      case 'HUNTER':      return require('./assets/img/class_small_hunter.png')
      case 'MAGE':        return require('./assets/img/class_small_mage.png')
      case 'PALADIN':     return require('./assets/img/class_small_paladin.png')
      case 'PRIEST':      return require('./assets/img/class_small_priest.png')
      case 'ROGUE':       return require('./assets/img/class_small_rogue.png')
      case 'SHAMAN':      return require('./assets/img/class_small_shaman.png')
      case 'WARLOCK':     return require('./assets/img/class_small_warlock.png')
      case 'WARRIOR':     return require('./assets/img/class_small_warrior.png')
      default:            return require('./assets/img/class_small_neutral.png')
    }
  }

  return (
    <>
    {
      multiClassGroup != null ? <AnimatedImage multiClassGroup={multiClassGroup}/> : <Image style={{width: 34, height: 34}} source={cardImage()}/>
    }
    </>

  )
}

const AnimatedImage = (props) => {
  const fadeInOpacity = new Animated.Value(.75);
  const firstDualImage = getFirstDualImage()
  const secondDualImage = getSecondDualImage()

  function getFirstDualImage() {
    switch (props.multiClassGroup) {
      case 'HUNTER_DEMONHUNTER': return require('./assets/img/class_small_demonhunter.png')
      case 'DRUID_HUNTER':       return require('./assets/img/class_small_hunter.png')
      case 'DRUID_SHAMAN':      return require('./assets/img/class_small_druid.png')
      case 'MAGE_SHAMAN':        return require('./assets/img/class_small_shaman.png')
      case 'MAGE_ROGUE':     return require('./assets/img/class_small_mage.png')
      case 'ROGUE_WARRIOR':      return require('./assets/img/class_small_rogue.png')
      case 'PALADIN_WARRIOR':       return require('./assets/img/class_small_warrior.png')
      case 'PALADIN_PRIEST':      return require('./assets/img/class_small_paladin.png')
      case 'PRIEST_WARLOCK':     return require('./assets/img/class_small_priest.png')
      case 'WARLOCK_DEMONHUNTER':     return require('./assets/img/class_small_warlock.png')
      default:            return require('./assets/img/class_small_neutral.png')
    }
  }

  function getSecondDualImage() {
    switch (props.multiClassGroup) {
      case 'HUNTER_DEMONHUNTER': return require('./assets/img/class_small_hunter.png')
      case 'DRUID_HUNTER':       return require('./assets/img/class_small_druid.png')
      case 'DRUID_SHAMAN':      return require('./assets/img/class_small_shaman.png')
      case 'MAGE_SHAMAN':        return require('./assets/img/class_small_mage.png')
      case 'MAGE_ROGUE':     return require('./assets/img/class_small_rogue.png')
      case 'ROGUE_WARRIOR':      return require('./assets/img/class_small_warrior.png')
      case 'PALADIN_WARRIOR':       return require('./assets/img/class_small_paladin.png')
      case 'PALADIN_PRIEST':      return require('./assets/img/class_small_priest.png')
      case 'PRIEST_WARLOCK':     return require('./assets/img/class_small_warlock.png')
      case 'WARLOCK_DEMONHUNTER':     return require('./assets/img/class_small_demonhunter.png')
      default:            return require('./assets/img/class_small_neutral.png')
    }
  }

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeInOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      })
    ]).start(event => {
        if (event.finished) {
          Animated.timing(fadeInOpacity, {
            toValue: .75,
            duration: 2000,
            useNativeDriver: true
          }).start(event => {
            setLoaded(loaded == firstDualImage ? secondDualImage : firstDualImage)
          })
        }})


  })

  const [loaded, setLoaded] = useState(firstDualImage)

  return (
    <View>
      <Animated.Image style={{width: 34, height: 34, opacity: fadeInOpacity}} source={loaded}/>
    </View>
  )
}

export default SmallClassImage;
