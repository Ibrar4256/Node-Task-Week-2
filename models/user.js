const mongoose = require("mongoose");
const { hash, compare } = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

userSchema.method("isValidPassword", async function (password) {
  const isValid = await compare(password, this.password);
  return isValid;
});

module.exports = mongoose.model("User", userSchema);
