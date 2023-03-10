import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresas, Historico, Dona, casosVK, PostcasosUsuariosid, PostHistCasosid, TodosIdTablas, AuthResponse, TotalTrabajo, TotalVencido, vensin, fact, escfirmada, soleg, casosVkLista, contratosLista, factura, total } from '../interfaces/interfaces';
import { Data } from '@angular/router';
import { async } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getRepoIssues() {
    throw new Error('Method not implemented.');
  } 
  private _usuario!: AuthResponse;
  constructor(private http: HttpClient) { }

  private link: string = 'https://app128.gestionadora.com:5050/api/controlvk/';

  CasosActuales (){
    const url = `${ this.link }obtenerCantidadCasosTotalesCasos/`; // para obtener cerrados abiertos total de casos 
   //const url = "https://app128.gestionadora.com:5050/api/controlvk/obtenerHistorico6MesesAutostar"; // link para grafica de casos historico 
return    this.http.get<Empresas[]>(url);
 
  }
  CasosActualesAutos (){
    const url = `${ this.link }obtenerCantidadCasosTotalesAutostar/`; // para obtener cerrados abiertos total de casos 
   //const url = "https://app128.gestionadora.com:5050/api/controlvk/obtenerHistorico6MesesAutostar"; // link para grafica de casos historico 
return    this.http.get<Empresas[]>(url);
 
  }
  CasosActualesContratos (){
    const url = `${ this.link }obtenerCantidadCasosContratos/`; // para obtener cerrados abiertos total de casos 
   //const url = "https://app128.gestionadora.com:5050/api/controlvk/obtenerHistorico6MesesAutostar"; // link para grafica de casos historico 
return    this.http.get<Empresas[]>(url);
 
  }
  CasosActualesCorporativo (){
    const url = `${ this.link }obtenerCantidadCasosAutostar/`; // para obtener cerrados abiertos total de casos 
   //const url = "https://app128.gestionadora.com:5050/api/controlvk/obtenerHistorico6MesesAutostar"; // link para grafica de casos historico 
return    this.http.get<Empresas[]>(url);
 
  }


  
//// retorna los historicos de 6 meses de casos cerrados, abiertos y total de casos


  CasosHistoricosvk(){
    const url = `${ this.link }obtenerHistorico6MesesCasos`;
    return    this.http.get<Historico[]>(url);

  }
  CasosHistoricosAutostar(){
    const url = `${ this.link }obtenerHistorico6MesesAutostar`;
    return    this.http.get<Historico[]>(url);

  }
  CasosHistoricosContratos(){
    const url = `${ this.link }obtenerHistorico6MesesContratos`;
    return    this.http.get<Historico[]>(url);

  }
////////////////////////////////////////////////////////////////////



  // peticiones para rellenar grafico de dona 
 CasosDonavk(){
  const url = `${ this.link }donaCasos`;
  return    this.http.get<Dona[]>(url);
 }

 CasosDonaautostar(){
  const url = `${ this.link }donaAutostar`;
  return    this.http.get<Dona[]>(url);
 } 

 CasosDonacontratos(){
  const url = `${ this.link }donaContratos`;
  return    this.http.get<Dona[]>(url);
 }
 /////////////////////////////////////////////



 


////////// peticiones para obtener el listado de usuarios con sus casos, cerrados, abiertos 
 CasosUsuariosVK(){
  const url = `${ this.link }obtenerCasosActualesCasos`;
  return    this.http.get<casosVK[]>(url);
 }
 CasosUsuariosAUTOSTAR(){
  const url = `${ this.link }obtenerCasosActualesAutostar`;
  return    this.http.get<casosVK[]>(url);
 }
 CasosUsuariosCONTRATOS(){
  const url = `${ this.link }obtenerCasosActualesContratos`;
  return    this.http.get<casosVK[]>(url);
 }

 CasosUsuariosGENERAL(){
  const url = `${ this.link }obtenerTotalAbogados`;
  return    this.http.get<casosVK[]>(url);
 }
 
