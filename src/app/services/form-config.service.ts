import { Injectable } from '@angular/core';
import { IFormItems } from '../form-builder/model/form-item.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  

  constructor() { 
    
  }


   get getFormConfig(){
    let data = localStorage.getItem('formConfig');
    return JSON.parse(data||'{}')
  }

   setFormConfig(value: any){
      localStorage.setItem('formConfig', JSON.stringify(value));
  }

  get getFinalUserData(){
    let data = localStorage.getItem('finalData');
    return JSON.parse(data||'{}');
  }

  setFinalUserData(value: any){
    localStorage.setItem('finalData', JSON.stringify(value));
}

  
}
