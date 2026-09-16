import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "First name must be at least 3 character long"],
        maxLength: [30, "First name must not be much than 30 Character"]
    },
   
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Last name must be at least 3 character long"],
        maxLength: [30, "Last name must not be much than 30 Character"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },

    phoneNumber: {
        type: Number,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },

    address: [addressSchema],
});


export default mongoose.model("user", userSchema);