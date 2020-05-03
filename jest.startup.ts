import * as jestCli from 'jest-cli';

const antesDeTodosOsTestes = (): Promise<any> => {

    return new Promise((resolve, reject) => {


        resolve()

    })

}

antesDeTodosOsTestes()
    .then(() => jestCli.run())
    .catch(console.error);