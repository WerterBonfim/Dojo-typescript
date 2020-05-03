type TipoAcessor = "propriedade" | "funcao";


 /**
  * 
  * @param data array a ser ordenado
  * @param acessor nome da propriedade ou função usada como chave de agrupamento
  * @param tipoAcessor define como a propriedade sera acessada, 
  * @example 
  * tipoAcessor === 'propriedade' => item['propriedade'].
  * tipoAcessor === 'funcao' => item['funcao']()
  * @example Exemplo: groupBy([ 'Ryu', 'Ken', 'Guile', 'Sagat', 'Gen', 'Dan' ], 'length')
 * => { 3: [ 'Ryu', 'Ken', 'Gen', 'Dan' ], 5: [ 'Guile', 'Sagat' ] } 
  */
const groupBy = function (data: any[], acessor: string, tipoAcessor: TipoAcessor = 'propriedade'): any {
    
    return data.reduce(function (storage, item) {

        let group = tipoAcessor == 'propriedade' ? 
            item[acessor] :
            item[acessor]();
        
        storage[group] = storage[group] || [];

        storage[group].push(item);

        return storage;

    }, { });

}


export default groupBy;