import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfigClass } from 'src/app/Modals/configModal';

@Component({
  selector: 'sh-lookup',
  templateUrl: './sh-lookup.component.html',
  styleUrls: ['./sh-lookup.component.css'],
})
export class ShLookupComponent implements OnInit {
  @Input() config!: ConfigClass;
  @Input() cms!: any;
  @Input() formControlName!: any;

  selectedAutoComplete: any;
  selectedDropdown: any;

  dropdownData: any[] = [];
  AutoCompleteData: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.config);
    console.log(this.formControlName.value, 'formControlName');
    this.getResult(this.config.filterBy);
  }

  getResult(filterBy: string) {
    this.http
      .get(`${this.config.uri}?filterBy=${filterBy}`)
      .subscribe((i: any) => {
        this.dropdownData = i.products;
        this.AutoCompleteData = i.products;
        console.log(this.dropdownData);
      });
  }

  /* ----------------------------------- filtering data in autocomplete ----------------------------------- */
  filterAutoData(e: any) {
    console.log(e);

    let query: string = e.query;
    let queryLength = query.length;

    if (queryLength > this.config.minSearchLength) {
      setTimeout(() => {
        this.http
          .get(`${this.config.uri}/search?q=${query}`)
          .subscribe((i: any) => {
            this.AutoCompleteData = i.products;
            if (this.AutoCompleteData.length === 0 && this.config.allowCustom) {
              this.formControlName.value = query;
              console.log(this.formControlName.value);
            }
            console.log(this.AutoCompleteData);
          });
      }, 500);
    } else {
      this.AutoCompleteData = [];
    }
  }

  /* ------------------------------------- onclear AutoComplete method ------------------------------------ */
  OnClearedAutoComplete(e: any) {
    console.log(e.value, 'line 65');

    if (e.value === undefined) {
      this.formControlName.reset();
      console.log(this.formControlName.value, 'line 68');
    }
  }
  OnClearedDropdown(e: any) {
    console.log(e.value, 'line 73');

    if (e.value === undefined) {
      this.formControlName.reset();
      console.log(this.formControlName.value, 'line 68');
    }
  }

  /* -------------------------------------- select valuefrom dropdwon ------------------------------------- */
  changeDropdown(e: any) {
    console.log(e.value);
    this.formControlName.value = e.value[this.config.return];
    console.log(this.formControlName);
  }

  /* ------------------------------------- autocomplete select option ------------------------------------- */
  selectedAutoValue(e: any) {
    console.log(e, '70 line');
    this.formControlName.value = e[this.config.return];
    console.log(this.formControlName.value);
  }
}
