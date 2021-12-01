import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

import PropTypes from 'prop-types';

const UIManager = NativeModules.UIManager;

class TextFit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0.5,
      complete: false,
    };
  }

  setSize() {
    const maxHeight = this.props.height;

    this.refs.field.measure((x, y, width, height, px, py) => {
      let size = this.state.size;
      if (this.state.complete) {
        this.render();
        return;
      }

      if (maxHeight < height) {
        if (this.state.size == 0.5) {
          this.setState({complete: true});
        } else {
          this.setState({size: size - 0.5, complete: true}, () => this.setSize());
        }
      } else {
        if (!this.state.complete) {
          this.setState({size: size + 2}, () => this.setSize() );
        }
      }
    });
  }
  componentDidMount() {
    this.setSize();
  }

  render() {
    return (
      <Text
        {...this.props}
        ref="field"
        multiline={true}
        style={[
          this.props.style,
          {
            fontSize: this.state.size,
            color: this.state.complete ? 'white': 'transparent',
            width: this.props.width,
          }
        ]}>
        {this.props.children}
      </Text>
    );
  }
}

TextFit.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.string
};

TextFit.defaultProps = {
  style: {}
}
export default TextFit;