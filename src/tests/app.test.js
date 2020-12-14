// Starting with Matchers

// Matchers é usado para testar valores de formas diferentes.

// Common Matchers
// Forma mais simples de testar a equalidade de um valor

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
})

// nesse código expect 2+2 returna um objeto esperado.
// Não tem muito o que ser feito com ele a não ser usar os matchers. 
// No codigo acima, o .toBe é um matcher usado para testar o valor exato.

test('object assingment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
})

// toEqual checa recursivamente todos os campos de um objeto ou uma array

// podemos tambem testar o valor de forma oposta(false)
// está passando dois fors um dentro do outro começando com 1
// entãro ele esta esperando um valor somado do for a e b não seja 1

test('adding positive numbers is not zero', () => {
    for(let a = 1; a < 10; a++ ){
        for(let b = 1; b < 10; b++){
            expect(a + b).not.toBe(1);
        }
    }
})

// Truthiness

// Nos testes, algumas vezes precisamos de destinguir entre:
// underfined, null e false
// para isso o jest possui helpers que permite com que possamos testar o valor retornado

// toBeNull testa apenas null
// toBeUndefined testa apenas undefined
// toBeDefined é o oposto do toBeUndefined
// toBeTruthy testa qualquer coisa que seja true
// toBeFalsy testa qualquer coisa que seja false

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    // expect(n).toBeUndefined();
    // expect(n).toBeTruthy();
    expect(n).toBeFalsy();
})

test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    // expect(z).not.toBeDefined();

    // both here is the same thing
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
})

// Numbers

// diversas formas de comparar e testar numeros equivalentes

test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe e o toEqual pode ser usado para numbers também

    expect(value).toBe(4);
    expect(value).toEqual(4);
})

// para proximidade de valores pode ser usado o toBeCloseTo
// ao em vés do toEqual, para não termos problemas com arredondamento de valores.

test('jadding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3); // Valor recebido = 0.30000000000000004 
    expect(value).toBeCloseTo(0.3); // Valor recebido = 0.3 ✔ 
})

// Strings 
// é possível chegar strings contra as expressões regulares com o ToMatch

test('there is no I in team', () => {
    // ele espera que team náo tenha a letra i 
    expect('team').not.toMatch(/I/);
})

test('but there is a "stop" in Christoph', () => {
    // ele espera que Christoph tenha stop dentre
    expect('Christoph').toMatch(/stop/);
})

// Arrays e iteráveis
// você pode testar se uma array possui um item particular usando o toContain

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
];

test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    // mesmo usando o objeto set ele também é capaz de testar se contém o valor que queremos
    expect(new Set(shoppingList)).toContain('milk');
})

// Exceptions
// se você quer tester qualquer função que throws um erro, use toThrow.

function compileAndroidCode(){
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    //Você também pode usar a mesma mensagem de erro ou então uma regex
    // ele espera que a mensagem de erro seja exatamente igual da função
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
})

// ainda existem outros diversos matchers, mas esses são os principais e pode ajudar a suprir a maioria das necessidades