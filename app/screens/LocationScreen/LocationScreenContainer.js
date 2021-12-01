import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import { Button as RNPButton, Divider, FAB, Portal, Dialog, Checkbox, RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const left = require('app/assets/images/left.png');
const right = require('app/assets/images/right.png');
import BasicScreenView from "../BasicScreen/BasicScreenView";
import Modal from "react-native-modal";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import {GooglePlacesAutocomplete} from 'app/components/GooglePlacesAutocomplete';

const API_KEY = '';

const createPlacesAutocompleteSessionToken = (a) => {
  return a
    ? (a ^ Math.random() * 16 >> a / 4).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, createPlacesAutocompleteSessionToken);
};

export default (LocationScreen = props => {
  let { stateKey, required } = props;

  class LocationScreenContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        input: this.props.screenProps.getSetting(stateKey),
        dialogVisible: false,
        newNameError: null,
        newAddressError: null,
        newCityError: null,
        newEstablishment: null,
        buttonVisible: true
      };
    }

    componentDidMount() {
      this.placesAutocompleteToken = createPlacesAutocompleteSessionToken();
    }

    _renderForm = () => {
      return (
          <View style={styles.component}>

            <Portal style={{top: 40}}>

                <Modal
                  isVisible={this.state.dialogVisible}
                  onBackButtonPress={()=> {
                    this.setState({dialogVisible: false})
                  }}
                  onBackdropPress={()=> {
                    this.setState({dialogVisible: false})
                  }}
                  style={{ flex: 1, maxHeight: 0.6 * Dimensions.get('window').height}}
                  wrapperStyle={{justifyContent:'flex-start'}}
                  useNativeDriver={true}
                >
                  <View style={styles.modalContent}>
                    <View>
                      <Text style={styles.modalContentTitle}>Add New Establishment</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <TextInput
                        value={(this.state.newEstablishment ? this.state.newEstablishment.name : '')}
                        onChangeText={(text) => this.setState({ newEstablishment: { ...this.state.newEstablishment, name: text } } )}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Name'}
                        maxLength={75}
                        style={styles.dialogInputTextStyle}
                        clearButtonMode={"while-editing"}
                        keyboardType={"ascii-capable"} />
                    </View>
                    {!!this.state.newNameError && (
                      <Text style={{ color: "red" }}>Required</Text>
                    )}
                    <View style={styles.modalRow}>
                      <TextInput
                        onChangeText={(text) => this.setState({ newEstablishment: { ...this.state.newEstablishment, address: text } } )}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Address'}
                        maxLength={100}
                        style={styles.dialogInputTextStyle}
                        clearButtonMode={"while-editing"}
                        keyboardType={"ascii-capable"} />
                    </View>
                    {!!this.state.newAddressError && (
                      <Text style={{ color: "red" }}>Required</Text>
                    )}
                    <View style={styles.modalRow}>
                      <TextInput
                        onChangeText={(text) => this.setState({ newEstablishment: { ...this.state.newEstablishment, city: text } } )}
                        underlineColorAndroid={'transparent'}
                        placeholder={'City'}
                        maxLength={75}
                        style={styles.dialogInputTextStyle}
                        clearButtonMode={"while-editing"}
                        keyboardType={"ascii-capable"} />
                    </View>
                    {!!this.state.newCityError && (
                      <Text style={{ color: "red" }}>Required</Text>
                    )}
                    <Dialog.Actions>
                      <RNPButton width={width-100} mode="contained" onPress={() => this._addNew()}><Text
                        style={styles.buttonText}>OK</Text></RNPButton>
                    </Dialog.Actions>
                  </View>
                </Modal>

            </Portal>

            <GooglePlacesAutocomplete
              ref={(instance) => { this.locationRef = instance; }}
              placeholder='Search'
              placeholderTextColor={'#ffffff'}
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed='true'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              renderListDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                this._setValue(data);
                this._hideButton(false);
              }}
              onListVisible={(visible) => {
                this._hideButton(visible);
              }}
              alwaysShowEmpty={true}
              emptyListLabel='Add New Establishment'
              onEmptyListPress={() => {
                const name = this.locationRef.getAddressText();
                this.setState({ newEstablishment: { ...this.state.newEstablishment, name: name } }, () => this._toggleDialog());
              }}
              onClear={this._clear}
              underlineColorAndroid={'transparent'}
              getDefaultValue={() => {
                return this.state.input || '';
              }}
              textInputProps={{clearButtonMode: "while-editing"}}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                components: 'country:nz',
                key: API_KEY,
                language: 'en', // language of the results
                type: 'establishment', // default: 'geocode'
                sessiontoken: this.placesAutocompleteToken
              }}

              styles={{
                container: {
                  zIndex: 10,
                  overflow: 'visible',
                },
                textInputContainer: {
                  width: '90%',
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  height: 42,
                },
                listView: {
                  flex: 1,
                  width: width - 50,
                  height: verticalScale(100),
                  position: 'absolute',
                  flexGrow: 1,
                  elevation: 9999,
                  top: 50,
                },
                row: {
                  elevation: 9999,
                  zIndex: 9999
                },
                textInput: {
                  fontSize: verticalScale(14),
                  fontWeight: "500",
                  color: "#ffffff",
                  backgroundColor: 'transparent',
                  height: verticalScale(50)
                },
                description: {
                  left: 0,
                  fontSize: verticalScale(14),
                  fontWeight: "500",
                  color: "#ffffff"
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
                poweredContainer: {
                  display: 'none'
                },
              }}

              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                type: 'cafe'
              }}

              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}

              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              isRowScrollable={true}
              numberOfLines={1}
            />
          </View>
      );
    };

    _toggleDialog = () => {
      this.setState({dialogVisible: !this.state.dialogVisible});
    };

    _setValue = (result) => {
      const value = result.description;
      this.setState({ input: value });
    };

    _onPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.next()
      );
    };

    _onLeftPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.back()
      );
    };

    _onRightPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.next()
      );
    };

    _addNew = () => {
      const est = this.state.newEstablishment;

      if (!est || !est.name || est.name.trim() === '') {
        this.setState({ newNameError: true });
        return;
      }

      this.setState({ newNameError: null });

      if (!est || !est.address || est.address.trim() === '') {
        this.setState({ newAddressError: true });
        return;
      }

      this.setState({ newAddressError: null });

      if (!est || !est.city || est.city.trim() === '') {
        this.setState({ newCityError: true });
        return;
      }

      this.setState({ newCityError: null });


      if (est && est.name.length > 0 && est.address.length > 0 && est.city.length > 0) {
        const text = est.name + ' ' + est.address + ' ' + est.city;
        this.setState({ input: text, newNameError: null, newAddressError: null, newCityError: null });
        this.locationRef.setAddressText(text);
      }
      this._hideButton(false);
      this._toggleDialog();
    };

    _clear = () => {
      this.setState({ input: null, newEstablishment: null });
      this._hideButton(false);
    };

    _stateValid = () => {
      const input = this.state.input;
      if (!required) {
        return true;
      }
      const valid = input ? true : false;
      return valid;
    };

    _hideButton = (visible) => {
      if (this.state.buttonVisible === visible) {
        this.setState({buttonVisible: !visible});
      }
    };

    render() {
      const showBack = props.showBack;
      const showNext = this._stateValid() && props.showNext;
      const logo = props.logo;

      return (
        <BasicScreenView
          {...props}
          {...this.props}
          onPress={this._onPress}
          onLeftPressed={this._onLeftPress}
          onRightPressed={this._onRightPress}
          middle={this._renderForm()}
          left={showBack ? left : false}
          right={showNext ? right : false}
          logo={logo}
          disableButton={!this._stateValid()}
          hideButton={!this.state.buttonVisible}
        />
      );
    }
  }

  return LocationScreenContainer;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width-100,
    height: '100%'
  },
  component: {
    flex: 1,
    alignItems: 'center',
    color: "#ffffff",
    zIndex: 99999,
    height: 500
  },
  dialogInputTextStyle: {
    fontSize: 16,
    height: 45,
    marginTop: 0,
  },
  modalRow: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.6,
    borderBottomColor: "#404040",
    width: width-100
  },
  modalContent: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 4,
  },
  modalContentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
