import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

export default class Decks extends Component {
  render() {
    const {decks} = this.props.screenProps;

    return (
      Object.keys(decks).length > 0 ?
        <View>
          <FlatList
            data={Object.values(decks)}
            renderItem={({item}) => (
              <View key={item.title} style={[styles.card, styles.border]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.count}>{item.questions.length} cards</Text>
              </View>
            )}
          />
        </View>
        :
        <View style={[styles.card, {flex: 1}]}>
          <Text style={[styles.title, {textAlign: 'center'}]}>There are no decks to study. Create a new deck!</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    borderStyle: 'solid',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  title: {
    fontSize: 18,
  },
  count: {
    fontSize: 12,
    color: 'grey'
  }
});
