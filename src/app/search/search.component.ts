import { SearchService } from './../search.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime, tap, catchError } from 'rxjs/operators';
import { formattedIssue } from '../interfaces/Issue';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() newResultEvent = new EventEmitter<formattedIssue>();
  @Output() newErrorEvent = new EventEmitter<string>();

  myControl = new FormControl();
  selectedResult: string;
  filteredOptions: Observable<formattedIssue[]>;
  result: formattedIssue;
  errorMsg: string | undefined;
  constructor(private searchService: SearchService) {
    this.myControl.valueChanges
      .pipe(debounceTime(1000), startWith(''))
      .subscribe((value) => {
        this.filteredOptions = this.searchService.listIssues(value).pipe(
          tap({
            next: this.handleSuccess,
            error: this.handleError,
          })
        );
      });
  }

  ngOnInit() {}

  //This has to be an arrow function for scope concerns
  public handleSuccess = (values: Array<any>) => {
    if (!values?.length) {
      this.errorMsg = 'No results found.';
    } else {
      this.errorMsg = undefined;
    }
    this.newErrorEvent.emit(this.errorMsg);
  };

  //This has to be an arrow function for scope concerns
  public handleError = (err: string) => {
    this.errorMsg = err;
    this.newErrorEvent.emit(this.errorMsg);
  };

  public setOption(option: formattedIssue) {
    this.result = option;
    this.newResultEvent.emit(this.result);
  }
}
