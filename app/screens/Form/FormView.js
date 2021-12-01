import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Onboarder, {TextEntryScreen, BasicScreen} from 'react-native-soap';

const background = require('app/assets/images/background.png');
const wallpaper = require('app/assets/images/wallpaper.png');

const startScreen = BasicScreen({
  backgroundImage: background,
  buttonText: 'START'
});

const nameScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Name of Cafe/Restaurant?',
  footer: '',
  stateKey: 'name_of_cafe_restaurant'
});

const cityScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'City where venue is located?',
  footer: '',
  stateKey: 'city'
});

const tableSizeScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How many people at your table?',
  footer: '',
  stateKey: 'table_size'
});

const noiseThresholdScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How much noise do you like in cafes/restaurants?',
  footer: '(1 = A lot, 5 = None)',
  stateKey: 'table_size'
});

const noiseEnjoymentScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How much did the level of noise adversely affect your enjoyment of the dining experience?',
  footer: '(1 = A lot, 5 = Not at All)',
  stateKey: 'noise_enjoyment'
});

const conversingScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Did you experience any difficulties conversing with other people as a result of noise?',
  footer: '(1 = A lot, 5 = Not at All)',
  stateKey: 'noise_enjoyment'
});

const returningScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How much would your experience of noise in this venue adversely affect your decision to return?',
  footer: '(1 = A lot, 5 = Not at All)',
  stateKey: 'returning'
});

const busyScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How busy was the cafe at the time of your visit?',
  footer: '(1 = Almost empty, 5 = Full)',
  stateKey: 'busy'
});

const musicScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'At what level was music playing while you were eating?',
  footer: '(1 = Too Loud, 5 = None)',
  stateKey: 'music_level'
});

const commentScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Additional Comments',
  footer: '',
  stateKey: 'comments'
});

const completedScreen = TextEntryScreen({
  headerStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Completed',
  footer: '',
  stateKey: 'completed'
});

const Form = Onboarder({
  Start: {
    screen: startScreen,
  },
  Name: {
    screen: nameScreen
  },
  City: {
    screen: cityScreen
  },
  TableSize: {
    screen: tableSizeScreen
  },
  NoiseThreshold: {
    screen: noiseThresholdScreen
  },
  NoiseEnjoyment: {
    screen: noiseEnjoymentScreen
  },
  Conversing: {
    screen: conversingScreen
  },
  Returning: {
    screen: returningScreen
  },
  Busy: {
    screen: busyScreen
  },
  Music: {
    screen: musicScreen
  },
  Comment: {
    screen: commentScreen
  },
  Completed: {
    screen: completedScreen
  }
}, {
  order: ['Start', 'Name', 'City', 'TableSize', 'NoiseThreshold', 'NoiseEnjoyment', 'Conversing', 'Returning', 'Busy', 'Music', 'Comment' ],
  animation: 'push' // "slide", "push"
});

class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onboarder: false,
      data: null
    }
  }

  onEnd = (data) => {
    this.setState({
      onboarded: true,
      data
    })
  };

  renderFinishedView() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
        <Text>You finished onboarding. You entered this text:</Text>
        <Text style={{fontSize: 70}}>{JSON.stringify(this.state.data)}</Text>
      </View>
    )
  }

  onTransition = (from, to, data) => {
  };

  render() {
    if (this.state.onboarded) return this.renderFinishedView();
    return (
      <Form onEnd={this.onEnd} onTransition={this.onTransition}/>
    );
  }
}

OnboarderView.propTypes = {
  onLogin: PropTypes.func
};

export default FormView;
