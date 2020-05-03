export interface Peso {
    nome: string;
    valor: number;
}

export class UmPar implements Peso {
    
    constructor(
        public nome: string,
        public valor: number
    ){

    }
}