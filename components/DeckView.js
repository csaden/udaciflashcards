import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {darkGreen, white, grey, macBlue} from '../utils/colors';
import {getDeck} from '../utils/api';
import {Entypo} from '@expo/vector-icons';

export default class DeckView extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = {
    header: ({navigation}) => (
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10}}>
        <Entypo name='chevron-thin-left' size={20} color={macBlue}/>
        <Button
          title='Decks'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    )
  }

  addCard = () => {
    const {navigation} = this.props;
    const {title} = navigation.state.params;
    navigation.navigate('AddCard', {title});
  }

  startQuiz = () => {
    const {navigation} = this.props;
    const {title} = navigation.state.params;
    getDeck(title)
    .then((deck) => {
      navigation.navigate('Quiz', {deck});
    })
    .catch((error) => {
      console.warn('Unable to get deck', error);
    });
  }

  render() {
    const {title, count} = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>{count} cards</Text>
        </View>
        <View>
          {count > 0 &&
            <TouchableOpacity
              style={styles.startQuizBtn}
              onPress={this.startQuiz}>
                <Text style={[styles.btnText, {color: white}]}>
                  START QUIZ
                </Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={styles.addCardBtn}
            onPress={this.addCard}>
              <Text style={styles.btnText}>ADD CARD</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    textAlign: 'center',
    marginBottom: 8
  },
  count: {
    fontSize: 14,
    color: grey,
    textAlign: 'center'
  },
  header: {
    marginBottom: 60
  },
  addCardBtn: {
    width: 160,
    backgroundColor: white,
    borderColor: 'transparent',
    borderRadius: 6,
    borderWidth: 1,
    padding: 14
  },
  startQuizBtn: {
    width: 160,
    borderColor: 'transparent',
    backgroundColor: darkGreen,
    borderRadius: 6,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center'
  }
});
