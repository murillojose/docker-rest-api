const { Task } = require('../models/taskModel');

async function getTaskByDescription(description) {
  try {
    const tasks = Task.find({ 'descricao': description });
    return tasks;
  } catch (error) {
    throw new Error(`Task ${description}`)
  }
}

async function getAllTasks() {
  return Task.findOne({});
}

async function insertTask(task) {
  var newTask = new Task({
    'descricao': task.descricao,
    'concluido': task.concluido
  });

  newTask = newTask.save();

  return newTask;
}

async function editTask(id, data) {
  var task = await Task.find({ id: id });

  task.descricao = data.descricao;
  task.concluido = data.concluido;

  task.save();

  return task;
}

async function deleteTask(id) {
  const task = Task.delete({ id: id });

  return task;
}

module.exports = { getTaskByDescription, insertTask, getAllTasks, editTask, deleteTask }