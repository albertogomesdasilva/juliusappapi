import {
    getMongoManager,
    ObjectID,
    MongoEntityManager
} from 'typeorm';
import { Lancamento } from "../entities/Lancamento";

export class LancamentoController {

    entityManager: MongoEntityManager;

    constructor() {
        this.entityManager = getMongoManager();
    }

    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await this.entityManager.save(lancamento);
        return lancamentoSalvo;
    }

    async remover(id: ObjectID) {
        let lancamentoExiste = false;
        const lancamentoEncontrado = await this.entityManager.findOne(Lancamento, id);
        if (lancamentoEncontrado) {
            await this.entityManager.delete(Lancamento, id);
            return true;
        }
        return lancamentoExiste;
    }

    async recuperarTodos(limite?: number) {
        let opcoes = {};

        if (limite && limite > 0) {
            opcoes = {
                take: limite,
                order: {
                    data: "DESC"
                }
            };
        }

        const lancamentos = await this.entityManager.find(Lancamento, opcoes);
        return lancamentos;
    }
}