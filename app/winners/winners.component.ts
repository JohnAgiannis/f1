import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ChampsService } from '../champs.service';
import { Subscriber, of } from 'rxjs';
import { FormBuilder , FormGroup , FormArray,FormControl, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
    //initialising the data we will use to store the data from the API calls
  items = [];
  itemz = [];
  table: any = {};
  winners: any = {};
  xronia : number;
  //strings used to create the url according to the year from the dropdown list
  newUrl: string= "http://ergast.com/api/f1/";
  endUrl:string= "/driverStandings.json?limit=400&offeset=0";
  wholeUrl:string ="";
  firstUrl: string= 'http://ergast.com/api/f1/seasons.json?limit=400&offeset=0';
    //initialising the data we will use to store the data from the 2nd API call  
  position= [];
  points= [];
  driverName= [];
  constructorName= [];

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
     this.clearData();
   }
//clearing the arrays we use to store data after every seach
   clearData(){
      this.position.length=0;
      this.points.length=0;
      this.driverName.length=0;
      this.constructorName.length=0;

   }

  submit (){
      //console.log(this.form.value);
  }
  //creating url using the year
  makeUrl(){
    this.wholeUrl=this.newUrl + this.xronia + this.endUrl;
    console.log(this.wholeUrl);
    this.callWinners(this.wholeUrl);
  }
//making the api call and parsing the response into objects we will use to print our data
  ngOnInit() {
    this.champs.getStandings(this.firstUrl).subscribe(champs => {
        this.table = champs;
        //console.log(this.table);
        this.table.MRData.SeasonTable.Seasons.forEach(peason=> this.items.push(peason));
        for (let i = 0; i< this.items.length; i++){
          console.log(this.items[i].season);
          this.itemz.push(this.items[i].season);
        }
      })

  }
  getYears(){
    return this.items;
  }
// making second api call after we get the year from the dropdown list
  callWinners(lUrl:string){
    console.log(lUrl);
    this.champs.getStandings(lUrl).subscribe(champs => {
      this.winners = champs;
      this.winners.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(qeason=> this.position.push(qeason.position));
      this.winners.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(weason=> this.points.push(weason.points)); 
      this.winners.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(eeason=> this.driverName.push(eeason.Driver.familyName));
      this.winners.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(reason=> this.constructorName.push(reason.Constructors[0].name));   
      //console.log(this.position);
      //console.log(this.points);
      //console.log(this.driverName);
      //console.log(this.constructorName);
    })
  }

}
