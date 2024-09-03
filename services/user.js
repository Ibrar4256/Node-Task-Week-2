const User = require("../models/user");
const jwt = require("jsonwebtoken");
const UserDTO = require("../Mapper/user.dto");

class UserService {
  async createUser(data) {
    const user = new User(data);
    await user.save();

    return { user: new UserDTO(user) };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 30000 }
    );
  }

  async validateUser(email, password) {
    const user = await User.findOne({ email });
    if (user && (await user.isValidPassword(password))) {
      return new UserDTO(user);
    }
    return null;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    return new UserDTO(user);
  }

  async AllUsers() {
    const users = await User.find();
    return { user: users.map((user) => new UserDTO(user)) };
  }

  async getUserProducts(userId) {
    const user = await User.findById(userId).populate(
      "products",
      "name price description"
    );

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.products.length) {
      throw new Error("No products found for this user");
    }
  }
}

module.exports = new UserService();
