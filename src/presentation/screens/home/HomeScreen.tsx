/* eslint-disable react-native/no-inline-styles */
import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';

export const HomeScreen = () => {
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1h
    queryFn: () => getProductsByPage(0),
  });
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{JSON.stringify(products, null, 2)} </Text>
      <Text>{isLoading}</Text>
    </Layout>
  );
};
