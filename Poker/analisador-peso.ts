import { CartaBase, Carta } from "./carta";
import { PesoFactory } from "./peso-factory";
import groupBy from "../utils/group-by";
import { PesoBase } from "./pesos";
import mergeArray from "../utils/merge-arrays";
import { UtilPoker } from "./util-poker";

export class AnalisadorDePeso {

    /**
     * 
     * @param mão As 5 cartas da sua mão
     */
    public extrairPeso(mão: CartaBase[]): PesoBase {
        if (!mão) throw new Error('A mão não foi passada');

        if (this.éUmPar(mão))
            return PesoFactory.umPar(mão);

        if (this.éDoisPares(mão))
            return PesoFactory.doisPares(mão);

        if (this.éUmaSequencia(mão))
            return PesoFactory.sequencia(mão);

        if (this.éUmFlush(mão))
            return PesoFactory.flush(mão);

        throw new Error('Peso não encontrado');
    }


    //Um Par: Duas cartas do mesmo valor.
    public éUmPar(mão: CartaBase[]): boolean {

        const temUmPar = this.agruparCartasPorValor(mão)
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

    public éUmaTrinca(mão: CartaBase[]): boolean {

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

    public éUmaSequencia(mão: CartaBase[]): boolean {

        const sequencia = mão
            .sort((a, b) => a.valor - b.valor);


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

    public éUmFlush(mão: CartaBase[]): Boolean {

        const eSequencia = this.éUmaSequencia(mão);
        if (eSequencia)
            return false;

        const naipes = UtilPoker.agruparCartasPorNaipe(mão);
        const eFlush = naipes
            .filter(x => x === 5)
            .length === 1;

        return eFlush;


    }

    public éUmFullHouse(mão: CartaBase[]): boolean {

        const agrupado = this.agrupadoDistintamentePorParEValor(mão);

        const temTresPares = agrupado
            .filter(x => x === 3)
            .length === 1;

        const temUmPar = agrupado
            .filter(x => x === 2)
            .length === 1;

        const eFullHouse = temTresPares && temUmPar;

        return eFullHouse;

    }

    public éUmaQuadra(mão: CartaBase[]): boolean {

        const agrupado = this.agrupadoDistintamentePorParEValor(mão);

        const tem4CartasComMesmoValor = agrupado
            .filter(x => x === 4)
            .length === 1;

        return tem4CartasComMesmoValor;

    }

    public éUmStraightFlush(mão: CartaBase[]): boolean {

        const eUmaSequencia = this.éUmaSequencia(mão);        
        const todasDoMesmoNaipe = UtilPoker.todasDoMesmoNaipe(mão);
        const eStraightFlush = eUmaSequencia && todasDoMesmoNaipe;

        return eStraightFlush;
    }

    public éUmRoyalFlush(mão: CartaBase[]): boolean {

        if (UtilPoker.todasNãoSãoDoMesmoNaipe(mão))
            return false;
            

        const ordenado = UtilPoker.ordenarMão(mão);
        const comecaCom10 = ordenado[0].valor === 10;
        const eUmaSequencia = this.éUmaSequencia(ordenado);
        
        const eRoyal = comecaCom10 && eUmaSequencia;
        

        return eRoyal;

    }

    


    /**
     * Extrai dois arrays, um agrupado por naipe, outro agrupado por valor e distinto
     * Depois concatena (concat) os dois arrays
     * @example => Array(4) [2, 1, 1, 1]  
     * => Array(4) [1, 1, 2, 1]        
     * resultado (distinto) => [ 2, 1 ]  
     * @param mão Mão do usuario
     */
    private agrupadoDistintamentePorParEValor(mão: CartaBase[]): number[] {

        const agrupadoPorNaipe = UtilPoker.agruparCartasPorNaipe(mão)
        // => Array(4) [2, 1, 1, 1]  
        const agrupadoPorValor = this.agruparCartasPorValor(mão)
        // => Array(4) [2, 1, 1, 1]            

        //console.log('por Naipe', agrupadoPorNaipe);
        //console.log('por Valor', agrupadoPorValor);
        // => Array(2) [2, 1]
        const mesclado = mergeArray(agrupadoPorNaipe, agrupadoPorValor);
        //console.log('mesclado', mesclado);

        return mesclado;

    }

    /**
     * Extrai dois arrays, um agrupado por naipe, outro agrupado por valor.
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

        const agrupadoPorNaipe = UtilPoker.agruparCartasPorNaipe(mão);
        // => Array(4) [2, 1, 1, 1]  
        const agrupadoPorValor = this.agruparCartasPorValor(mão);
        // => Array(4) [2, 1, 1, 1]            

        //console.log('por Naipe', agrupadoPorNaipe);
        //console.log('por Valor', agrupadoPorValor);
        // => Array(8) [ 2, 1, 1, 1, 1, 1, 2, 1 ]  
        const concatenado = agrupadoPorNaipe.concat(agrupadoPorValor);

        return concatenado;

    }

    

    private agruparCartasPorValor(mão: CartaBase[]): number[] {

        const valores = mão.map(x => x.valor.toString());

        const agrupadoPorValor = groupBy(valores, 'slice', 'funcao');
        // => Object {4: Array(2), 1: Array(1), 2: Array(1), 3: Array(1)}  

        const resultado = Object.keys(agrupadoPorValor)
            .map(x => agrupadoPorValor[x])
            // => Array(4) [Array(2), Array(1), Array(1), Array(1)]    
            .map(x => x.length);
        // => Array(4) [2, 1, 1, 1]        

        return resultado;

    }

    

}