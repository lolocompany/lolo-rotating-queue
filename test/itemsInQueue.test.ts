import { it, describe } from 'vitest';

import { Queue } from '../src/main';

const CORRECT = Symbol('Expected');

describe('itemsInQueue', () => {
  it('should be 0 for empty queue', async ({ expect }) => {
    const Q = new Queue<Symbol>(5);
    expect(Q.itemsInQueue()).to.equal(0);
  });

  it('should increment by one for each write', async ({ expect }) => {
    const Q = new Queue<Symbol>(5);
    await Q.write(CORRECT);
    expect(Q.itemsInQueue()).to.equal(1);
    await Q.write(CORRECT);
    expect(Q.itemsInQueue()).to.equal(2);
    await Q.write(CORRECT);
    expect(Q.itemsInQueue()).to.equal(3);
  });

  it('should decrement by one for each read', async ({ expect }) => {
    const Q = new Queue<Symbol>(5);
    await Q.write(CORRECT);
    await Q.write(CORRECT);
    await Q.write(CORRECT);
    expect(Q.itemsInQueue()).to.equal(3);
    await Q.read();
    expect(Q.itemsInQueue()).to.equal(2);
    await Q.read();
    expect(Q.itemsInQueue()).to.equal(1);
    await Q.read();
    expect(Q.itemsInQueue()).to.equal(0);
  });
});
