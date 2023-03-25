import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnInit,OnDestroy,
} from '@angular/core';
import { IFormItems } from './model/form-item.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from '../services/modal-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from '../services/form-config.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit, OnDestroy{
  @ViewChild('modal') modal!: TemplateRef<any>;

  formItems?: IFormItems[] = [];
  formConfig?: IFormItems[] = [];
  unsubscribe$ = new Subject<void>();
  selectedOpt?: string;
  inputOptions?: string[] = [];
  createInputFormGroup!: FormGroup;

  private storageSub = new Subject<string>();

  public storageSubObs: Observable<any>

  constructor(
    private modalService: ModalService,
    private _viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,
     private formConfigService: FormConfigService,
  ) {
    this.storageSubObs = this.storageSub.asObservable();
    this.createInputFormGroup = this.fb.group({
      label: ['',[Validators.required]],
      type: ['', [Validators.required]],
      options: this.fb.array([
      ])
    });
  }

  showModal(content: TemplateRef<any>): void {
    this.modalService.open(content, this._viewContainerRef);
  }

  dismissModal(): void {
    this.inputOptions?.splice(0, this.inputOptions.length);
    this.createInputFormGroup.reset();
    this.selectedOpt = '';
    this.modalService.dismiss();
  }

  onSelectChange(event: any) {
    this.inputOptions?.splice(0, this.inputOptions.length)
    this.optionsForm.clear()
    this.selectedOpt = event.target.value;
  }

  onEnterKey(event: any) {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      this.inputOptions?.push(event.target.value);
      event.currentTarget.value = '';
    }
  

  }



  get optionsForm(){
    return this.createInputFormGroup.controls['options'] as FormArray;
  }
  createInput(){
  
    if(this.inputOptions?.length){
    
      this.inputOptions?.forEach((option, i)=>{
        let formOption = this.fb.group({
          option: ['', [Validators.required]],
        });
        this.optionsForm.push(formOption);
        this.createInputFormGroup.get(`options.${i}.option`)?.setValue(option);
      });
    }
    

    let payload = this.createInputFormGroup.value;

    this.formItems?.push(payload);
    this.dismissModal();
    //localStorage.setItem('formConfig', JSON.stringify(this.formItems));
    this.formConfigService.setFormConfig(this.formItems);
    this.storageSub.next(this.formConfigService.getFormConfig);
 

  }

  clearFormConfig(){
    this.formItems?.splice(0,this.formItems.length);
    localStorage.removeItem('formConfig');
    this.storageSub.next(this.formConfigService.getFormConfig);
  }

  ngOnInit(): void {
    this.storageSubObs
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=>{
      this.formConfig = res;
    });

    this.formConfig = this.formConfigService.getFormConfig;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
