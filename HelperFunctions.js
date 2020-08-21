import tokens from './assets/tokens.json';
import heroes from './assets/heroes.json';

const tokenIDs = tokens.map(a => a.tokenID)
const heroIDs = heroes.map(a => a.id)

const sortCards = (cards) => {
  function classOrder(a) {

    // Dual Class Cards
    switch(a.multiClassGroup) {
      case 'HUNTER_DEMONHUNTER': return 1.5
      case 'DRUID_SHAMAN': return 2.5
      case 'DRUID_HUNTER': return 3.5
      case 'MAGE_ROGUE': return 4.5
      case 'PALADIN_PRIEST': return 5.5
      case 'PRIEST_WARLOCK': return 6.5
      case 'ROGUE_WARRIOR': return 7.5
      case 'MAGE_SHAMAN': return 8.5
      case 'WARLOCK_DEMONHUNTER': return 9.5
      case 'PALADIN_WARRIOR': return 10.5
    }

    switch(a.cardClass) {
      case 'DEMONHUNTER': return 1
      case 'DRUID': return 2
      case 'HUNTER': return 3
      case 'MAGE': return 4
      case 'PALADIN': return 5
      case 'PRIEST': return 6
      case 'ROGUE': return 7
      case 'SHAMAN': return 8
      case 'WARLOCK': return 9
      case 'WARRIOR': return 10
      default: return 99
    }
  }

  return cards.sort(
    function(a,b) {
      var classA = classOrder(a)
      var classB = classOrder(b)

      if(classA < classB )  { return -1}
      if(classA > classB )  { return 1}
      if(classA == classB ) {
        if(a.name < b.name )    {return -1}
        if(a.name  > b.name )   {return 1}
        if(a.name  == b.name )  {return 0}
      }
    }
  )
}

export {sortCards, tokenIDs, heroIDs}
