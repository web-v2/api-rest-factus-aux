import { Router } from 'express';
import { crearCliente, listClientes, clienteById, clienteByName, clienteUpdate } from '../controllers/cliente.controller';

const router = Router();

router.post('/new', crearCliente);
router.get('/list', listClientes);
router.get('/:id', clienteById);
router.get('/name/:id', clienteByName);
router.put("/", clienteUpdate);

export default router;