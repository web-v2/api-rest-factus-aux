import { Router } from 'express';
import { crearProducto, listProductos, productoById, productoByName, productoUpdate } from '../controllers/producto.controller';

const router = Router();

router.post('/new', crearProducto);
router.get('/list', listProductos);
router.get('/:id', productoById);
router.get('/name/:id', productoByName);
router.put("/", productoUpdate);

export default router;