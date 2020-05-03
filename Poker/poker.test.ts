import 'jest';
import { Carta } from './carta';
import { AnalisadorDePeso } from './analisador-peso';
import { UmPar } from './pesos';


const analisador = new AnalisadorDePeso();

describe('Jogo de poker', () => {

  
    
    describe('Peso das cartas', () => {

        test('Carta 4 deve ser maior que a carta 2', () => {

            //expect(Carta.C4).toBeGreaterThan(Carta.C2);
            
        })

        test('Carta Dama deve ser maior que a valete', () => {

            //expect(Carta.CQ).toBeGreaterThan(Carta.CJ);
                
        });

        test('As deve ser maior que Rei, Dama, Valete e 10', () => {
            // expect(Carta.CA).toBeGreaterThan(Carta.CK);
            // expect(Carta.CA).toBeGreaterThan(Carta.CQ);
            // expect(Carta.CA).toBeGreaterThan(Carta.CJ);
            // expect(Carta.CA).toBeGreaterThan(Carta.C10);
        })
        
        test('Dado duas cartas de mesmo valor - deve retornar um par', () => {

            const mão = [ Carta.C3, Carta.C3 ];
            const analisador = new AnalisadorDePeso();
            const valorMão = analisador.extrairPeso(mão);
            expect(valorMão).toBeInstanceOf(UmPar);
            
        });


        test('Deve retonar true para uma mao que tem um par', () => {

            const mão = [ Carta.C3, Carta.C2, Carta.D4, Carta.H3, Carta.SJ ];
            const eUmPar = analisador.éUmPar(mão);

            expect(eUmPar).toBeTruthy();
            
        })
        
        
        
        
    })
    
    
})
