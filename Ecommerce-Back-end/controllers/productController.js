const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const { NotFoundError, BadRequestError } = require('../errors')

const createProduct = async (req, res) => {
  const { name, description, price, category, coverImage, imagesUrl, videoUrl } = req.body

  const product = await Product.create({
    name,
    description,
    price,
    category,
    coverImage,
    imagesUrl,
    videoUrl,
    user: req.user.userId
  })

  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const { name, category, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    queryObject.category = category;
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'averageRating'];

    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        const mongoField = field === 'averageRating' ? 'rating.averageRating' : field;

        queryObject[mongoField] = {
          ...queryObject[mongoField],
          [operator]: Number(value)
        };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('-createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);


  const products = await result;

  res.status(StatusCodes.OK).json({ products, count: products.length });
}

const getProduct = async (req, res) => {
  const { params: { id: productId } } = req
  const product = await Product.findById(productId)

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}

const getTopRatedProducts = async (req, res) => {
  const products = await Product.find({}).sort('-averageRating').limit(5);

  res.status(StatusCodes.OK).json({ products });
};

const updateProduct = async (req, res) => {
  const {
    params: { id: productId },
    body: { description, price, stock, imagesUrl },
  } = req
  if (description == "" || imagesUrl == "") {
    throw new BadRequestError('You can not send an empty request')
  }

  const product = await Product.findOneAndUpdate({ _id: productId }, { description, price, stock, imagesUrl }, { new: true, runValidators: true })
  if (!product) {
    throw new NotFoundError(`no product with id ${productId} `)
  }
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {

  const { params: { id: productId } } = req
  const product = await Product.findOneAndDelete({ _id: productId })

  if (!product) {
    throw new NotFoundError(`no product with id ${productId} `)
  }

  res.status(StatusCodes.OK).send()
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getTopRatedProducts,
  updateProduct,
  deleteProduct
}