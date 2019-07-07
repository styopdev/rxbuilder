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
  content = '';
  public labels = labels['default'];

  constructor(
    private flowService: FlowService, 
    private http: HttpClient
    ) {
  }

  ngOnInit() {
    const hatsUrl = 'https://www.potterapi.com/v1/sortingHat';
    const catFactsUrl = 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random';

    const hatsObservable = this.http.get(hatsUrl);
    const catsObservable = this.http.get(catFactsUrl);
    
    combineAll([hatsObservable, catsObservable, hatsObservable])
      .subscribe(([hats, cats, hats2]) => {
        console.log('hats: ', hats);
        console.log('cats: ', cats);
        console.log('hats2: ', hats2);
      })

    // this.updateGroups(this.parentId);
  }

  // updateGroups(parentId) {
  //   const groups = this.flowService.getGroups(parentId || null);
  //   if (groups && groups.length) {
  //     this.groups.push(...groups);
  //   } else {
  //     this.showCode();
  //   }
  // }

  // addNewGroup(parentId) {
  //   this.updateGroups(parentId);
  // }

  // showCode() {
  //   const optionsChain = this.groups.map(g => g.selectedOption).join('.');
  //   const operator = this.flowService.getOperator(optionsChain);
  //   console.log('optionsChain: ', optionsChain);
  //   console.log('operator: ', operator);
  // }

  // selectGroup(group, option) {
  //   if (group.selectedOption) {
  //     if (group.selectedOption === option) {
  //       return;
  //     }
  //     const groupIndex = this.groups.findIndex(g => g.id === group.id);
  //     this.groups = this.groups.splice(0, groupIndex + 1);
  //   }

  //   group.selectedOption = option;
  //   this.updateGroups(option);
  // }
}
