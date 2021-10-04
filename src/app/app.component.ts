import { formattedIssue } from './interfaces/Issue';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'react-issues';
  result: formattedIssue | undefined;
  errorMsg: string | undefined;

  setError(err: string | undefined) {
    this.errorMsg = err;
    if (err) this.result = undefined;
  }

  setResult(value: formattedIssue) {
    this.result = value;
  }
}
