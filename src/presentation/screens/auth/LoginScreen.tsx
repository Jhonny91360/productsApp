/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}
export const LoginScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [isPosting, setIsPosting] = useState(false);

  const {login} = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await login(form.email, form.password);

    setIsPosting(false);

    if (wasSuccessful) {
      return;
    }

    Alert.alert('Error', 'Credenciales incorrectas');
  };

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
            placeholder="Correo electrónico"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
            keyboardType="email-address"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="mail-outline" />}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
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
            onPress={onLogin}
            disabled={isPosting}>
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
