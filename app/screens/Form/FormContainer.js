import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import FormView from "./FormView";

class FormContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <FormView {...this.props} />;
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
)(FormContainer);
