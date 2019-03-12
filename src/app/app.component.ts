import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  validStatus = ['Select a Project Status', 'Stable', 'Critical', 'Finished'];
  forbiddenStatuses = ['Select a Project Status'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.forbiddenNamesAsync),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null, [Validators.required, this.forbiddenStatus.bind(this)])
    });

    console.log(this.projectForm.get('projectStatus'));
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenStatus(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenStatuses.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
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
