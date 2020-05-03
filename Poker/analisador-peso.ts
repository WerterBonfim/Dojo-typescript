import { Carta } from "./carta";
import { Peso } from "./pesos";
import { PesoFactory } from "./peso-factory";
import groupBy from "../utils/group-by";

export class AnalisadorDePeso {

    /**
     * 
     * @param mão As 5 cartas da sua mão
     */
    public extrairPeso(mão: Carta[]): Peso {
        if (!mão) throw new Error('A mão não foi passada');

        if (this.éUmPar(mão))
            return PesoFactory.umPar();


        throw new Error('Peso não encontrado');
    }


    //Um Par: Duas cartas do mesmo valor.
    public éUmPar(mão: Carta[]): boolean {

        const nipes = mão.map(x => x.split('')[0]);
        const groupByNipes = groupBy(nipes, '0');
        // => Object {C: Array(2), D: Array(1), H: Array(1), S: Array(1)}  
        const result = Object.keys(groupByNipes)
            .map(x => groupByNipes[x])
            // => Array(4) [Array(2), Array(1), Array(1), Array(1)]    
            .map(x => x.length)
            // => Array(4) [2, 1, 1, 1]
            .filter(x => x === 2)
            .length === 1;


        return result;

    }

}