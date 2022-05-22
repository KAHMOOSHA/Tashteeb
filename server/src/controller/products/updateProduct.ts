import { Request, Response } from 'express';

import { Product } from '../../database';
import CustomizeError from '../../error/customizeError';
import handleUnknownExceptions from '../../error/handleUnkownError';
import updateProductValidation from '../../validaiton/updateProductValidation';
import upload from '../../middlewares/cloudinary';

const updateProduct = async (req: Request, res: Response) => {
  try {
    await updateProductValidation(req);
    const {
      id,
    } = req.params;

    const {
      name, price, description,
    } = req.body;
    let { image } = req.body;

    let product = await Product.findByPk(id, {
      include: 'category',
    });
    if (!product) {
      throw new CustomizeError(404, 'Product not found!');
    }

    if (image) {
      image = await upload(image, 'images');
      product.image = image;
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.category.updateAttributes({});
    product = await product.save();

    // await product.update({
    //   name,
    //   price,
    //   description,
    //   categoryId,
    // });

    // product = await Product.findByPk(id, {
    //   include: 'category',
    // });

    res.status(201).json({ message: 'Product updated', data: product });
  } catch (err) {
    console.log(err);
    handleUnknownExceptions(err, res);
  }
};

export default updateProduct;