/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////  peticiones para obtener el listado de usuarios con sus casos, cerrados y  abiertos con rangos de fchas 

PostCasosUsuariosVK(fechini: string, fechfin: string){

  const url = `${ this.link }obtenerCantidadCasosRangoCasos?fecha1=${fechini}&fecha2=${fechfin}`;

  


  console.log(url);
  const body = {fechini, fechfin};

  return    this.http.post<casosVK[]>(url,body);
 }
 

 PostCasosUsuariosAUTOSTAR(fechini: string, fechfin: string){

  const url = `${ this.link }obtenerCantidadCasosRangoAutostar?fecha1=${fechini}&fecha2=${fechfin}`;

  


  console.log(url);
  const body = {fechini, fechfin};

  return    this.http.post<casosVK[]>(url,body);
 }
 



 PostCasosUsuariosCONTRATOS(fechini: string, fechfin: string){

  const url = `${ this.link }obtenerCantidadCasosRangoContratos?fecha1=${fechini}&fecha2=${fechfin}`;

  


  console.log(url);
  const body = {fechini, fechfin};

  return    this.http.post<casosVK[]>(url,body);
 }
 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////



///// busca todos los casos de un id en particular  los muestra por empresa 
 PostcasosUsuariosidVk(usuarios: number){

  const url = `${ this.link }casosUsuariosCasos?usuario=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<PostcasosUsuariosid[]>(url,body);
 }
 PostcasosUsuariosidAutostar(usuarios: number){

  const url = `${ this.link }casosUsuariosAutostar?usuario=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<PostcasosUsuariosid[]>(url,body);
 }
 PostcasosUsuariosidContratos(usuarios: number){

  const url = `${ this.link }casosUsuariosContratos?usuario=${usuarios}`;

  const body = {usuarios};
  

  return    this.http.post<PostcasosUsuariosid[]>(url,body);
 }
///////////////////////////////////

