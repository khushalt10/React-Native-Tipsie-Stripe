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
import axios from 'axios'
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

  makePayment = async() => {
    this.setState({ loading: true})

    axios({
      method: 'POST',
      url:'https://us-central1-react-native-stripe-e2839.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: 102,
        currency: 'inr',
        token: this.state.paymentMethod.id
      }
    }).then( res => {
      console.log(res);
      this.setState({ loading: false})
    })
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
            <>
              <Text style={styles.instruction}>Payment Method: {JSON.stringify(paymentMethod.id)}</Text>
              <Button text="Make Payment" loading={loading} onPress={this.makePayment} />
            </>
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
