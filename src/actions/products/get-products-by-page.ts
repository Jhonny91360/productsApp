import {testloApi} from '../../config/api/tesloApi';
import type {Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit = 20,
): Promise<Product[]> => {
  console.log('getProductsByPage', page, limit);
  try {
    const {data} = await testloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );

    const products = data.map(ProductMapper.tesloProducToEntity);

    return products;
  } catch (error) {
    console.log('Error in getProductsByPage: ', error);
    throw new Error('Error getting products');
  }
};
