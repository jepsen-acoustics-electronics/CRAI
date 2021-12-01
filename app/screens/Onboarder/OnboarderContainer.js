import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import OnboarderView from "./OnboarderView";
import SplashScreen from 'react-native-splash-screen';

class OnboarderContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return <OnboarderView {...this.props} />;
    }
}

function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: (un, pwd) => dispatch(loginActions.requestLogin(un, pwd))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboarderContainer);
