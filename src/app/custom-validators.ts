import { FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { invalidProjectName: true };
    }
    return null;
  }

  static forbiddenStatus(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenStatuses.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  static forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
