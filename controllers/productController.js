const upload = require('../Middleware/uploadImages');
const productService = require("../services/product");

exports.addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      const { images,name, description, price, category, user } = req.body;
      const product = await productService.createProduct(req.body, req.files);
      res.status(201).json({ message: "Product Created Successfully", product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

exports.updateProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      const productId = req.params.id;
      const { images,name, description, price, category } = req.body;
      const product = await productService.updateProduct(productId, req.body, req.files);
      res.status(200).json({ message: "Product Updated Successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.deleteProduct(productId);
    res
      .status(200)
      .json({
        message: "The Following product has been Deleted Successfully",
        product,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res
      .status(200)
      .json({message: "The Following product has been retrievd",
        product
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  exports.getProductsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const products = await productService.getProductsByUser(userId);

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const products = await productService.getProductsByCategory(categoryId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.fetchAllProducts = async (req,res) => {
    try{
        const products = await productService.AllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

