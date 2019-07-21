import {Component, OnInit} from '@angular/core';
import {FlowService} from '../services/flow.service';
import * as labels from '../labels.json';
import {HttpClient} from '@angular/common/http';

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
  generatedCode = 'const observable;';
  public labels = labels['default'];

  constructor(
    private flowService: FlowService, 
    private http: HttpClient
    ) {
  }

  ngOnInit() {
    // const hatsUrl = 'https://www.potterapi.com/v1/sortingHat';
    // const catFactsUrl = 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random';

    // const hatsObservable = this.http.get(hatsUrl);
    // const catsObservable = this.http.get(catFactsUrl);

    // combineAll([hatsObservable, catsObservable, hatsObservable])
    //   .subscribe(([hats, cats, hats2]) => {
    //     console.log('hats: ', hats);
    //     console.log('cats: ', cats);
    //     console.log('hats2: ', hats2);
    // })

    this.updateGroups(this.parentId);
  }

  updateGroups(parentId) {
    const groups = this.flowService.getGroups(parentId || null);

    groups.forEach(group => {
      const isRoot = ~group.parent_ids.indexOf(null);

      group.options = group.options.map(option => {
        
        let id: string;

        if (typeof option === 'object' && option.id) {
          id = option.id;
        } else {
          id = option;
        }

        if (isRoot) {
          return { id, type: 'text' };
        } else {
          const type = this.flowService.getOptionType(id);
          return { id, type };
        }
      });  
    });

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

  selectGroup(group, optionId) {
    if (group.selectedOption) {
      if (group.selectedOption === optionId) {
        return;
      }
      const groupIndex = this.groups.findIndex(g => g.id === group.id);
      this.groups = this.groups.splice(0, groupIndex + 1);
    }

    group.selectedOption = optionId;
    this.updateGroups(optionId);
  }
}
