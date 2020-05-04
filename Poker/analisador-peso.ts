import { CartaBase } from "./carta";
import { PesoFactory } from "./peso-factory";
import groupBy from "../utils/group-by";
import { PesoBase } from "./pesos";
import mergeArray from "../utils/merge-arrays";

export class AnalisadorDePeso {

    /**
     * 
     * @param mão As 5 cartas da sua mão
     */
    public extrairPeso(mão: CartaBase[]): PesoBase {
        if (!mão) throw new Error('A mão não foi passada');

        if (this.éUmPar(mão))
            return PesoFactory.umPar();

        if (this.éDoisPares(mão))
            return PesoFactory.doisPares();


        throw new Error('Peso não encontrado');
    }


    //Um Par: Duas cartas do mesmo valor.
    public éUmPar(mão: CartaBase[]): boolean {        

        const temUmPar = this.agrupadoPorParEValor(mão)
            .filter(x => x === 2)
            .length === 1;

        return temUmPar;

    }

    public éDoisPares(mão: CartaBase[]): boolean {

        const temDoisPares = this.agrupadoPorParEValor(mão)
            .filter(x => x === 2)
            .length === 2;

        return temDoisPares;       

    }

    public eUmaTrinca(mão: CartaBase[]): boolean {

        const agrupado = this.agrupadoDistintamentePorParEValor(mão);

        const temTresPares = agrupado
            .filter(x => x === 3)
            .length === 1;

        const temDoisValoresDiferentes = agrupado
            .filter(x => x === 1)
            .length === 1;

        const eTrinca = temTresPares && temDoisValoresDiferentes;

        return eTrinca;

    }

    public eUmaSequencia(mão: CartaBase[]): boolean {
        
        const sequencia = mão
            .sort( (a, b) => a.valor - b.valor );
            

        for (let indice = 0; indice < 4; indice++) {
            
            const 
                carta = sequencia[indice],
                proximaSequencia = carta.valor + 1,
                proximaCarta = sequencia[indice + 1];
            
            if (proximaCarta.valor !== proximaSequencia)
                return false;
        }

        return true;
    }

    /**
     * Extrai dois arrays, um agrupado por nipe, outro agrupado por valor e distinto
     * Depois concatena (concat) os dois arrays
     * @example => Array(4) [2, 1, 1, 1]  
     * => Array(4) [1, 1, 2, 1]        
     * resultado (distinto) => [ 2, 1 ]  
     * @param mão Mão do usuario
     */
    private agrupadoDistintamentePorParEValor(mão: CartaBase[]): number[] {

        const agrupadoPorNipe = this.agruparCartasPorNipe(mão)
        // => Array(4) [2, 1, 1, 1]  
        const agrupadoPorValor = this.agruparCartasPorValor(mão)
        // => Array(4) [2, 1, 1, 1]            

        //console.log('por Nipe', agrupadoPorNipe);
        //console.log('por Valor', agrupadoPorValor);
        // => Array(2) [2, 1]
        const mesclado = mergeArray(agrupadoPorNipe, agrupadoPorValor);
        //console.log('mesclado', mesclado);

        return mesclado;

    }

    /**
     * Extrai dois arrays, um agrupado por nipe, outro agrupado por valor.
     * Depois concatena (concat) os dois arrays
     * @param mão Mão do usuario
     * @example 
     * => entrada [C2, C2, D3, H3, DJ]
     * => Array(4) [2, 1, 1, 1]  Agrupado por Par
     * => Array(4) [1, 1, 2, 1]  Agrupador por Valor      
     * @returns => [ 2, 1, 1, 1, 1, 1, 2, 1 ] Concatenado
     */
    private agrupadoPorParEValor(mão: CartaBase[]): number[] {

        debugger; 

        const agrupadoPorNipe = this.agruparCartasPorNipe(mão);
        // => Array(4) [2, 1, 1, 1]  
        const agrupadoPorValor = this.agruparCartasPorValor(mão);
        // => Array(4) [2, 1, 1, 1]            

        //console.log('por Nipe', agrupadoPorNipe);
        //console.log('por Valor', agrupadoPorValor);
        // => Array(8) [ 2, 1, 1, 1, 1, 1, 2, 1 ]  
        const concatenado = agrupadoPorNipe.concat(agrupadoPorValor);        

        return concatenado;

    }

    private agruparCartasPorNipe(mão: CartaBase[]): number[] {

        const nipes = mão.map(x => x.nome);

        const groupByNipes = groupBy(nipes, '0');
        // => Object {C: Array(2), D: Array(1), H: Array(1), S: Array(1)}  
        const resulto = Object.keys(groupByNipes)
            .map(x => groupByNipes[x])
            // => Array(4) [Array(2), Array(1), Array(1), Array(1)]    
            .map(x => x.length);
        // => Array(4) [2, 1, 1, 1]        

        return resulto;

    }

    private agruparCartasPorValor(mão: CartaBase[]): number[] {        

        const valores = mão.map(x => x.valor.toString());

        const groupByNipes = groupBy(valores, 'slice', 'funcao');
        
        // => Object {C: Array(2), D: Array(1), H: Array(1), S: Array(1)}  
        const resultado = Object.keys(groupByNipes)
            .map(x => groupByNipes[x])
            // => Array(4) [Array(2), Array(1), Array(1), Array(1)]    
            .map(x => x.length);
        // => Array(4) [2, 1, 1, 1]        

        return resultado;

    }

}