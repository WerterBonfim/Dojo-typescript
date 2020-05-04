import * as jestCli from 'jest-cli';

//const desafioSelecionado = process.argv[2];

const antesDeTodosOsTestes = (): Promise<any> => {

    return new Promise((resolve, reject) => {

        resolve();

    })

};

antesDeTodosOsTestes()
    .then(() => jestCli.run())
    .catch(console.error);