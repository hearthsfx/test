import React from 'react';
import { ActivityIndicator, Text, View, Image, Button, TouchableWithoutFeedback, FlatList} from 'react-native';

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        opacity: 0.25,
        backgroundColor: "#000000",
        marginRight: 8
      }}
    />
  );
}

export default FlatListItemSeparator
