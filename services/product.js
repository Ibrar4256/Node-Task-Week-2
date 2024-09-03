const multer = require("multer");
const path = require("path");
const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");
const ProductDTO = require("../Mapper/product.dto");

class ProductService {
    async createProduct(data, files) {
        const imageUrls = files.map((file) => `/images/${file.filename}`);
        const productData = { ...data, images: imageUrls };
        const product = new Product(productData);
        await product.save();
    
        await Category.findByIdAndUpdate(product.category, {
          $push: { products: product._id },
        });
    
        await User.findByIdAndUpdate(product.user, {
          $push: { products: product._id },
        });
    
        return { product: new ProductDTO(product) };
}
  async updateProduct(productId, updateData, files) {
    const originalProduct = await Product.findById(productId);

    if (!originalProduct) {
      throw new Error("Product not found");
    }

    if (files && files.length > 0) {
      const imageUrls = files.map((file) => `/images/${file.filename}`);
      updateData.images = imageUrls;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    if (updateData.category !== originalProduct.category) {
      await Category.updateMany(
        {},
        { $pull: { products: updatedProduct._id } }
      );
      await Category.findByIdAndUpdate(updateData.category, {
        $push: { products: updatedProduct._id },
      });
    }

    return { updatedProduct: new ProductDTO(updatedProduct) };
  }

  async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);

    console.log(product);

    if (product) {
      await Category.updateMany({}, { $pull: { products: product._id } });

      await User.updateMany({}, { $pull: { products: product._id } });
    }
    return { product: new ProductDTO(product) };
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    return { product: new ProductDTO(product) };
  }

  async getProductsByUser(userId) {
    return await Product.find({ user: userId })
      .select("-__v -_id")
      .populate("category", "name -_id")
      .populate("user", "name email -_id");
  }

  async getProductsByCategory(categoryId) {
    return await Product.find({ category: categoryId }).select(
      "-__v -_id -user -category"
    );
    //   .populate("category", 'name -_id')
    //   .populate("user", 'name email -_id')
  }

  async AllProducts() {
    const products = await Product.find()
      .populate("category", "name -_id")
      .populate("user", "name email -_id");

    return { product: products.map((product) => new ProductDTO(product)) };
  }
}

module.exports = new ProductService();
