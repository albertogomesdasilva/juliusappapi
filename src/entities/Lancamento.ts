import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

export enum STATUS {
    VALOR_INVALIDO = "Valor do lançamento é nulo ou zero",
    DESCRICAO_INVALIDA = "Descrição do lançamento é nula",
    DATA_INVALIDA = "Data do lançamento é nula ou superior à data atual",
    OK = "OK"
}

@Entity()
export class Lancamento {

    constructor(valor: number, descricao: string, data: Date) {
        this.valor = valor;
        this.descricao = descricao;
        this.data = data;
    }

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    valor: number;

    @Column()
    descricao: string;

    @Column()
    data: Date;

    validar(): string {
        if (!this.valor || this.valor === 0) {
            return STATUS.VALOR_INVALIDO;
        }

        if (!this.descricao || this.descricao.length === 0) {
            return STATUS.DESCRICAO_INVALIDA;
        }

        if (!this.data || new Date(this.data) > new Date()) {
            return STATUS.DATA_INVALIDA;
        }

        return STATUS.OK;
    }

}
