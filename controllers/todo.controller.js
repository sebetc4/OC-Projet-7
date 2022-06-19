const { createTodo, findOneTodoWhereId } = require('../queries/todo.queries')

exports.createTodo = async (req, res, next) => {
    const user = req.user
    const { name } = req.body
    try {
        if (!name)
            throw { message: 'Missing parameters' }
        const newTodo = await createTodo(user.id, name)
        return res.status(201).json(newTodo)
    } catch (err) {
        next(err)
    }
}

exports.toggleTodo = async (req, res, next) => {
    const user = req.user
    const todoId = req.params.id
    try {
        if (!todoId)
            throw { message: 'Missing parameters' }
        const todo = await findOneTodoWhereId(todoId)
        user.checkIsAuthor(todo.UserId)
        await todo.update({ done: !todo.done });
        return res.status(200).json('Toggle done success')
    } catch (err) {
        next(err)
    }
}

exports.deleteTodo = async (req, res, next) => {
    const user = req.user
    const todoId = req.params.id
    try {
        if (!todoId)
            throw { message: 'Missing parameters' }
        const todo = await findOneTodoWhereId(todoId)
        user.checkIsAuthor(todo.UserId)
        await todo.destroy()
        res.status(200).json("Deletion todo success")
    } catch (err) {
        next(err)
    }
}

