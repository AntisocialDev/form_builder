import { Component, OnInit } from '@angular/core';
import { IFormItems } from '../form-builder/model/form-item.model';
import { FormConfigService } from '../services/form-config.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userInputFormGroup: FormGroup;
  userFormData: IFormItems[] = [];
  constructor(
    private formConfigService: FormConfigService,
    private fb: FormBuilder
  ) {
    this.userInputFormGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.userFormData = this.formConfigService.getFormConfig;
    for (let formModule of this.userFormData) {
      if (formModule.type == 'checkbox') {
        this.userInputFormGroup.addControl(
          formModule.label.replace(' ', '').toLowerCase(),
          new FormArray([], [Validators.required])
        );
      }
      this.userInputFormGroup.addControl(
        formModule.label.replace(' ', '').toLowerCase(),
        new FormControl('',[Validators.required])
      );
    }
  }

  onOptChange(event: any, name: string, type: string) {
    if (type == 'checkbox') {
      const opts: FormArray = this.userInputFormGroup.controls[
        name
      ] as FormArray;
      if (event.target.checked) {
        opts.push(new FormControl(event.target.value));
      }else {
        const index = opts.controls.findIndex(x => x.value === event.target.value);
        opts.removeAt(index);
     }
    }else{
      this.userInputFormGroup.get(name)?.setValue(event.target.value)
    }
  }

  onSubmit() {
    let payload = this.userInputFormGroup.value;
    this.formConfigService.setFinalUserData([payload]);
  }
}
