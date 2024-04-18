import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";

const saltRounds = 10;
const userRoles = ["patient", "nurse", "responder"];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        (password) => password && password.length >= 6,
        "Password should be longer",
      ],
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      match: [/^\d{3}-\d{3}-\d{4}$/, "Please fill a valid phone number"],
    },
    role: {
      type: String,
      enum: userRoles,
      default: "patient",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Set the 'fullname' virtual property
userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Use a pre-save hook to hash the user's password before saving the user
userSchema.pre("save", function (next) {
  // hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Create an instance method to validate the user's password
userSchema.methods.authenticate = function (password) {
  // compare the hashed password of the database
  // with the hashed version of the input password
  return this.password === bcrypt.hashSync(password, saltRounds);
};

const User = model("User", userSchema);

export default User;
