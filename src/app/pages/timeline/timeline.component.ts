import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { casosVK, PostHistCasosid } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent  implements OnInit {
  stacked = false;
  parametro!: number ;
  respuestas:PostHistCasosid[] = [];
  constructor(public authservice: AuthService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {


    this.activatedRoute.params
   
    .subscribe( params =>{
      
      this.parametro = params.id;
    }); 

    this.update();

  }
 



  update(){


    
    
   
  
  
  
      const tab = localStorage.getItem('tab');
   
      switch(tab){
        case 'Casos VK': 
        this.authservice.PostHistoricocasosUsuariosidCasos(this.parametro)
        .subscribe(resp=>{
          this.respuestas = resp;
        
        });
        break
  
        case 'Autostar':
          this.authservice.PostHistoricocasosUsuariosidAutostar(this.parametro)
          .subscribe(resp=>{
            this.respuestas = resp;
            
          });
          break;
          case 'Contratos':
            this.authservice.PostHistoricocasosUsuariosidContratos(this.parametro)
            .subscribe(resp=>{
              this.respuestas = resp;
              
            });
          break
  
      }
     


  }

}
