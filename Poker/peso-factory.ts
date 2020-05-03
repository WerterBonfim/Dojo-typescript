import { UmPar, DoisPares, PesoBase } from "./pesos";

export class PesoFactory {
    public static umPar = (): PesoBase => new UmPar();
    public static doisPares = (): PesoBase => new DoisPares();
}