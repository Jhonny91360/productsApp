/* eslint-disable react-native/no-inline-styles */
import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {MyIcon} from '../../components/ui/MyIcon';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout} = useAuthStore();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        onPress={logout}
        accessoryRight={<MyIcon name="log-out-outline" size={30} white />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
