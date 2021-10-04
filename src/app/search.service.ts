import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { formattedIssue } from './interfaces/Issue';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  listIssues(title: string): Observable<formattedIssue[]> {
    let query = `?q=${title.replaceAll(' ', '+')}+in:title+repo:${
      environment.repoName
    }`;

    return this.http.get(environment.baseAPI + query).pipe(
      map((value: any) => {
        let results: Array<formattedIssue> = [];
        value.items.forEach((result: formattedIssue) => {
          results.push({
            title: result.title,
            labels: result.labels,
          });
        });

        return results;
      })
    );
  }
}
