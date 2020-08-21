import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableWithoutFeedback, FlatList, StatusBar, Switch, Linking } from 'react-native';
import data from './assets/cards.json';
import SmallClassImage from './SmallClassImage';
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
import {sortCards, tokenIDs, heroIDs} from './HelperFunctions'

const CardListTab = ( { route, navigation, state }) => {

  // State variables
  const [includeMinions, setIncludeMinions] = useState(true)
  const [includeHeroes, setIncludeHeroes] = useState(true)
  const [includeSpells, setIncludeSpells] = useState(false)
  const [includeWeapons, setIncludeWeapons] = useState(false)
  const [includeNonCollectible, setIncludeNonCollectible] = useState(false)
  const [includeCommons, setIncludeCommons] = useState(true)
  const [includeRares, setIncludeRares] = useState(true)
  const [includeEpics, setIncludeEpics] = useState(true)
  const [includeLegendaries, setIncludeLegendaries] = useState(true)
  const [cardDisplayed, setCardDisplayed] = useState('none')
  const [card, setCard] = useState(data[0])
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
  const {typeFilter} = route.params

  var myData = filterData()

  function filterData() {

    var filteredData

    if (typeFilter == 'MINION') {
      filteredData = data.filter(x => (!heroIDs.includes(x.id)))
    } else {
      filteredData = data.filter(x => heroIDs.includes(x.id))
    }

    return (sortCards(filteredData))
  }

  function filterCards(searchCriteria, applyLoadLimit, increaseLoadLimit,
    newMinionFilter, newHeroFilter, newSpellFilter, newWeaponFilter, newNonCollectibleFilter,
    newCommonFilter, newRareFilter, newEpicFilter, newLegendaryFilter) {
    var filteredData = myData.filter(x =>
      (
        x.type == (((newMinionFilter == null) ? includeMinions : newMinionFilter) ? 'MINION' : '') ||
        x.type == (((newHeroFilter   == null) ? includeHeroes  : newHeroFilter  ) ? 'HERO'   : '') ||
        x.type == (((newSpellFilter  == null) ? includeSpells  : newSpellFilter ) ? 'SPELL'  : '') ||
        x.type == (((newWeaponFilter == null) ? includeWeapons : newWeaponFilter) ? 'WEAPON' : '')
      )
      &&
      (
        [
          (((newCommonFilter == null) ? includeCommons : newCommonFilter)           ? 'FREE'        : ''),
          (((newCommonFilter == null) ? includeCommons : newCommonFilter)           ? 'COMMON'      : ''),
          (((newRareFilter == null) ? includeRares : newRareFilter)                 ? 'RARE'        : ''),
          (((newEpicFilter == null) ? includeEpics : newEpicFilter)                 ? 'EPIC'        : ''),
          (((newLegendaryFilter == null) ? includeLegendaries : newLegendaryFilter) ? 'LEGENDARY'   : '')
        ]
        .includes(x.rarity)
      )
      && (x.collectible == true || tokenIDs.includes(((newNonCollectibleFilter == null) ? includeNonCollectible : newNonCollectibleFilter) ? x.id : 'N/A'))
      && (x.set === cardSet || cardSet === null)
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
    if (typeFilter == 'MINION') {
      cardSet = null
      navigation.navigate(
        'Cards',
        {cardSet: null}
      )
      filterCards(null, true, false)
    } else if (typeFilter == 'HERO'){
      setMyCardData(myData)
      navigation.navigate(
        'Heroes',
        {cardSet: null}
      )
    }
  })

  navigation.addListener('focus', e => {
    goToTop()
    Analytics.setCurrentScreen('CardListTab' + typeFilter)

    if (typeFilter == 'MINION' && cardSet != null) {
      filterCards(null, false, false)
    }
    else if (typeFilter == 'MINION' && cardSet == null) {
      filterCards(null, true, false)
    }
    else if (typeFilter == "HERO") {
      setMyCardData(myData)
    }
  })

  function goToTop() {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  const returnToPreviousCard = () => {
    setCard(cards[cards.length-2])
    cards.pop()
  }

  const CardListFooter = () => {
    return (
      <>
      { (myCardData.length < myData.filter(x =>
        (
          x.type == (includeMinions ? 'MINION' : '') ||
          x.type == (includeHeroes ? 'HERO' : '') ||
          x.type == (includeSpells ? 'SPELL' : '') ||
          x.type == (includeWeapons ? 'WEAPON' : '')
        )
        &&
        (
          [
            (includeCommons           ? 'FREE'        : ''),
            (includeCommons           ? 'COMMON'      : ''),
            (includeRares                 ? 'RARE'        : ''),
            (includeEpics                 ? 'EPIC'        : ''),
            (includeLegendaries ? 'LEGENDARY'   : '')
          ]
          .includes(x.rarity)
        )
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

  const FilterMenu = () => {
    return (
      <View style={{position: 'absolute', right:48, top:56, zIndex: 1, backgroundColor: 'white', visibility:filterMenuVisibility,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5}} >
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{paddingRight: 16}}>Minions</Text>
            <Switch onValueChange={ (newMinionFilter) => {
                setIncludeMinions(newMinionFilter)
                filterCards(null, true, false, newMinionFilter, null, null, null, null)
              }} value={includeMinions} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <Text style={{paddingRight: 16}}>Heroes</Text>
            <Switch onValueChange={ (newHeroFilter) => {
              setIncludeHeroes(newHeroFilter)
              filterCards(null, true, false, null, newHeroFilter, null, null, null)
            }} value={includeHeroes} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <Text style={{paddingRight: 16}}>Spells</Text>
            <Switch onValueChange={(newSpellFilter) => {
              setIncludeSpells(newSpellFilter)
              filterCards(null, true, false, null, null, newSpellFilter, null, null)
            }} value={includeSpells} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <Text style={{paddingRight: 16}}>Weapons</Text>
            <Switch onValueChange={(newWeaponFilter) => {
              setIncludeWeapons(newWeaponFilter)
              filterCards(null, true, false, null, null, null, newWeaponFilter, null)
            }} value={includeWeapons} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <Text style={{paddingRight: 16}}>Non-Collectible</Text>
            <Switch onValueChange={(newNonCollectibleFilter) => {
              setIncludeNonCollectible(newNonCollectibleFilter)
              filterCards(null, true, false, null, null, null, null, newNonCollectibleFilter)
            }} value={includeNonCollectible} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
            <TouchableOpacity onPress={ () => {
              filterCards(null, true, false, null, null, null, null, null, !includeCommons, null, null, null)
              setIncludeCommons(previous => !previous)
            }}>
              <Image style={{width: 34, height: 44}} source={require('./assets/img/common_gem_small.png')}/>
              <Image style={{width: 34, height: 44, marginTop: -44, visibility: ((includeCommons || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
              filterCards(null, true, false, null, null, null, null, null, null, !includeRares, null, null)
              setIncludeRares(previous => !previous)
            }}>
              <Image style={{width: 34, height: 44}} source={require('./assets/img/rare_gem_small.png')}/>
              <Image style={{width: 34, height: 44, marginTop: -44, visibility: ((includeRares || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
              filterCards(null, true, false, null, null, null, null, null, null, null, !includeEpics, null)
              setIncludeEpics(previous => !previous)
            }}>
              <Image style={{width: 34, height: 44}} source={require('./assets/img/epic_gem_small.png')}/>
              <Image style={{width: 34, height: 44, marginTop: -44, visibility: ((includeEpics || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
              filterCards(null, true, false, null, null, null, null, null, null, null, null, !includeLegendaries)
              setIncludeLegendaries(previous => !previous)
            }}>
              <Image style={{width: 34, height: 44}} source={require('./assets/img/legendary_gem_small.png')}/>
              <Image style={{width: 34, height: 44, marginTop: -44, visibility: ((includeLegendaries || filterMenuVisibility == 'hidden') ? 'hidden' : 'visible')}} source={require('./assets/img/exclude.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    }
  })

  return (

      <>
      <Toolbar
          centerElement={<ToolbarTitle/>}
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
              {typeFilter == 'MINION' ?
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
                              setCard(item)
                              setCards([item])
                              if (cardDisplayed == 'none') {
                                setCardDisplayed('')
                              }
                              setFilterMenuVisibility('hidden')
                              setInfoModalVisibility('hidden')
                            }}>

                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'
                  , justifyContent: 'space-between'
                  , marginTop: 4, marginBottom: 4, marginRight: 8}}>
                    <SmallClassImage cardClass={item.cardClass} multiClassGroup={item.multiClassGroup}/>
                    <Text style={{flexGrow: 1}} >{item.name}</Text>
                    {item.type == 'MINION' && !['SCH_239','SCH_271t','SCH_357t','SCH_605','SCH_612t','SCH_616','SCH_711','SCH_714'].includes(item.id) ?
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
              ListFooterComponent={CardListFooter}
              ref={flatListRef}

            />
            <View style={{justifyContent:'center', display:cardDisplayed}}>
               <Card card={card}
                  openNewCard={(newCardID) => {
                    var newCard = data.find(x => x.id == newCardID)
                    cards.push(newCard)
                    setCard(newCard)
                  }}
                  closeCards={() => setCardDisplayed('none')}
                  returnToPreviousCard={returnToPreviousCard}
                  previousCardExists={(cards.length>1) ? true : false}/>
            </View>
          </View>
          </>
        )
      }


export default CardListTab;
