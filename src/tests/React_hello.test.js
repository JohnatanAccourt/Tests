import React from 'react';
import {render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Hello from '../Hello';

let container = null;

beforeEach(() => {
    // configurar o elemento do DOM como o alvo da renderização
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    //Fazer a limpeza depois de realizar os testes

    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("renders with or without a name", () => {
    // act garante com que os ações ou eventos feitos pelo usuário seja processados e aplicados ao DOM antes que seja realizado um teste.
    act(() => {
        render(<Hello />, container);
    })
    expect(container.textContent).toBe("hey, stranger");

    act(() => {
        render(<Hello name="Jenny" />, container);
    })
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, container);
    })
    expect(container.textContent).toBe("Hello, Margaret!");
})