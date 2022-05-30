const { Todo } = require('../models');

exports.createTodo = async (UserId, name) => {
    const newTodo = await Todo.create({
        UserId,
        name
    })
    if (newTodo)
        return newTodo
    else
        throw { message: `Internal Server Error` }
}

exports.findOneTodoWhereId = async (id) => {
    const todo = await Todo.findOne({
        where: { id },
    })
    if (todo)
        return todo
    else
        throw { message: `Todo id unknown` }
}



