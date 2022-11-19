/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { Order, CONSTANTS, Match } from '../models/index.js';

const addOrder = async (req, res) => {
    let newOrder;

    const foundOrder = await Order.findOne(
        {
            user: req.body.user,
            security: req.body.security,
            side: req.body.side,
            price: req.body.price,
        },
    );

    if (foundOrder) {
        newOrder = await Order.findOneAndUpdate(
            {
                user: req.body.user,
                security: req.body.security,
                side: req.body.side,
                price: req.body.price,
            },
            {
                qty: foundOrder.qty + req.body.qty,
            },
            {
                new: true,
            },
        );
    } else {
        newOrder = await Order.create(req.body);
    }

    res.status(200).send(
        {
            status: CONSTANTS.SUCCESS,
            message: `Order for ${newOrder.security} with ${newOrder.qty} created successfully`,
            data: newOrder,
        },
    );
};

const deleteOrder = async (req, res) => {
    const existingOrder = await Order.findOne(
        {
            user: req.body.user,
            security: req.body.security,
            side: req.body.side,
            price: req.body.price,
        },
    );

    if (existingOrder) {
        if (existingOrder.qty > req.body.qty) {
            const updatedOrder = await Order.findOneAndUpdate(
                {
                    user: req.body.user,
                    security: req.body.security,
                    side: req.body.side,
                    price: req.body.price,
                },
                {
                    qty: existingOrder.qty - req.body.qty,
                },
                {
                    new: true,
                },
            );

            res.status(200).send(
                {
                    status: CONSTANTS.SUCCESS,
                    message: `Order for ${updatedOrder.security} with ${updatedOrder.qty} updated successfully`,
                    data: updatedOrder,
                },
            );
        } else if (existingOrder.qty === req.body.qty) {
            const deletedOrder = await Order.findOneAndDelete(
                {
                    user: req.body.user,
                    security: req.body.security,
                    side: req.body.side,
                    price: req.body.price,
                },
            );

            res.status(200).send(
                {
                    status: CONSTANTS.SUCCESS,
                    message: `Order for ${deletedOrder.security} with ${deletedOrder.qty} deleted successfully`,
                    data: deletedOrder,
                },
            );
        } else {
            res.status(200).send(
                {
                    status: CONSTANTS.ERROR,
                    message: 'Order couldn\'t be deleted because the quantity is greater than the existing quantity',
                },
            );
        }
    } else {
        res.status(200).send(
            {
                status: CONSTANTS.ERROR,
                message: 'Order couldn\'t be deleted because it doesn\'t exist',
            },
        );
    }
};

const matchOrder = async () => {
    const orders = await Order.find();

    const ordersPerSecurity = {};

    orders.forEach((order) => {
        if (ordersPerSecurity[order.security]) {
            ordersPerSecurity[order.security].push(order);
        } else {
            ordersPerSecurity[order.security] = [order];
        }
    });

    Promise.all(Object.keys(ordersPerSecurity).map(async (security) => {
        ordersPerSecurity[security].sort((a, b) => {
            if (a.side === CONSTANTS.BUY) {
                return b.price - a.price;
            }

            return a.price - b.price;
        });

        const buyOrders = ordersPerSecurity[security].filter((order) => order.side === CONSTANTS.BUY);
        const sellOrders = ordersPerSecurity[security].filter((order) => order.side === CONSTANTS.SELL);

        for (const buyOrder of buyOrders) {
            for (const sellOrder of sellOrders) {
                if (buyOrder.price >= sellOrder.price) {
                    if (buyOrder.qty > sellOrder.qty) {
                        await Match.create({
                            buyer: buyOrder.user,
                            seller: sellOrder.user,
                            security: buyOrder.security,
                            qty: sellOrder.qty,
                            price: buyOrder.price,
                        });

                        buyOrder.qty -= sellOrder.qty;
                        sellOrder.qty = 0;
                    } else if (buyOrder.qty < sellOrder.qty) {
                        await Match.create({
                            buyer: buyOrder.user,
                            seller: sellOrder.user,
                            security: buyOrder.security,
                            qty: buyOrder.qty,
                            price: buyOrder.price,
                        });

                        sellOrder.qty -= buyOrder.qty;
                        buyOrder.qty = 0;
                    } else {
                        await Match.create({
                            buyer: buyOrder.user,
                            seller: sellOrder.user,
                            security: buyOrder.security,
                            qty: buyOrder.qty,
                            price: buyOrder.price,
                        });

                        buyOrder.qty = 0;
                        sellOrder.qty = 0;
                    }
                }
            }
        }

        ordersPerSecurity[security] = buyOrders.concat(sellOrders);

        console.log('BEFORE');
        console.log(ordersPerSecurity);

        Promise.all(ordersPerSecurity[security].map(async (order) => {
            if (order.qty === 0) {
                await Order.findOneAndDelete(
                    {
                        // eslint-disable-next-line no-underscore-dangle
                        _id: order._id,
                    },
                );
            } else {
                await Order.findOneAndUpdate(
                    {
                        // eslint-disable-next-line no-underscore-dangle
                        _id: order._id,
                    },
                    {
                        qty: order.qty,
                    },
                    {
                        new: true,
                    },
                );
            }
        }));

        console.log('AFTER');
        console.log(ordersPerSecurity);

        ordersPerSecurity[security] = ordersPerSecurity[security].filter((order) => order.qty > 0);
    }));
};

export {
    addOrder,
    deleteOrder,
    matchOrder,
};
