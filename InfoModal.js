import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Switch, Linking } from 'react-native';
import SoundDivider from './SoundDivider'

const InfoModal = (props) => {

  return (
    <View style={{position: 'absolute', top: '30%', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', zIndex: 1, backgroundColor: 'white', visibility:props.infoModalVisibility, padding: 16, textAlign: 'center', width: '25%',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5}} >
      <Text style={{padding: 8}}>Welcome to the best source of Hearthstone sounds! Thank you for using HearthSFX.</Text>
      <Text style={{padding: 8}}>{'For inquiries, suggestions, or ideas please reach out to me at'}
        <TouchableWithoutFeedback href={'mailto:hearthsfx@gmail.com'}
        accessibilityRole="link" target="_blank" >
          <View>
            <Text style={{color:'blue', textDecorationLine: 'underline'}}>hearthsfx@gmail.com</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text> or on </Text>
        <TouchableWithoutFeedback href={'https://twitter.com/BlackLedger0'}
        accessibilityRole="link" target="_blank" >
          <View>
            <Text style={{color:'blue', textDecorationLine: 'underline'}}>Twitter</Text>
          </View>
        </TouchableWithoutFeedback>
      </Text>
      <SoundDivider/>
      <View style={{paddingBottom: 8}}>
        <Text style={{paddingBottom: 8}}>Interested in helping cover some of the hosting costs? Support me using any of the following:</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space', alignItems: 'center', paddingBottom: 8}}>
            <TouchableWithoutFeedback href={'https://ko-fi.com/hearthsfx'}
            accessibilityRole="link" target="_blank" >
              <Image style={{width: 34, height: 34}} source={require('./assets/img/kofi.png')}/>
            </TouchableWithoutFeedback>
          <Text style={{paddingLeft: 8}}>Ko-fi</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space', alignItems: 'center', paddingBottom: 8}}>
          <TouchableWithoutFeedback href={'bitcoin:35W3nrEVSq7BdrnXc4ZPGPVMFFhDhmxLR2'}
          accessibilityRole="link" target="_blank" >
            <Image style={{width: 34, height: 34}} source={require('./assets/img/bitcoin.png')}/>
          </TouchableWithoutFeedback>
          <Text style={{paddingLeft: 8}}>35W3nrEVSq7BdrnXc4ZPGPVMFFhDhmxLR2</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space', alignItems: 'center', paddingBottom: 8}}>
          <TouchableWithoutFeedback href={'litecoin:MWYuAdzNKRDtocskRmqFwpMD9Fg9U7Yr5R'}
          accessibilityRole="link" target="_blank" >
            <Image style={{width: 34, height: 34}} source={require('./assets/img/litecoin.png')}/>
          </TouchableWithoutFeedback>
          <Text style={{paddingLeft: 8}}>MWYuAdzNKRDtocskRmqFwpMD9Fg9U7Yr5R</Text>
        </View>
      </View>
      <SoundDivider/>
      <Text style={{paddingBottom: 8}}>{'Version 1.0.5\nHearthstone Patch 18.2.0.58638'}</Text>
      <SoundDivider/>
      <Text style={{paddingBottom: 8, fontSize: 10}}>{'HearthSFX is not affiliated with or endorsed by Blizzard Entertainment. Images, sounds, and descriptions are trademarked and subject to copyright below.'}</Text>
      <Text style={{paddingBottom: 8, fontSize: 10}}>{'Hearthstone®: Heroes of Warcraft™\n©2014 Blizzard Entertainment, Inc. All rights reserved. Heroes of Warcraft is a trademark, and Hearthstone is a registered trademark of Blizzard Entertainment, Inc. in the U.S. and/or other countries.'}</Text>

      <TouchableOpacity style={styles.button} onPress= {props.closeInfoModal}>
        <Text style={styles.text}>Close</Text>
      </TouchableOpacity>
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

export default InfoModal
