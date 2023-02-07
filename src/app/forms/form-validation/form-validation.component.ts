import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { factura } from 'src/app/AUTH/interfaces/interfaces';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import Swal from 'sweetalert2'; 

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  parametro!: string;
  tipo!: string;
  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,private authservice: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params 
   
    .subscribe( params =>{
      this.parametro = params.id;
      this.tipo = params.tipo;
    });

    this.form = this.fb.group({
      fname: [
        null,
        ,
      ],
      femail: [null],
      date: [null],
     
    });
  }

  insertFactura(){
    var tip = '';
    if(this.tipo=='vk'){
    tip = '0'
    }
    else{
      tip= '1'
    }
    var factura: factura={
      codigo: this.parametro,
      descripcion: this.form.controls['femail']?.value,
      valor: this.form.controls['fname']?.value,
      fecha: this.form.controls['date']?.value,
      tipo: tip,
      estado: '1'
    }
    this.authservice.PostFacturacion(factura)
    .subscribe(resp => {
     
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: 'green',
      color: 'green',
      title: 'FACTURA GUARDADA',
      showConfirmButton: false,
      timer: 1700
    })
    setTimeout(() => {
      if(this.tipo =='vk')
      {
        this.router.navigate(['forms/form-validation/vk/'+this.parametro])
      }
      else{
        this.router.navigate(['forms/form-validation/contratos/'+this.parametro])
      }
    
    }, 1700);
  }
  cancelar(){
    setTimeout(() => {
      if(this.tipo=='vk'){
        this.router.navigate(['forms/form-validation/vk/'+this.parametro])
      }
      else{
        this.router.navigate(['forms/form-validation/contratos/'+this.parametro])
      }
     
    }, 200);
  }
}
