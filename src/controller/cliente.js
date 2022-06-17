import { Router } from "express";
import Cliente from '../model/cliente.js';

const router_cliente = Router();
// cadastro
router_cliente.post('/cliente/cadastro/perfil', async function(req, res) {
  const result = await Cliente.createCliente(req.body);
  res.send(result)
});

export default router_cliente;