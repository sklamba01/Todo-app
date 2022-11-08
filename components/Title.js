import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

function Title(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.heading}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey'
  }
});

export default Title;