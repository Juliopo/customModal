## Custom Modal(with custom animations) component for react-native

### Installation
```bash
npm install react-native-custom-modal
```

if you want save in your package `npm install react-native-custom-modal --save`


### Props
```
animatedLeave='rightToLeft'
animatedLeave='leftToRight'
animatedLeave='topToBottom'
animatedLeave='bottomToTop'

animatedEntry='rightToLeft'
animatedEntry='leftToRight'
animatedEntry='topToBottom'
animatedEntry='bottomToTop'

duration={300} // Animation duration in milliseconds 

The default values if you don't specify the props will be animatedEntry='bottomToTop' and animatedLeave='topToBottom'
```

### Usage example
```javascript

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import CustomModal from 'react-native-custom-modal'

export default class Implementation extends Component {
  constructor() {
    super()
    this.state = {
      isCMShowing: false
    }
  }

  _contentForModal() {
    return (
      <View style={styles.contentModalContainer}>
        <Text style={{color: 'white' }}>This is the Modal example Content</Text>
        <TouchableWithoutFeedback onPress={() => this.setState({isCMShowing: false})}>
          <Text style={ {color: 'white', fontSize: 30}}>X</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.setState({isCMShowing: true })}>
          <Text>Click me</Text>
        </TouchableWithoutFeedback>
        <CustomModal  visible={this.state.isCMShowing} duration={300} animatedLeave='leftToRight' animatedEntry='bottomToTop'>
          { this._contentForModal() }
        </CustomModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
})
```
![alt tag](http://goo.gl/jEMh2G)
