import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Modal,
  Animated
} from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class customModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.animationX = new Animated.Value(0)
    this.animationY = new Animated.Value(0)
    this.fadeAnimation = new Animated.Value(0)
  }

  getInitialConfig() {
    let { animatedEntry , animatedLeave } = this.props
    if(!animatedEntry) animatedEntry = 'default'
    if(!animatedLeave) animatedLeave = 'default'

    switch (animatedEntry) {
      case 'leftToRight':
        this.animationX.setValue(-deviceWidth)
        this.animationY.setValue(0)
      break

        case 'rightToLeft':
          this.animationX.setValue(deviceWidth)
          this.animationY.setValue(0)
        break

        case 'bottomToTop':
          this.animationX.setValue(0)
          this.animationY.setValue(deviceHeight)
        break

          case 'topToBottom':
            this.animationX.setValue(0)
            this.animationY.setValue(-deviceHeight)
          break

          default:
            this.animationX.setValue(0)
            this.animationY.setValue(deviceHeight)
          break
    }

    this.setState({visible: false})
  }

  componentWillMount() {
    this.getInitialConfig()
  }

  componentWillReceiveProps(props) {
    let { visible, animatedEntry, animatedLeave, duration } = props
    if(!animatedEntry) animatedEntry = 'default'
    if(!animatedLeave) animatedLeave = 'default'
    if(!duration) duration = 300

    if(!visible) {
      switch (animatedLeave) {
        case 'leftToRight':
          Animated.timing(this.animationX, {
            toValue: deviceWidth,
            duration: duration
          }).start( () => this.getInitialConfig())
        break

        case 'rightToLeft':
          Animated.timing(this.animationX, {
            toValue: -deviceWidth,
            duration: duration
          }).start( () => this.getInitialConfig())
        break

        case 'topToBottom':
          Animated.timing(this.animationY, {
            toValue: deviceHeight,
            duration: duration
          }).start( () => this.getInitialConfig())
        break

        case 'bottomToTop':
          Animated.timing(this.animationY, {
            toValue: -deviceHeight,
            duration: duration
          }).start( () => this.getInitialConfig())
        break

        default:
          Animated.timing(this.animationY, {
            toValue: deviceHeight,
            duration: duration
          }).start( () => this.getInitialConfig())
          break
      }
    } else {
      this.setState({visible: true})
    }
  }


  componentDidUpdate() {
    let { visible, animatedEntry, animatedLeave, duration } = this.props
    if(!animatedEntry) animatedEntry = 'default'
    if(!animatedLeave) animatedLeave = 'default'
    if(!duration) duration = 300

    if(visible) {
      if(animatedEntry === 'rightToLeft' || animatedEntry === 'leftToRight') {
        Animated.timing(this.animationX, {
          toValue: 0,
          duration: duration
        }).start()
      } else {
        Animated.timing(this.animationY, {
          toValue: 0,
          duration: duration
        }).start()
      }
    }
  }


  render() {
    const { children, visible } = this.props
    if (this.state.visible) {
      return (
        <Modal visible={true} transparent={true} style={{flex:1}}>
          <Animated.View style={[styles.container, { left: this.animationX, top: this.animationY }]}>
              { children }
          </Animated.View>
        </Modal>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    top: 0,
    left: 0
  }
});
