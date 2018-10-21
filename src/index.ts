import { from, timer } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

function toTimedEmissions<T extends any, V extends any>(
  inputArray: T[],
  getTimestampFromValue: ((v: T, i: number) => number) = (v, i) => i,
  mapValue: ((v: T, i: number) => V | T) = v => v
) {
  return from(inputArray).pipe(
    mergeMap((val, i) => {
      const timestamp = getTimestampFromValue(val, i);
      return timer(timestamp).pipe(
        map(() => {
          return mapValue(val, i);
        })
      );
    })
  );
}

export default toTimedEmissions;
