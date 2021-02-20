/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import stripe from 'tipsi-stripe'
import Button from './components/Button';
import { demoCardFormParameters } from './scenes/demodata/demodata';

stripe.setOptions({
  publishableKey: 'pk_test_51HQveOJv9YLAD6yODgWIgRXkMHo9eTB6ojRIaafEMkHX0ycMClsS60rhhuLCPw7Ugb0Jtx5ovVs515JIV6cLWIlh00bxyYqBod'
})
export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    paymentMethod: null,
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, paymentMethod: null })

      const paymentMethod = await stripe.paymentRequestWithCardForm(demoCardFormParameters)

      this.setState({ loading: false, paymentMethod })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, paymentMethod } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>Click button to show Card Form dialog.</Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
        <View style={styles.paymentMethod} >
          {paymentMethod && (
            <Text style={styles.instruction}>Payment Method: {JSON.stringify(paymentMethod.id)}</Text>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
})
