// describe("3-hero service (http) testing:", () => {
    
//     it("getHeroes function: send request and receive response successfully", () => { })
//     it("updateHero function: send request and receive response successfully", () => { })
// })

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import * as heroLabService from './hero.lab.service';

describe('3-hero service (http) testing:', () => {

  let service: heroLabService.HeroServiceForLab;
  let httpTesting: HttpTestingController;

  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(heroLabService.HeroServiceForLab);
    httpTesting = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('getHeroes function: send request and receive response successfully', () => {

    const mockHeroes = [
      {
        id: 1,
        name: 'Superman',
        strength: 100
      },
      {
        id: 2,
        name: 'Batman',
        strength: 90
      }
    ];

    service.getHeroes().subscribe((heroes) => {

      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);

    });

    const req = httpTesting.expectOne(heroesUrl);

    expect(req.request.method).toBe('GET');

    req.flush(mockHeroes);

  });

  it('updateHero function: send request and receive response successfully', () => {

    const hero = {
      id: 1,
      name: 'Superman'
    };

    service.updateHero(hero as any).subscribe((response) => {

      expect(response).toEqual(hero);

    });

    const req = httpTesting.expectOne(heroesUrl);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(hero);

    req.flush(hero);

  });

});