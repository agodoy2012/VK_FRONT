import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { Empresas  } from 'src/app/AUTH/interfaces/interfaces';
@Component({
  selector: 'app-top-card', 
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.scss'],
})


export class TopCardComponent implements OnInit  {
 
  constructor(private authservice: AuthService) {

    const tab = localStorage.getItem('tab'); // se lee la variable local para ver en que tab esta 

    switch(tab){  //se selecciona un switch para el tab que se esta manejando y cada case es un titulo que se compara 
      case 'Casos VK': 
        this.authservice.CasosActuales()//dependiendo el caso se realiza una peticion directa de esa empresa 
        .subscribe(resp=>{
          this.total = resp[0].CASOS?.toString();//se asignan los valores que se mostran en total de casos, abiertos, cerrados
          this.abierto = resp[0].ABIERTOS?.toString();
          this.cerrado = resp[0].CERRADOS?.toString();
           
      
        })
      break
        case 'Autostar':
          this.authservice.CasosActualesAutos()// se lee la variable local para ver en que tab esta 
          .subscribe(resp=>{
             this.total = resp[0].CASOS?.toString();//se asignan los valores que se mostran en total de casos, abiertos, cerrados
             this.abierto = resp[0].ABIERTOS?.toString();
             this.cerrado = resp[0].CERRADOS?.toString();
        
          })
        break;


        case 'Contratos':
          this.authservice.CasosActualesContratos()// se lee la variable local para ver en que tab esta 
          .subscribe(resp=>{
            this.total = resp[0].CASOS?.toString();//se asignan los valores que se mostran en total de casos, abiertos, cerrados
            this.abierto = resp[0].ABIERTOS?.toString();
            this.cerrado = resp[0].CERRADOS?.toString();
           
        
          })
          break;

          case 'CORPORATIVO':
            break;
    }
   
  

  };


   total: any  = 0  ; // se declaran las variables que se mostraran 
   abierto: any = 0;
   cerrado: any = 0;   


  ngOnInit(): void {
    
  
  }
}
