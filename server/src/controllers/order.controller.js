/* eslint-disable no-case-declarations */
import { Order, CONSTANTS } from '../models/index.js';
import { addOrder, deleteOrder, matchOrder } from './order.helper.js';

const createOrder = async (req, res) => {
    try {
        // Update the orders
        switch (req.body.request) {
        case 'add':
            await addOrder(req, res);

            break;

        case 'delete':
            await deleteOrder(req, res);

            break;
        default:
            res.status(200).send(
                {
                    status: CONSTANTS.ERROR,
                    message: 'Invalid order type',
                },
            );

            break;
        }

        // Match orders together
        await matchOrder();
    } catch (error) {
        res.status(500).send(
            {
                status: CONSTANTS.ERROR,
                message: error.message,
            },
        );
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).send(
            {
                status: CONSTANTS.SUCCESS,
                message: 'Orders retrieved successfully',
                data: orders,
            },
        );
    } catch (error) {
        res.status(500).send(
            {
                status: CONSTANTS.ERROR,
                message: error.message,
            },
        );
    }
};

export {
    createOrder,
    listOrders,
};
