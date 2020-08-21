import React from 'react';
import {Image} from 'react-native';

const SmallSetImage = (props) => {
  const cardSet = props.cardSet

  function cardImage() {
    switch (cardSet) {
      case 'CORE':
        return require('./assets/img/Set1_Icon.png')
        break;
      case 'EXPERT1':
        return require('./assets/img/Set1_Icon.png')
        break;
      case 'HOF':
          return require('./assets/img/HallOfFameIcon.png')
          break;
      case 'NAXX':
        return require('./assets/img/NaxxIcon.png')
        break;
      case 'GVG':
        return require('./assets/img/GvGIcon.png')
        break;
      case 'BRM':
        return require('./assets/img/BRMIcon.png')
        break;
      case 'TGT':
        return require('./assets/img/TGTIcon.png')
        break;
      case 'LOE':
        return require('./assets/img/LOEIcon.png')
        break;
      case 'OG':
        return require('./assets/img/OGIcon.png')
        break;
      case 'KARA':
        return require('./assets/img/KaraIcon.png')
        break;
      case 'GANGS':
        return require('./assets/img/GangsIcon.png')
        break
      case 'UNGORO':
        return require('./assets/img/UNGIcon.png')
        break;
      case 'ICECROWN':
        return require('./assets/img/ICCIcon.png')
        break;
      case 'LOOTAPALOOZA':
        return require('./assets/img/LOOTIcon.png')
        break;
      case 'GILNEAS':
        return require('./assets/img/GILIcon.png')
        break;
      case 'BOOMSDAY':
        return require('./assets/img/BOTIcon.png')
        break;
      case 'TROLL':
        return require('./assets/img/TRLIcon.png')
        break;
      case 'DALARAN':
        return require('./assets/img/DALIcon.png')
        break;
      case 'ULDUM':
        return require('./assets/img/UldumIcon.png')
        break
      case 'DRAGONS':
        return require('./assets/img/DRGIcon.png')
        break;
      case 'YEAR_OF_THE_DRAGON':
        return require('./assets/img/DRGIcon_MiniSet.png')
        break;
      case 'DEMON_HUNTER_INITIATE':
        return require('./assets/img/DHIIcon.png')
        break;
      case 'BLACK_TEMPLE':
        return require('./assets/img/BTIcon.png')
        break
      case 'SCHOLOMANCE':
        return require('./assets/img/SCHIcon.png')
        break;
      default:
        return require('./assets/img/Set1_Icon.png')
    }
  }

  return (
    <Image style={{width: 34, height: 34}} source={cardImage()}/>
  )
}

export default SmallSetImage;
