import { Router } from "express";
import Loja from '../model/loja.js';

const router_loja = Router();
// cadastro
router_loja.post('/loja/cadastro', async function(req, res) {
  const result = await Loja.createLoja(req.body);
  res.send(result)
});

router_loja.get('/loja/possui/:id', async function(req, res) {
  const id = Number(req.params.id);
  const result = await Loja.verifyLoja(id);
  res.send(result)
});

export default router_loja;