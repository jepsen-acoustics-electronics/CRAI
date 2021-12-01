import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasicScreen from 'app/screens/BasicScreen/BasicScreenContainer';
import TextEntryScreen from 'app/screens/TextEntryScreen/TextEntryScreenContainer';
import RatingScreen from 'app/screens/RatingScreen/RatingScreenContainer';
import RadioButtonScreen from 'app/screens/RadioButtonScreen/RadioButtonScreenContainer';
import LocationScreen from 'app/screens/LocationScreen/LocationScreenContainer';
import moment from "moment";

import form from 'app/api/methods/form';

import { Onboarder, BackgroundView, ButtonView, FixedHeightView, HeaderText, FlexHeightView, NavBar } from 'app/components';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const wallpaper = require('app/assets/images/wallpaper.png');
const logo = require('app/assets/images/crai-logo.png');
const overlay = require('app/assets/images/crai-background.png');

const { width, height } = Dimensions.get('window');
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import VersionNumber from 'react-native-version-number';

const RNFS = require('react-native-fs');

let emailHTML = '';

RNFS.readFileAssets('html/email.html').then((res) => {
  emailHTML = res;
});


const usernameScreen = TextEntryScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  headerContainerStyle: {
    color: '#ffffff',
  },
  middleStyle: {
    color: '#ffffff'
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  backgroundStyle: {

  },
  header: 'What is your name?',
  footer: 'First and Last Name',
  stateKey: 'your_name_or_name_of_function_optional',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const emailScreen = TextEntryScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'What is your email?',
  footer: '',
  stateKey: 'your_email_address',
  logo: logo,
  showBack: true,
  showNext: true,
  validation: 'email',
  required: true
});

const DOBScreen = RadioButtonScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'What Is Your Age?',
  footer: '',
  stateKey: 'your_age',
  logo: logo,
  radioProps: [
    {label: '< 25', value: '< 25' },
    {label: '25 - 34', value: '25 - 34' },
    {label: '35 - 45', value: '35 - 45' },
    {label: '45 - 60', value: '45 - 60' },
    {label: '> 60', value: '> 60' }
  ],
  showBack: true,
  showNext: true,
  required: false
});

const locationScreen = LocationScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Name of Cafe/Restaurant?',
  footer: '',
  stateKey: 'location',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const tableSizeScreen = TextEntryScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How many people at your table?',
  footer: '',
  stateKey: 'how_many_people_at_your_table',
  logo: logo,
  showBack: true,
  showNext: true,
  validation: 'numeric',
  required: true
});

const HowMuchNoiseScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'In general how much noise do you like in cafes/restaurants?',
  reviews: ['None', 'Very Little', 'Some', 'Above Average', 'A Lot'],
  images: {
    1: {
      small: require('app/assets/images/VU/1.png'),
      big: require('app/assets/images/VU/1_big.png')
    },
    2: {
      small: require('app/assets/images/VU/2.png'),
      big: require('app/assets/images/VU/2_big.png')
    },
    3: {
      small: require('app/assets/images/VU/3.png'),
      big: require('app/assets/images/VU/3_big.png')
    },
    4: {
      small: require('app/assets/images/VU/4.png'),
      big: require('app/assets/images/VU/4_big.png')
    },
    5: {
      small: require('app/assets/images/VU/5.png'),
      big: require('app/assets/images/VU/5_big.png')
    }
  },
  footer: '',
  stateKey: 'how_much_noise_do_you_like_in_cafes_restaurants',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const NoiseEffectScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: 60,
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How much did the level of noise adversely affect your enjoyment of the dining experience?',
  reviews: ['A Lot', 'Average', 'Some', 'Very Little', 'Not at All'],
  footer: '',
  stateKey: 'how_much_noise_did_the_level_of_noise_adversely_affect',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const NoiseExperienceScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'Did you experience any difficulties conversing with other people as a result of noise?',
  reviews: ['A Lot', 'Average', 'Some', 'Very Little', 'Not at All'],
  footer: '',
  stateKey: 'did_you_experience_any_difficulties_conversing_with_other_people_as_a_result_of_noise',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const NoiseDecisionScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How much would your experience of noise in this venue adversely affect your decision to return?',
  reviews: ['A Lot', 'Average', 'Some', 'Very Little', 'None'],
  footer: '',
  stateKey: 'how_much_would_your_experience_of_noise_in_this_venue_adversely_affect_your_decision_to_return',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const CafeBusyScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'How busy was the cafe at the time of your visit?',
  reviews: ['Almost Empty', 'A Few People', 'Half Full', 'Very Busy', 'Full'],
  images: {
    1: {
      small: require('app/assets/images/glass/1.png'),
      big: require('app/assets/images/glass/1_big.png')
    },
    2: {
      small: require('app/assets/images/glass/2.png'),
      big: require('app/assets/images/glass/2_big.png')
    },
    3: {
      small: require('app/assets/images/glass/3.png'),
      big: require('app/assets/images/glass/3_big.png')
    },
    4: {
      small: require('app/assets/images/glass/4.png'),
      big: require('app/assets/images/glass/4_big.png')
    },
    5: {
      small: require('app/assets/images/glass/5.png'),
      big: require('app/assets/images/glass/5_big.png')
    }
  },
  footer: '',
  stateKey: 'how_busy_was_the_cafe_at_the_time_of_your_visit',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const MusicLevelScreen = RatingScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footerStyle: {
    color: '#ffffff'
  },
  backgroundImage: wallpaper,
  header: 'At what level was music playing while you were eating?',
  reviews: ['None','Quiet','Average','Loud','Too Loud'],
  images: {
    1: {
      small: require('app/assets/images/VU/1.png'),
      big: require('app/assets/images/VU/1_big.png')
    },
    2: {
      small: require('app/assets/images/VU/2.png'),
      big: require('app/assets/images/VU/2_big.png')
    },
    3: {
      small: require('app/assets/images/VU/3.png'),
      big: require('app/assets/images/VU/3_big.png')
    },
    4: {
      small: require('app/assets/images/VU/4.png'),
      big: require('app/assets/images/VU/4_big.png')
    },
    5: {
      small: require('app/assets/images/VU/5.png'),
      big: require('app/assets/images/VU/5_big.png')
    }
  },
  footer: '',
  stateKey: 'at_what_level_was_music_playing_while_you_were_eating',
  logo: logo,
  showBack: true,
  showNext: true,
  required: true
});

const CommentsScreen = TextEntryScreen({
  headerWidth: width-50,
  headerHeight: verticalScale(40),
  headerStyle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footerHeight: 20,
  footerWidth: width-50,
  footerStyle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    width: width-50,
    marginTop: verticalScale(-5),
  },
  backgroundImage: wallpaper,
  header: 'Additional Comments',
  footer: 'Press Submit to Finish Your Review.',
  stateKey: 'additional_comments',
  logo: logo,
  showBack: true,
  showNext: false,
  required: false,
  max: 100,
  buttonText: 'SUBMIT'
});

class WelcomeView extends Component {
  constructor(props) {
    super(props);
  }

  _press = () => {
    this.props.screenProps.reset();
    this.props.screenProps.next();
  };

  render() {
    return (
      <BackgroundView style={{flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40}} backgroundImage={wallpaper} overlayImage={overlay}>

        <View style={{flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36}}>
          <ButtonView
            buttonStyle={{marginBottom: width/3}}
            onButtonPressed={this._press}
            text={'START'} />
        </View>
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>{'v'+VersionNumber.appVersion+'.'+VersionNumber.buildVersion }</Text>
        </View>
      </BackgroundView>
    );
  }
}

class FinishedView extends Component {
  constructor(props) {
    super(props);

    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    };

    let email = '';

    const questionTable = {
      'your_name_or_name_of_function_optional': 'Name',
      'your_email_address': 'Email',
      'your_age': 'Age Range',
      'how_many_people_at_your_table':'How many people at your table',
      'location':'Name of Cafe/Restaurant',
      'how_much_noise_do_you_like_in_cafes_restaurants':'How much noise do you like in cafes/restaurants',
      'how_much_noise_did_the_level_of_noise_adversely_affect':'How much did the level of noise adversely affect your enjoyment of the dining experience',
      'did_you_experience_any_difficulties_conversing_with_other_people_as_a_result_of_noise':'Did you experience any difficulties conversing with other people as a result of noise',
      'how_much_would_your_experience_of_noise_in_this_venue_adversely_affect_your_decision_to_return': 'How much would your experience of noise in this venue adversely affect your decision to return',
      'how_busy_was_the_cafe_at_the_time_of_your_visit': 'How busy was the cafe at the time of your visit',
      'at_what_level_was_music_playing_while_you_were_eating': 'At what level was music playing while you were eating',
      'additional_comments': 'Comments'
    };

