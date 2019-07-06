import { Component, OnInit } from '@angular/core';
import { FlowService } from '../services/flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rx.js builder';
  groups = [];
  chain = [];
  parentId ?: string = null;

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
    this.updateGroups(this.parentId);
  }

  updateGroups(parentId) {
    const groups = this.flowService.getGroups(parentId || null);
    if (groups && groups.length) {
      this.groups.push(...groups);
    } else {
      this.showCode();
    }
  }

  addNewGroup(parentId) {
    this.updateGroups(parentId);
  }

  showCode() {
    console.log(this.groups.map(g => g.selectedOption));
  }

  selectGroup(group, option) {
    debugger;
    if (group.selectedOption) {
      if (group.selectedOption === option) {
        return;
      }
      const groupIndex = this.groups.findIndex(g => g.id === group.id);
      this.groups = this.groups.splice(0, groupIndex + 1);
    }

    group.selectedOption = option;
    this.updateGroups(option);
  }
}
