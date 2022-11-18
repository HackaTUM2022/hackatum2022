import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    },
);

const Role = mongoose.model('Role', roleSchema);
export default Role;
