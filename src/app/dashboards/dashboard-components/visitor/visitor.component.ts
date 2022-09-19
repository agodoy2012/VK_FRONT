import { Component, Input, ViewChild,OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import Swal from 'sweetalert2';
import { label } from '../../../apps/mailbox/listing/categories';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { Dona } from 'src/app/AUTH/interfaces/interfaces';
import { colorSets } from '@swimlane/ngx-charts';
import { ChartOptions } from '../sales-overview/sales-overview.component';
import { async } from '@angular/core/testing';
import { Data } from '@angular/router';

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

@Component({ 
  selector: 'app-visitor',
  templateUrl: './visitor.component.html', 
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit  {
  @ViewChild('visitor-chart') chart2: ChartComponent = Object.create(null);
  @Input() empresa="";
  
  private empresas = this.empresa;

  public VisitorChartOptions: Partial<VisitorChartOptions>;

  public doughnutChartType = 'doughnut';
  emp = localStorage.getItem('tab');
    datos: number[]= [0];
    tam = 0;
    datos_nuevos: number[] = [];
    label_nombres: string[] = ['ninguno'];
    datosresp: any;
    respuestas: Dona[] = [];
    idvk!: string;
    idautostar!: string;
    idcontratos!: string;
  constructor(private authservice: AuthService) {
    



    const emp2 = localStorage.getItem('tab2'); // lee la variable local si existe, si existe esta en el tab de usuarios y no en el de empresas 
    if(emp2) // este tab es para visualizar la grafica del usuario especificamente y el else siver para hacer las consultas de la empresa
    {
    
      
      setTimeout(() => { //un tiempo de retraso para poder leer las variables y tener los valores en estas 
        this.idvk = localStorage.getItem('idvk')!;
        this.idautostar = localStorage.getItem('idautostar')!;
        this.idcontratos = localStorage.getItem('idcontratos')!;

        this.updateseriesid(); // metodo para hacer el despliegue de informacion 
      }, 300);
     
 
    }
    else{
      
     this.updateSeries(); // metodo para hacer el despliegue de informacion de la empresa 
    }
 
    
    this.VisitorChartOptions = { //propiedades de la grafica 
      
      series:this.datos,
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 253,  
        
      },
 
      plotOptions: {
        
                pie: {
          donut: {
            size: '80px',
          },
         
        },
       
        
      },
      
     
     
      tooltip: {
        fillSeriesColor: true,
        onDatasetHover: {
          highlightDataSeries: false,
      },
      
      
      },
      dataLabels: {
       
        enabled: false,
      
      },
      stroke: {
        width: 0,
      },
      legend: {
        formatter: function(label, opts) {
          return label + " - " + opts.w.globals.series[opts.seriesIndex]
      },
        labels:{
          colors: 'white'
          
        },
        
      },
      labels: ['SIN DATOS'],
      colors: ['#1e88e5', '#26c6da', '#745af2', '#eceff1','#32CD32','#FFFF00','#FF4500','#FF00FF','#0000FF','#304758'],
      
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
          
        },
      ],
    };
    
  }


  ngOnInit(): void {

    const emp2 = localStorage.getItem('tab2'); //lectura de variable local para saber si esta en tabs de empresa o de usuarios 
    if(emp2)
    {

     

        
      setTimeout(() => {//un tiempo de retraso para poder leer las variables y tener los valores en estas 
        this.idvk = localStorage.getItem('idvk')!;
        this.idautostar = localStorage.getItem('idautostar')!;
        this.idcontratos = localStorage.getItem('idcontratos')!;

   
        this.updateseriesid();
      }, 300);
     

      
    
 
    }
    else{
    
     this.updateSeries();
    }
    
  }




  updateSeries()  {



   //se lee el tab en que esta para hacer la comparacion y poder desplegar los valores de esa empresa 
   
    const tab = localStorage.getItem('tab');
   // el switch marca en que tab esta y hacer la consulta para llenar las donas


    switch(tab){
      case 'Casos VK': 

//se hace el llamado a la peticion de donas especifico del tab seleccionado
       this.authservice.CasosDonavk()
       
    .subscribe(resp=>{
      this.datos_nuevos = [];
      this.label_nombres = [];
    this.tam = resp.length;
    
    this.respuestas = resp;
   // se hacer un for para poder crear un arreglo con los datos que  nos trae el query
    for (let index = 0 ; index < this.tam; index++ ) {
    

      // se realiza el llenado de los datos para desplegar en la grafrica 
      this.datos_nuevos.push(resp[index].CASOS!);
      this.label_nombres.push(resp[index].TIPO!);
      
    }
    });
      break;


      case 'Autostar':
 
       this.authservice.CasosDonaautostar()
        .subscribe((resp)=>{
          this.datos_nuevos = [];
          this.label_nombres = [];
        this.tam = resp.length;
          this.respuestas = resp;
         
        for (let index = 0 ; index < this.tam; index++ ) {
          
          this.datos_nuevos.push(resp[index].CASOS!);
          this.label_nombres.push(resp[index].TIPO!);
          
        }
        });
      
      break;


        case 'Contratos':

    
        this.authservice.CasosDonacontratos()
          .subscribe(resp=>{
            this.datos_nuevos = [];
            this.label_nombres = [];
          this.tam = resp.length;
          this.respuestas = resp;
         
          for (let index = 0 ; index < this.tam; index++ ) {
            
            this.datos_nuevos.push(resp[index].CASOS!);
            
            this.label_nombres.push(resp[index].TIPO!);
            
          }
          });
        break;

        case 'CORPORATIVO':
            break;

    }
    
  

// se realiza una espera para poder tener los datos cargados y poder haer el cambio en la serie de datos de la dona y tener los datos de la empresa
    setTimeout(() => {
      this.VisitorChartOptions.series = this.datos_nuevos;
     
      this.VisitorChartOptions.labels = this.label_nombres;
     
    }, 750);


  }



  updateseriesid(){
    
    
    let id2 = localStorage.getItem('tab2id');
   
    //se leen las variables para poder hacer el case y un comparativo
   
    const tab = localStorage.getItem('tab'); 
  
    const nueva = localStorage.getItem('tab2')


    
 // case para saber en que tab esta y verificar los id que tiene relacionados en las otras empresas para mostrar la data del usuario con sus distintas empresas
    switch(tab){

   
      case 'Casos VK': 

      //hace un comparativo para mandar uno de los id del usuario correspondiente si no tiene id y no es la misma tab hace un break y nocontinua con el proceso para evitar una llamada 
      if((this.idvk)&&(this.idvk!="0")){

        id2 = this.idvk;
      }
        else
        {
          if(nueva!=tab){
            break
          }

        }
       
      this.authservice.CasosDonavkid(id2!)
       .subscribe((resp)=>{


         this.datos_nuevos = [];
         this.label_nombres = [];
       this.tam = resp.length;
         this.respuestas = resp;
         
       for (let index = 0 ; index < this.tam; index++ ) {
       
         this.datos_nuevos.push(resp[index].CASOS!);
         
         this.label_nombres.push(resp[index].TIPO!);
 
       }
       });



       setTimeout(() => {
        this.VisitorChartOptions.series = this.datos_nuevos;
        this.VisitorChartOptions.labels = this.label_nombres;
   
      }, 750);
      break;


      case 'Autostar':


        if((this.idautostar)&&(this.idautostar!="0")){

          id2 = this.idautostar;
        }
  
       this.authservice.CasosDonaautostarid(id2!)
        .subscribe((resp)=>{
          this.datos_nuevos = [];
          this.label_nombres = [];
        this.tam = resp.length;
       
      
          this.respuestas = resp;
          
        for (let index = 0 ; index < this.tam; index++ ) {
        
          this.datos_nuevos.push(resp[index].CASOS!);
      
          this.label_nombres.push(resp[index].TIPO!);
    
        } 

         
        });
        setTimeout(() => {
          this.VisitorChartOptions.series = this.datos_nuevos;
          this.VisitorChartOptions.labels = this.label_nombres;
     
        }, 750);
      break;


        case 'Contratos':
          if((this.idcontratos)&&(this.idcontratos!="0")){

            id2 = this.idcontratos;
          }
    
          this.authservice.CasosDonacontratosid(id2!)
          .subscribe((resp)=>{
            this.datos_nuevos = [];
            this.label_nombres = [];
          this.tam = resp.length;
            this.respuestas = resp;
            
          for (let index = 0 ; index < this.tam; index++ ) {
          
            this.datos_nuevos.push(resp[index].CASOS!);
            
            this.label_nombres.push(resp[index].TIPO!);
    
          }
          });

          setTimeout(() => {
            this.VisitorChartOptions.series = this.datos_nuevos;
            this.VisitorChartOptions.labels = this.label_nombres;
       
          }, 750);

          break;
    }
    
  


 



  }


} 
