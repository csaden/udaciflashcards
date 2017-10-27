import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {addCardToDeck} from '../utils/api';
import {darkGreen, grey, white} from '../utils/colors';

export default class AddCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object
  }

  state = {
    question: '',
    answer: ''
  }

  addCard = () => {
    const {title} = this.props.navigation.state.params;
    const {onRefresh} = this.props.screenProps;
    const card = Object.assign({}, this.state);
    addCardToDeck(title, card)
    .then(onRefresh)
    .then(() => {
      this.setState({question: '', answer: ''});
    })
    .catch((error) => {
      console.warn('Unable to add question: ', error);
    })
  }

  render() {
    const {question, answer} = this.state;
    const {title} = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputs}>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder='Question'
            onChangeText={(question) => this.setState({question})}
            style={styles.textInput}
            value={question}>
          </TextInput>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder='Answer'
            onChangeText={(answer) => this.setState({answer})}
            style={styles.textInput}
            value={answer}>
          </TextInput>
        </View>
        <TouchableOpacity
          onPress={this.addCard}
          style={styles.submitBtn}>
          <Text style={styles.submit}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 10
  },
  textInput: {
    width: 300,
    height: 48,
    borderRadius: 6,
    borderColor: grey,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10
  },
  inputs: {
    marginBottom: 40
  },
  submitBtn: {
    width: 160,
    borderColor: 'transparent',
    backgroundColor: darkGreen,
    borderRadius: 6,
    borderWidth: 1,
    padding: 14
  },
  submit: {
    textAlign: 'center',
    color: white
  }
})