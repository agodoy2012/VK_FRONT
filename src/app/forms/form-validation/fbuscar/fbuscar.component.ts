import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { casosVK, casosVkLista, contratosLista } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';

@Component({
  selector: 'app-fbuscar', 
  templateUrl: './fbuscar.component.html',
  styles: [
  ]
})
export class FbuscarComponent implements OnInit {
  displayedColumns = [ 'id','Nombre', 'Sistema','Link'];
  displayedColumns2 = [ 'id','Nombre', 'Sistema','Link'];
  
  parametro!: string;
  dataSource: MatTableDataSource<casosVkLista>;
  dataSource2: MatTableDataSource<contratosLista>;
  factvk!: casosVkLista[];
  factcontrato!: contratosLista[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  
  constructor(breakpointObserver: BreakpointObserver,private router: Router,private authservice: AuthService, private activatedRoute: ActivatedRoute) { 

    
/// crea las columnas  que se van a utilizar 
breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
  this.displayedColumns = result.matches
    ? [ 'id','Nombre', 'Sistema','Link']
    : ['id','Nombre', 'Sistema','Link'];
    this.displayedColumns2 = result.matches
    ? [ 'id','Nombre', 'Sistema','Link']
    : ['id','Nombre', 'Sistema','Link'];
});
const users: casosVkLista[] = [];
const users2: contratosLista[] = [];



// Assign the data to the data source for the table to render
this.dataSource = new MatTableDataSource(users);
this.dataSource2 = new MatTableDataSource(users2);
  }

  ngOnInit(): void {
    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
     
    });
    if(this.parametro == 'vk')
    {
      this.authservice.GetcasosVkFacturacion()
      .subscribe(resp=>{
        this.factvk =  resp;
        console.log("facturas:_:_"+this.factvk[1])
      })
  
      const users: casosVkLista[] = [];
     
      //// se hace una pausa para la recoleccion de los datos y colocarlos en las partes correctas de la tabla para refrescarla 
      setTimeout(() => {
  
     
          this.dataSource.data = this.factvk;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      
        
      }, 1800); 
      
  
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.factvk);
    }
    else{
      this.authservice.GetcasosContratosFacturacion()
      .subscribe(resp=>{
        this.factcontrato =  resp;
       
      })
  
     
     
      //// se hace una pausa para la recoleccion de los datos y colocarlos en las partes correctas de la tabla para refrescarla 
      setTimeout(() => {
  
     
          this.dataSource2.data = this.factcontrato;
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
      
        
      }, 1800); 
      
  
      
      // Assign the data to the data source for the table to render
      this.dataSource2 = new MatTableDataSource(this.factcontrato);
    }
  
 

  }
  applyFilter(filterValue: string): void {
 
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  contratos(id: string){
    setTimeout(() => {
      this.router.navigate(['/forms/form-validation/fechas/',id])
    }, 200);
  }
  applyFilter2(filterValue: string): void {
 
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }

}
