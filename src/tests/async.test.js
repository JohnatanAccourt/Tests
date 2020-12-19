// Testando Códigos asyncronos

// É bem comum que o código js seja rodado de forma assíncrona.
// Quando isso acontece o Jest precisa saber quando o código que está sendo testado foi concluído antes de fazer o próximo teste
// E o Jest tem algumas formas de lidar com isso.



// Callbacks

// O padrão mais comum em códigos assíncronos é as callbacks sem dúvida

// Por exemplo, vamos supor que você tenha um fetchData(callback), é uma função vai receber a informação ou data e depois vai chamar o callback quando terminar. Você quer testar o que retornou de data que no caso vai ser a string 'peanut butter'.

// Por padrão o Jest testa completamente quando ele alcança o fim de seu execução. 

// É muito importante entender que o teste não pode ser executado antes da função que vai trazer a data como no exemplo:

/* 

test('the data is peanut butter', () => {
    function callback(data) {
        expect(data).toBe('peanut butter');
    }

    fetchData(callback);
});

*/

// Tem uma alternativa que consiste em vez de colocar o teste dentro de uma função com um argumento vazio, podemos usar um único argumento que é chamado de done. Jest vai esperar até que o done seja chamado antes de terminar o teste.

/*

test('the data is peanut butter', () => {
    function callback(data){
        try{
            expect(data).toBe('peanut butter');
        }catch(err){
            done(err);
        }
    }
    fetchData(callback);
})

*/



// Promises

// o Jest lida com isso de forma direta, ele vai esperar até a promise retornar o que ela justamente faz um promessa, quando ela terminar e for rejeitada o teste vai automaticamente falhar.

// por exemplo vamos dizer que fetchData ao em vez de usar uma callback ele retorna um promise que supostamente vai nos dar a string peanut butter, podemos testar dessa forma.


/*

test('the data is peanut butter', () => {
    return fetchData().then(data => {
      expect(data).toBe('peanut butter');
    });
});

*/

// Importante que DEVEMOS retornar a promise, pois se isso não acontecer, vai ser a mesma coisa com a callback, o teste vai ser concluido antes de executar a função fetchData

// Agora se você já espera que a promisse vai ser rejeitada, pode ser usado o método .catch. Tenha certeza de ter adicionado o expect.assertions para verificar que um certo número de afirmações foi chamado, com isso, a promisse não iria falhar no teste.

// .resolves e .rejects 

// pode ser usado o .resolver nos testes o Jest vai esperar até que a promise resolva, se for rejeitado o teste vai falhar.

/*

test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});

*/

// Se estiver esperando que seja rejeitado .rejects, se a promisse obter alguma data o teste vai falhar.

/*

test('the fetch fails with an error', () => {
    return expect(fetchData()).rejects.toMatch('error');
});

*/




// Async e Await

// pode ser usado async e await nos testes. para escrever um teste asíncrono deve ser usado o async na frente de uma função passada para teste. por exemplo o mesmo fetchData pode ser testado com:

/*

test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
})

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try{
        await fetchData();
    }catch(e){
        expect(e).toMatch('error');
    }
})

*/

// Existe a possibilidade de combinar o async e o await com .resolver ou .rejects

/*

test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
});

t('the fetch fals with an error', async () => {
    await expect(fetchData()).rejects.toThrow('error');
});

*/

// o async e await nos testes é uma sintax sugar da mesma lógica que as promisses usam.
