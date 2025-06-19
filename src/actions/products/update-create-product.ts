import {isAxiosError} from 'axios';
import {testloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock) ?? 0;
  product.price = Number(product.price) ?? 0;

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};
const prepareImages = (images: string[]) => {
  // todo revisar los files
  return images.map(image => image.split('/').pop());
};

// todo revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...restProduct} = product;

  try {
    const checkedImages = prepareImages(images);
    const {data} = await testloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...restProduct,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {id, images = [], ...restProduct} = product;

  try {
    const checkedImages = prepareImages(images);
    const {data} = await testloApi.post('/products/', {
      images: checkedImages,
      ...restProduct,
    });
    return data;
  } catch (error) {
    console.log('Error in createProduct: ', error);
    throw new Error('Error creating product');
  }
};
