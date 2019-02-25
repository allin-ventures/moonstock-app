/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import StockSwiper from './src/components/StockSwiper'; 

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <Container style={styles.pageContainer}>
        <Body style={styles.body}>
          <StockSwiper />
        </Body>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  body: {
    backgroundColor: '#000',
    paddingVertical: 40,
  }
});
