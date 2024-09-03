const categoryService = require("../services/category");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(req.body);
    res
      .status(201)
      .json({ message: "Category Created Successfully", category });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
