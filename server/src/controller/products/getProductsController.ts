import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Product from '../../database/models/Product';

const getProducts = async (req: Request, res: Response) => {
  const {
    q,
    categoryId,
    minPrice,
    maxPrice,
    limit = 10,
    page = 1,
  }: any = req.query;

  try {
    const product = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description', 'categoryId'],
      limit,
      offset: (page - 1) * limit,
      where: {
        [Op.and]: [
          q && { name: { [Op.iLike]: `%${q}%` } },
          categoryId && { categoryId },
          minPrice
            && maxPrice && {
            price: {
              [Op.between]: [
                minPrice || 0,
                maxPrice || Number.MAX_SAFE_INTEGER,
              ],
            },
          },
        ],
      },
    });
    res.json({ status: 200, product });
  } catch (error: any) {
    throw new Error('replce with cutiomized error');
  }
};

export default getProducts;
