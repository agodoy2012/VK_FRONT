import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { casosVK } from 'src/app/AUTH/interfaces/interfaces';
import { TotalTrabajo } from '../../AUTH/interfaces/interfaces';

/** Constants used to fill up our data base. */
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
];

const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss'],
})
export class MixComponent implements AfterViewInit {
  displayedColumns = ['id', 'name', 'progress', 'Casos','Casosb'];
  dataSource: MatTableDataSource<casosVK>;







  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  respuestas:casosVK[] = [];
  trabajo: number = 0;
  sintrab: number = 0; 
   tab = localStorage.getItem('tab');
  constructor(breakpointObserver: BreakpointObserver, private authservice: AuthService) {
    



/// crea las columnas  que se van a utilizar 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? [ 'id','Nombre', 'Sistema', 'Casos','Casosb','Link']
        : ['id','Nombre', 'Sistema', 'Casos','Casosb','Link']
    });


    const users: casosVK[] = [];
    // se llama la funcion para recopilar datos 
    this.update();
    //// se hace una pausa para la recoleccion de los datos y colocarlos en las partes correctas de la tabla para refrescarla 
    setTimeout(() => {

   
        this.dataSource.data = this.respuestas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    
      
    }, 700);
    

    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  update(){


    
   
   /// switch para poder diferenciar en que tab se encuetra y hacer la peticion de los usuarios de cada empresa en particular 
   
    switch(this.tab){
      case 'Casos VK': 

      

      this.authservice.CasosUsuariosVK()
      .subscribe(resp=>{
        this.respuestas = resp;
       
      });


      this.authservice.ContrabajoVK()
      .subscribe(resp=>{
        this.trabajo = resp[0].CON_TRABAJO;
        this.sintrab = resp[0].SIN_TRABAJO;
       
      });
  
      break;
      case 'Autostar':
        this.authservice.CasosUsuariosAUTOSTAR()
        .subscribe(resp=>{
          this.respuestas = resp;
        
        });
        this.authservice.contrabajoAutostar()
        .subscribe(resp=>{
          this.trabajo = resp[0].CON_TRABAJO;
          this.sintrab = resp[0].SIN_TRABAJO;
         
        });
        break;
       case 'Contratos':
        this.authservice.CasosUsuariosCONTRATOS()
        .subscribe(resp=>{
          this.respuestas = resp;
    
        });
        this.authservice.contrabajoContratos()
        .subscribe(resp=>{
          this.trabajo = resp[0].CON_TRABAJO;
          this.sintrab = resp[0].SIN_TRABAJO;
         
        });
        break;
    }



  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
