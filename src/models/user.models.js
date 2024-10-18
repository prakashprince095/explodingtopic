import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a username"],
        unique: true,

    },
    email: {
        type: String,
        required: [true, "Please Provide a email"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiery: String,
    VerifyToken: String,
    VerifyTokenExpiry: Date,
});


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
