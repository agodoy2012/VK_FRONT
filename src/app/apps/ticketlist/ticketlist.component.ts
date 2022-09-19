import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { casosVK } from 'src/app/AUTH/interfaces/interfaces';
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




  respuestas:casosVK[] = [];
  parametro!: number ;
  tabnomb!: string;
  dataSource = new MatTableDataSource(this.respuestas);

  constructor(public dialog: MatDialog, public authservice: AuthService, private activatedRoute: ActivatedRoute) {   


/// se le asigna el total de datos que va  estar en cada una de las etiquetas 
    
    this.totalCount = this.dataSource.data.length;
    this.Closed = this.btnCategoryClick('CERRADO');
    this.Open = this.btnCategoryClick('ABIERTO');
 

    ///// se leee los parametros que vienen en el link
    this.activatedRoute.params
   
    .subscribe( params =>{
     
      this.parametro = params.id;
      this.tabnomb = params.tab;
      if(params.tab){
      
      }
      else
      { 
 
      }
      
    });

    this.update();
    
/// se toma una pausa y se asignan los valores que se obtuvieron en la peticon
    setTimeout(() => {

      this.dataSource = new MatTableDataSource(this.respuestas);
      this.totalCount = this.dataSource.data.length;
      this.Closed = this.btnCategoryClick('CERRADO');
      this.Open = this.btnCategoryClick('ABIERTO');
      this.dataSource = new MatTableDataSource(this.respuestas);
  }, 1000);

    

    this.dataSource = new MatTableDataSource(this.respuestas);



   }
 
  ngOnInit(): void {


    //// se realiza el mismo procedimiento que en el constructor 

    this.totalCount = this.dataSource.data.length;
    this.Closed = this.btnCategoryClick('CERRADO');
    this.Open = this.btnCategoryClick('ABIERTO');

    this.activatedRoute.params
   
    .subscribe( params =>{
      
      this.parametro = params.id;
      if(params.tab){
  
      }
      else
      {
 
      }
      
    });

    this.update();
    

    setTimeout(() => {

      this.dataSource = new MatTableDataSource(this.respuestas);
      this.totalCount = this.dataSource.data.length;
      this.Closed = this.btnCategoryClick('CERRADO');
      this.Open = this.btnCategoryClick('ABIERTO');
      this.dataSource = new MatTableDataSource(this.respuestas);
  }, 1000);

    

    this.dataSource = new MatTableDataSource(this.respuestas);
  }






  update(){
 

    
    const tab = localStorage.getItem('tab');
   ///// se realiza un switch para saber de que tab se esta haciendo la busqueda para buscar en esa empresa en particular 
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
