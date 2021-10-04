import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

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
      catchError((err: any) => {
        console.error(err);
        return throwError(err.error.message);
      }),
      map((value: any) => {
        let results = this.formatResults(value);
        return results;
      })
    );
  }

  formatResults(records: any): Array<formattedIssue> {
    let results: Array<formattedIssue> = [];

    records.items.forEach((result: formattedIssue) => {
      results.push({
        title: result.title,
        labels: result.labels,
        description: result.body,
        closed_at: result.closed_at,
        html_url: result.html_url,
      });
    });

    return results;
  }
}
