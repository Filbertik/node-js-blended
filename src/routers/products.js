const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/products');
const ctrlWrapper = require('../utils/ctrlWrapper');

router.get('/', ctrlWrapper(ctrl.getAllProducts));
router.get('/:productId', ctrlWrapper(ctrl.getProductById));
router.post('/', ctrlWrapper(ctrl.createProduct));
router.patch('/:productId', ctrlWrapper(ctrl.updateProduct));
router.delete('/:productId', ctrlWrapper(ctrl.deleteProduct));

module.exports = router;
