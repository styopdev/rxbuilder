import { Component, OnInit } from '@angular/core';
// import { Criteria } from '../models/criteria.model';
import { FlowService } from 'services/flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rx.js builder';
  selectedGroup = {
    options: []
  };
  groups = [];
  chain = [];
  parentId ?: string = null;

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
    this.updateGroups(this.parentId);
  }

  updateGroups(parentId) {
    const groups = this.flowService.getGroups(parentId);
    if (groups.length) {
      this.groups.push(...groups);
    }
  }

  addNewGroup(parentId) {
    this.updateGroups(parentId);
  }

  selectGroup(group) {
    this.updateGroups(group.id);
  }

  selectOption(criteria, option) {
    //
  }
}
