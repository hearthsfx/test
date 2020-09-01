import React from 'react';
import {View, Image} from 'react-native';

const TribeImage = (props) => {

  function tribeImage() {
    switch (props.tribe) {
      case "Beast":   return require('./assets/img/bg_beasts.png')
      case "Demon":   return require('./assets/img/bg_demons.png')
      case "Mech":   return require('./assets/img/bg_mechs.png')
      case "Pirate":   return require('./assets/img/bg_pirates.png')
      case "Murloc":   return require('./assets/img/bg_murlocs.png')
      case "Dragon":   return require('./assets/img/bg_dragons.png')
      default:  return require('./assets/img/bg_neutrals.png')
    }
  }

  return (
        <Image target='' style={{width: 34, height: 34}} source={tribeImage()}/>

  )
}
export default TribeImage;
