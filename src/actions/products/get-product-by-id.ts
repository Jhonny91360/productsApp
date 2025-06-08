import {testloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await testloApi.get<TesloProduct>(
      `/products/${productId}`,
    );
    const product = response.data;
    return ProductMapper.tesloProducToEntity(product);
  } catch (error) {
    console.log('Error in getProductById: ', error);
    throw new Error('Error getting product');
  }
};
