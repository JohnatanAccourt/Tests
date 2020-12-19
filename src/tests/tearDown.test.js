// Setup and Teardown

// quando se escreve testes você tem alguns setups que precisam acontecer antes do teste rodar, o Jest forcene alguns helpers para lidar com isso.

// Repeating Setup para diversos testes

// se tiver algum trabalho que precisa ser feito de forma repetitiva por vários testes, pode ser usado o beforeEach e o afterEach.

// no exemplo abaixo vamos dizer que vários testes afeta a database de cidades. Você tem o método initializeCityDatabase() que deve ser chamado antes de fazer os testes, e o método clearCityDatabase() que deve ser chamado depois que os testes são feitos, pode ser feito dessa forma:

/*

beforeEach(() => {
    initializeCityDatabase();
});

afterEach(() => {
    clearCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
})

test('city databse has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
})

*/

// One-time setup

// Em alguns casos vai ser preciso fazer o setup apenas uma vez, no começo do arquivo. Jest possui o beforeAll e o afterAll para lidar com isso.

/*

beforeAll(() => {
    return initializeCityDatabase();
});

afterAll(() => {
    return clearCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});

*/

// Scoping

// Por padrão o before e o after pode ser aplicado por todo o arquivo de teste. Mas é possível agrupar alguns testes juntos usando o describe. Quando esses testes estão dentro de um descripe o before e o after são aplicados apenas para aquele determinado bloco de describe.

// Por exemplo, vamos dizer que não temos apenas database de cidades, mas também database de comida. Poderiamos fazer diferentes configurações para diferentes testes.

/*

beforeEach(() => {
    return initializeCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
    beforeEach(() => {
        return initializeFoodDatabase();
    });

    test('Vienna <3 sausage', () => {
        expect(isValidCItyFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    }); 

    test('San Juan <3 plantains', () => {
        expect(isValidCItyFoodPair('San Juan', 'Mofongo')).toBe(true);
    })
})

*/

// Vale ressaltar que os beforeEach fora do describe são executados antes dos que estão dentro.

// Orden de execução dos describes e dos testes de bloco.

// Jest executa todos os describes em um arquivo de teste antes de executar os testes de fato. esse pode ser uma razão de realizar a configuração do teardown dentro de um before e after do que coloca-los dentro de um describe. Uma vez que o describe é terminado de ser lido o Jest roda todos os testes em série em ordem que eles foram encontradas na fase de coleção esperando por cada um deles finalizar e ser laçados antes de continuar.

describe('outer', () => {
    // console.log('describe outer-a');
  
    describe('describe inner 1', () => {
    //   console.log('describe inner 1');
      test('test 1', () => {
        // console.log('test for describe inner 1');
        expect(true).toEqual(true);
      });
    });
  
    // console.log('describe outer-b');
  
    test('test 1', () => {
    //   console.log('test for describe outer');
      expect(true).toEqual(true);
    });
  
    describe('describe inner 2', () => {
    //   console.log('describe inner 2');
      test('test for describe inner 2', () => {
        // console.log('test for describe inner 2');
        expect(false).toEqual(false);
      });
    });
  
    // console.log('describe outer-c');
});

//Se um teste está falhando, uma das primeiras coisa que deve ser vista, é se o teste que está falhando quando é apenas o teste que está rodando, para rodar apenas um teste com o Jest basta mudar o test para test.only

/*

test.only('this will be the only test that runs', () => {
    expect(true).toBe(false);
});

test('this test will not run', () => {
    expect('a').toBe('a');
})

*/