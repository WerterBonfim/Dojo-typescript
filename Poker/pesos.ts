import { CartaBase } from "./carta";
import groupBy from "../utils/group-by";
import { UtilPoker } from "./util-poker";

export abstract class PesoBase {
    
    constructor(
        public nome: string,
        public valor: number,
        protected mão: CartaBase[]        
    ) {}
    

    public abstract buscarValorDasCartasDaRegra(): number[];
    
}

export class UmPar extends PesoBase {    
    
    constructor(
        protected mão: CartaBase[]
        ){

        super('Um Par', 1, mão);
    }


    public buscarValorDasCartasDaRegra(): number[] {
        
        const valores = this.mão.map(x => x.valor.toString());
        const agrupadoPorValor = groupBy(valores, 'slice', 'funcao');
        const cartas = Object.keys(agrupadoPorValor)
            .map(x => parseInt(x));

        return cartas;

    }

    
}

export class DoisPares extends PesoBase {
    
    
    constructor(
        protected mão: CartaBase[]
    ){
        super('Um Par', 2, mão);
    }


    public porPesoDaRegra(valor: number): boolean {
        
        return this.valor === valor;

    }

    public buscarValorDasCartasDaRegra(): number[] {
        throw new Error("Method not implemented.");
    }

}

export class Sequencia extends PesoBase {

    constructor(
        protected mão: CartaBase[]
    ) {
        super('Straight', 3, mão);
    }

    public buscarValorDasCartasDaRegra(): number[] {

        return UtilPoker
            .ordenarMão(this.mão)
            .map(x => x.valor)
        
    }

}

export class Flush extends PesoBase {


    constructor(
        protected mão: CartaBase[]
    ) {
        super('Flush', 5, mão);
    }

    public buscarValorDasCartasDaRegra(): number[] {

        return UtilPoker
            .ordenarMão(this.mão)
            .map(x => x.valor)
        
    }



}