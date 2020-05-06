import { Jogador } from "./jogador";
import { AnalisadorDePeso } from "./analisador-peso";
import { CartaBase } from "./carta";

export class Avaliador {

    private analisadorDePeso: AnalisadorDePeso;

    constructor() {

        this.analisadorDePeso = new AnalisadorDePeso();

    }


    public calcularGanhador(...jogadores: Jogador[]): Jogador[] {
        
        const avaliacaoDosJogadores = jogadores.map(x => {

            const pesoRegra = this.analisadorDePeso.extrairPeso(x.mão);
            
            const porPesoDaRegra = (carta: CartaBase): boolean => 
                pesoRegra.buscarValorDasCartasDaRegra()
                    .includes(carta.valor);
                    
            

            return {
                jogador: x,
                peso: x.mão
                    .filter(porPesoDaRegra)
                    .map(c => c.valor)
                    .reduce((acc, cur) => acc + cur, 0)
            }
        });

        const maiorValor = avaliacaoDosJogadores
            .sort((a, b) => a.peso - b.peso)
            .reverse()[0]
            .peso;

        // pode haver um empate então retorno os jogadores 
        // com a mesma pontuação
        const ganhadores = avaliacaoDosJogadores
            .sort((a, b) => a.peso - b.peso)
            .reverse()
            .filter(x => x.peso === maiorValor)
            .map(x => x.jogador);

        return ganhadores


    }


}