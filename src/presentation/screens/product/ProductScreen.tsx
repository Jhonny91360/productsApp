import React, {useRef} from 'react';

import {MainLayout} from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {useQuery} from '@tanstack/react-query';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {FlatList, ScrollView} from 'react-native';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Size} from '../../../domain/entities/product';
import {MyIcon} from '../../components/ui/MyIcon';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kid, Gender.Unisex];
export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);

  const theme = useTheme();

  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60, // 1h
    queryFn: () => {
      return getProductById(productIdRef.current);
    },
  });

  return (
    <MainLayout title={`${product?.title ?? 'Product'} `}>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView style={{flex: 1}}>
          {/* Imagenes del producto */}
          <Layout>
            <FlatList
              data={product?.images}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <FadeInImage
                  uri={item}
                  style={{width: 300, height: 300, marginHorizontal: 10}}
                />
              )}
            />
          </Layout>

          {/* Formulario */}
          <Layout style={{marginHorizontal: 10}}>
            <Input
              label={'Titulo'}
              value={product?.title}
              style={{marginVertical: 5}}
            />
            <Input
              label={'Slug'}
              value={product?.slug}
              style={{marginVertical: 5}}
            />
            <Input
              label={'Descripción'}
              value={product?.description}
              multiline
              numberOfLines={5}
              style={{marginVertical: 5}}
            />
          </Layout>

          {/* Precio y stock */}
          <Layout
            style={{
              marginHorizontal: 15,
              marginVertical: 5,
              flexDirection: 'row',
              gap: 10,
            }}>
            <Input
              label={'Precio'}
              value={product?.price.toString()}
              style={{flex: 1}}
            />
            <Input
              label={'Inventario'}
              value={product?.stock.toString()}
              style={{flex: 1}}
            />
          </Layout>

          {/* Selectores */}
          <ButtonGroup
            size="small"
            appearance="outline"
            style={{
              marginHorizontal: 15,
              margin: 2,
              marginTop: 20,
            }}>
            {sizes.map(size => (
              <Button
                key={size}
                style={{
                  flex: 1,
                  backgroundColor: true
                    ? theme['color-primary-200']
                    : undefined,
                }}>
                {size}
              </Button>
            ))}
          </ButtonGroup>

          <ButtonGroup
            size="small"
            appearance="outline"
            style={{
              marginHorizontal: 15,
              margin: 2,
              marginTop: 20,
            }}>
            {genders.map(gender => (
              <Button
                key={gender}
                style={{
                  flex: 1,
                  backgroundColor: true
                    ? theme['color-primary-200']
                    : undefined,
                }}>
                {gender}
              </Button>
            ))}
          </ButtonGroup>
          {/* Boton guardar */}

          <Button
            accessoryLeft={<MyIcon name="save-outline" white size={25} />}
            style={{
              marginHorizontal: 15,
              margin: 2,
              marginTop: 20,
            }}
            onPress={() => {
              console.log('Guardando...');
            }}>
            Guardar
          </Button>

          {/* Solo para las pruebas */}
          <Text>{JSON.stringify(product, null, 2)}</Text>

          {/* Espacio final */}
          <Layout
            style={{
              height: 200,
            }}
          />
        </ScrollView>
      )}
    </MainLayout>
  );
};
