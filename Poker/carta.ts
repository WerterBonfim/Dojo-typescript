
export enum Carta {
    D2 = 'D2',
    H2 = 'H2',
    S2 = 'S2',
    C2 = 'C2',

    D3 = 'D3',
    H3 = 'H3',
    S3 = 'S3',
    C3 = 'C3',

    D4 = 'D4',
    H4 = 'H4',
    S4 = 'S4',
    C4 = 'C4',

    D5 = 'D5',
    H5 = 'H5',
    S5 = 'S5',
    C5 = 'C5',

    D6 = 'D6',
    H6 = 'H6',
    S6 = 'S6',
    C6 = 'C6',

    D7 = 'D7',
    H7 = 'H7',
    S7 = 'S7',
    C7 = 'C7',

    D8 = 'D8',
    H8 = 'H8',
    S8 = 'S8',
    C8 = 'C8',

    D9 = 'D9',
    H9 = 'H9',
    S9 = 'S9',
    C9 = 'C9',

    D10 = 'D10',
    H10 = 'H10',
    S10 = 'S10',
    C10 = 'C10',

    DJ = 'DJ',
    HJ = 'HJ',
    SJ = 'SJ',
    CJ = 'CJ',

    DQ= 'DQ',
    HQ= 'HQ',
    SQ= 'SQ',
    CQ= 'CQ',

    DK = 'DK',
    HK = 'HK',
    SK = 'SK',
    CK = 'CK',

    DA = 'DA',
    HA = 'HA',
    SA = 'SA',
    CA = 'CA',


}



const mão = [ Carta.C3, Carta.C3, Carta.D4, Carta.H4, Carta.S3 ];

mão
    .map( x => x.split('')[0]) //? 



