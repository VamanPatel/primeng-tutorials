import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigClass } from 'src/app/Modals/configModal';

@Component({
  selector: 'sh-lookup',
  templateUrl: './sh-lookup.component.html',
  styleUrls: ['./sh-lookup.component.css'],
})
export class ShLookupComponent implements OnInit {
  @Input() config!: ConfigClass;
  @Input() cms!: any;
  @Input() formControlName!: FormControl;

  selectedAutoComplete: any;
  selectedDropdown: any;

  dropdownData: any[] = [];
  AutoCompleteData: any[] = [];

  showError: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.config);
    console.log(this.formControlName.invalid, 'formControlName');
    this.getResult(this.config.filterBy);
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
              this.formControlName.setValue(query);
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
      this.showError = true;
    }
  }

  /* ------------------------------------- autocomplete select option ------------------------------------- */
  selectedAutoValue(e: any) {
    console.log(e, '70 line');
    this.formControlName.setValue(e[this.config.return]);
    console.log(this.formControlName.value);
  }

  /* ------------------------------------- blur event of AutoComplete ------------------------------------- */
  blurAutoComplete(e: any) {
    console.log(e.value, 'line 100');
    console.log(this.formControlName.value, 'line 100');
    if (!this.formControlName.value) {
      this.showError = true;
    }
  }

  /* ------------------------------------- onclear dropdown method ------------------------------------ */
  OnClearedDropdown(e: any) {
    console.log(e.value, 'line 73');

    if (e.value === undefined) {
      this.formControlName.reset();
      console.log(this.formControlName.value, 'line 68');
      this.showError = true;
    }
  }

  /* -------------------------------------- select valuefrom dropdwon ------------------------------------- */
  changeDropdown(e: any) {
    console.log(e.value);
    if (e.value) {
      this.formControlName.setValue(e.value[this.config.return]);
      console.log(this.formControlName.touched);
    }
  }

  /* --------------------------------------- blur event of dropdown --------------------------------------- */
  blurDropdown(e: any) {
    if (!this.formControlName.value) {
      this.showError = true;
    }
  }

  getResult(filterBy: string) {
    this.http.get(`${this.config.uri}`).subscribe((i: any) => {
      this.dropdownData = i.products;
      this.AutoCompleteData = i.products;
      console.log(this.dropdownData);
      if (this.formControlName.value) {
        setTimeout(() => {
          this.selectedDropdown = this.dropdownData.filter((i) => {
            return i[this.config.return] === this.formControlName.value;
          })[0];
          this.selectedAutoComplete = this.AutoCompleteData.filter((i) => {
            return i[this.config.return] === this.formControlName.value;
          })[0];
        }, 0);
        console.log(this.selectedDropdown, 'this.selectedDropdown');
      }
    });
  }
}
