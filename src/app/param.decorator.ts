import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const params$ = new BehaviorSubject<Record<string, string>>({});

export function param<T extends string>(parameter: PathParameters<T>) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = params$.asObservable().pipe(
      map((p) => p[<string>parameter]),
      filter(Boolean)
    );
  };
}

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

type PathParameters<T extends string> = T extends `:${infer P}/${infer R}`
  ? P | PathParameters<`${R}`>
  : /** we encounter static string, not a param at all */
  T extends `${infer _}/${infer R}`
  ? /** apply current type recursively to the rest */
    PathParameters<`${R}`>
  : /** last case, when param is in the end of the url */
  T extends `:${infer P}`
  ? P
  : /** unknown case, should never happen really */
    unknown;
