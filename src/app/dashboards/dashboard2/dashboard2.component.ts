import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { TodosIdTablas } from 'src/app/AUTH/interfaces/interfaces';
 
@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
})
export class Dashboard2Component  implements OnInit{
  // This is for the table responsive
  parametro!: string ; 
  datos!: string;
  public tabs: number = 0;
  tabLoadTimes: Date[] = [];
 
  getTimeLoaded(index: number) {
    
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
  
    }
    else{
      console.log("else",index);
    }
 
    return this.tabLoadTimes[index];
  }



   



 

  emp = localStorage.getItem('tab');

  idtodossep: TodosIdTablas[] = [];




  constructor(private activatedRoute: ActivatedRoute, private authservice: AuthService) {


 

  }







  ngOnInit(): void {
    localStorage.setItem('tab','Casos VK' ); 
    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
      this.datos = params.dat;
      
      
    });





    

    localStorage.setItem('tab2', this.datos );
    localStorage.setItem('tab2id',this.parametro  );
  

     
    localStorage.removeItem('idvk');
    localStorage.removeItem('idautostar');
    localStorage.removeItem('idcontratos');
    
    this.authservice.TodosLosID(this.parametro,this.datos)
    .subscribe((resp)=>{
    
    console.log(resp);
  
      if(resp.length>0){
        this.idtodossep = resp;
        localStorage.setItem('idvk', this.idtodossep[0].ID_CASOS!?.toLocaleString());
        localStorage.setItem('idautostar', this.idtodossep[0].ID_AUTOSTAR!?.toLocaleString());
        localStorage.setItem('idcontratos', this.idtodossep[0].ID_CONTRATOS!?.toLocaleString());
       
      

      }
     
    });
   
  
  }

  tabChange(event: any){
    this.tabs = event!;
   

   
     switch (event){ 
       case 0:
         localStorage.setItem('tab','Casos VK' );
         break;
       case 1:
        
         localStorage.setItem('tab','Autostar' );
         const tab = localStorage.getItem('tab'); 
         console.log("si entroooo y asigno autostar");
         console.log(tab);
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