////////// busca el historico de 6 meses  por usuario ///////////

 PostHistoricocasosUsuariosidContratos(usuarios: number){

  const url = `${ this.link }historialCasosContratos?id=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<PostHistCasosid[]>(url,body);
 }

 PostHistoricocasosUsuariosidCasos(usuarios: number){

  const url = `${ this.link }historialCasosCasos?id=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<PostHistCasosid[]>(url,body);
 }
 PostHistoricocasosUsuariosidAutostar(usuarios: number){

  const url = `${ this.link }historialCasosAutostar?id=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<PostHistCasosid[]>(url,body);
 }

 /////////////////////




////// peticiones para llenar estadisticas de dona enviando un id 
 CasosDonavkid(usuarios: string){
  const body = {usuarios};

  const url = `${ this.link }donaUsuarioCasos?usuario=${usuarios}`;
  console.log(url);
  return    this.http.post<Dona[]>(url,body);
 }

 CasosDonaautostarid(usuarios: string){
  const body = {usuarios};

  const url = `${ this.link }donaUsuarioAutostar?usuario=${usuarios}`;

  return    this.http.post<Dona[]>(url,body);
 } 

 CasosDonacontratosid(usuarios: string){
  const body = {usuarios};

  const url = `${ this.link }donaUsuarioContratos?usuario=${usuarios}`;
  return    this.http.post<Dona[]>(url,body);
 }

//////////////////////////////////////////////////////////////////////











 CasosActualesCasosid (usuarios: string){
  const body = {usuarios};

  const url = `${ this.link }obtenerCantidadCasosTotalesUsuariosCasos?usuario=${usuarios}`;
 
  return    this.http.post<Empresas[]>(url,body);

}
CasosActualesAutostarid (usuarios: string){
  const body = {usuarios};

  const url = `${ this.link }obtenerCantidadCasosTotalesUsuariosAutostar?usuario=${usuarios}`;
 
  return    this.http.post<Empresas[]>(url,body);

}
CasosActualesContratosid (usuarios: string){
  const body = {usuarios};
 
  const url = `${ this.link }controlvk/obtenerCantidadCasoTotalesUsuariosContratos?usuario=${usuarios}`;
  return    this.http.post<Empresas[]>(url,body);

}
















//////// son los apis que se utilizan para traer el historico de 6 meses de un usuario en especifico //////////////////
PostHistoricocasosUsuariosidUsuarioContratos(usuarios: string){

 

  const url = `${ this.link }historico6MesesUsuarioContratos?usuario=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<Historico[]>(url,body);
 }

 PostHistoricocasosUsuariosidUsuarioCasos(usuarios: string){

  const url = `${ this.link }historico6MesesUsuarioCasos?usuario=${usuarios}`;

  const body = {usuarios};

  return    this.http.post<Historico[]>(url,body);
 }
 PostHistoricocasosUsuariosidUsuarioAutostar(usuarios: string){

  const url = `${ this.link }historico6MesesUsuarioAutostar?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<Historico[]>(url,body);
 } 



//////////////////////////////////////////////////////////////////////////////////////////////////////////


/// verifica y compara los datos para realizar un union o quitar una union /////////

 UnirUsuarios(sistema: string, id: string, sistema2: string, id2: string, tipo: string){

  let  idcontratos='-1';
  let  idvk ='-1';
  let  idautostar ='-1';
  let idcorporativo ='-1';



if(tipo == '0')
{
 id2 = '0';
}


  switch(sistema){
    case 'CASOSVK':

    idvk = id;
switch(sistema2)
{
 
    case 'AUTOSTAR':
      idautostar =  id2
      break
      case 'CONTRATOS':
        idcontratos = id2
        break
}
      break;

      case 'AUTOSTAR':

    idautostar = id;
    switch(sistema2)
    {
      case 'CASOSVK':
        idvk = id2
        break
       
          case 'CONTRATOS':
          idcontratos = id2  
          break
    }
        break;

        case 'CONTRATOS':

        idcontratos = id;
        switch(sistema2)
        {
          case 'CASOSVK':
            idvk = id2;
            break
            case 'AUTOSTAR':
              idautostar = id2
              break
             
        }
          break;


  }


  const url = `${ this.link }insertarUsuarios?usuario=SISTEMAVK&idCasos=${idvk}&idAutostar=${idautostar}&idContratos=${idcontratos}&idCorporativo=${idcorporativo}`;

  const body = {sistema,id,sistema2,id2}; 

  return    this.http.post<Historico[]>(url,body);

 }

////////////////////////////////////////


/////7 trae el usuario con todos sus id asignados en la tabla de relaciones /////
 PostTodosid(usuarios: string, sistema: string){

  const url = `${ this.link }obtenerIdsSistemas?id=${usuarios}&sistema=${sistema}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);
 } 
//////////////////////////





PostAsignaUsuarioCasos(usuarios: string){
  const url = `${ this.link }casosActualesUsuarioCasos?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);

}
PostAsignaUsuarioAutostar(usuarios: string){
  const url = `${ this.link }casosActualesUsuarioAutostar?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);

}
PostAsignaUsuarioContratos(usuarios: string){
  const url = `${ this.link }casosActualesUsuarioContratos?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);

}







//////busca todos los usuarios excluyendo al del id que se envio ///////////////

PostAsignaUsuariosExcluyeCasos(usuarios: string){
  const url = `${ this.link }casosActualesExcluirCasos?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);


}

PostAsignaUsuariosExcluyeAutostar(usuarios: string){
  const url = `${ this.link }casosActualesExcluirAutostar?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);


}

PostAsignaUsuariosExcluyeContratos(usuarios: string){
  const url = `${ this.link }casosActualesExcluirContratos?usuario=${usuarios}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);


}

/////////////////////////////////















