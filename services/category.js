const Category = require("../models/category");
const CategoryDTO = require("../Mapper/category.dto");

class CategoryService {
  async createCategory(data) {
    const category = new Category(data);
    await category.save();

    return { category: new CategoryDTO(category) };
  }
}

module.exports = new CategoryService();
