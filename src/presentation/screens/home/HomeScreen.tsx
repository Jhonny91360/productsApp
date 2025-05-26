import {Button, Layout} from '@ui-kitten/components';
import React from 'react';
import {Text} from 'react-native';

export const HomeScreen = () => {
  return (
    <Layout>
      <Text>HomeScreen</Text>

      {/* <Icon name="facebook" /> */}
      <Button
      // accessoryLeft={<Icon name="facebook" />}
      >
        Cerrar sesión
      </Button>
    </Layout>
  );
};
