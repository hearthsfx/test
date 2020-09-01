import tokens from './assets/tokens.json';
import heroes from './assets/heroes.json';
import battlegrounds from './assets/battlegrounds.json';


const tokenIDs = tokens.map(a => a.tokenID)
const heroIDs = heroes.map(a => a.id)
const battlegroundsIDs = battlegrounds.map(a => a.cardID)

const battlegroundCard = (cardID) => {

  try {
    const card = battlegrounds.find(x => x.cardID == cardID)
    card.heroSpecific = (card.heroSpecific == 1) // Set this to true or false.
    return card
  } catch (err) {
    return ''
  }
}

const battlegroundTribe = (cardID) => {
  return battlegrounds.find(x => x.cardID == cardID).tribe
}

const battlegroundToken = (cardID) => {
  try {
    return battlegrounds.find(x => x.cardID == cardID).token == 1
  } catch (err) {
    return false
  }
}

const battlegroundTechLevel = (card) => {
  if (card.id == 'GVG_058')
    return 2
  else
    return card.techLevel
}

const battlegroundHeroSpecific = (cardID) => {
  try {
    return battlegrounds.find(x => x.cardID == cardID).heroSpecific == 1
  } catch (err) {
    return false
  }
}

const battlegroundFlavor = (cardID) => {
  try {
    return battlegrounds.find(x => x.cardID == cardID).flavor
  } catch (err) {
    return ''
  }
}

const battlegroundRetired = (cardID) => {
  try {
    return battlegrounds.find(x => x.cardID == cardID).retired
  } catch (err) {
    return false
  }
}


const sortCards = (cards, type) => {
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

  function tribeOrder(a) {
    switch(battlegroundTribe(a.id)) {
      case 'Beast': return 1
      case 'Demon': return 2
      case 'Dragon': return 3
      case 'Mech': return 4
      case 'Murloc': return 5
      case 'Pirate': return 6
      case 'Neutral': return 7
      default: return 99
    }
  }

  if(type == 'MINION' || type == 'HERO') {
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
  } else if (type == 'BATTLEGROUNDS')
    return cards.sort (
      function(a,b) {
          var tribeA = tribeOrder(a)
          var tribeB = tribeOrder(b)
          var techLevelA = battlegroundTechLevel(a)
          var techLevelB = battlegroundTechLevel(b)

          if(techLevelA == undefined) {return -1}
          if(techLevelA < techLevelB) {return -1}
          if(techLevelA > techLevelB) {return 1}
          if(techLevelA== techLevelB) {
            if(tribeA < tribeB )  { return -1}
            if(tribeA > tribeB )  { return 1}
            if(tribeA == tribeB ) {
              if(a.name < b.name )   {return -1}
              if(a.name > b.name )   {return 1}
              if(a.name == b.name )  {return 0}
            }
          }
        }
    )
}

export {sortCards, tokenIDs, heroIDs, battlegroundsIDs, battlegroundTribe, battlegroundToken, battlegroundHeroSpecific, battlegroundFlavor, battlegroundRetired, battlegroundTechLevel, battlegroundCard}
