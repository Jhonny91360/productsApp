/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ProductsList} from '../../components/products/ProductsList';
import {FAB} from '../../components/ui/FAB';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1h
  //   queryFn: () => getProductsByPage(0),
  // });

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1h

    initialPageParam: 0,
    queryFn: params => {
      console.log('Params', params);
      return getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subTitle="Aplicación administrativa"
        rightAction={() => console.log('right action')}
        rightActionIcon="add-circle-outline">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductsList
            products={data?.pages?.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        )}
      </MainLayout>
      <FAB
        iconName="add-outline"
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};
