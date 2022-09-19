import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { casosVK, TodosIdTablas } from 'src/app/AUTH/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';


// tslint:disable-next-line - Disables all
interface todos {
  id: number;
  title: string;
  description: string;
  class?: string;
}

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
})
export class TaskboardComponent implements OnInit {
  todos: casosVK[] = [
  ];

  inprogress: casosVK[] = [
  
  ];

  respuestas:casosVK[] = [];
  respuestas2:casosVK[] = [];
  empvien: string = "";
  idusu: string = "";
  empcam: string = "";
  dats!: casosVK;
  datosenv: string = "";
  updins: string = "";
  idcasos: string = "0";
  idautostar: string ="0";
  idcontratos: string = "0";
  idtodossep: TodosIdTablas[] = [];

  constructor(public dialog: MatDialog, public authservice: AuthService,  private activatedRoute: ActivatedRoute) {

  }



  update(){

  
    switch(this.empcam)
    {
      case "CASOSVK":
     ////verica si trae un usuario asigando y si no lo tre entra al if y despliega todos los usuarios de caso contrario envia el id y excluye este para llenar el lado izquierdo y envia ese id para llenar el lado derecho 
        if(this.idcasos=='0'){
          this.authservice.CasosUsuariosVK()
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });

        }
        else{


          this.authservice.PostAsignaUsuariosExcluyeCasos(this.idcasos)
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });


          this.authservice.PostAsignaUsuarioCasos(this.idcasos)
          .subscribe(resp=>{
            this.respuestas2 = resp;
           
          });

        }
       
        break
      case "AUTOSTAR":
        if(this.idautostar=='0'){
          this.authservice.CasosUsuariosAUTOSTAR()
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });
        }
        else{

          this.authservice.PostAsignaUsuariosExcluyeAutostar(this.idautostar)
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });


          this.authservice.PostAsignaUsuarioAutostar(this.idautostar)
          .subscribe(resp=>{
            this.respuestas2 = resp;
           
          });




        }
   
        break
      case "CONTRATOS":
        if(this.idcontratos=='0'){
          this.authservice.CasosUsuariosCONTRATOS()
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });
        }
        else{
          this.authservice.PostAsignaUsuariosExcluyeContratos(this.idcontratos)
          .subscribe(resp=>{
            this.respuestas = resp;
           
          });


          this.authservice.PostAsignaUsuarioContratos(this.idcontratos)
          .subscribe(resp=>{
            this.respuestas2 = resp;
           
          });
        }
      
        break

    }

  

 



  }
  insertusuarios(){


  //// se encarga de enviar los datos para agregar o eliminar una relacion 



    this.authservice.UnirUsuarios(this.empvien,this.idusu,this.empcam,this.datosenv,this.updins)
      .subscribe((resp: any[])=>{
   
      


      }
      
      )
   }
  


traeidtodos(){
  
  this.authservice.PostTodosid(this.idusu, this.empvien)
  .subscribe((resp: any)=>{
    
    this.idtodossep = resp;

    if(this.idtodossep.length>0){
      this.idcasos = this.idtodossep[0].ID_CASOS!?.toLocaleString();
      this.idautostar = this.idtodossep[0].ID_AUTOSTAR!?.toLocaleString();
      this.idcontratos = this.idtodossep[0].ID_CONTRATOS!?.toLocaleString();
  
    }
 
  }
  
  )

}

  
  
    ngOnInit(): void { 
  
     
      
  
      /// leee los parametros qu vienen del link
      this.activatedRoute.params
     
      .subscribe( params =>{
      // asigna valorres a varaibles de id de que empresa viene y a que empresa va a insertar 
        this.empvien = params.es;
        this.empcam = params.va;
        this.idusu  = params.id;
        
      });


      /// hace una peticion para llenar ambos lados del drag and drop

      this.traeidtodos();
      
      
      setTimeout(() => {
        this.update()   
      }, 200);
     // llena los dos arreglos para mostrarlos en pantalll

      setTimeout(() => {
        this.todos = this.respuestas;
        this.inprogress = this.respuestas2;
      }, 500);
    }
  


  drop(event: CdkDragDrop<string[]>): void {



    // se realiza el if para verificar si el arreglo donde estan los asignados tiene un valor no lo permite media vez venga de la otra columna no deja hacer el movimiento 
    if ((event.previousContainer === event.container )|| ((this.inprogress.length>0) && ((event.previousContainer.id=='cdk-drop-list-0')||(event.previousContainer.id=='cdk-drop-list-2')||(event.previousContainer.id=='cdk-drop-list-4')||(event.previousContainer.id=='cdk-drop-list-6')||(event.previousContainer.id=='cdk-drop-list-8')||(event.previousContainer.id=='cdk-drop-list-10')||(event.previousContainer.id=='cdk-drop-list-12')||(event.previousContainer.id=='cdk-drop-list-14')||(event.previousContainer.id=='cdk-drop-list-16')) ) )  {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      
    } else {
      /// realia la peticon y hace el insert o update
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        
      );
       

      ///// si cambia de izquierda a derecha hace un un envioo que esta relacionando un usuario, si lo hace de izquierda a derecha esta indicando  que se estara quitando la relacion
      if((event.previousContainer.id=='cdk-drop-list-0')||(event.previousContainer.id=='cdk-drop-list-2')||(event.previousContainer.id=='cdk-drop-list-4')||(event.previousContainer.id=='cdk-drop-list-6')||(event.previousContainer.id=='cdk-drop-list-8')||(event.previousContainer.id=='cdk-drop-list-10')||(event.previousContainer.id=='cdk-drop-list-12')||(event.previousContainer.id=='cdk-drop-list-14')||(event.previousContainer.id=='cdk-drop-list-16')){

        this.updins = "1";
      }
      else{
        this.updins = "0"
      }

       
      console.log("movimientos", this.inprogress.length);
      console.log("movimientos", this.todos.length);
      console.log("movimientos",event.container.id);
   
      console.log("movimientos",event.previousContainer.id);
      console.log("movimientos",  event.container.data[event.currentIndex]);
      


      //console.log("movimientos",dats.title);
      console.log("DATOS");
        this.dats = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
        console.log(this.dats);
        console.log(this.dats.ID?.toString) 
        this.datosenv = this.dats.ID!.toString();
      console.log("movimientos",  event.container.data[event.currentIndex]);
 
      console.log("movimientos");
      console.log("movimientos",event.container.id);
   
      console.log("movimientos",event.previousContainer.id);
      //console.log("movimientos",  dats.id);
      //console.log("movimientos",dats.title);
      console.log("movimientos");

      this.insertusuarios();

    }
  }

  evenPredicate(item: CdkDrag<string>) {
  

    localStorage.setItem('asig','DERECHO' ); 
    
    return true;
  }
  evenIzq(item: CdkDrag<string[]>) {
    
   localStorage.setItem('asig','IZQUIERDO' ); 
    return true;
  }

}
