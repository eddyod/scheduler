import { FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';


//2018-12-01T19:05
const DATE_REGEX = '/^\d{4}[./-]\d{2}[./-]\d{2}$/';
const DATETIME_REGEX = '/^\d{4}[./-]\d{2}[./-]\d{4}T\d{2}:\d{2}$/';


export class ScheduleValidator {

  static dateValidatorXXX(AC: AbstractControl) {
    console.log(AC.value);
    const dateSendingToServer = new DatePipe('en-US').transform(AC.value, 'yyyy-MM-dd')
    if (AC && AC.value && !moment(dateSendingToServer, 'yyyy-MM-dd',true).isValid()) {
      return {'dateValidator': true};
    }
    return null;
  }

  static dateTimeValidator(AC: AbstractControl) {
    console.log(AC.value);
    const dateSendingToServer = new DatePipe('en-US').transform(AC.value, 'MM/dd/yyyy hh:mm a')
    console.log(dateSendingToServer);
    if (AC && AC.value && !moment(dateSendingToServer, 'MM/DD/YYYY hh:mm a',true).isValid()) {
      return {'dateTimeValidator': true};
    }
    return null;
  }

  static dateValidator(control: FormControl): { [key: string]: any } {
         let usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;

         if (!control.value.match(usDatePattern))
             return { 'dateValidator': true };

         return null;
     }


}
