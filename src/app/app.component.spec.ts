import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScrapeService } from './services/scrape.service';
import { of } from 'rxjs';

describe('AppComponent', () => {

  const spyScrapeService = jasmine.createSpyObj(
    ScrapeService,
    ['get', 'scrapeWebsite']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide:  ScrapeService, useValue: spyScrapeService }
      ]
    }).compileComponents();
    spyScrapeService.scrapeWebsite.and.returnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wl-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wl-test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('WL-TEST');
  });
});
