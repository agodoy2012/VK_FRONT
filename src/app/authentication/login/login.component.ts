import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthResponse } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    usuario: ['',[Validators.required]],
    contrasena: ['', [Validators.required,Validators.minLength(6)]]
  });
  datos: AuthResponse[] = [];
  constructor(private fb: FormBuilder,  private router: Router, private authoservice: AuthService) {}




  /// funcion para validar y enviar al login
  login(){
    const {usuario,contrasena} = this.miFormulario.value;


    /// hace la peticion al servidor del login
    this.authoservice.login(usuario,contrasena).subscribe(resp =>{

      //el iff compara para ver si trae respuesta o no y validar si tuvo exito 
      this.datos = resp;
      if(resp.length > 0){

        /// guarda en local el nombre del usuario 
        localStorage.setItem('usuarioing',this.datos[0].USU_NOMBRE_COMPLETO );
        /// hace el re envio a la pagina del dashboard
        this.router.navigate( ['/dashboard']);
      }
      else{

        //si no logra respuesta es error de uno de los campos
        console.log(resp)
        Swal.fire('Error usuario o contraseña no es válido')
      }
    })
  }
}
 