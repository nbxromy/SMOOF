/* @flow */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';

const ContactList = (props) => {

  const list = ({allContacts}) => {
    if(allContacts) {
      return allContacts.map((item) => {
        return (
          <ListItem key={item.id} avatar>
            <Left>
              <Thumbnail source={{ uri: `${item.image}`}}/>
            </Left>
            <Body>
              <Text>{`${item.first_name} ${item.last_name}`}</Text>
              <Text note>{`${item.phone_number}`}</Text>
            </Body>
            <Right style={{justifyContent: 'center'}}>
              <Icon name="heart" style={{paddingRight: 5, fontSize: 30}} />
            </Right>
          </ListItem>
        )
      })
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <List>
          {list(props)}
        </List>
      </Content>
    </Container>
  )
}

export default ContactList;
