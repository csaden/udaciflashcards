import React, {Component} from 'react';
import {View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import {setDecks, getDecks} from './utils/api';
import {darkGreen, white, yellow} from './utils/colors';
import {setLocalNotification} from './utils/notify';

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

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
      initialRouteName: 'Decks'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerBackTitle: 'Back'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Study Mode'
    }
  }
}, {
  headerMode: 'screen'
})

export default class App extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    setLocalNotification();
    const {decks} = this.state;
    if (Object.keys(decks).length === 0) {
      setDecks()
      .then(this.refreshDecks)
      .catch((error) => {
        console.warn('Could not load decks', error);
      });
    }
  }

  refreshDecks = () => {
    return getDecks()
    .then((decks) => {
      this.setState(() => ({decks}));
    });
  }

  render() {
    const {decks} = this.state;

    return (
      <View style={{flex: 1}}>
        <MainNavigation screenProps={{decks, onRefresh: this.refreshDecks}}/>
      </View>
    )
  }
}