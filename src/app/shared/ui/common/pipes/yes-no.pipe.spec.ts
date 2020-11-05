import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  it('false should be No', () => {
    const pipe = new YesNoPipe();
    expect(pipe.transform(false)).toBe('No');
  })

  it('true should be Yes', () => {
    const pipe = new YesNoPipe();
    expect(pipe.transform(true)).toBe('Yes');
  })
});
