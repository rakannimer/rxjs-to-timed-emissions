import toTimedEmissions$$ from "../index";

describe("sum", () => {
  test("exports", () => {
    expect(toTimedEmissions$$).toBeTruthy();
  });
  test("works without mapper and without extractor", done => {
    const INPUT = Array.from({ length: 10 }, (v, i) => i);
    const OUTPUT$ = toTimedEmissions$$(INPUT);
    const onNext = jest.fn();
    let output = [] as any[];
    OUTPUT$.subscribe(
      (v: any) => {
        onNext(v);
        output.push(v);
      },
      () => {},
      () => {
        expect(onNext.mock.calls.length).toEqual(10);
        expect(output).toEqual(INPUT);
        done();
      }
    );
  });
  test("works with mapper and without extractor", done => {
    const INPUT = Array.from({ length: 10 }, (v, i) => i);
    const MAPPER = (v: number) => v * 2;
    const OUTPUT$ = toTimedEmissions$$(INPUT, undefined, MAPPER);
    const onNext = jest.fn();
    let output = [] as any[];

    OUTPUT$.subscribe(
      (v: any) => {
        onNext(v);
        output.push(v);
      },
      () => {},
      () => {
        expect(onNext.mock.calls.length).toEqual(10);
        expect(output).toEqual(INPUT.map(MAPPER));
        done();
      }
    );
  });
  test("works with mapper and with extractor", done => {
    const INPUT = Array.from({ length: 10 }, (v, i) => ({ i }));
    const MAPPER = (v: any) => v.i * 2;
    const OUTPUT$ = toTimedEmissions$$(INPUT, v => v.i * 10, MAPPER);
    const onNext = jest.fn();
    let output = [] as any[];

    OUTPUT$.subscribe(
      (v: any) => {
        onNext(v);
        output.push(v);
      },
      () => {},
      () => {
        expect(onNext.mock.calls.length).toEqual(10);
        expect(output).toEqual(INPUT.map(MAPPER));
        done();
      }
    );
  });
});
