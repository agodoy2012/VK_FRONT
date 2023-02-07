import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { fact, factura, total } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';

@Component({
  selector: 'app-contratos-fechas',
  templateUrl: './contratos-fechas.component.html',
  styles: [
  ]
}) 
export class ContratosFechasComponent implements OnInit {
fechainicial!: string;
fechafinal!: string;  
facturas!: factura[];
parametro!: string;
dataSource!: MatTableDataSource<factura>;
total:number = 0;
  displayedColumns = ['id', 'name', 'progress', 'Casos','Casosb'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  constructor(breakpointObserver: BreakpointObserver,private authservice: AuthService,private activatedRoute: ActivatedRoute) { 

    breakpointObserver.observe(['(max-width: 1000px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? [ 'id','Nombre', 'Sistema', 'Casos','Vencidos']
        : ['id','Nombre', 'Sistema', 'Casos','Vencidos']
    });
    
    const users: factura[] = [];
    this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
    
    });
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

    console.log("rangos")
    console.log(dateRangeStart)
    console.log(dateRangeEnd.value.length)
    console.log("fin rangos")
    
    if((dateRangeStart)&&((dateRangeEnd.value.length==9)||(dateRangeEnd.value.length==10)||(dateRangeEnd.value.length==8)))
    {

      
      this.fechainicial = dateRangeStart.value;
      this.fechafinal = dateRangeEnd.value;
      var fechini = this.fechainicial.split("/")
      var fechfin =  this.fechafinal.split("/")
      if(Number(fechini[1])<10)
      {
        console.log("hola")
        fechini[1] = '0'+fechini[1]
      }
      if(Number(fechini[0])<10)
      {
        console.log("hola")
        fechini[0] = '0'+fechini[0]
      }
      if(Number(fechfin[1])<10)
      {
        fechfin[1] = '0'+fechfin[1]
      }
      if(Number(fechfin[0])<10)
      {
        fechfin[0] = '0'+fechfin[0]
      }
      var fechin = fechini[2]+"-"+fechini[0]+"-"+fechini[1]
      var fechfi = fechfin[2]+"-"+fechfin[0]+"-"+fechfin[1]
      this.authservice.GetFacturasDetalleFechasTotal(fechin,fechfi,this.parametro)
      .subscribe(resp=>{
        this.total = Number(resp[0].total);
      })
    this.authservice.GetFacturasDetalleFechas(fechin,fechfi,this.parametro)
    .subscribe(resp=>{
      setTimeout(() => {
  
     
        this.dataSource.data = resp;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      
      }, 1400); 
    })
     
    }
    else{
      this.facturas = [];
      this.fechainicial = "";
      this.fechafinal = "";
      this.dataSource.data = [];
      this.dataSource.sort = this.sort;
    }


  
  
  }
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
