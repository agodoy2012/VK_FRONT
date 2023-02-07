import { BreakpointObserver } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { casosVkLista, factura } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-vkhead',
  templateUrl: './vkhead.component.html',
  styles: [ 
  ]
})
export class VkheadComponent implements OnInit {
  parametro!: string;
  displayedColumns = [ 'id','Nombre', 'Sistema','Link'];
  dataSource: MatTableDataSource<factura>;
  casoVk!: casosVkLista;
  facdetalle!: factura[];
  fechafinal!: string;
  fechainicial!: string;
  public form: FormGroup = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  constructor(private fb: FormBuilder,breakpointObserver: BreakpointObserver,private router: Router,private authservice: AuthService, private activatedRoute: ActivatedRoute) { 
    /// crea las columnas  que se van a utilizar 
breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
  this.displayedColumns = result.matches
    ? [ 'id','Nombre', 'Sistema','Link']
    : ['id','Nombre', 'Sistema','Link']
});
 


const users: factura[] = [];



// Assign the data to the data source for the table to render
this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {

    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
    
    });

this.authservice.GetFacturasDetalle(this.parametro,'0')
.subscribe(resp =>{

  this.facdetalle = resp;

})
setTimeout(() => {
  
     
  this.dataSource.data = this.facdetalle;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;


}, 1400); 



// Assign the data to the data source for the table to render
this.dataSource = new MatTableDataSource(this.facdetalle);

    this.form = this.fb.group({
      fcaso: [
        null
      ],
      flimite: [
        null,
      ],
      finicio: [
        null,
      ],
      fnombre: [
        null,  
      ],
      fcomentario: [
        null,
      ],
      ffactura: [
        null,
      ],
   
    });
    this.authservice.GetcasosVkFacturacionId(this.parametro)
    .subscribe(resp=>{
      this.casoVk = resp[0];
      console.log("respuesta"+this.casoVk.NOMBRE_CLIENTE+"//"+resp[0].NOMBRE_CLIENTE)
      this.form.controls['fcaso'].setValue(resp[0].CCA_NUMERO_CASO);
      this.fechainicial!= resp[0].CCA_FECHA_INICIO;
      this.fechafinal != resp[0].CCA_FECHA_LIMITE 
      this.fechainicial
      this.form.controls['flimite'].setValue(formatDate(resp[0].CCA_FECHA_LIMITE!,'dd-MM-YYYY','en'));
      this.form.controls['finicio'].setValue(formatDate(resp[0].CCA_FECHA_INICIO!,'dd-MM-YYYY','en'));
      this.form.controls['fnombre'].setValue(resp[0].NOMBRE_CLIENTE);
      this.form.controls['fcomentario'].setValue(resp[0].CCA_COMENTAR);
    })
    this.authservice.GetFacturasTotalId(this.parametro,'0')
    .subscribe(resp=>{
      this.form.controls['ffactura'].setValue(resp[0].total);
    })
    

   
    
    
  }
  applyFilter(filterValue: string): void {
 
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  } 
  contratos(){
    setTimeout(() => {
      this.router.navigate(['/forms/form-validation/fbuscar/vk'])
    }, 200);
  }



  eliminar(id:string){

    
    this.authservice.DeletFacturasTotalId(id)
    .subscribe(resp =>{

      this.authservice.GetFacturasDetalle(this.parametro,'0')
      .subscribe(resp =>{
      
        this.facdetalle = resp;
      
      })
      setTimeout(() => {
        
           
        this.dataSource.data = this.facdetalle;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      
      }, 1400); 
      
      
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.facdetalle);
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: 'red',
      color: 'red',
      title: 'FACTURA ELIMINADA',
      showConfirmButton: false,
      timer: 1400
    })
  
     
   
  }
}
