import React from 'react';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity, ViewPropTypes } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';


const IMAGE_ARRAY = {
  1: {
    small: require('./images/1.png'),
    big: require('./images/1_big.png')
  },
  2: {
    small: require('./images/2.png'),
    big: require('./images/2_big.png')
  },
  3: {
    small: require('./images/3.png'),
    big: require('./images/3_big.png')
  },
  4: {
    small: require('./images/4.png'),
    big: require('./images/4_big.png')
  },
  5: {
    small: require('./images/5.png'),
    big: require('./images/5_big.png')
  }
};

const WIDTH = moderateScale(320);
const DISTANCE = WIDTH /5;
const END = WIDTH - DISTANCE;

export class EmojiFeedback extends React.Component {
  static defaultProps = {
    type: 'star',
    ratingColor: '#f1c40f',
    ratingBackgroundColor: 'white',
    ratingCount: 5,
    imageSize: 40,
    onFinishRating: () => console.log('Attach a onFinishRating function here.'),
    minValue: 0
  };

  constructor(props) {
    super(props);
    const { onStartRating, defaultRating, reviews, images, imageSize } = this.props;

    this._pan = new Animated.Value(this.getOffset(defaultRating || 3));

    const image_array = images ? images : IMAGE_ARRAY;

    this.reactions = reviews.map((review, idx) => {
      return { label: review, src: image_array[idx+1].small, bigSrc: image_array[idx+1].big };
    });

    const panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
        if (typeof onStartRating === 'function') {
          onStartRating();
        }
      },
      onPanResponderMove: (event, gesture) => {
        const newPosition = this._pan;
        newPosition.setValue(gesture.dx);
        this.setState({ position: newPosition, value: gesture.dx });
      },
      onPanResponderRelease: (event, gesture) => {
        this._pan.flattenOffset();
        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

        const idx = (offset / DISTANCE);
        this.updatePan(offset, idx);
      }
    });

    this.state = { panResponder, display: false, selected: defaultRating ? true : false, value: defaultRating };
  }

  getOffset(rating) {
    return (rating - 1) * DISTANCE;
  }

  updatePan(toValue, idx) {
    this.setState({selected: true});
    Animated.spring(this._pan, { toValue, friction: 7 }).start();
    this.props.onFinishRating(idx+1);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.line} />

          <View style={styles.reactions}>
            {this.reactions.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u-20, u, u+20];
              let scaleOutputRange = [1, 1, 1];
              let topOutputRange = this.state.selected ? [0, 10, 0] : [0, 0, 0];
              let colorOutputRange = this.state.selected ? ['#e0e0e0', '#FFF', '#e0e0e0'] : ['#e0e0e0', '#e0e0e0', '#e0e0e0'];

              return (
                <TouchableOpacity
                  onPress={() => this.updatePan(u,idx)} activeOpacity={0.9} key={idx}>
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[styles.smiley, {
                        transform: [{
                          scale: this._pan.interpolate({
                            inputRange,
                            outputRange: scaleOutputRange,
                            extrapolate: 'clamp',
                          })
                        }]
                      }]}
                    />
                  </View>

                  <Animated.Text style={[styles.reactionText, {
                    top: this._pan.interpolate({
                      inputRange,
                      outputRange: topOutputRange,
                      extrapolate: 'clamp',
                    }),
                    color: this._pan.interpolate({
                      inputRange,
                      outputRange: colorOutputRange,
                      extrapolate: 'clamp',
                    })
                  }]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            {this.state.selected &&
            <Animated.View {...this.state.panResponder.panHandlers} style={[styles.bigSmiley, {
              transform: [{
                translateX: this._pan.interpolate({
                  inputRange: [0, END],
                  outputRange: [0, END],
                  extrapolate: 'clamp',
                })
              }]
            }]}>
              {this.reactions.map((reaction, idx) => {
                let inputRange = [(idx - 1) * DISTANCE, idx * DISTANCE, (idx + 1) * DISTANCE];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx * DISTANCE, (idx + 1) * DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == this.reactions.length - 1) {
                  inputRange = [(idx - 1) * DISTANCE, idx * DISTANCE];
                  outputRange = [0, 1];
                }

                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[styles.bigSmileyImage, {
                      opacity: this._pan.interpolate({
                        inputRange,
                        outputRange,
                        extrapolate: 'clamp',
                      })
                    }]}
                  />
                );
              })}
            </Animated.View>
            }
          </View>
        </View>
      </View>
    );
  }
}

const fractionsType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'number') {
      return value >= 0 && value <= 20
        ? null
        : new Error(`\`${propName}\` in \`${componentName}\` must be between 0 and 20`);
    }

    return new Error(`\`${propName}\` in \`${componentName}\` must be a number`);
  }
};

EmojiFeedback.propTypes = {
  type: PropTypes.string,
  ratingColor: PropTypes.string,
  ratingBackgroundColor: PropTypes.string,
  ratingCount: PropTypes.number,
  ratingTextColor: PropTypes.string,
  imageSize: PropTypes.number,
  onStartRating: PropTypes.func,
  onFinishRating: PropTypes.func,
  showRating: PropTypes.bool,
  style: ViewPropTypes.style,
  readonly: PropTypes.bool,
  startingValue: PropTypes.number,
  minValue: PropTypes.number,
  defaultRating: PropTypes.number,
  reviews: PropTypes.array,
  images: PropTypes.object
};

const size = verticalScale(42);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  wrap: {
    width: WIDTH,
    marginBottom: 50,
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Avenir',
    marginBottom: 50,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Avenir',
    marginTop: 10,
    width: 60
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  }
});