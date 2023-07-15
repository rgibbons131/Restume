const { MongoDBNamespace } = require("mongodb");
const db = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

const getUsers = async(req, res) => {
    try {
        const result = await db
        .getDb()
        .collection('users')
        .find();

        result.toArray().then((lists) => {
            res.status(200).json(lists);
        })
    } catch {
        res.sendStatus(500);
    }
}

const getSingleUser = async(req, res, next) => {
    try {
        const result = await db
        .getDb()
        .collection('users')
        .findOne({_id: new ObjectId(req.params.id)});

        res.send(result).status(200);
        if (!result) {
            console("There was no result.")
        }
    } catch {
        res.send('didnt work.')
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const response = await db
        .getDb()
        .collection('users')
        .deleteOne({_id: new ObjectId(req.params.id)});
        res.send(result).status(200);
        if (!result) {
            res.send("There was no result.")
        } else {
            res.send("User Deleted");
        }
} catch {
    res.sendStatus(500)
}
}

module.exports = {
    getUsers,
    getSingleUser,
    deleteUser
};