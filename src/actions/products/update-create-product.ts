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
const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.includes('file://'));
  const currentImages = images.filter(image => !image.includes('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(image => uploadImage(image));
    const uploadImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadImages);
  }
  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const {data} = await testloApi.post<{image: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data.image;
};

// todo revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...restProduct} = product;

  try {
    const checkedImages = await prepareImages(images);
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
    const checkedImages = await prepareImages(images);
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
