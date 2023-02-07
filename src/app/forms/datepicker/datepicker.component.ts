import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { casosVK, escfirmada, fact } from 'src/app/AUTH/interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { soleg } from '../../AUTH/interfaces/interfaces';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  dataSource!: MatTableDataSource<casosVK>;
  displayedColumns = ['id', 'name', 'progress', 'Casos','Casosb'];
  sintrab: string = "";
  respuestas:fact[] = [];
  fechainicial: string = "";
  fechafinal: string = "";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  tab = localStorage.getItem('tab');
  respuestastabla:escfirmada[]=[];
  respuestastablasol:soleg[]=[];

  tablas: number = 0;

  constructor(private adapter: DateAdapter<any>, breakpointObserver: BreakpointObserver,private authservice: AuthService) {

    breakpointObserver.observe(['(max-width: 1000px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? [ 'id','Nombre', 'Sistema', 'Casos','Vencidos','Casosb','Link','Escritura','Boleta','Precio']
        : ['id','Nombre', 'Sistema', 'Casos','Vencidos','Casosb','Link','Escritura','Boleta','Precio']
    });
    
    const users: casosVK[] = [];
    this.dataSource = new MatTableDataSource(users);
  }
  // this is for the start date
  startDate = new Date(1990, 0, 1);

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  // Datepicker selected value
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  // Datepicker input and change event
    
  events: fact[] = [];

  // custom date
  customdate = new FormControl(moment());

  addEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
   
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

    console.log("rangos")
    console.log(dateRangeStart)
    console.log(dateRangeEnd.value.length)
    console.log("fin rangos")

    if((dateRangeStart)&&((dateRangeEnd.value.length==9)||(dateRangeEnd.value.length==10)))
    {

      
      this.fechainicial = dateRangeStart.value;
      this.fechafinal = dateRangeEnd.value;
    
      this.update(dateRangeStart.value, dateRangeEnd.value);
      setTimeout(() => {
  
        this.events = this.respuestas;
  
      
  
     
      
    }, 700);
    }
    else{
      this.events= [];
      this.fechainicial = "";
      this.fechafinal = "";
      this.dataSource.data = [];
      this.dataSource.sort = this.sort;
    }


  
  
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
    // tslint:disable-next-line:semicolon
  };

  french(): void {
    this.adapter.setLocale('fr');
  }




  
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }















  update(fechini: string, fechfin: string){


    
   
    /// switch para poder diferenciar en que tab se encuetra y hacer la peticion de los usuarios de cada empresa en particular 
    
    switch(this.tab){
      case 'Casos VK': 

       



  
      break;
      case 'Autostar':
        this.authservice.factAutostar(fechini, fechfin)
        .subscribe(resp=>{
      
            this.respuestas = resp;
            console.log(resp);
         
      
        });
  
        break;
       case 'Contratos':
      
       
        break;
    }


 
  
 
   }








updatetabla( tipo: string){

let array = tipo.split(' ');

tipo = array[0]+"_"+array[1];
switch(this.tab){
  case 'Casos VK': 


  break;
  case 'Autostar':
 
   
if(tipo == "Solicitudes_Legales")
{
  this.tablas = 1;
  this.displayedColumns = [ 'ID','FECHA', 'SOLICITANTE', 'DEPARTAMENTO','INSTITUCION','CODIGO','T.DOC','TIMBRES','P.SEGURIDAD','TOTAL'];
  this.authservice.detfactAutostarSoleg(this.fechainicial, this.fechafinal,tipo)
  .subscribe(resp=>{

  this.respuestastablasol = resp;
   

  });

setTimeout(() => {
  this.dataSource.data = this.respuestastablasol;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}, 700);

}
else{
  this.tablas = 0;
   this.displayedColumns =   [ 'id','Nombre', 'Sistema', 'Casos','Vencidos','Casosb','Link','Escritura','Boleta','Precio'] ;
     
  this.authservice.detfactAutostar(this.fechainicial, this.fechafinal,tipo)
  .subscribe(resp=>{

  this.respuestastabla = resp;
   

  });

setTimeout(() => {
  this.dataSource.data = this.respuestastabla;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}, 700);

}
   
    break;
   case 'Contratos':

   
    break;
}


}




}
