const mergeArray = function(...arrays: any[]): any[] {

    let novoArray: any[] = [];

    arrays.forEach(array => {
        novoArray = [...novoArray, ...array];
    });

    const mesclado = [...new Set([...novoArray])];
    return mesclado;
}

export default mergeArray;