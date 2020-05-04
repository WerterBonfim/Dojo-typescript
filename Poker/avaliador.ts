import { Jogador } from "./jogador";

export class Avaliador {


    public calcularGanhador(...jogadores: Jogador[]): Jogador {

        const avaliacaoDosJogadores = jogadores.map(x => {
            return {
                jogador: x,
                peso: x.mão
                    .map( c => c.valor)
                    .reduce( ( acc, cur) => acc + cur , 0)
            }
        });

        const ganhado = avaliacaoDosJogadores
            .sort( (a, b) => a.peso - b.peso)
            .reverse()[0];

        return ganhado.jogador;


    }

    
}