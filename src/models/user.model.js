import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    fullName: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    role: {
      type: String,
      enum: ["admin", "writer", "guest"],
    },
    age: {
      type: Number,
      max: 99,
    },
    numberOfArticles: {
      type: Number,
      default: 0,
    },
    // articles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Article",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});
userSchema.pre("save", function (next) {
  if (this.age < 0) {
    this.age = 1;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
