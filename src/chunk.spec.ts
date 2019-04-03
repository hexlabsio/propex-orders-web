import chunk from './chunk';
import { expect } from 'chai';
import 'jest';

describe('chunk', () => {
  it('should chunk empty array', () => {
    expect(chunk([], 5)).to.be.an('array').that.is.empty;
  });

  it('should chunk into ones', () => {
    expect(chunk(['a', 'b', 'c'], 1)).to.deep.equal([['a'], ['b'], ['c']]);
  });

  it('should chunk into 2s with extra tail', () => {
    expect(chunk(['a', 'b', 'c'], 2)).to.deep.equal([['a', 'b'], ['c']]);
  });
});
