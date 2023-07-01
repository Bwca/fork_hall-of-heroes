import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { param } from '../routing/param.decorator';
import { first, Observable, switchMap } from 'rxjs';
import { ROUTES } from '../routing/routes.const';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  @param<typeof ROUTES.DETAIL>('id')
  heroId$!: Observable<number>;

  constructor(private heroService: HeroService, private location: Location) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroId$
      .pipe(
        first(),
        switchMap((id) => this.heroService.getHero(id))
      )
      .subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
