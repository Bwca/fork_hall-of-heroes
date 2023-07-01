import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const params$ = new BehaviorSubject<Record<string, string>>({});

export function routeInitializer(router: Router): () => Promise<any> {
  return () =>
    new Promise<void>((resolve) => {
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          params$.next(
            router.routerState.snapshot.root.firstChild?.params ?? {}
          );
        });

      resolve();
    });
}

export function param<T extends string>(parameter: PathParameters<T>) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = params$.asObservable().pipe(
      map((p) => p[<string>parameter]),
      filter(Boolean)
    );
  };
}

type PathParameters<T extends string> = T extends `:${infer P}/${infer R}`
  ? P | PathParameters<`${R}`>
  : T extends `${infer _}/${infer R}`
  ? PathParameters<`${R}`>
  : T extends `:${infer P}`
  ? P
  : unknown;
