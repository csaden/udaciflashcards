import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {grey} from '../utils/colors';
import {getCardCount} from '../utils/helpers';

export default class Decks extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object
  }

  viewDeck = ({title, questions}) => {
    this.props.navigation.navigate('DeckView', {title, count: questions.length});
  }

  shouldComponentUpdate(nextProps) {
    const {decks} = this.props.screenProps;
    return getCardCount(decks) !== getCardCount(nextProps.screenProps.decks);
  }

  render() {
    const {screenProps} = this.props;
    if (!screenProps) {
      return null;
    }
    const {decks} = screenProps;

    return (
      Object.keys(decks).length > 0 ?
        <View>
          <FlatList
            data={Object.values(decks)}
            keyExtractor={(item) => item.title}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.viewDeck(item)}>
                <View key={item.title} style={[styles.card, styles.border]}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.count}>{item.questions.length} cards</Text>
                </View>
              </TouchableOpacity>
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
    borderBottomColor: grey,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 4
  },
  count: {
    fontSize: 12,
    color: grey
  }
});
