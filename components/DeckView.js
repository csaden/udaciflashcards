import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {green, yellow} from '../utils/colors';

export default class DeckView extends Component {

  addCard = () => {
    // navigate to add card
  }

  startQuiz = () => {
    // start quiz
  }

  render() {
    const {title, count} = this.props;

    return (
      <View>
        <View>
          <Text>{title}</Text>
          <Text>{count}</Text>
        </View>
        <View>
          <TouchableOpacity
            styles={styles.addCardBtn}
            onPress={this.addCard}>
            Add Card
          </TouchableOpacity>
          <TouchableOpacity
            styles={styles.startQuizBtn}
            onPress={this.startQuiz}>
            Start Quiz
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addCardBtn: {
    backgroundColor: yellow,

    borderColor: 'grey',
    marginBottom: 10
  },
  startQuizBtn: {
    backgroundColor: green,
    borderColor: 'grey'
  }
});
