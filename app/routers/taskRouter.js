const express = require('express');
const { getTaskByDescription, insertTask, getAllTasks, deleteTask } = require('../services/taskService')
const router = express.Router();

//GET param - Retorna o registro correspondente da ID informada
router.get("/get/:descricao?", async function (req, res) {
  var descricao = req.params.descricao;
  var tasks = await getTaskByDescription(descricao);
  res.json(tasks);
});

//POST - Adiciona um registro
router.post("/add", async function (req, res) {
  var register = {
    descricao: req.body.descricao,
    concluido: req.body.concluido
  };

  var task = await insertTask(register);
  res.send(task);

});

//GET - Retorna todos os registros existentes no banco
router.get("/all", async function (req, res) {
  const tasks = await getAllTasks();
  res.json(tasks);
});

//PUT - Atualiza um registro
router.put("/add/:id", async function (req, res) {
  const task = await editTask(req.params.id, req.body);

  res.json(task);
});

//DELETE - Deleta um registro
router.delete("/delete/:id", async function (req, res) {
  const task = deleteTask(req.params.id);

  res.json(task);
});

module.exports = router;