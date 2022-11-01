import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShLookupComponent } from './sh-lookup/sh-lookup.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from 'src/app/Service/api.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ShLookupComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    DropdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [ShLookupComponent],
  providers: [ApiService],
})
export class ShLookModule {}
