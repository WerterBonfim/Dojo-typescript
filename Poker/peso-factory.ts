import { UmPar, DoisPares, PesoBase, Sequencia, Flush } from "./pesos";
import { CartaBase } from "./carta";

export class PesoFactory {
    public static umPar = (mão: CartaBase[]): PesoBase => new UmPar(mão);
    public static doisPares = (mão: CartaBase[]): PesoBase => new DoisPares(mão);
    public static sequencia = (mão: CartaBase[]): PesoBase => new Sequencia(mão);
    public static flush = (mão: CartaBase[]): PesoBase => new Flush(mão);
    //public static Sequencia = (mão: CartaBase[]): PesoBase => new Sequencia(mão);
    //public static Sequencia = (mão: CartaBase[]): PesoBase => new Sequencia(mão);
    //public static Sequencia = (mão: CartaBase[]): PesoBase => new Sequencia(mão);
    

}