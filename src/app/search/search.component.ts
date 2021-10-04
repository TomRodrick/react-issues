import { SearchService } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, tap } from 'rxjs/operators';
import { formattedIssue } from '../interfaces/Issue';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  selectedResult: string;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<formattedIssue[]>;
  result: formattedIssue;

  constructor(private searchService: SearchService) {
    this.myControl.valueChanges
      .pipe(debounceTime(1000), startWith(''))
      .subscribe((value) => {
        this.filteredOptions = this.searchService.listIssues(value);
      });
  }

  ngOnInit() {}

  public listIssues(value: string) {
    return this.searchService.listIssues(value);
  }

  public setOption(option: formattedIssue) {
    this.result = option;
  }
}
