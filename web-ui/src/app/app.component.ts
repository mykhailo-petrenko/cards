import { Component, OnInit } from '@angular/core';
import { OperationHandlerService } from './api/services/operation-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cards';

  constructor(
    private operationHandlerService: OperationHandlerService
  ) {
  }

  ngOnInit(): void {
    this.operationHandlerService.handleUsingGET1Response().toPromise()
      .then((a) => {
        console.log(a);
      });
  }
}
