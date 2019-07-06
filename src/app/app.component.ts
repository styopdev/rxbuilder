import { Component, OnInit } from '@angular/core';
import { FlowService } from '../services/flow.service';
import * as labels from '../labels.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RXbuilder';
  groups = [];
  chain = [];
  parentId ?: string = null;
  public labels = labels['default'];

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
    const optionsChain = this.groups.map(g => g.selectedOption).join('.');
    const operator = this.flowService.getOperator(optionsChain);
    console.log('optionsChain: ', optionsChain);
    console.log('operator: ', operator);
  }

  selectGroup(group, option) {
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
