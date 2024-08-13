import { Router } from 'express';
import { criarVaga, obterVagas, obterVagaPorId, atualizarVaga, deletarVaga } from '../controllers/job';

const router = Router();

router.post('/vagas', criarVaga);
router.get('/vagas', obterVagas);
router.get('/vagas/:id', obterVagaPorId);
router.put('/vagas/:id', atualizarVaga);
router.delete('/vagas/:id', deletarVaga);

export default router;
