import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// firstName
// lastName
// email
// password
//   age
//   picturePath
//   location
//   occupation

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    job: String,
    dob: { type: Date },
    username: {
      type: String,
      default: "",
      min: 2,
      max: 50,
      unique: true
    },
    latestNotes: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'notes', 
    }],
    latestFolders: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'folders', 
    }],
    importantNotes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'notes', 
    }],
    importantFolders: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'folders', 
    }],
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (data) {
  var { firstName, lastName, email, password, dob, ...others } = data;
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
  if (!email || !password || !firstName || !lastName) {
    throw new Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password not strong enough");
  }
  if (dob) {
    dob = new Date(dob);
  }
  console.log(dob);
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    dob,
    ...others,
  });

  return user;
};

UserSchema.statics.login = async function (emailOrPassword, password) {
  console.log(emailOrPassword, password)
  if (!emailOrPassword || !password) {
    throw new Error("All fileds must be filled.");
  }
  const user = await this.findOne({
    $or: [
      { email: emailOrPassword },
      { username: emailOrPassword }
    ]
  });
  if (!user) {
    throw Error("Entered Email Or username Not Exist please SignUp");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;