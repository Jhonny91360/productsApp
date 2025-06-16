import {isAxiosError} from 'axios';
import {testloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock) ?? 0;
  product.price = Number(product.price) ?? 0;

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error('Not implemented');
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

const prepareImages = (images: string[]) => {
  // todo revisar los files
  return images.map(image => image.split('/').pop());
};
