import React, { Component } from 'react';
import { Alert, BackHandler } from 'react-native';


import { createStackNavigator, createAppContainer, createBottomTabNavigator, NavigationActions } from "react-navigation";


export default (screensConfigMap, onboardingConfig) => {
  const screenNames = Object.keys(screensConfigMap);

  let {order, animation} = onboardingConfig;

  let createNavigatorType = animation === 'push' ? createStackNavigator : createBottomTabNavigator;

  let tabs = {};

  screenNames.forEach((screenName) => {
    let props = screensConfigMap[screenName]
    tabs[screenName] = {screen: props.screen};
  });

  const AppNavigator = createAppContainer(createNavigatorType(tabs, {
    animationEnabled: true,
    defaultNavigationOptions: {
      tabBarVisible: false
    },
    headerMode: 'none',
    order: order,
    lazy: false,
    initialRouteName: order ? order[0] : screenNames[0]
  }));

  class GeneratedComponent extends Component {
    constructor() {
      super();

      this.navigatorRef = null;

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

      this.state = {
        currentPage: 0,
        order: order ? order : screenNames,

        onboardingSettings: {}
      };
    }

    componentDidMount() {
      this.navigatorRef = this.navigator;
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
      if (this.state.currentPage === 0) {
        BackHandler.exitApp();
      }
      this.back();
      return true;
    }


    next = () => {
      let {currentPage, order} = this.state;
      let prevPageName = order[currentPage];

      let nextPage = currentPage + 1;

      if (nextPage >= order.length) {
        this.props.onEnd && this.props.onEnd(this.state.onboardingSettings);
        return;
      }

      this.setState({currentPage: nextPage});

      let pageName = order[nextPage];

      this.props.onTransition &&
      this.props.onTransition(prevPageName, pageName, this.state.onboardingSettings);

      this.navigatorRef.dispatch(
        NavigationActions.navigate({type: 'Navigation/NAVIGATE', routeName: pageName})
      );
    };

    back = () => {
      let {currentPage, order} = this.state;
      let prevPageName = order[currentPage];

      if (currentPage <= 0) return;

      let nextPage = currentPage - 1;
      let pageName = order[nextPage];

      if (order.length === currentPage+1) {
        this.setState({currentPage: 0});

        let pageName = order[0];

        this.props.onTransition &&
        this.props.onTransition(prevPageName, pageName, this.state.onboardingSettings);

        this.navigatorRef.dispatch(
          NavigationActions.navigate({type: 'Navigation/NAVIGATE', routeName: pageName})
        );
      }
      else if (nextPage === 0) {
        Alert.alert(
          "Cancel",
          "Are you sure you want to cancel this review?",
          [
            {
              text: "No",
              onPress: () => {
                return;
              },
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: () => {
                this.setState({currentPage: nextPage});

                this.props.onTransition &&
                this.props.onTransition(prevPageName, pageName, this.state.onboardingSettings);

                this.navigatorRef.dispatch(
                  NavigationActions.back()
                );
              }
            }
          ],
          { cancelable: false }
        );
      } else {

        this.setState({currentPage: nextPage});

        this.props.onTransition &&
        this.props.onTransition(prevPageName, pageName, this.state.onboardingSettings);

        this.navigatorRef.dispatch(
          NavigationActions.back()
        );
      }
    };

    start = () => {
      this.setState({currentPage: 0, onboardingSettings: {}});
      let pageName = order[0];

      this.navigatorRef.dispatch(
        NavigationActions.navigate({type: 'Navigation/NAVIGATE', routeName: pageName})
      );
    };

    reset = () => {
      this.setState({onboardingSettings: {}});
    };

    saveSetting = (key, value, text, cb) => {
      if (cb == null) {
        cb = text;
        text = value;
      }
      this.setState({
        onboardingSettings: {
          ...this.state.onboardingSettings,
          [key]: {
            value: value,
            text: text
          }
        }
      }, cb);
    };

    getSetting = (key) => {
      const onboardingSettings = this.state['onboardingSettings'];
      return onboardingSettings[key] ? onboardingSettings[key].value : null;
    };

    getSettingText = (key) => {
      const onboardingSettings = this.state['onboardingSettings'];
      return onboardingSettings[key] ? onboardingSettings[key].text : null;
    };

    getSettings = () => {
      const onboardingSettings = this.state['onboardingSettings'];
      return onboardingSettings;
    };

    render() {
      let propsForScreen = {
        next: this.next,
        back: this.back,
        start: this.start,
        reset: this.reset,
        saveSetting: this.saveSetting,
        getSetting: this.getSetting,
        getSettingText: this.getSettingText,
        getSettings: this.getSettings
      };

      return (
        <AppNavigator screenProps={propsForScreen} ref={nav => { this.navigator = nav; }} />
      );
    }
  }

  return GeneratedComponent;
};