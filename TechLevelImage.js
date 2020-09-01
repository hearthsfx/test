import React from 'react';
import {View, Image} from 'react-native';

const TechLevelImage = (props) => {

  function techLevelImage() {
    switch (props.techlevel) {
      case 1:   return require('./assets/img/techlevel1.png')
      case 2:   return require('./assets/img/techlevel2.png')
      case 3:   return require('./assets/img/techlevel3.png')
      case 4:   return require('./assets/img/techlevel4.png')
      case 5:   return require('./assets/img/techlevel5.png')
      case 6:   return require('./assets/img/techlevel6.png')
      default:  return require('./assets/img/techlevel0.png')
    }
  }

  return (
      <Image style={{width: 34, height: 34}} source={techLevelImage()}/>

  )
}
export default TechLevelImage;
