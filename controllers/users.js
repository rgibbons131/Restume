const { MongoDBNamespace } = require("mongodb");
const db = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

const addUser = async(req, res, next) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            school: req.body.school,
            numberOfResumes: req.body.numberOfResumes,
            connectionString: req.body.connectionString
        }

        const result = await db
        .getDb()
        .collection('users')
        .insertOne(user)

        res.send(200);
    }
    catch {
        res.send(500)
    }
}

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
        res.send(500)
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const response = await db
        .getDb()
        .collection('users')
        .deleteOne({_id: new ObjectId(req.params.id)}, true);

        if (response.deletedCount > 0) {
            res.status(201).send();
          } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the User.');
          }
          
        } catch {
            logger.error("Error deleting a User.")
            res.sendStatus(500)
        }
}

module.exports = {
    addUser,
    getUsers,
    getSingleUser,
    deleteUser
};