import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
})
export class ErrorDisplayComponent implements OnInit {
  @Input() errorMessage: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
