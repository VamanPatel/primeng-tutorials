import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigClass } from './Modals/configModal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'primeng-components';
  form!: FormGroup;

  selectedValue!: FormControl;
  selectedValue1!: FormControl;

  option: ConfigClass = {
    message: 'hi',
    allowCustom: false,
    uri: 'https://dummyjson.com/products',
    minSearchLength: 0,
    filterBy: 'name',
    return: 'id',
    isFilterable: true,
  };
  option1: ConfigClass = {
    message: 'hi',
    allowCustom: false,
    uri: 'https://dummyjson.com/products',
    minSearchLength: 0,
    filterBy: 'name',
    return: 'id',
    isFilterable: false,
  };

  constructor() {
    this.selectedValue = new FormControl(1, Validators.required);
    this.selectedValue1 = new FormControl(null, Validators.required);
    console.log(this.selectedValue, 'this.selectedValue');
  }
}
