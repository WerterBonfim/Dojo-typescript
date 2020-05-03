export abstract class PesoBase {
    
    constructor(
        public nome: string,
        public valor: number
    ) {}
    
}

export class UmPar extends PesoBase {
    
    constructor(){
        super('Um Par', 1);
    }
}

export class DoisPares extends PesoBase {
    
    constructor(){
        super('Um Par', 2);
    }

}