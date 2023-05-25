import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  url = 'https://wltest.dns-systems.net/';

  constructor(private http: HttpClient) { }

  scrapeWebsite() {
    return this.http.get(this.url, { responseType: 'text' });
  }
}
