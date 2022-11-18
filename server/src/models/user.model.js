import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        street: String,
        zipCode: String,
        city: String,
        country: String,
        roles: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Role',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
export default User;
