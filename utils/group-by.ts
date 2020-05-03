
/**
 * 
 * @param data is an array of objects
 * @param key is the key (or property accessor) to group by 
 */
const groupBy = function (data: any[], key: string): any {
    
    return data.reduce(function (storage, item) {

        let group = item[key];
        
        storage[group] = storage[group] || [];

        storage[group].push(item);

        return storage;

    }, { });

}


export default groupBy;