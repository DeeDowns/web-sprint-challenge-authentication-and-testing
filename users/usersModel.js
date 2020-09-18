const db = require('../database/dbConfig')

module.exports = {
    add, 
    findById, 
    findBy
}

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(([id]) => {
        return findById(id)
    })
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .orderBy('id')
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()

}