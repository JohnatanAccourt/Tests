import { expect } from 'chai';

import sum from './sum';

// test('Expect to be an function', () => {
//     expect(sum()).to.be.a('function');
// })

test('Expect 2 + 2 be 4', () => {
    expect(sum(2 + 2)).to.be.equal(4);
})
