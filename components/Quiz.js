import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import {darkGreen, green, yellow, grey, white} from '../utils/colors';

export default class Quiz extends Component {

  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    isDone: false,
    showsAnswer: false,
    i: 0,
    score: 0
  }

  backToDeck = () => {
    const {deck} = this.props.navigation.state.params;
    const {title} = deck;
    const count = deck.questions.length;
    this.props.navigation.navigate('DeckView', {title, count});
  }

  resetQuiz = () => {
    this.setState({
      isDone: false,
      showsAnswer: false,
      i: 0,
      score: 0
    })
  }

  incrementScore = () => {
    this.setState((prevState) => ({
      score: prevState.score += 1
    }));
    this.nextCard();
  }

  nextCard = () => {
    const {deck} = this.props.navigation.state.params;
    const {i} = this.state;
    if (i === deck.questions.length - 1) {
      this.setState({isDone: true});
      return;
    }

    this.setState((prevState) => ({
      i: prevState.i + 1,
      showsAnswer: false
    }));
  }

  toggleAnswer = () => {
    this.setState((prevState) => ({
      showsAnswer: !prevState.showsAnswer
    }));
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    const {i, showsAnswer, score, isDone} = this.state;
    const {question, answer} = deck.questions[i];

    return (isDone
      ?
      <View style={styles.container}>
        <Text style={styles.score}>
          Your self-study score was {score}/{deck.questions.length}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.button, {marginBottom: 10, backgroundColor: darkGreen}]}
            onPress={this.resetQuiz}>
            <Text style={[styles.center, {color: white}]}>RESET QUIZ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: white}]}
            onPress={this.backToDeck}>
              <Text style={styles.center}>BACK TO DECK</Text>
          </TouchableOpacity>
        </View>
      </View>
      :
      <View style={styles.container}>
        <View>
          <Text>{i+1}/{deck.questions.length}</Text>
        </View>
        <View style={styles.textContain}>
          <Text style={styles.text}>{showsAnswer ? answer : question}</Text>
          <TouchableOpacity onPress={this.toggleAnswer}>
            <Text style={styles.toggleBtn}>
              {`SHOW ${showsAnswer ? 'QUESTION' : 'ANSWER'}`}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, {marginBottom: 10, backgroundColor: green}]}
            onPress={this.incrementScore}>
            <Text style={[styles.center, {color: white}]}>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: yellow}]}
            onPress={this.nextCard}>
              <Text style={styles.center}>INCORRECT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textContain: {
    marginBottom: 100
  },
  toggleBtn: {
    color: grey,
    fontWeight: '600',
    letterSpacing: 0.0625,
    fontSize: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    width: 160,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 14,
  },
  center: {
    textAlign: 'center'
  },
  score: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 40
  }
});
