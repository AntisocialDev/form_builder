import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormConfigService } from '../services/form-config.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent {
  finalData: Array<any>;
  tableHeaders!: any;
  tableBody!: any;
  constructor(
    private formConfigService: FormConfigService,
    private fb: FormBuilder
  ) {
    this.finalData = this.formConfigService.getFinalUserData;
    this.tableHeaders = Object.keys(this.finalData[0]);
    this.tableBody = Object.values(this.finalData[0]);
  }
}
