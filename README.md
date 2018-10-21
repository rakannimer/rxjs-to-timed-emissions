## RxJS toTimedEmissions

Convert an array of anything to a stream of timed RxJS emissions.

## Install

```sh
  yarn add rxjs-to-timed-emissions
```

## Usage

```typescript
import toTimedEmissions$$ from "rxjs-to-timed-emissions";

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
```

## API

### Signature :

```typescript
function toTimedEmissions$$<T extends any, V extends any>(
  inputArray: T[],
  getTimestampFromValue?: ((v: T, i: number) => number),
  mapValue?: ((v: T, i: number) => V | T)
): Observable<T | V>;
```
