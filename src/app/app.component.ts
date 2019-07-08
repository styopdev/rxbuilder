import { Component, OnInit } from '@angular/core';
import { FlowService } from '../services/flow.service';
import * as labels from '../labels.json';
import { HttpClient } from '@angular/common/http';
import { switchMap, mergeMap,flatMap, combineAll } from 'rxjs/operators';
import { forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RXbuilder';
  groups = [];
  chain = [];
  parentId ?: string = null;
  generatedCode = '';
  public labels = labels['default'];

  constructor(
    private flowService: FlowService, 
    private http: HttpClient
    ) {
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
    const code = this.flowService.getCodeByOperator(operator);
    console.log('optionsChain: ', optionsChain);
    console.log('operator: ', operator);
    console.log('code: ', code);
    this.generatedCode = code;
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
