import * as mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

const ROLES = ['user', 'admin', 'moderator'];

export {
    User, Role, ROLES,
};
