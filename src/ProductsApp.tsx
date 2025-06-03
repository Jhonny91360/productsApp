import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {useColorScheme} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AuthProvider} from './presentation/provider/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const ProductsApp = () => {
  const colorSheme = useColorScheme();
  const theme = colorSheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorSheme === 'dark' ? theme['color-basic-800'] : theme['color-basic-100'];
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          // configuracion para evitar flasheos por cambios de tema entre pantallas
          theme={{
            dark: colorSheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
            fonts: {
              regular: {fontFamily: 'System', fontWeight: 'normal'},
              medium: {fontFamily: 'System', fontWeight: '500'},
              bold: {fontFamily: 'System', fontWeight: 'bold'},
              heavy: {fontFamily: 'System', fontWeight: '900'},
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};
