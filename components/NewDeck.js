import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {saveDeckTitle} from '../utils/api';
import {darkGreen, grey, white} from '../utils/colors';

export default class NewDeck extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object
  }

  state = {
    title: ''
  }

  submit = () => {
    const {title} = this.state;
    const {onRefresh} = this.props.screenProps;
    this.setState({title: ''});

    if (title.trim() === '') {
      return;
    }

    saveDeckTitle(title.trim())
    .then(onRefresh)
    .then(() => {
      this.props.navigation.navigate('DeckView', {title, count: 0});
    })
    .catch((error) => {
      console.warn(`Unable to save new flashcards with title ${title}`, error);
    });
  }

  render() {
    const {title} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new set of flashcards?</Text>
        <TextInput
          placeholder='Title'
          onChangeText={(title) => this.setState({title})}
          style={styles.textInput}
          value={title}>
        </TextInput>
        <TouchableOpacity
          onPress={this.submit}
          style={styles.submitBtn}>
          <Text style={styles.submit}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  textInput: {
    width: 300,
    height: 48,
    borderRadius: 6,
    borderColor: grey,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20
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
});
