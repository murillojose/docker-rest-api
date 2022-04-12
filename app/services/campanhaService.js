const { Campanha } = require("../models/campanhaModel");

async function getCampanhaByDescription(descricao) {
  const campanha = await Campanha.find({ descricao: descricao })

  return campanha;
}

async function getAll() {
  return Campanha.find();
}

async function insertCampanha(campanha) {
  var newCampanha = new Campanha({
    codigo: campanha.codigo,
    descricao: campanha.descricao,
    email: campanha.email,
    dataInicio: campanha.dataInicio,
    dataFim: campanha.dataFim,
  });

  await newCampanha.save();

  return newCampanha;
}

async function editCamapnha(id, data) {
  var campanha = await Campanha.find({ id: id });

  campanha.codigo = data.codigo;
  campanha.descricao = data.descricao;
  campanha.email = data.email;
  campanha.dataInicio = data.dataInicio;
  campanha.dataFim = data.dataFim;

  await campanha.save();
  return campanha;
}

async function deleteCampanha(id) {

  const campanha = Campanha.delete({ id: id });

  return campanha;
}

module.exports = {
  getCampanhaByDescription,
  getAll,
  insertCampanha,
  editCamapnha,
  deleteCampanha
}