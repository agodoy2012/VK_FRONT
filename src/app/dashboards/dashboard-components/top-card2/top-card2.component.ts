import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/AUTH/services/auth.service';

@Component({
  selector: 'app-top-card2',
  templateUrl: './top-card2.component.html',
  styleUrls: ['./top-card2.component.scss'],
})
export class TopCard2Component implements OnInit  {

  casospor = 0;
  abrpor = 0;
  cerr = 0;  
  idvk!: string;
  idautostar!: string;
  idcontratos!: string;

  constructor(public authservice: AuthService) {
    
////// se lee los id del usuario si tiene algunos relacionados con toras tablas 
      this.idvk = localStorage.getItem('idvk')!;
      this.idautostar = localStorage.getItem('idautostar')!;
      this.idcontratos = localStorage.getItem('idcontratos')!;
 //// se leee de local el tab que esta y el id que se necestia 
    const tab = localStorage.getItem('tab');
    let id3 = localStorage.getItem('tab2id');
    ////////////////////// se hace un switch par saber donde validar 
    switch(tab){
      case 'Casos VK':  

      // si tiene idvk lo iguala al id3 que se envia para hacer la peticon si no no lo realizza 
      if((this.idvk)&&(this.idvk!="0")){

        id3 = this.idvk;
      }
        this.authservice.CasosActualesCasosid(id3!)
        .subscribe(resp=>{
          this.total = resp[0].CASOS?.toString();
          this.abierto = resp[0].ABIERTOS?.toString();
          this.cerrado = resp[0].CERRADOS?.toString();
          
     /// muestra el porcentaje de casos que tiene en abiertos y cerrados 
            this.casospor = 100;
            
            this.abrpor = (this.abierto*100)/this.total;
            this.cerr = (this.cerrado*100)/this.total;
   
       
        
        })
      break 
        case 'Autostar':
          if((this.idautostar)&&(this.idautostar!="0")){

            id3 = this.idautostar;
          }

        
          this.authservice.CasosActualesAutostarid(id3!)
          .subscribe(resp=>{
             this.total = resp[0].CASOS?.toString();
             this.abierto = resp[0].ABIERTOS?.toString();
             this.cerrado = resp[0].CERRADOS?.toString();
 ;
            this.casospor = 100;
            
            this.abrpor = (this.abierto*100)/this.total;
            this.cerr = (this.cerrado*100)/this.total;
          })
        break;


        case 'Contratos':
          if((this.idcontratos)&&(this.idcontratos!="0")){

            id3 = this.idcontratos;
          }
          this.authservice.CasosActualesContratosid(id3!)
          .subscribe(resp=>{
            this.total = resp[0].CASOS?.toString();
            this.abierto = resp[0].ABIERTOS?.toString();
            this.cerrado = resp[0].CERRADOS?.toString();
            
            this.casospor = 100;
            
            this.abrpor = (this.abierto*100)/this.total;
            this.cerr = (this.cerrado*100)/this.total;
          })
          break;

          case 'CORPORATIVO':
            break;
    }
   
  


 


  }
  ngOnInit(): void {
   
    setTimeout(() => {
      this.idvk = localStorage.getItem('idvk')!;
      this.idautostar = localStorage.getItem('idautostar')!;
      this.idcontratos = localStorage.getItem('idcontratos')!;   
      
  
   

  const tab = localStorage.getItem('tab');
  let id3 = localStorage.getItem('tab2id');
  
  switch(tab){
    case 'Casos VK':  
    if((this.idvk)&&(this.idvk!="0")){

      id3 = this.idvk;
    }
  
      this.authservice.CasosActualesCasosid(id3!)
      .subscribe(resp=>{
        this.total = resp[0].CASOS?.toString();
        this.abierto = resp[0].ABIERTOS?.toString();
        this.cerrado = resp[0].CERRADOS?.toString();
      
   
          this.casospor = 100;
          
          this.abrpor = (this.abierto*100)/this.total;
          this.cerr = (this.cerrado*100)/this.total;
 
     
      
      })
    break 
      case 'Autostar':
        if((this.idautostar)&&(this.idautostar!="0")){

          id3 = this.idautostar;
        }

      
        this.authservice.CasosActualesAutostarid(id3!)
        .subscribe(resp=>{
           this.total = resp[0].CASOS?.toString();
           this.abierto = resp[0].ABIERTOS?.toString();
           this.cerrado = resp[0].CERRADOS?.toString();
           
          this.casospor = 100;
          
          this.abrpor = (this.abierto*100)/this.total;
          this.cerr = (this.cerrado*100)/this.total;
        })
      break;


      case 'Contratos':
        if((this.idcontratos)&&(this.idcontratos!="0")){

          id3 = this.idcontratos;
        }
        this.authservice.CasosActualesContratosid(id3!)
        .subscribe(resp=>{
          this.total = resp[0].CASOS?.toString();
          this.abierto = resp[0].ABIERTOS?.toString();
          this.cerrado = resp[0].CERRADOS?.toString();
      
          this.casospor = 100;
          
          this.abrpor = (this.abierto*100)/this.total;
          this.cerr = (this.cerrado*100)/this.total;
        })
        break;

        case 'CORPORATIVO':
          break;
  }
 




}, 240);
  
  }
  total: any  = 0  ;
  abierto: any = 0;
  cerrado: any = 0;   
}
   