import { WithoutValue } from './nullable';

describe('WithoutValue', () => {
  let sut: WithoutValue<number>;
  beforeEach(() => {
    sut = new WithoutValue<number>();
  });

  it('when calling describe it should give WithoutValue()', () => {
    // act
    const actual: string = sut.inspect();

    // assert
    expect(actual).toBe('WithoutValue()');
  });
});
