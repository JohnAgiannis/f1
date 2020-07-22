import { Component, OnInit } from '@angular/core';
import { ChampsService } from '../champs.service';
import { Subscriber, of } from 'rxjs';
import { FormBuilder , FormGroup , FormArray,FormControl, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  //initialising the data we will use to store the data from the API calls

  items = [];
  itemz = [];
  table: any = {};
  races: any = {};
  xronia : number;
  //strings used to create the url according to the year from the dropdown list
  newUrl: string= "http://ergast.com/api/f1/";
  endUrl:string= ".json?limit=400&offeset=0";
  wholeUrl:string ="";
  lastUrl:string ="";
  firstUrl :string = "http://ergast.com/api/f1/seasons.json?limit=400&offeset=0";


  names= [];
  dates= [];

  form: FormGroup;
// injecting instances of the services we use to make the api calls
  constructor(private champs:ChampsService, public formBuilder :FormBuilder) { 
    this.form= this.formBuilder.group(this.items);

    of(this.getYears()).subscribe(items => {
      this.items = items;
      this.form.controls.items.patchValue(this.items[0].season);
    
    });
  }
// tell the program what to do after the user selects a year from the list
  onRowClick(value){
    console.log("called");
    this.xronia = value;
    if (this.xronia)this.makeUrl()
    this.callRaces(this.wholeUrl);

  }
  //creating url using the year
  makeUrl(){
    this.wholeUrl=this.newUrl + this.xronia + this.endUrl;
    console.log(this.wholeUrl);
  }
  makeRaceUrl(){
    this.lastUrl=this.newUrl + this.xronia + this.endUrl;
    console.log(this.wholeUrl);
  }

 submit (){
     //console.log(this.form.value);
 }
//making the api call and parsing the response into objects we will use to print our data
  ngOnInit() {
    this.champs.getStandings(this.firstUrl).subscribe(champs => {
      this.table = champs;
        //console.log(this.table);
        this.table.MRData.SeasonTable.Seasons.forEach(peason=> this.items.push(peason));
        for (let i = 0; i< this.items.length; i++){
          this.itemz.push(this.items[i].season);
        }
      })

  }
  getYears(){
    return this.items;
 
 }
// making second api call after we get the year from the dropdown list
 callRaces(lUrl:string){
  console.log(lUrl);
  this.champs.getStandings(lUrl).subscribe(champs => {
    this.races = champs;
    //console.log(this.races);
      //getting the data we need
      this.races.MRData.RaceTable.Races.forEach(qeason =>this.names.push(qeason.raceName))
      this.races.MRData.RaceTable.Races.forEach(weason =>this.names.push(weason.date))
      //console.log(this.names);

      })
  }  
}
