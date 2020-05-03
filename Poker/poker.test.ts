// http://dojopuzzles.com/problemas/exibe/poker/


import 'jest';
import { Carta } from './carta';
import { AnalisadorDePeso } from './analisador-peso';
import { UmPar, DoisPares } from './pesos';


const analisador = new AnalisadorDePeso();

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
            const valorMão = analisador.extrairPeso(mão);
            expect(valorMão).toBeInstanceOf(UmPar);

        });


        test('Deve retonar true para uma mao que tem um par', () => {

            const mão = [Carta.C3, Carta.C2, Carta.D4, Carta.H1, Carta.SJ];
            const eUmPar = analisador.éUmPar(mão);
            expect(eUmPar).toBeTruthy();

        });

        test('Deve retornar true para uma mão que tem dois pares', () => {

            const mãoComDoisPares = [Carta.C3, Carta.C2, Carta.D4, Carta.HJ, Carta.SJ];
            const resultado = analisador.éDoisPares(mãoComDoisPares);
            expect(resultado).toBeTruthy();

        });        

        test('Trinca: Três cartas do mesmo valor e duas de valores diferentes.', () => {

            const mãoComTrinca = [Carta.C3, Carta.C4, Carta.C1, Carta.H8, Carta.D2];
            const resultado = analisador.eUmaTrinca(mãoComTrinca);
            expect(resultado).toBeTruthy();

        });

        //  cinco cartas em seqüência, independentemente dos naipes. 
        //  Entre duas seguidas, ganhará a que for encabeçada pela carta de maior valor. 
        //  Exemplo: A, R, D, V, 10 e 10, 9, 8, 7, Ás (valendo como seis) – vence a primeira.

        test('Straight (seqüência): Todas as carta com valores consecutivos.', () => {
            
            // ordenar por valor
            const mãoComSequencia = [Carta.C3, Carta.C4, Carta.D5, Carta.S6, Carta.H7];
            const resultado = analisador.eUmaSequencia(mãoComSequencia);
            expect(resultado).toBeTruthy();
                        

        })




    })


})