TodosLosID(usuarios: string, sisetma: string){



  switch(sisetma){
    case "Casos VK": 
      sisetma =  "CASOSVK";
      break
    case "Autostar":
      sisetma = "AUTOSTAR";
      break
    case "Contratos":
      sisetma  = "CONTRATOS";
      break


  }

  const url = `${ this.link }obtenerIdsSistemas?id=${usuarios}&sistema=${sisetma}`;

  const body = {usuarios}; 

  return    this.http.post<TodosIdTablas[]>(url,body);



}










//// funcion para hacer login ////////////////////////////////////////////////////////////
login(usuario:string, contrasenna: string){

  const url = `${ this.link }login?usuario=${usuario}&contrasenna=${contrasenna}`;
  const body = {usuario,contrasenna};
 
  return    this.http.post<AuthResponse[]>(url,body);
   }
   ///////////////////////////////////////////////////////////////////////////////////////////
















   ////////////////////////f/////// funcion para buscar cuantos estan con y sin trabajo ///////////////////////////////////////

   ContrabajoVK(){
    const url = `${ this.link }cantidadTrabajoActualCasos`;
    return    this.http.get<TotalTrabajo[]>(url);

  }
  contrabajoAutostar(){
    const url = `${ this.link }cantidadTrabajoActualAutostar`;
    return    this.http.get<TotalTrabajo[]>(url);

  }
  contrabajoContratos(){
    const url = `${ this.link }cantidadTrabajoActualContratos`;
    return    this.http.get<TotalTrabajo[]>(url);

  }







   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   /////////////////////////////// funcion para cunatos activos estan vencidos y cuantos estan sin vencer ////////////////////
   VencidosVK(){
    const url = `${ this.link }cantidadCasosVencidosTotalCasos`;
    return    this.http.get<TotalVencido[]>(url);

  }
 PorvencerVK(){
    const url = `${ this.link }cantidadPorVencerTotalCasos`;
    return    this.http.get<TotalVencido[]>(url);

  }
  VencidosAutostar(){
    const url = `${ this.link }vencidosAutostar`;
    return    this.http.get<TotalVencido[]>(url);

  }
 PorvencerAutostar(){
    const url = `${ this.link }porVencerAutostar`;
    return    this.http.get<TotalVencido[]>(url);

  }
  VencidosContratos(){
    const url = `${ this.link }vencidosContratos`;
    return    this.http.get<TotalVencido[]>(url);

  }
 PorvencerContratos(){
    const url = `${ this.link }porVencerContratos`;
    return    this.http.get<TotalVencido[]>(url);

  }



   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 





/////////////////////////////////////////////////// listado de casos vencidos y por vencer //////////////////////////////////////


vensinVK(){
  const url = `${ this.link }casosActivosTotalCasos`;
  return    this.http.get<vensin[]>(url);

}
vensinAutostar(){
  const url = `${ this.link }casosActivosTotalAutostar`;
  return    this.http.get<vensin[]>(url);

}
vensinContratos(){
  const url = `${ this.link }casosActivosTotalContratos`;
  return    this.http.get<vensin[]>(url);

}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////// listado de casos vencidos y por vencer por usuario//////////////////////////////////////


vensinpostVK(usuario:number){
  const url = `${ this.link }casosActivosEstUsuariosCasos?usuario=${usuario}`;
  const body = {usuario};
 
  return    this.http.post<vensin[]>(url,body);

}
vensinpostAutostar(usuario:number){
  const url = `${ this.link }casosActivosEstUsuariosAutostar?usuario=${usuario}`;
  const body = {usuario};
 
  return    this.http.post<vensin[]>(url,body);
}
vensinpostContratos(usuario:number){
  const url = `${ this.link }casosActivosEstUsuariosContratos?usuario=${usuario}`;
  const body = {usuario};
 
  return    this.http.post<vensin[]>(url,body);

}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////// FACTURACION (POR AHORA SOLO AUTOSTAR//////////////////////////////////////



