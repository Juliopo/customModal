import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import CustomModal from './CustomModal'

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
        <CustomModal  visible={this.state.isCMShowing} animatedLeave='leftToRight' animatedEntry='bottomToTop'>
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
});