    let body = '';

    const onboardingSettings = this.props.screenProps.getSettings();
    for (const i in onboardingSettings) {
      if (i === 'your_email_address') {
        email = onboardingSettings[i].value;
      }
      body += '<p><strong>' + questionTable[i] + '</strong></p>';
      body += '<p><i>' + (this.props.screenProps.getSettingText(i) || '') + '</i></p>';
    }

    let htmlSource = emailHTML.toString().replace('#{body}', body).replace('#{year}', new Date().getFullYear());

    options.body = "from=crai@xxxx.com";
    options.body += "&to=" + email;
    options.body += "&bcc=crai@xxxx.com";
    options.body += "&subject=" + encodeURIComponent("CRAI Response - " + moment(new Date()).format("LLLL"));
    options.body += "&html="+ encodeURIComponent(htmlSource);


    const url = 'https://api.xxxx.com/proxy/v3/xxxx.com/messages';
    fetch(url, options)
      .then(resp => resp.json())
      .then(json => json)
      .catch(error => error);
  }

  _getFormData = () => {
    let formdata = new FormData();
    const onboardingSettings = this.props.screenProps.getSettings();
    for (const i in onboardingSettings) {
      formdata.append('submitted[' + i + ']', onboardingSettings[i] || '');
    }
    return formdata;
  };

  _press = () => {
    this.props.screenProps.start();
  };

  render() {
    return (
      <BackgroundView backgroundImage={wallpaper}>
        <NavBar
          logo={logo}
        />
        <FixedHeightView style={styles.finishedSection}>
          <Text style={styles.finishedTextStyle}>Thank you!</Text>
        </FixedHeightView>
        <FixedHeightView style={styles.finishedSection}>
          <Text style={{...styles.finishedTextStyle, fontSize: 18}}>Your Review Has Been Submitted.</Text>
        </FixedHeightView>
        <FixedHeightView style={styles.finishedSection}>
        </FixedHeightView>
        <ButtonView
          onButtonPressed={this._press}
          text={'DONE'} />
      </BackgroundView>
    );
  }
}

const OnboarderForm = new Onboarder({
  Welcome: {
    screen: WelcomeView,
  },
  Username: {
    screen: usernameScreen
  },
  Email: {
    screen: emailScreen
  },
  DOB: {
    screen: DOBScreen
  },
  Location: {
    screen: locationScreen
  },
  TableSize: {
    screen: tableSizeScreen
  },
  HowMuchNoise: {
    screen: HowMuchNoiseScreen
  },
  NoiseEffect: {
    screen: NoiseEffectScreen
  },
  NoiseExperience: {
    screen: NoiseExperienceScreen
  },
  NoiseDecision: {
    screen: NoiseDecisionScreen
  },
  CafeBusy: {
    screen: CafeBusyScreen
  },
  MusicLevel: {
    screen: MusicLevelScreen
  },
  Comments: {
    screen: CommentsScreen
  },
  Finished: {
    screen: FinishedView
  }
}, {
  order: ['Welcome',
    'Username',
    'Email',
    'DOB',
    'Location',
    'TableSize',
    'HowMuchNoise',
    'NoiseEffect',
    'NoiseExperience',
    'NoiseDecision',
    'CafeBusy',
    'MusicLevel',
    'Comments',
    'Finished'],
  animation: 'push' // "slide", "push"
});

class OnboarderView extends Component {
  constructor(props) {
    super(props);
    this.onboarderRef = React.createRef();
    this.state = {
      onboarder: false,
      data: null
    };
  }

  onEnd = (data) => {
    this.setState({
      onboarded: true,
      data
    });
  };

  renderFinishedView() {

  }

  onTransition = (from, to, data) => {

  };

  render() {
    return (
      <OnboarderForm onEnd={this.onEnd} onTransition={this.onTransition}/>
    );
  }
}

OnboarderView.propTypes = {
  onLogin: PropTypes.func
};

const styles = StyleSheet.create({
  finishedSection: {
    marginTop: 10
  },
  finishedTextStyle: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '500',
    textAlign: 'center',
  },
  versionSection: {
    marginBottom: 5,
    justifyContent: 'flex-end'
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    fontWeight: '100',
    textAlign: 'center',
  }
});


export default OnboarderView;
