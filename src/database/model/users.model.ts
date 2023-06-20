import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    username: string
    email: string
    password: string
}

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model<IUser>('User', UserSchema)
