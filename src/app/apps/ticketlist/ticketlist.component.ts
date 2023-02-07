import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { casosVK, vensin } from 'src/app/AUTH/interfaces/interfaces';
import { tick } from '@angular/core/testing';
import { switchMap, tap } from 'rxjs/operators';

export interface TicketElement {
  id: number;
  creator: string;
  title: string;
  assignee: string; 
  status: string;
  labelbg: string;
  product: string;
  date: string;
}

const tickets: TicketElement[] = [];







const ticket: TicketElement[] = [
  {
    id: 77,
    creator: 'Eric Pratt',
    title: 'Elegant Theme Side Menu show OnClick',
    assignee: 'Alice Bohr',
    status: 'cerrado',
    labelbg: 'warning',
    product: 'Elegant Admin',
    date: '2018-05-01',
  },
  {
    id: 78,
    creator: 'Steve',
    title: 'Xtreme theme dropdown issue',
    assignee: 'Jonathan',
    status: 'abierto',
    labelbg: 'success',
    product: 'Xtreme Admin',
    date: '2018-05-03',
  }
  
];

@Component({
  templateUrl: './ticketlist.component.html',
})
export class TicketlistComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;

  displayedColumns: string[] = [
    
    'title',
    'assignee',
    'status',
    'product',
    'date',
    'action', 
  ];


  valores!: string;
  nombre1!: string;
  nombre2!: string;
  respuestas:casosVK[] = [];
  respuestasven: vensin[] = [];
  parametro!: number ;
  tabnomb: string = "";
  dataSource = new MatTableDataSource(this.respuestas);
  buscarsn: number = 0;
  constructor(public dialog: MatDialog, public authservice: AuthService, private activatedRoute: ActivatedRoute) {   


/// se le asigna el total de datos que va  estar en cada una de las etiquetas 
    

 

    ///// se leee los parametros que vienen en el link
    this.activatedRoute.params
    
    .subscribe( params =>{
     
      this.parametro = params.id;
      this.tabnomb = params.tab;
    
      
    }); 

    if(this.parametro > 0){
   
      if(this.tabnomb == 'usuario')
      {
        this.buscarsn = 0;
        this.nombre1 = "POR VENCER";
        this.nombre2 = "VENCIDO";
        this.vencidosusuario();
        setTimeout(() => {
          this.respuestas = this.respuestasven;
         
         }, 500);
      }
      else
      {
        const tabpr =  localStorage.getItem('tab')!;
        this.tabnomb =  tabpr;
        this.buscarsn = 1;
        this.nombre1 = "ABIERTO";
        this.nombre2 = "CERRADO";
        this.update();
      }
    }
    else{
      this.nombre1 = "POR VENCER";
      this.nombre2 = "VENCIDO";
      this.vencidos();
    }
    
/// se toma una pausa y se asignan los valores que se obtuvieron en la peticon
 

this.totalCount = this.dataSource.data.length;
this.Closed = this.btnCategoryClick(`${this.nombre2}`);
this.Open = this.btnCategoryClick(`${this.nombre1}`);

   }
 
  ngOnInit(): void {


    //// se realiza el mismo procedimiento que en el constructor 


    this.activatedRoute.params
   
    .subscribe( params =>{ 
      
      this.parametro = params.id;
      this.tabnomb = params.tab;
      
      if(params.tab){
  
      } 
     
      
    });

   
    if(this.parametro > 0){

        if(this.tabnomb == 'usuario')
        {
          this.buscarsn = 0;
          this.nombre1 = "POR VENCER";
          this.nombre2 = "VENCIDO";
          this.vencidosusuario();
          setTimeout(() => {
            this.respuestas = this.respuestasven;
           
           }, 500);
        }
        else
        {
          this.buscarsn = 1;
          this.nombre1 = "ABIERTO";
          this.nombre2 = "CERRADO";
          this.update();
        }
      
    }
    else{ 
      this.nombre1 = "POR VENCER";
      this.nombre2 = "VENCIDO";
     this.vencidos();

     setTimeout(() => {
      this.respuestas = this.respuestasven;
     
     }, 500);
 
    

    }
   
    

    setTimeout(() => {



      this.dataSource = new MatTableDataSource(this.respuestas);
      this.totalCount = this.dataSource.data.length;
      this.Closed = this.btnCategoryClick(`${this.nombre2}`);
      this.Open = this.btnCategoryClick(`${this.nombre1}`);
      this.dataSource = new MatTableDataSource(this.respuestas);
  }, 1500);

    

    this.dataSource = new MatTableDataSource(this.respuestas);
  }






  update(){
 
  
    
    const tab = this.tabnomb;
   ///// se realiza un switch para saber de que tab se esta haciendo la busqueda para buscar en esa empresa en particular 
    console.log(tab)
   switch(tab){
      case 'Casos VK': 
      this.authservice.PostcasosUsuariosidVk(this.parametro)
      .subscribe(resp=>{
        this.respuestas = resp;
       
      }); 
      break


      case 'Autostar':
        this.authservice.PostcasosUsuariosidAutostar(this.parametro)
        .subscribe(resp=>{
          this.respuestas = resp;
       
        });
        break;
        case 'Contratos':
          this.authservice.PostcasosUsuariosidContratos(this.parametro)
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });
        break

    }
   
  



  }


  vencidos(){
 

    
    const tab = localStorage.getItem('tab');
   ///// se realiza un switch para saber de que tab se esta haciendo la busqueda para buscar en esa empresa en particular 
    switch(tab){
      case 'Casos VK': 
      this.authservice.vensinVK()
      .subscribe(resp=>{
        this.respuestasven = resp;
   
      }); 
      break


      case 'Autostar':
        this.authservice.vensinAutostar()
        .subscribe(resp=>{
          this.respuestasven = resp;
       
        });
        break;
        case 'Contratos':
          this.authservice.vensinContratos()
          .subscribe(resp=>{
            this.respuestasven = resp;
           
          });
        break

    }
   
  



  }
  vencidosusuario(){
 

    
    const tab = localStorage.getItem('tab');
   ///// se realiza un switch para saber de que tab se esta haciendo la busqueda para buscar en esa empresa en particular 
    switch(tab){
      case 'Casos VK': 
      this.authservice.vensinpostVK(this.parametro)
      .subscribe(resp=>{
        this.respuestasven = resp;
   
      }); 
      break


      case 'Autostar':
        this.authservice.vensinpostAutostar(this.parametro)
        .subscribe(resp=>{
          this.respuestasven = resp;
       
        });
        break;
        case 'Contratos':
          this.authservice.vensinpostContratos(this.parametro)
          .subscribe(resp=>{
            this.respuestasven = resp;
           
          });
        break

    }
   
  



  }
  applyFilter(filterValue: string): void {
  

    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }

  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();

    return this.dataSource.filteredData.length;
  }

 
  // tslint:disable-next-line - Disables all
 

  // tslint:disable-next-line - Disables all


  // tslint:disable-next-line - Disables all
  
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class TicketDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<TicketDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TicketElement,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
