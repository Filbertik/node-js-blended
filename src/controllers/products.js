const services = require('../services/products');
const createError = require('http-errors');

const getAllProducts = async (req, res) => {
  const products = await services.getAll();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await services.getById(productId);
  if (!product) throw createError(404, 'Product not found');

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

const createProduct = async (req, res) => {
  const product = await services.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await services.update(productId, req.body);
  if (!product) throw createError(404, 'Product not found');

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await services.remove(productId);
  if (!product) throw createError(404, 'Product not found');

  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
