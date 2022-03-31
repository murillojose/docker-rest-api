const express = require('express');
const { getCampanhaByDescription, insertCampanha, getAll, editCamapnha, deleteCampanha } = require('../services/campanhaService');
const router = express.Router();

router.get("/get/:descricao?", async function (req, res) {
  const { descricao } = req.params;

  const campanha = await getCampanhaByDescription(descricao);

  res.json(campanha);
})

router.post("/add", async function (req, res) {
  const campanha = {
    codigo: req.body.codigo,
    descricao: req.body.descricao,
    email: req.body.email,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
  }

  var response = await insertCampanha(campanha);

  res.json(response);
})

router.get("/all", async function (req, res) {
  const campanhas = await getAll();

  res.json(campanhas);
})


router.put("/add/:id", async function (req, res) {
  const campanha = {
    codigo: req.body.codigo,
    descricao: req.body.descricao,
    email: req.body.email,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
  }
  const newCampanha = await editCamapnha(req.params.id, campanha)

  res.json(newCampanha);
})

router.delete("/delete/:id", async function (req, res) {
  const campanha = await deleteCampanha(req.params.id)

  res.json(campanha);
})

module.exports = router;