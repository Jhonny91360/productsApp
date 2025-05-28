/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}
export const LoginScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.25}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar </Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo"
            autoCapitalize="none"
            keyboardType="email-address"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="mail-outline" />}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-closed-outline" />}
          />
        </Layout>

        {/* Space */}

        <Layout style={{height: 10}} />

        {/* Button */}

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => console.log('button pressed')}>
            Ingresar
          </Button>
        </Layout>

        {/* Información para crear cuenta */}
        <Layout style={{height: 20}} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}>
          <Text>¿No tienes una cuenta?</Text>
          <Text
            category="s1"
            status="primary"
            onPress={() => navigation.navigate('RegisterScreen')}>
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
