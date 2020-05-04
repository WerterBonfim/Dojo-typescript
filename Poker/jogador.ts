import { CartaBase } from "./carta";

export class Jogador {
    constructor(
        public nome: string,
        public mão: CartaBase[]
    ) {
        
    }
}