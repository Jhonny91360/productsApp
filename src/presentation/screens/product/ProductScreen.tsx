/* eslint-disable react-native/no-inline-styles */
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
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {FlatList, ScrollView} from 'react-native';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Product, Size} from '../../../domain/entities/product';
import {MyIcon} from '../../components/ui/MyIcon';
import {Formik} from 'formik';
import {updateCreateProduct} from '../../../actions/products/update-create-product';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kid, Gender.Unisex];
export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);

  const theme = useTheme();

  const queryClient = useQueryClient();

  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60, // 1h
    queryFn: () => {
      return getProductById(productIdRef.current);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // creación

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']}); // refresh product list
      queryClient.invalidateQueries({queryKey: ['product', data.id]}); // refresh product
      // queryClient.setQueryData(['product',data.id], data); // opcion 2 , set data directly
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
        <MainLayout
          title={`${values?.title ?? 'Product'} `}
          subTitle={`Precio: $${values?.price}`}>
          {isLoading ? (
            <FullScreenLoader />
          ) : (
            <ScrollView style={{flex: 1}}>
              {/* Imagenes del producto */}
              <Layout>
                <FlatList
                  data={values?.images}
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
                  style={{marginVertical: 5}}
                  value={values?.title}
                  onChange={e => handleChange('title')(e.nativeEvent.text)}
                />
                <Input
                  label={'Slug'}
                  style={{marginVertical: 5}}
                  value={values?.slug}
                  onChange={e => handleChange('slug')(e.nativeEvent.text)}
                />
                <Input
                  label={'Descripción'}
                  multiline
                  numberOfLines={5}
                  style={{marginVertical: 5}}
                  value={values?.description}
                  onChange={e =>
                    handleChange('description')(e.nativeEvent.text)
                  }
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
                  style={{flex: 1}}
                  onChange={e => handleChange('price')(e.nativeEvent.text)}
                  value={values?.price.toString()}
                  keyboardType="numeric"
                />
                <Input
                  label={'Inventario'}
                  style={{flex: 1}}
                  value={values?.stock.toString()}
                  onChange={e => handleChange('stock')(e.nativeEvent.text)}
                  keyboardType="numeric"
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
                    onPress={() =>
                      setFieldValue(
                        'sizes',
                        values?.sizes.includes(size)
                          ? values?.sizes.filter(s => s !== size)
                          : [...values?.sizes, size],
                      )
                    }
                    key={size}
                    style={{
                      flex: 1,
                      backgroundColor: values?.sizes.includes(size)
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
                    onPress={() => setFieldValue('gender', gender)}
                    key={gender}
                    style={{
                      flex: 1,
                      backgroundColor:
                        gender === values?.gender
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
                  handleSubmit();
                }}
                disabled={mutation.isPending}>
                Guardar
              </Button>

              {/* Solo para las pruebas */}
              <Text>{JSON.stringify(values, null, 2)}</Text>

              {/* Espacio final */}
              <Layout
                style={{
                  height: 200,
                }}
              />
            </ScrollView>
          )}
        </MainLayout>
      )}
    </Formik>
  );
};
