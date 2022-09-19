
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { casosVK } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { Contact } from './contact';

export interface ContactData {
  closeResult: string;
 
  searchText: any;
  txtContactname: string;
  txtContactPost: string;
  txtContactadd: string;
  txtContactno: string;
  txtContactinstagram: string;
  txtContactlinkedin: string;
  txtContactfacebook: string;
}

@Component({
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  closeResult = '';
  contacts: casosVK[] = [];
  searchText: any;
  txtContactname = '';
  txtContactPost = '';
  txtContactadd = '';
  txtContactno = '';
  txtContactinstagram = '';
  txtContactlinkedin = '';
  txtContactfacebook = '';
  parametro!: string ;
  parametros!: string;
  datos: string =  '';
  respuestas:casosVK[] = [];
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute,  public authservice: AuthService) {

   
   
    ////// hace la lectura de los parametros que trae el link del menu y compara en el switch para colocar los valores como se leen en la bd
    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
      console.log("entra al parametro");
      console.log(this.parametro);
      switch(this.parametro)
      {
       case "VK": 
       this.parametros = "Casos VK"
       break;
       case "AutoStar": 
       this.parametros = "Autostar"
       break;
       case "Contratos": 
       this.parametros = "Contratos"
       break;
      }
        this.updat();  
      
   /////// sse va a la funcion para cargar los datos y luego se realiza una pausa para 
      
      setTimeout(() => {
       this.contacts = this.respuestas  
      
      }, 500);
    });
   
    


  }

  


  ngOnInit(): void {

  //// realiza el mismo procedimiento que en el constructor 

    this.activatedRoute.params
   
    .subscribe( params =>{
      this.parametro = params.id;
      console.log("entra al parametro");
      console.log(this.parametro);
      switch(this.parametro)
      {
       case "VK": 
       this.parametros = "Casos VK"
       break;
       case "AutoStar": 
       this.parametros = "Autostar"
       break;
       case "Contratos": 
       this.parametros = "Contratos"
       break;
      }
        this.updat();  
      
   
      
      setTimeout(() => {
       this.contacts = this.respuestas  
      
      }, 500);
    });
   
    
    
  }

  updat (){
   
    //// un switch para seber de donde viene y treaer los datos especificos  y en su caso el general 
    switch(this.parametro){
      case 'VK': 
      this.authservice.CasosUsuariosVK()
      .subscribe(resp=>{
        this.respuestas = resp;
      
      });
      break


      case 'AutoStar':
        this.authservice.CasosUsuariosAUTOSTAR()
        .subscribe(resp=>{
          this.respuestas = resp;
     
        });
        break;
        case 'Contratos':
          this.authservice.CasosUsuariosCONTRATOS()
          .subscribe(resp=>{
            this.respuestas = resp;
     
          });
        break
        case 'General':
          this.authservice.CasosUsuariosGENERAL()
          .subscribe(resp=>{
            this.respuestas = resp;
        
          });
        break


        default:
          this.respuestas = [];
          break

    }
  }




  

  // tslint:disable-next-line - Disables all

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContentComponent implements OnInit {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  parametro!: number ;
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ContactData, private activatedRoute: ActivatedRoute
  ) {
   
    
    this.local_data = {...data};
    this.action = this.local_data.action;

 


   

  }

  ngOnInit(): void {


  }  


  

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

      