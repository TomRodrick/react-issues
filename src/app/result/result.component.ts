import { Component, Input, OnInit } from '@angular/core';
import { formattedIssue } from '../interfaces/Issue';

@Component({
  selector: 'ngx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() issue: formattedIssue | undefined;

  constructor() {}

  ngOnInit(): void {}
}
