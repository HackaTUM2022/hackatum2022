import * as mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';
import Order from './order.model.js';
import Match from './match.model.js';
import Game from './game.model.js';

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.order = Order;
db.match = Match;
db.game = Game;

const ROLES = ['user', 'admin', 'moderator'];
const CONSTANTS = {
    SUCCESS: 'success',
    ERROR: 'error',
    BUY: 'buy',
    SELL: 'sell',
};

export {
    User, Role, ROLES, CONSTANTS, Order, Match, Game,
};
