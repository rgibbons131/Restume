
const db = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

const checkForUser = async(req, res, next) => {
    const result = await db
    .getDb()
    .db()
    .collection('users')
    .findOne({_id: new ObjectId(req.params.id)})

    if(!result) {
        return true;
    }
     else { 
        return false;
    }
}
// First, you need to check and see if user is in database
// Then if they are, log them in. If they aren't, create the account