// http://dojopuzzles.com/problemas/exibe/poker/


import 'jest';
import { Carta, CartaBase } from './carta';
import { AnalisadorDePeso } from './analisador-peso';
import { UmPar, DoisPares } from './pesos';
import { Jogador } from './jogador';
import { Avaliador } from './avaliador';


const analisadorDePeso = new AnalisadorDePeso();
const avaliador = new Avaliador();

const naoEUmaSequencia = (mão: CartaBase[]) => {

    const resultado = analisadorDePeso.eUmaSequencia(mão);
    expect(resultado).toBeFalsy();

}

describe('Jogo de poker', () => {

    describe('Peso das cartas', () => {

        test('Carta 4 deve ser maior que a carta 2', () => {
            expect(Carta.C4.valor).toBeGreaterThan(Carta.C2.valor);
        })

        test('Carta Dama deve ser maior que a valete', () => {

            expect(Carta.CQ.valor).toBeGreaterThan(Carta.CJ.valor);

        });

        test('As deve ser maior que Rei, Dama, Valete e 10', () => {
            expect(Carta.CA.valor).toBeGreaterThan(Carta.CK.valor);
            expect(Carta.CA.valor).toBeGreaterThan(Carta.CQ.valor);
            expect(Carta.CA.valor).toBeGreaterThan(Carta.CJ.valor);
            expect(Carta.CA.valor).toBeGreaterThan(Carta.C9.valor);
        })

        test('Dado duas cartas de mesmo valor - deve retornar um par', () => {

            const mão = [Carta.C3, Carta.C4];
            const valorMão = analisadorDePeso.extrairPeso(mão);
            expect(valorMão).toBeInstanceOf(UmPar);

        });

        test('Deve retonar true para uma mao que tem um par', () => {

            const mão = [Carta.C3, Carta.C2, Carta.D4, Carta.H10, Carta.SJ];
            const eUmPar = analisadorDePeso.éUmPar(mão);
            expect(eUmPar).toBeTruthy();

        });

        test('Deve retornar true para uma mão que tem dois pares', () => {

            const mãoComDoisPares = [Carta.C3, Carta.C2, Carta.D4, Carta.HJ, Carta.SJ];
            const resultado = analisadorDePeso.éDoisPares(mãoComDoisPares);
            expect(resultado).toBeTruthy();

            const eUmaSequencia = analisadorDePeso.eUmaSequencia(mãoComDoisPares);
            expect(eUmaSequencia).toBeFalsy();

        });

        test('Trinca: Três cartas do mesmo valor e duas de valores diferentes.', () => {

            const mãoComTrinca = [Carta.C3, Carta.C4, Carta.C10, Carta.H8, Carta.D2];
            const resultado = analisadorDePeso.eUmaTrinca(mãoComTrinca);
            expect(resultado).toBeTruthy();

        });


        describe('Senarios de Straight (seqüência)', () => {

            //  cinco cartas em seqüência, independentemente dos naipes. 
            //  Entre duas seguidas, ganhará a que for encabeçada pela carta de maior valor. 
            //  Exemplo: A, R, D, V, 10 e 10, 9, 8, 7, Ás (valendo como seis) – vence a primeira.

            test('Todas as carta com valores consecutivos.', () => {

                // ordenar por valor
                const mãoComSequencia = [Carta.C3, Carta.C4, Carta.D5, Carta.S6, Carta.H7];
                const resultado = analisadorDePeso.eUmaSequencia(mãoComSequencia);
                expect(resultado).toBeTruthy();

            });

            test('Cartas fora de ordem porem com uma sequencia', () => {

                const mãoComSequencia = [Carta.C5, Carta.D2, Carta.H4, Carta.S6, Carta.D3];
                const resultado = analisadorDePeso.eUmaSequencia(mãoComSequencia);
                expect(resultado).toBeTruthy();

            });

            test('Deve retornar falso para uma mão que tem uma sequencia quebrada', () => {

                const mãoComSequenciaQuebrada = [Carta.C5, Carta.D2, Carta.H4, Carta.S6, Carta.D7];
                const resultado = analisadorDePeso.eUmaSequencia(mãoComSequenciaQuebrada);
                expect(resultado).toBeFalsy();
            });

            test('Duas mãos a primeira vence, pois tem o valor mais alto', () => {

                // Exemplo: A, R, D, V, 10 e 10, 9, 8, 7, Ás (valendo como seis) – vence a primeira.
                
                const 
                    primeiraMaoAlta = [ Carta.CA, Carta.DK, Carta.CQ, Carta.SJ, Carta.H10 ],
                    segundaMaoBaixa = [ Carta.H10, Carta.S9, Carta.C8, Carta.D7, Carta.H6 ],
                    jogador1 = new Jogador('Jogador1', primeiraMaoAlta),
                    jogador2 = new Jogador('Jogador2', segundaMaoBaixa),
                    ganhador = avaliador.calcularGanhador(jogador1, jogador2),
                    primeiraMaoEUmaSequencia = analisadorDePeso.eUmaSequencia(primeiraMaoAlta),
                    segundaMaoEUmaSequencia = analisadorDePeso.eUmaSequencia(segundaMaoBaixa)
                    ;

                expect(primeiraMaoEUmaSequencia).toBeTruthy();
                expect(segundaMaoEUmaSequencia).toBeTruthy();
                expect(ganhador).toBe(jogador1);


            });

        })



        describe('Senarios de Flush: mesmo naipe.', () => {

            // Flush: cinco cartas do mesmo naipe, 
            // que não formam seqüência. Se houver dois ou mais flushes, 
            // ganhará o que for encabeçado pela carta mais alta; 
            // se estas forem iguais, considerar-se-á a segunda maior, 
            // a terceira, se houver necessidade, e assim por diante. 
            // Só haverá empate se as cinco cartas de dois 
            // jogadores tiverem os mesmos valores.


            test('True, todas as cartas do mesmo naipe', () => {

                const mãoComFlush = [ Carta.C8, Carta.C2, Carta.C10, Carta.C4, Carta.C9 ];
                const resultado = analisadorDePeso.eUmFlush(mãoComFlush);
                expect(resultado).toBeTruthy();

            });

            test('Dois Flush, vence o segundo jogador pois tem a carta mais alto (encabeçada) ', () => {

                

            });



        })



    })


})
