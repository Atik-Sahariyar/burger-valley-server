const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "User name is required"],
      trim: true,
      maxlength: [30, "User name length can be maximum 30 characters"],
      minlenght: [3, "User name length can be minimum 3 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlenght: [6, "User password length can be minimum 6 characters"],
    },
    profile: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isFirstLogin: Boolean,
  },
  { timestamps: true }
);

// hash the password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
