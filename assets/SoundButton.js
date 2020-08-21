import React from 'react';
import { StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, View, Link, Text, Linking } from 'react-native';
import { Audio } from 'expo-av';

const SoundButton = (props) => {
  async function playSound(cardID, sound) {
    const soundObject = await Audio.Sound.createAsync(
      { uri: 'https://hearthstonesounds.s3.amazonaws.com/'+cardID+'_'+sound+'.wav' },
      { shouldPlay: true }
    );
    try {
      await soundObject.playAsync();
      // Your sound is playing!
      } catch (error) {
      // An error occurred!
      }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress= {() => {
          playSound(props.cardID, props.sound)
        }}
        href={'https://hearthstonesounds.s3.amazonaws.com/'+props.cardID+'_'+props.sound+'.wav'}
        accessibilityRole="link" target=""
      >
        <Text style={styles.text}  >{props.title}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    width: "72px",
    justifyContent: 'center',
    backgroundColor: "#2196F3",
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
    alignItems: "center",
    justifyContent: 'center',
    color: "white",
    fontSize: 14,
  }
})

export default SoundButton;