factAutostar(fechini:string, fechfin: string){
  const url = `${ this.link }datosFacturacionAutostar?inicio=${fechini}&fin=${fechfin}`;
  const body = {fechfin,fechini};

  return    this.http.post<fact[]>(url,body);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////DETALLE  FACTURACION (POR AHORA SOLO AUTOSTAR//////////////////////////////////////



detfactAutostar(fechini:string, fechfin: string, tipo: string){
  const url = `${ this.link }datosFacturacionAutostarDetalle?inicio=${fechini}&fin=${fechfin}&tipo=${tipo}`;
  const body = {fechfin,fechini};


  return    this.http.post<escfirmada[]>(url,body);
}
detfactAutostarSoleg(fechini:string, fechfin: string, tipo: string){
  const url = `${ this.link }datosFacturacionAutostarDetalle?inicio=${fechini}&fin=${fechfin}&tipo=${tipo}`;
  const body = {fechfin,fechini};
  

  return    this.http.post<soleg[]>(url,body);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// FACTURACIONES CASOS Y CONTRATOS ///////////////

//// CASOS VK ///////////////////////////
GetcasosVkFacturacion(){

  const url = `http://localhost:8007/api/contratos/vk`;
  return    this.http.get<casosVkLista[]>(url);


} 
//// CONTRATOS ///////////////////////////
GetcasosContratosFacturacion(){

  const url = `http://localhost:8007/api/contratos/contratos`;
  return    this.http.get<contratosLista[]>(url);


} 
//// CASOS VK ID ///////////////////////////
GetcasosVkFacturacionId(id: string){

  const url = `http://localhost:8007/api/contratos/vk/${id}`;
  console.log(url)
  return    this.http.get<casosVkLista[]>(url);


} 

//// CONTRATOS ID///////////////////////////
GetcasosContratosFacturacionId(id: string){

  const url = `http://localhost:8007/api/contratos/contratos/${id}`;
  return    this.http.get<contratosLista[]>(url);


} 
////////////////////////////////////////

/////// detalle facturacion por id  //////
GetFacturasDetalle(id: string,tipo:string){

  const url = `http://localhost:8007/api/contratos/facturas/detalle/${id}/${tipo}`;
  return    this.http.get<factura[]>(url);


}  

/////////////////////////////////////////
/////// detalle facturacion fecha y tipo vk=0 contratos = 1  //////
GetFacturasDetalleFechas(fechini: string,fechfin: string,tipo:string){

  const url = `http://localhost:8007/api/contratos/facturas/fecha/${fechini}/${fechfin}/${tipo}`;
  console.log("link"+url)
  return    this.http.get<factura[]>(url);


}  

/////////////////////////////////////////
/////// detalle facturacion fecha y tipo vk=0 contratos = 1  //////
GetFacturasDetalleFechasTotal(fechini: string,fechfin: string,tipo:string){

  const url = `http://localhost:8007/api/contratos/facturas/fecha/total/${fechini}/${fechfin}/${tipo}`;
  console.log("link"+url)
  return    this.http.get<total[]>(url);


}  

/////////////////////////////////////////
/////// tota facturacion por id  //////
GetFacturasTotalId(id: string, tipo:string){

  const url = `http://localhost:8007/api/contratos/facturas/total/detalle/${id}/${tipo}`;
  return    this.http.get<total[]>(url);


} 

/////////////////////////////////////////
/////// delet de facturas detalle //////
DeletFacturasTotalId(id: string){

  const url = `http://localhost:8007/api/contratos/facturacion/contratos/${id}`;
  return    this.http.delete<total[]>(url);


}  

/////////////////////////////////////////
 


////// insertar detalle facturacion ///////////////////////
PostFacturacion(body: factura){

  const url = `http://localhost:8007/api/contratos/facturas`;

  


  

  return    this.http.post<factura>(url,body);
 }

/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////
}
 