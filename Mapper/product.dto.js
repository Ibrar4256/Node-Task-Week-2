module.exports = class ProductDTO {
    constructor(product) {
      this.images = product.images,
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
    }
  }
  