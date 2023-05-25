import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrapeService } from './services/scrape.service';
import { Subscription, map } from 'rxjs';
import { SubscriptionPackage } from './models/subscription-package';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'wl-test';
  subscriptionPackages: SubscriptionPackage[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private scrapeService: ScrapeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.scrapeService
        .scrapeWebsite()
        .pipe(
          map((data: any) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            const packageTitles = this.extractTextContent(doc, '', 'h3');
            const packageNames = this.extractTextContent(doc, 'package-name');
            const packageDescriptions = this.extractTextContent(doc, 'package-description');
            const packagePrices = this.extractTextContent(doc, 'package-price');
            const packageDatas = this.extractTextContent(doc, 'package-data');

            for (let i=0; i<6; i++) {
              const pack = {
                title: packageTitles[i],
                name: packageNames[i],
                description: packageDescriptions[i],
                price: packagePrices[i],
                data: packageDatas[i]
              }
              this.subscriptionPackages.push(pack);
            }
          })
        )
        .subscribe()
    );
  }

  extractTextContent(html: any, htmlClass?: string, tag?: string) {
    let arrTextContent: string[] = [];

    if (!!htmlClass && htmlClass) {
      arrTextContent = Array.from(html.querySelectorAll('.' + `${htmlClass}`));
    }

    if (!!tag && tag) {
      arrTextContent = Array.from(html.querySelectorAll(tag));
    }

    return arrTextContent.map((el: any) => el.textContent);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
