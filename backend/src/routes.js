const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const uploads = multer(multerConfig);
const PrestadorController = require("./Controllers/PrestadoresController");
const ContratanteController = require("./Controllers/ContratantesController");
const ServicosController = require("./Controllers/ServicosController");
const Serv_prestadoController = require("./Controllers/Serv_prestadoController");
const ProfileController = require("./Controllers/ProfileController");
const ProfileCController = require("./Controllers/ProfileCController");
const SessionCntroller = require("./Controllers/SessionController");
const SessionCController = require("./Controllers/SessionCController");
const AvaliacoesController = require("./Controllers/AvaliacoesController");

//  PRESTADORES
routes.post("/prestadores", uploads.single("img"), PrestadorController.create);
routes.get("/prestadoreslist", PrestadorController.index);
routes.put("/editarprestador/:cpf", PrestadorController.update);
routes.get("/prestadore/:id", PrestadorController.detalhe);
// routes.get("/prestadore/:id", PrestadorController.detalhe);
routes.delete("/prestadorApagar/:id", PrestadorController.delete);
// servicos do prestaodr
routes.get("/meusservicos/:id", PrestadorController.show);
routes.get("/meusservicos/:id", Serv_prestadoController.index);
// servicos do prestaodr
routes.get("/meusservicos/:id", PrestadorController.show);
routes.get("/meusservicos/:id", Serv_prestadoController.index);

//  CONTRATANTES
routes.post("/contratantes", ContratanteController.create);
routes.get("/contratanteslist", ContratanteController.index);
routes.put("/editarcontratantes/:id", ContratanteController.update);
routes.get("/contratante/:id", ContratanteController.detalhe);
routes.delete("/contratanteApagar/:id", ContratanteController.delete);

// SERVIÇOS
routes.post("/servicos", ServicosController.create);
routes.get("/servicoslist", ServicosController.index);
routes.put("/editarservicos/:id", ServicosController.update);
routes.get("/servicosId/:id", ServicosController.indexId);

// Servicos PRESTADORS
routes.post("/addservico/:id", Serv_prestadoController.create);
routes.delete("/removeservico/:id", Serv_prestadoController.delete);
routes.get("/servPrestadoList", Serv_prestadoController.index);
routes.put("/alterarservico/:id", Serv_prestadoController.update);
// routes.get("/servico/:id", Serv_prestadoController.detalhe);
routes.get("/servicosPrestadores/:id", Serv_prestadoController.show);
routes.get("/servico/:id", Serv_prestadoController.detalhe);

// SESSION
routes.post("/sessions", SessionCntroller.create);
routes.get("/profile", ProfileController.detalhe);
routes.get("/profile/:cpf", ProfileController.index);

// SESSION CONTRATANTE
routes.post("/sessioncontratante", SessionCController.create);
routes.get("/profilec/:cpf", ProfileCController.index);
routes.get("/dataContratantes/:id", ContratanteController.detalhe);

//AVALIAÇÕES
routes.post("/avaliacao/:id", AvaliacoesController.create);
routes.put("/alterarAvaliacao/:id", AvaliacoesController.update);
routes.delete("/removerAvaliacao/:id", AvaliacoesController.delete);
routes.get("/avaliacaoList", AvaliacoesController.index);
routes.get("/avaliacoes/:id", AvaliacoesController.detalhe);

module.exports = routes;
