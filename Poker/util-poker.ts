import { CartaBase } from "./carta";
import groupBy from "../utils/group-by";

export class UtilPoker {

    public static ordenarMão = (mão: CartaBase[]): CartaBase[] => mão.sort((a, b) => a.valor - a.valor);
    public static todasDoMesmoNaipe = (mão: CartaBase[]): boolean => UtilPoker.agruparCartasPorNaipe(mão)
        .filter(x => x === 5)
        .length === 1;

    public static todasNãoSãoDoMesmoNaipe = (mão: CartaBase[]): boolean => !UtilPoker.todasDoMesmoNaipe(mão);

    /**
     * 
     * @param mão Cartas do usuario
     * @returns Array com a quantidade de cartas agrupadas por naipe
     * @example Array(4) [2, 1, 1, 1] => 2 cartas repetidas
     */
    public static agruparCartasPorNaipe(mão: CartaBase[]): number[] {

        const naipes = mão.map(x => x.nome);

        const groupByNaipes = groupBy(naipes, '0');
        // => Object {C: Array(2), D: Array(1), H: Array(1), S: Array(1)}  
        const resulto = Object.keys(groupByNaipes)
            .map(x => groupByNaipes[x])
            // => Array(4) [Array(2), Array(1), Array(1), Array(1)]    
            .map(x => x.length);
        // => Array(4) [2, 1, 1, 1]        

        return resulto;

    }

    

}