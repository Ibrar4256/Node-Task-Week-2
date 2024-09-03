const userService = require("../services/user");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.validateUser(req.body);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = userService.generateToken(user);
    res.status(201).json({ message: "Successfully, logged In", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// exports.logout = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await userService.getUserById(userId);
//     if (!user) return res.status(404).json({ message: "User Not Found" });
//     res.cookie("token", "");
//     res.status(200).json({ message: "Successfully, logged Out and token is removed"});
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await userService.AllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await userService.getUserProducts(userId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
