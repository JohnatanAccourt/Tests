import React from 'react';
import { render, unmountComponentAtNode} from 'react-dom';
import { act } from 'react-dom/test-utils';
import User from '../Users';

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('render user data', async () => {
    const fakeUser = {
        name: "Joni Baez",
        age: '32',
        address: "123, charming Avenue"
    };

    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(fakeUser)
    }));

    await act(async () => {
        render(<User id='123' />, container);
    });

    expect(container.querySelector('summary').textContent).toBe(fakeUser.name);
    expect(container.querySelector('strong').textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);

    // remover o mock para garantir que os testes estáo isolados
    global.fetch.mockRestore();
});