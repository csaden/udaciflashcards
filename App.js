import React, {Component} from 'react';
import {View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import {setDecks, getDecks} from './utils/api';
import {darkGreen, white, yellow} from './utils/colors';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
    }
  }

}, {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
      justifyContent: 'center',
      alignItems: 'center'
    },
    showIcon: false,
    upperCaseLabel: true,
    activeTintColor: white,
    inactiveTintColor: white,
    pressOpacity: 0.8,
    style: {
      backgroundColor: darkGreen
    },
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    indicatorStyle: {
      backgroundColor: yellow,
    }
  }
})

// const MainNav = StackNavigator({
//   Home: {
//     screen: Tabs
//   },
//   DeckView: {
//     screen: DeckView,
//     path: 'deck/:title',
//     navigationOptions: ({navigation}) => ({
//       title: navigation.state.params.title
//     })
//   }
// })

export default class App extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    setDecks()
    .then(getDecks)
    .then((decks) => {
      this.setState(() => ({decks}))
    })
    .catch((error) => {
      console.warn('Could not load decks', error);
    });
  }

  render() {
    const {decks} = this.state;

    return (
      <View style={{flex: 1}}>
        {/* <MainNav/>*/}
        <Tabs screenProps={{decks}}/>
      </View>
    )
  }
}