import { Jogador } from "./jogador";

export class Avaliador {


    public calcularGanhador(...jogadores: Jogador[]): Jogador[] {

        const avaliacaoDosJogadores = jogadores.map(x => {
            return {
                jogador: x,
                peso: x.mão
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