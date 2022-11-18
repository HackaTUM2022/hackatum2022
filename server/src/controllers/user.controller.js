import { User } from '../models/index.js';

const me = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send(user);
    });
};

export {
    // eslint-disable-next-line import/prefer-default-export
    me,
};
