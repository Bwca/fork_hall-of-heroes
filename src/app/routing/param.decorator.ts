import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const params$ = new BehaviorSubject<Record<string, string>>({});

export const param = <T extends string>(parameter: string) => {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = params$.asObservable().pipe(
      map((p) => p[parameter]),
      filter(Boolean)
    );
  };
};

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
