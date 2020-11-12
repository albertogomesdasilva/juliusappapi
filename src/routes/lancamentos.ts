import { ObjectID } from 'mongodb';
import { Router } from 'express';

import { LancamentoController } from './../controllers/LancamentoController';
import { Lancamento, STATUS } from '../entities/Lancamento';

export const routerLancamento = Router();

routerLancamento.post('/', async (req, res) => {
    const { valor, descricao, data } = req.body;
    const lancamentoCtrl = new LancamentoController();

    const lancamento = new Lancamento(valor, descricao, data);
    const validacaoLancamento = lancamento.validar();
    if (validacaoLancamento === STATUS.OK) {
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(400).json({ mensagem: validacaoLancamento });
    }
});

routerLancamento.get('/:quantidade', async (req, res) => {
    let limite = parseInt(req.params.quantidade);
    const lancamentoCtrl = new LancamentoController();
    limite = isNaN(limite) ? 0 : limite;
    const lancamentos = await lancamentoCtrl.recuperarTodos(limite);
    res.json(lancamentos);
});

routerLancamento.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const lancamentoCtrl = new LancamentoController();
    if (await lancamentoCtrl.remover(id)) {
        res.status(204).end();
    } else {
        res.json(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});
