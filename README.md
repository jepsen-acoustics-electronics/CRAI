
Jepsen Acoustics & Electronics Ltd - CRAI Mobile App
====================================================

[![React Native](https://img.shields.io/badge/React%20Native-v0.59.4-blue.svg)](https://facebook.github.io/react-native/)
[![React Navigation V3](https://img.shields.io/badge/React%20Navigation-v3.8-blue.svg)](https://reactnavigation.org/)

## Tech Stack

* [Redux](http://redux.js.org/)
* [Redux Saga](https://redux-saga.js.org/)
* [Redux Persist](https://github.com/rt2zz/redux-persist/)
* [React Navigation](https://reactnavigation.org/) 
* [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler) 
* [Jest](https://facebook.github.io/jest/)
* [Eslint](http://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))


## Prerequisites

* [Node](https://nodejs.org) v8.10 (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
* [Yarn](https://yarnpkg.com/)
* A development machine set up for React Native by following [these instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Getting Started

1. Clone this repo, `git clone https://github.com/jepsen-acoustics-electronics/CRAI.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Run `yarn` or `npm install` to install dependencies

4. Run `react-native eject` to upgrade and add iOS & Android Folders.
  
5. Run `react-native link`

6. Latest versions of react-naviagtion uses gesture handler which is native module. For android you have to do some additional steps to configure them. Follow [these instructions](https://reactnavigation.org/docs/en/getting-started.html)
## FYI: Navigation should work fine even without these but when u need gestures or drawer navigation you need this setup


7. Start the packager with `npm start`
8. Connect a mobile device to your development machine
9. Run the test application:
  * On Android:
    * Run `react-native run-android`
  * On iOS:
    * Open `ios/YourReactProject.xcodeproj` in Xcode
    * Hit `Run` after selecting the desired device
10. Enjoy!!!
