import { DecimalPipe } from "@angular/common"


export interface Empresas {
    
    SISTEMA?: string,
    CASOS?: number,
    ABIERTOS?: number,
    CERRADOS?: number


}

export interface Historico {
    
    SISTEMA?: string,
    MES?: string,
    TOTAL_CASOS?: number,
    ABIERTOS?: number,
    CERRADOS?: number


}
export interface Dona {
    
    SISTEMA?: string,
    TIPO?: string,
    CASOS?: number,
   

}

export interface casosVK{
    ID?: number
    SISTEMA?: string,
    USU_NOMBRE_COMPLETO?: string,
    CASOS?: number,
    ABIERTOS?: number,
    CERRADOS?: number,
    VENCIDOS?: number,
    POR_VENCER?: number
}


export interface PostcasosUsuariosid{
    ID?: number
    SISTEMA?: string,
    TITULO?: string,
    CLIENTE?: string,
    ESTADO?: number,
    TIPO?: string,
    FECHA?: string
}

export interface PostHistCasosid{
        FECHA?: string,
        ACCIO?: string,
        DETALLE?: string
}
 
export interface TodosIdTablas{
    ID?: number,
    ID_CASOS?: number,
    ID_AUTOSTAR?: number,
    ID_CONTRATOS?: number,
    ID_CORPORATIVO?: number

}

export interface AuthResponse{
   
    USU_CODIGO: number,
   USU_NOMBRE_COMPLETO: string,
 }


 export interface TotalVencido{
    CASOS: number,
 }
 
 export interface TotalTrabajo{
    SIN_TRABAJO: number,
    CON_TRABAJO: number,
 }

 export interface vensin{
    ID: number,
    CLIENTE: string,
    ESTADO: string,
    TITULO: string,
    FECHA: string,
    USUARIO: string
 }

 export interface fact{
    TIPO?: string,
    TOTAL?: number,
    MONTO_TOTAL?: string
 }

 export interface escfirmada{
    ID?: number,
    NombreInstitucion?: string,
    Sucursal?: string,
    Marca?: string,
    Estilo?: string,
    Nombre?: string,
    Incluido?: string,
    Estado?: string,
    FechaEstado?: string,
    Tipo?: number,
    Pedido?: string,
    placa?: string,
    UltFecha?: string,
    Estado1?: string,
    Escritura?: string,
    Prenda?: string,
    Boleta?: string,
    Asiento?: string,
    FechaTitulo?: string,
    Chasis?: string,
    SPE?: number,
    NotaGeneral?: string,
    Nuevo?: number,
    NuevoTexto?: string,
    Chasis_Placa?: string,

 }

 export interface soleg{
    ID?: number,
    Fecha?: string,
    Solicitante?: string,
    FkDep?: number,
    Abreviacion?: string,
    Nombre_Dep?: string,
    Codigo?: string,
    FkTipoDoc?: number,
    Nombre_Tipo?: string,
    Timbres?: number,
    PapelSeguridad?: number,
    Otro?: number,
    Pedido?: string,
    Total?: number
 }