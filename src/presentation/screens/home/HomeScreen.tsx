/* eslint-disable react-native/no-inline-styles */
import Icon from '@react-native-vector-icons/ionicons';
import {Button, Layout} from '@ui-kitten/components';
import React from 'react';
import {Text} from 'react-native';

export const HomeScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        accessoryRight={<Icon name="logo-facebook" size={30} color="white" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
