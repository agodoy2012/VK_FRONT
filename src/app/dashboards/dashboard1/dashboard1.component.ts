import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import {Observable, Observer} from 'rxjs';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import Swal from 'sweetalert2';

export interface ExampleTab {
  label: string;
  content: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'], 
})
export class Dashboard1Component implements OnInit {
  tabLoadTimes: Date[] = [];
  public tabs: number = 0;
  getTimeLoaded(index: number) {
    
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
  
    }
    else{
    
    }

    return this.tabLoadTimes[index];
  }



  


 
 
  vencido!: string;
  vencidoauto!: string;
  vencidocontra!: string;
  emp = localStorage.getItem('tab');//leer en que tab se encuentra 
  status = false;
  constructor(private authservice: AuthService) {
 
    
 

  }
ngOnInit(): void {

 

  localStorage.setItem('token',"Casos VK" );// grabar en local token
  localStorage.setItem('tab','Casos VK' ); // grabar en local el tab inicial
  localStorage.removeItem('tab2'); // borro los locales que se crearon en el dashboard de uaurios
  localStorage.removeItem('tab2id');


  this.authservice.VencidosVK()//verifica de los activos cuales etan vencidos
  .subscribe(resp=>{
 
     this.vencido ="Casos VK";
     
  });

  this.authservice.VencidosAutostar()//verifica de los activos cuales etan vencidos
  .subscribe(resp=>{
    
     this.vencidoauto = "Autostar";
     
  });

  this.authservice.VencidosContratos()//verifica de los activos cuales etan vencidos 
  .subscribe(resp=>{
    
     this.vencidocontra = "Contratos";
     
  });



 


 

setTimeout(() => {
 

  if (this.vencido != "0"){

    Swal.fire(
      { 
       
        position: 'bottom-end',
        icon: 'error',
        iconColor: 'red',
       
        title: `Verificar casos activos vencidos en: ${this.vencido}--${this.vencidoauto}--${this.vencidocontra}`,
        showConfirmButton: false,
        timer: 2300
      })

  }
 
}, 750);
 





}

//cuando un tab cambia se actualiza la variable local y tener el titulo correcto
tabChange(event: any){
 this.tabs = event!; 

  
  switch (event){ 
    case 0:
      localStorage.setItem('tab','Casos VK' );
      break;
    case 1:
      localStorage.setItem('tab','Autostar' );
      break; 
      case 2:
      localStorage.setItem('tab','Contratos' );
      break; 
      case 3:
      localStorage.setItem('tab','Corporativo' );
      break; 



  }

 




  return this.tabs;

}


}
