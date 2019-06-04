import { Component, OnInit } from '@angular/core';
import { Criteria } from '../models/criteria.model';
import { FlowService } from 'services/flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  criterias: Criteria[];

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
    this.criterias = this.flowService.getCriterias();
  }

  selectOption(criteria, option) {
    //
  }
}
