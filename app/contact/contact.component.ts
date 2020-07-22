import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from '@angular/forms';
import { ChampsService } from '../champs.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    //initialising the data we will use to store the data from the API calls
  messageForm: FormGroup;
  submitted = false;
  success = false;
  drivers: any = {};
  names = [];
  surnames = [];
  wholeName = [];
  dUrl :string = "http://ergast.com/api/f1/drivers.json?limit=1000$offset=0";
  constructor(private formBuilder: FormBuilder,private wheel: ChampsService) { }
//making the api call and parsing the response into objects we will use to print our data
//also making sure some parts of the forms are required
  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.wheel.getStandings(this.dUrl).subscribe(wheel => {
      this.drivers = wheel;
      this.drivers.MRData.DriverTable.Drivers.forEach(peason=> this.names.push(peason.givenName));
     // console.log(this.names);
      this.drivers.MRData.DriverTable.Drivers.forEach(feason=> this.surnames.push(feason.familyName));
      //console.log(this.surnames);
      for(let i =0;i<this.names.length;i++){
        this.wholeName[i]= this.names[i] + " " + this.surnames[i];
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
}

}