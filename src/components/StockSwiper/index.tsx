import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Defs, Stop, LinearGradient } from 'react-native-svg';
import { Container, Header, Title, Content, Footer, Form, Input, Item, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import SwipeCards from 'react-native-snap-carousel';
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import stripe from 'tipsi-stripe';



import { next, meta } from '../../api';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#28264C',
    padding: 10,
  },
  headerText: {
    color: 'white',
  }
});

export interface StockSwiperProps {
}

export default class StockSwiper extends React.Component<StockSwiperProps, any> {
  state = {
    isLoading: true,
    stocks: [],
    getCreditCard: true,
    token: null,
    loading: false,
  }

  constructor(props: StockSwiperProps) {
    super(props);
  }

  async componentDidMount() {
    const response = await next();
    try {
      const metaResp = await meta(); 
      const config = metaResp.data;
      console.log("Meta is", config.stripe.publishableKey);

      stripe.setOptions({
        publishableKey: config.stripe.publishableKey,
        androidPayMode: 'test',
      })
    } catch (e) {
      console.warn(e)
    }
    
    this.setState({ isLoading: false, stocks: response.data });
  }
  
  submitCC() {
    try {
      this.setState({ loading: true, token: null })
      console.log(stripe.paymentRequestWithCardForm)
      stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      }).then( (token) => {
        this.setState({ loading: false, token })
      })

  
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  renderCreditCard() {
    if (this.state.getCreditCard) {
      return <Card>
          <CardItem style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
          <Content>
            <Form>
              <Button full primary onPress={() => { this.submitCC() }} >
                <Text>Submit</Text>
              </Button>
            </Form>
           </Content>
           </CardItem>
        </Card>
    } else {
      return <></>
    }
  }

  public renderItem = ({item}: any) => {  
    return (
      <Card>
        {this.renderCreditCard()}
        <CardItem style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
          <Content>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.symbol}</Text>
              <View>
                <Text style={styles.headerText}>{item.progress}</Text>
              </View>
            </View>
            <View pointerEvents="none">
              <VictoryChart domainPadding={{ x : [10, 40] }}>
                <VictoryLine
                  //animate={true}
                  style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={item.prediction.graph}
                />
                <VictoryAxis 
                  orientation="left"
                />
              </VictoryChart>
            </View>
            <Text style={{padding: 10}}>{item.prediction.text}</Text>
          </Content>
        </CardItem>
      </Card>
    );
  }

  public render() {
    if(this.state.isLoading) {
      return <ActivityIndicator />;    
    }
    return (
      <SwipeCards
        verticalSwipe={false}
        cardVerticalMargin={0}
        data={this.state.stocks}
        renderItem={this.renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 60}
      />
    );
  }
}
