/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Product} from '../../../domain/entities/product';
import {Layout, List} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';
import {RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}
export const ProductsList = ({products, fetchNextPage}: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    // sleep 2 sec
    await new Promise(resolve => setTimeout(resolve, 500));
    queryClient.invalidateQueries({queryKey: ['products', 'infinite']}); // refresh
    //await fetchNextPage();
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}}></Layout>}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.6}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
