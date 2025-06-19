import {testloApi} from '../../config/api/tesloApi';
import {Gender, Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

const emptyProduct: Product = {
  id: '',
  title: 'Nuevo producto',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
  images: [],
};
export const getProductById = async (productId: string): Promise<Product> => {
  if (productId === 'new') {
    // Esto se recibe en la pantalla ProductScreen cuando es un producto nuevo
    return emptyProduct;
  }
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
