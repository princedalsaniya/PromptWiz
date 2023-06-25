import { Schema, model, models } from "mongoose";

/*
  desc      : Model - User
  route     : -
  requires  : Schema = to create new user Schema
              model  = to create new user model
              models = to check if the user exists in the models or not
                       If not then create a new one otherwise use the existing one.
  exports   : User {email, username, image}
  author    : Prince Dalsaniya
*/

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
