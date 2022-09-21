

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
    CERRADOS?: number
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