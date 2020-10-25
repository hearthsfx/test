import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableWithoutFeedback, FlatList, StatusBar, Switch, Linking } from 'react-native';
import data from './assets/cards.json';
import SmallClassImage from './SmallClassImage';
import TechLevelImage from './TechLevelImage'
import TribeImage from './TribeImage'
import SoundButton from './SoundButton';
import SoundDivider from './SoundDivider';
import Card from './Card';
import FlatListItemSeparator from './FlatListItemSeparator';
import InfoModal from './InfoModal'
import { NavigationContainer, useScrollToTop, useIsFocused } from '@react-navigation/native';
import { Toolbar } from 'react-native-material-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ToolbarTitle from './ToolbarTitle'
import * as Analytics from 'expo-firebase-analytics';
import {generalCards, heroCards, bgCards, tokenIDs, heroIDs, battlegroundsIDs, battlegroundTribe, battlegroundToken, battlegroundHeroSpecific, battlegroundFlavor, battlegroundRetired, battlegroundTechLevel} from './HelperFunctions'

const CardListTab = ( { route, navigation, state }) => {

  // State variables
  const [includeNonCollectible, setIncludeNonCollectible] = useState(false)
  const [includeRarities, setIncludeRarities] = useState([[[undefined,'FREE','COMMON'], true], ['RARE', true], ['EPIC', true], ['LEGENDARY', true]]) // Array represents Free/Common, Rare, Epic, Legendary
  const [includeTypes, setIncludeTypes] = useState([['MINION',true], ['HERO',true], ['SPELL',false], ['WEAPON',false]]) // Array represents Minions, Heroes, Spells, Weapons
  const [includeBGTokens, setIncludeBGTokens] = useState(false)
  const [includeBGHeroSpecific, setIncludeBGHeroSpecific] = useState(false)
  const [includeBGRetired, setIncludeBGRetired] = useState(false)
  const [includeBGTiers, setIncludeBGTiers] = useState([[1, true], [2, true], [3, true], [4, true], [5, true], [6, true]]) // Array represents Tier 1, 2, ...
  const [includeBGTribes, setIncludeBGTribes] = useState([['Beast',true],['Demon',true],['Dragon',true],['Mech',true],['Murloc',true],['Pirate',true],['Neutral',true]])
  const [cardDisplayed, setCardDisplayed] = useState('none')
  const [card, setCard] = useState([])
  const [myCardData, setMyCardData] = useState([])
  const [cards, setCards] = useState([])
  const [loadLimit, setLoadLimit] = useState(100)
  const [showFooter, setShowFooter] = useState(true)
  const [filterMenuVisibility, setFilterMenuVisibility] = useState('hidden')
  const [infoModalVisibility, setInfoModalVisibility] = useState('hidden')

  // Used to move to top of card list on nav to tab.
  const flatListRef = React.useRef()
  useScrollToTop(flatListRef)

  var {cardSet} = route.params
  const typeFilter = route.name
  var {cardID} = route.params

  useEffect(() => {
    if(cardID != '' && cardID != undefined)
      setCardDisplayed('')
    else
      setCardDisplayed('none')
  })

  function filterCards(searchCriteria, applyLoadLimit, increaseLoadLimit,
    newTypeFilter, newNonCollectibleFilter,newRarityFilter,
    newBGTokensFilter, newBGTierFilter, newBGTribeFilter, newHeroSpecificFilter, newRetiredFilter) {
    var filteredData
    if (typeFilter == 'Cards') {

      var rarityMap = (newRarityFilter == null ? includeRarities : newRarityFilter).map(x => x[1] ? x[0] : '')
      rarityMap = (rarityMap[0].concat(rarityMap.slice(1))) // Concat the first element (undefined, 'FREE', 'COMMON') with the rest for easier mapping.
      const typeMap = (newTypeFilter == null ? includeTypes : newTypeFilter).map(x => x[1] ? x[0] : '')

      filteredData = generalCards.filter(x =>
        typeMap.includes(x.type)
        && rarityMap.includes(x.rarity)
        && (x.collectible == true || tokenIDs.includes(((newNonCollectibleFilter == null) ? includeNonCollectible : newNonCollectibleFilter) ? x.id : 'N/A'))
        && (x.set == cardSet || cardSet == 'all')
        && ((searchCriteria != "" && searchCriteria != null) ? (x.name.toUpperCase()).includes(searchCriteria.toUpperCase()) : 1 == 1)
      )

      if(applyLoadLimit && !increaseLoadLimit) {
        filteredData = filteredData.slice(0, loadLimit)
        setMyCardData(filteredData)
      } else if (increaseLoadLimit) {
        filteredData = filteredData.slice(loadLimit,loadLimit+100)
        setMyCardData(myCardData.concat(filteredData))
      } else {
        setMyCardData(filteredData)
      }
    }

    else if (typeFilter == 'Battlegrounds') {
      const tierMap = (newBGTierFilter == null ? includeBGTiers : newBGTierFilter).map(x => x[1] ? x[0] : 0)
      const tokenFilter = (newBGTokensFilter == null ? includeBGTokens : newBGTokensFilter)
      const heroSpecificFilter = (newHeroSpecificFilter == null ? includeBGHeroSpecific : newHeroSpecificFilter)
      const retiredFilter = (newRetiredFilter == null ? includeBGRetired : newRetiredFilter)
      const tribeMap = (newBGTribeFilter == null ? includeBGTribes : newBGTribeFilter).map(x => x[1] ? x[0] : 0)

      setMyCardData(bgCards.filter(x =>
          (!battlegroundToken(x.id) || battlegroundToken(x.id) == tokenFilter) &&
          (battlegroundTechLevel(x) == undefined || tierMap.includes(battlegroundTechLevel(x))) &&
          (!battlegroundHeroSpecific(x.id) || battlegroundHeroSpecific(x.id) == heroSpecificFilter) &&
          (!battlegroundRetired(x.id) || battlegroundRetired(x.id) == retiredFilter) &&
          tribeMap.includes(battlegroundTribe(x.id)) &&
          ((searchCriteria != "" && searchCriteria != null) ? (x.name.toUpperCase()).includes(searchCriteria.toUpperCase()) : 1 == 1)
        )
      )
    }

    else if (typeFilter == 'Heroes') {
      setMyCardData(heroCards.filter(x =>
        ((searchCriteria != "" && searchCriteria != null) ? (x.name.toUpperCase()).includes(searchCriteria.toUpperCase()) : 1 == 1)
      ))
    }
  }

  function search(criteria) {
    if(criteria != "" && criteria != null) {
      filterCards(criteria, false, false)
      setShowFooter(false)
    }
    else {
      filterCards(null, true, false)
      setShowFooter(true)
    }
  }

  navigation.addListener('tabPress', e => {
    console.log('tabPress activated')

    if (typeFilter == 'Cards') {
      cardID = null
      navigation.navigate(
        'Cards',
        {cardSet: 'all'}
      )
    } else if (typeFilter == 'Heroes') {
      filterCards()
      navigation.navigate(
        'Heroes'
      )
      focus()
    } else if (typeFilter == 'Battlegrounds') {
      filterCards()
      navigation.navigate(
        'Battlegrounds'
      )
    }
    focus()
  })

  navigation.addListener('focus', e => {
    focus()
  })

  function focus() {
    goToTop()
    Analytics.setCurrentScreen('CardListTab ' + typeFilter)

    if (typeFilter == 'Cards' && cardSet != 'all') {
      filterCards(null, false, false)

    }
    else if (typeFilter == 'Cards' && cardSet == 'all') {
      filterCards(null, true, false)
    }
    else if (typeFilter == 'Heroes' || typeFilter == 'Battlegrounds') {
      filterCards()
    }

    if (cardID != '') {
      const cardToShow = data.find(x => x.id == cardID)

      if (cardToShow != undefined) {
        showCard(cardToShow)
      }

    }
    else {
      navigation.setParams({
        cardID: ''
      })
    }
  }

  function goToTop() {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  function showCard(card) {

    setCard(card)
    setCards([card])
    setFilterMenuVisibility('hidden')
    setInfoModalVisibility('hidden')
    navigation.setParams({
      cardID: card.id
    })
  }

  const returnToPreviousCard = () => {
    setCard(cards[cards.length-2])
    navigation.setParams({
      cardID: cards[cards.length-2].id
    })
    cards.pop()
  }

  const CardListFooter = () => {

    if (typeFilter != 'Cards') {
      return (<></>)
    } else {
      var rarityMap = includeRarities.map(x => x[1] ? x[0] : '')
      rarityMap = (rarityMap[0].concat(rarityMap.slice(1))) // Concat the first element (undefined, 'FREE', 'COMMON') with the rest for easier mapping.
      const typeMap = includeTypes.map(x => x[1] ? x[0] : '')

      return (
        <>
        { (myCardData.length < myData.filter(x =>
          typeMap.includes(x.type)
          && rarityMap.includes(x.rarity)
          && (x.set === cardSet || cardSet === null)
          && (x.collectible == true || tokenIDs.includes(includeNonCollectible ? x.id : 'N/A'))).length && showFooter) ?
          <TouchableOpacity style={styles.button} onPress= {() => {
            filterCards(null, false, true)
            setLoadLimit(loadLimit+100)
          }}>
            <Text style={styles.text}>Load More</Text>
          </TouchableOpacity>
          : <></>
        }
        </>
      )
    }
  }

  const FilterMenu = () => {
    if (typeFilter == 'Cards') {
      return (<MinionFilters/>)
    } else if (typeFilter == 'Battlegrounds') {
      return (<BattlegroundFilters/>)
    } else
      return (<></>)
  }

  const MinionFilters = () => {
    return (
      <View style={styles.filterMenu}>
        <View style={{paddingBottom: 16, paddingHorizontal: 16}}>
          <TypeFilter name='Minion'  index={0} />
          <TypeFilter name='Heroes'  index={1} />
          <TypeFilter name='Spells'  index={2} />
          <TypeFilter name='Weapons' index={3} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16}}>
            <Text style={{paddingRight: 16}}>Non-Collectible</Text>
            <Switch onValueChange={(newNonCollectibleFilter) => {
              setIncludeNonCollectible(newNonCollectibleFilter)
              filterCards(null, true, false, null, newNonCollectibleFilter)
            }} value={includeNonCollectible} />
          </View>
          <SoundDivider />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8}}>
            <RarityFilter name='common'     index={0} />
            <RarityFilter name='rare'       index={1} />
            <RarityFilter name='epic'       index={2} />
            <RarityFilter name='legendary'  index={3} />
          </View>
        </View>
      </View>
    )
  }

  const TypeFilter = (props) => {
    var index = props.index
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
        <Text style={{paddingRight: 16}}>{props.name}</Text>
        <Switch onValueChange={ () => {
            var newTypeFilter = includeTypes.slice(0,index).concat([[includeTypes[index][0],!includeTypes[index][1]]], includeTypes.slice(index+1))
            setIncludeTypes(newTypeFilter)
            filterCards(null, true, false, newTypeFilter)
          }} value={includeTypes[index][1]} />
      </View>
    )
  }

  const RarityFilter = (props) => {
    var index = props.index
    return (
      <TouchableOpacity onPress={ () => {
        var newRarityFilter = includeRarities.slice(0,index).concat([[includeRarities[index][0],!includeRarities[index][1]]], includeRarities.slice(index+1))
        setIncludeRarities(newRarityFilter)
        filterCards(null, true, false, null, null, newRarityFilter)
      }}>
        <Image style={{width: 34, height: 44}} source={require('./assets/img/'+props.name+'_gem_small.png')}/>
        <Image style={{width: 34, height: 44, marginTop: -44, visibility: ((includeRarities[index][1] || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
      </TouchableOpacity>
    )
  }

  const BattlegroundFilters = () => {
    return (
      <View style={styles.filterMenu} >
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{paddingRight: 16}}>Tokens</Text>
            <Switch onValueChange={(newBGTokensFilter) => {
              setIncludeBGTokens(newBGTokensFilter)
              filterCards(null, true, false, null, null, null, newBGTokensFilter)
            }} value={includeBGTokens} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <Text style={{paddingRight: 16}}>Hero-Specific</Text>
            <Switch onValueChange={(newBGHeroSpecificFilter) => {
              setIncludeBGHeroSpecific(newBGHeroSpecificFilter)
              filterCards(null, true, false, null, null, null, null, null, null, newBGHeroSpecificFilter)
            }} value={includeBGHeroSpecific} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16}}>
            <Text style={{paddingRight: 16}}>Retired</Text>
            <Switch onValueChange={(newRetiredFilter) => {
              setIncludeBGRetired(newRetiredFilter)
              filterCards(null, true, false, null, null, null, null, null, null, null, newRetiredFilter)
            }} value={includeBGRetired} />
          </View>
          <SoundDivider />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8}}>
            <TierFilter tier={1}/>
            <TierFilter tier={2}/>
            <TierFilter tier={3}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 16}}>
            <TierFilter tier={4}/>
            <TierFilter tier={5}/>
            <TierFilter tier={6}/>
          </View>
          <SoundDivider />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8}}>
            <TribeFilter index={0} name={'beasts'}/>
            <TribeFilter index={1} name={'demons'}/>
            <TribeFilter index={2} name={'dragons'}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8}}>
            <TribeFilter index={3} name={'mechs'}/>
            <TribeFilter index={4} name={'murlocs'}/>
            <TribeFilter index={5} name={'pirates'}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 8}}>
            <TribeFilter index={6} name={'neutrals'}/>
          </View>
        </View>
      </View>
    )
  }

  const TierFilter = (props) => {
    var tier = props.tier
    return (
      <View style={{paddingHorizontal: 4}}>
        <TouchableOpacity onPress={() => {
          var newBGTierFilter = includeBGTiers.slice(0,tier-1).concat([[tier,!includeBGTiers[tier-1][1]]], includeBGTiers.slice(tier))
          filterCards(null, true, false, null, null, null, null, newBGTierFilter, null)
          setIncludeBGTiers(newBGTierFilter)
        }}>
          <Image style={{width: 42, height: 44}} source={require('./assets/img/techlevel'+tier+'.png')}/>
          <Image style={{width: 34, height: 44, marginTop: -44, marginLeft: 4, visibility: ((includeBGTiers[tier-1][1] || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
        </TouchableOpacity>
      </View>
    )
  }

  const TribeFilter = (props) => {
    var index = props.index
    return (
      <TouchableOpacity onPress={() => {
        var newBGTribeFilter = includeBGTribes.slice(0,index).concat([[includeBGTribes[index][0],!includeBGTribes[index][1]]], includeBGTribes.slice(index+1))
        filterCards(null, true, false, null, null, null, null, null, newBGTribeFilter)
        setIncludeBGTribes(newBGTribeFilter)
      }}>
        <Image style={{width: 34, height: 34}} source={require('./assets/img/bg_'+props.name+'.png')}/>
        <Image style={{width: 26.15, height: 34, marginTop: -32, marginLeft: 4, visibility: ((includeBGTribes[index][1] || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
      </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: "center", padding: 10, justifyContent: 'center', backgroundColor: "#2196F3",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    text: {
      alignItems: "center", justifyContent: 'center', color: "white", fontSize: 14,
    },
    filterMenu:
      {position: 'absolute', right:48, top:56, zIndex: 1, backgroundColor: 'white', visibility:filterMenuVisibility,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  })

  return (

      <>
      <Toolbar
          centerElement={<ToolbarTitle/>}
          isSearchActive={false}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (criteria) => { search(criteria) },
            onSearchClosed: () => {
              filterCards(null, true)
              setShowFooter(true)},
            onSearchPressed: () => {
              setFilterMenuVisibility('hidden')
              setInfoModalVisibility('hidden')
            }
          }}
          rightElement= {
            <>
              <TouchableOpacity style={{paddingTop: 8, paddingRight: 8}} onPress={() => {
                infoModalVisibility == 'hidden' ? setInfoModalVisibility('visible') : setInfoModalVisibility('hidden')
              }}>
                <MaterialCommunityIcons name="information-outline" size={30} color="white" />
              </TouchableOpacity>
              {typeFilter == 'Cards' || typeFilter == 'Battlegrounds' ?
                <TouchableOpacity style={{paddingTop: 8}} onPress={() => {
                    filterMenuVisibility == 'hidden' ? setFilterMenuVisibility('visible') : setFilterMenuVisibility('hidden')
                  }}>
                <MaterialCommunityIcons name="filter-variant" size={30} color="white" />
              </TouchableOpacity>
            : <></>}

            </>
          }
        />
        <FilterMenu/>
        <InfoModal closeInfoModal={() => setInfoModalVisibility('hidden')} infoModalVisibility={infoModalVisibility}/>
        <View style={{ flex: 1, padding: 8, flexDirection: 'row'}}>
            <FlatList
              data={myCardData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress= {() => {
                              showCard(item)
                            }}>

                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'
                  , justifyContent: 'space-between'
                  , marginTop: 4, marginBottom: 4, marginRight: 8}}>
                    { typeFilter == 'Battlegrounds' ?
                        <>
                          <TribeImage tribe={battlegroundTribe(item.id)}/>
                          <TechLevelImage techlevel={battlegroundTechLevel(item)}/>
                        </>
                        : <SmallClassImage cardClass={item.cardClass} multiClassGroup={item.multiClassGroup}/>
                    }

                    <Text style={{flexGrow: 1}} >{item.name}</Text>
                    {item.type == 'MINION' && !['BGS_046t'].includes(item.id) ?
                      <>
                      {['KAR_114','DAL_058','LOOT_013','AT_114','DAL_085'].includes(item.id) ? <></> :
                        <>
                          <SoundButton title='Play' cardID={item.id} sound='P' />
                          <View style={{padding: 4}} />
                        </>
                      }
                      {(['DAL_058','LOOT_013'].includes(item.id)) ? <></> :
                        <>
                          <SoundButton title='Attack' cardID={item.id} sound='A' />
                          <View style={{padding: 4}} />
                        </>
                      }
                      <SoundButton title='Death' cardID={item.id} sound='D' />
                      </>
                      : <></>
                  }
                  </View>
                  </TouchableOpacity>

              )}
              ItemSeparatorComponent={FlatListItemSeparator}
              //ListFooterComponent={CardListFooter}
              ref={flatListRef}

            />
            <View style={{justifyContent:'center', display:cardDisplayed}}>
               <Card card={card}
                  battlegrounds={(typeFilter == 'Battlegrounds') ? true : false}
                  openNewCard={(newCardID) => {
                    var newCard = data.find(x => x.id == newCardID)
                    cards.push(newCard)
                    setCard(newCard)
                    navigation.setParams({
                      cardID: newCardID
                    })
                  }}
                  closeCards={() => {
                    navigation.setParams({
                      cardID: ''
                    })
                  }}
                  returnToPreviousCard={returnToPreviousCard}
                  previousCardExists={(cards.length>1) ? true : false}/>
            </View>
          </View>
          </>
        )
      }

export default CardListTab;
