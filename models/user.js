import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Only hash the password if it’s new or has been modified
  if (this.isModified("password") || this.isNew) {
    try {
      // Hash the password with a salt round of 10
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash; // Replace the plaintext password with the hashed one
      next();
    } catch (err) {
      next(err); // Pass any errors to the next middleware
    }
  } else {
    next(); // If password is unchanged, continue without hashing
  }
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model based on the schema
const User = mongoose.model("users", userSchema);

export default User;
