import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AuthService } from 'src/app/AUTH/services/auth.service';
import { Data } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { XAxisComponent } from '@swimlane/ngx-charts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}

@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
  styleUrls: ['./sales-overview.component.scss'],
})

  export  class SalesOverviewComponent implements OnInit  {
  
  
    @ViewChild('chart') chart: ChartComponent = Object.create(null);





  public chartOptions: Partial<ChartOptions>;
  
  idvk!: string;
  idautostar!: string;
  idcontratos!: string;
  constructor(private authservice: AuthService) {
// se lee varaible para ver si esta en usuarios o empresas 

    const emp = localStorage.getItem('tab2');
    if(emp)
    {

/// se hace una pausa para poder llenar las variables y teners todos los id si esta en usuarios
      setTimeout(() => {
        this.idvk = localStorage.getItem('idvk')!;
        this.idautostar = localStorage.getItem('idautostar')!;
        this.idcontratos = localStorage.getItem('idcontratos')!;
  
        this.updateSeriesid();
        
      }, 300);
    }
    else
    {

      /// ingresa cuando es para empresas 

      this.updateSeries();

    }
   
 
    

      
       
      
   

      // llna toda la informacion para las graficas 
    this.chartOptions = {
      
      series: [
        {
          name: 'CASOS',
          data: [],
        }, 
        {
          name: 'CERRADOS',
          data: [],
        },
        {
           name:'PENDIENTES',
           data:[]
        }
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Poppins,sans-serif',
        height: 347,
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
      }, 
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [this.mes1,this.mes2, this.mes3, this.mes4, this.mes5, this.mes6],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ['#1e88e5', '#26c6da', '#ffffff'],
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  mes1 = "";
  mes2 = "";
  mes3 = "";
  mes4 = "";
  mes5 = "";
  mes6 = "";
  cas1 = 0;
  cas2 = 0;
  cas3 = 0;
  cas4 = 0;
  cas5 = 0;
  cas6 = 0;
  ab1 = 0;
  ab2 = 0;
  ab3 = 0;
  ab4 = 0;
  ab5 = 0; 
  ab6 = 0;
  cer1 = 0;
  cer2 = 0;
  cer3 = 0;
  cer4 = 0;
  cer5 = 0;
  cer6 = 0;
  meme = "";

  ngOnInit(): void {



    // esta parate hace lo que hace el constructor 
   const emp = localStorage.getItem('tab2');
   if(emp)
   {
    setTimeout(() => {
      this.idvk = localStorage.getItem('idvk')!;
      this.idautostar = localStorage.getItem('idautostar')!;
      this.idcontratos = localStorage.getItem('idcontratos')!;

      this.updateSeriesid();
      
    }, 300);
 


   }
   else{
    this.updateSeries();
   }
   
  }
  
   updateSeries() {


//es la funcion para mostrar los datos de las empresas 







    const tab = localStorage.getItem('tab');
   // hace un case para ver e n que tab se encuentra 

    switch(tab){
      case 'Casos VK': 
    
   
   // en cada case  rellena las variables necesarias con la informacion de respuesta de la peticion 
      this.authservice.CasosHistoricosvk()
      .subscribe(resp => {
        this.mes1 = resp[0].MES!;
        this.mes2 = resp[1].MES!;
        this.mes3 = resp[2].MES?.toString()!;
        
        this.mes4 = resp[3].MES?.toString()!;
        this.mes5 = resp[4].MES?.toString()!;
        this.mes6 = resp[5].MES?.toString()!;
        this.cas1 = resp[0].TOTAL_CASOS!;
        this.cas2 = resp[1].TOTAL_CASOS!;
        this.cas3 = resp[2].TOTAL_CASOS!;
        this.cas4 = resp[3].TOTAL_CASOS!;
        this.cas5 = resp[4].TOTAL_CASOS!;
        this.cas6 = resp[5].TOTAL_CASOS!;
        this.ab1 = resp[0].ABIERTOS!;
        this.ab2 = resp[1].ABIERTOS!;
        this.ab3 = resp[2].ABIERTOS!;
        this.ab4 = resp[3].ABIERTOS!;
        this.ab5 = resp[4].ABIERTOS!;
        this.ab6 = resp[5].ABIERTOS!;
        this.cer1 = resp[0].CERRADOS!;
        this.cer2 = resp[1].CERRADOS!;
        this.cer3 = resp[2].CERRADOS!;
        this.cer4 = resp[3].CERRADOS!;
        this.cer5 = resp[4].CERRADOS!;
        this.cer6 = resp[5].CERRADOS!;
        
 
      });
      break;


      case 'Autostar':
        
      
        this.authservice.CasosHistoricosAutostar()
        .subscribe(resp => {
          this.mes1 = resp[0].MES!;
          this.mes2 = resp[1].MES!;
          this.mes3 = resp[2].MES?.toString()!;
          this.mes4 = resp[3].MES?.toString()!;
          this.mes5 = resp[4].MES?.toString()!;
          this.mes6 = resp[5].MES?.toString()!;
          this.cas1 = resp[0].TOTAL_CASOS!;
          this.cas2 = resp[1].TOTAL_CASOS!;
          this.cas3 = resp[2].TOTAL_CASOS!;
          this.cas4 = resp[3].TOTAL_CASOS!;
          this.cas5 = resp[4].TOTAL_CASOS!;
          this.cas6 = resp[5].TOTAL_CASOS!;
          this.ab1 = resp[0].ABIERTOS!;
          this.ab2 = resp[1].ABIERTOS!;
          this.ab3 = resp[2].ABIERTOS!;
          this.ab4 = resp[3].ABIERTOS!;
          this.ab5 = resp[4].ABIERTOS!;
          this.ab6 = resp[5].ABIERTOS!;
          this.cer1 = resp[0].CERRADOS!;
          this.cer2 = resp[1].CERRADOS!;
          this.cer3 = resp[2].CERRADOS!;
          this.cer4 = resp[3].CERRADOS!;
          this.cer5 = resp[4].CERRADOS!;
          this.cer6 = resp[5].CERRADOS!;
         
        });
      
      break;


        case 'Contratos':
          this.authservice.CasosHistoricosContratos()
          .subscribe(resp => {
            this.mes1 = resp[0].MES!;
            this.mes2 = resp[1].MES!;
            this.mes3 = resp[2].MES?.toString()!;
            this.mes4 = resp[3].MES?.toString()!;
            this.mes5 = resp[4].MES?.toString()!;
            this.mes6 = resp[5].MES?.toString()!;
            this.cas1 = resp[0].TOTAL_CASOS!;
            this.cas2 = resp[1].TOTAL_CASOS!;
            this.cas3 = resp[2].TOTAL_CASOS!;
            this.cas4 = resp[3].TOTAL_CASOS!;
            this.cas5 = resp[4].TOTAL_CASOS!;
            this.cas6 = resp[5].TOTAL_CASOS!;
            this.ab1 = resp[0].ABIERTOS!;
            this.ab2 = resp[1].ABIERTOS!;
            this.ab3 = resp[2].ABIERTOS!;
            this.ab4 = resp[3].ABIERTOS!;
            this.ab5 = resp[4].ABIERTOS!;
            this.ab6 = resp[5].ABIERTOS!;
            this.cer1 = resp[0].CERRADOS!;
            this.cer2 = resp[1].CERRADOS!;
            this.cer3 = resp[2].CERRADOS!;
            this.cer4 = resp[3].CERRADOS!;
            this.cer5 = resp[4].CERRADOS!;
            this.cer6 = resp[5].CERRADOS!;
          
          });
        break;

        case 'CORPORATIVO':
            break;

    }

  


     
//// se realiza una pausa para poder agregaar todos lo datos en el grafico con la informacion ya solicitada en la peticion 
     setTimeout(() => {
      this.chartOptions.xaxis =  {
        categories: [this.mes1,this.mes2, this.mes3, this.mes4, this.mes5, this.mes6],
      };
      this.chartOptions.series = [
        {
          name: 'CASOS',
          data: [this.cas1, this.cas2, this.cas3, this.cas4, this.cas5, this.cas6],
        },
        {
          name: 'CERRADOS',
          data: [this.cer1, this.cer2, this.cer3, this.cer4, this.cer5, this.cer6],
        },
        {
           name:'PENDIENTES',
           data: [this.ab1, this.ab2, this.ab3, this.ab4, this.ab5, this.ab6]
        }
      ]    

     }, 750);
  
  }




  updateSeriesid() {


    /// se leeen las variables locales para hacer las comparativas n el iff y en el case
    let id2 = localStorage.getItem('tab2id');

    const tab2 = localStorage.getItem('tab2')
    const tab = localStorage.getItem('tab');
   
 
    switch(tab){
      case 'Casos VK': 

      /// if para ver si existe el id y si no ver si esta en el tab correcto para poder ejecutar la pestaña
      if((this.idvk)&&(this.idvk!="0")){

        id2 = this.idvk;
      }
      else
      {
        if(tab2!=tab){
          break
        }
      }

      // realiza el llamdo a la peticion
      this.authservice.PostHistoricocasosUsuariosidUsuarioCasos(id2!)
      .subscribe(resp => {
        this.mes1 = resp[0].MES!;
        this.mes2 = resp[1].MES!;
        this.mes3 = resp[2].MES?.toString()!;
        
       
        this.mes4 = resp[3].MES?.toString()!;
        this.mes5 = resp[4].MES?.toString()!;
        this.mes6 = resp[5].MES?.toString()!;
        this.cas1 = resp[0].TOTAL_CASOS!;
        this.cas2 = resp[1].TOTAL_CASOS!;
        this.cas3 = resp[2].TOTAL_CASOS!;
        this.cas4 = resp[3].TOTAL_CASOS!;
        this.cas5 = resp[4].TOTAL_CASOS!;
        this.cas6 = resp[5].TOTAL_CASOS!;
        this.ab1 = resp[0].ABIERTOS!;
        this.ab2 = resp[1].ABIERTOS!;
        this.ab3 = resp[2].ABIERTOS!;
        this.ab4 = resp[3].ABIERTOS!;
        this.ab5 = resp[4].ABIERTOS!;
        this.ab6 = resp[5].ABIERTOS!;
        this.cer1 = resp[0].CERRADOS!;
        this.cer2 = resp[1].CERRADOS!;
        this.cer3 = resp[2].CERRADOS!;
        this.cer4 = resp[3].CERRADOS!;
        this.cer5 = resp[4].CERRADOS!;
        this.cer6 = resp[5].CERRADOS!;
        
 
      });
      break;


      case 'Autostar':
        if((this.idautostar)&&(this.idautostar!="0")){

          id2 = this.idautostar;
        }
        else
      {
        if(tab2!=tab){
          break
        }
      }
        
        this.authservice.PostHistoricocasosUsuariosidUsuarioAutostar(id2!)
        .subscribe(resp => {
          this.mes1 = resp[0].MES!;
          this.mes2 = resp[1].MES!;
          this.mes3 = resp[2].MES?.toString()!;
          this.mes4 = resp[3].MES?.toString()!;
          this.mes5 = resp[4].MES?.toString()!;
          this.mes6 = resp[5].MES?.toString()!;
          this.cas1 = resp[0].TOTAL_CASOS!;
          this.cas2 = resp[1].TOTAL_CASOS!;
          this.cas3 = resp[2].TOTAL_CASOS!;
          this.cas4 = resp[3].TOTAL_CASOS!;
          this.cas5 = resp[4].TOTAL_CASOS!;
          this.cas6 = resp[5].TOTAL_CASOS!;
          this.ab1 = resp[0].ABIERTOS!;
          this.ab2 = resp[1].ABIERTOS!;
          this.ab3 = resp[2].ABIERTOS!;
          this.ab4 = resp[3].ABIERTOS!;
          this.ab5 = resp[4].ABIERTOS!;
          this.ab6 = resp[5].ABIERTOS!;
          this.cer1 = resp[0].CERRADOS!;
          this.cer2 = resp[1].CERRADOS!;
          this.cer3 = resp[2].CERRADOS!;
          this.cer4 = resp[3].CERRADOS!;
          this.cer5 = resp[4].CERRADOS!;
          this.cer6 = resp[5].CERRADOS!;
         
        });
      
      break;


        case 'Contratos':
          if((this.idcontratos)&&(this.idcontratos!="0")){

            id2 = this.idcontratos;
          }
          this.authservice.PostHistoricocasosUsuariosidUsuarioContratos(id2!)
          .subscribe(resp => {
            this.mes1 = resp[0].MES!;
            this.mes2 = resp[1].MES!;
            this.mes3 = resp[2].MES?.toString()!;
            this.mes4 = resp[3].MES?.toString()!;
            this.mes5 = resp[4].MES?.toString()!;
            this.mes6 = resp[5].MES?.toString()!;
            this.cas1 = resp[0].TOTAL_CASOS!;
            this.cas2 = resp[1].TOTAL_CASOS!;
            this.cas3 = resp[2].TOTAL_CASOS!;
            this.cas4 = resp[3].TOTAL_CASOS!;
            this.cas5 = resp[4].TOTAL_CASOS!;
            this.cas6 = resp[5].TOTAL_CASOS!;
            this.ab1 = resp[0].ABIERTOS!;
            this.ab2 = resp[1].ABIERTOS!;
            this.ab3 = resp[2].ABIERTOS!;
            this.ab4 = resp[3].ABIERTOS!;
            this.ab5 = resp[4].ABIERTOS!;
            this.ab6 = resp[5].ABIERTOS!;
            this.cer1 = resp[0].CERRADOS!;
            this.cer2 = resp[1].CERRADOS!;
            this.cer3 = resp[2].CERRADOS!;
            this.cer4 = resp[3].CERRADOS!;
            this.cer5 = resp[4].CERRADOS!;
            this.cer6 = resp[5].CERRADOS!;
          
          });
        break;

        case 'CORPORATIVO':
            break;

    }

  


     
//// realiza la actualizacion del grafico con los datos que se realizaron en la peticion 
     setTimeout(() => {
      this.chartOptions.xaxis =  {
        categories: [this.mes1,this.mes2, this.mes3, this.mes4, this.mes5, this.mes6],
      };
      this.chartOptions.series = [
        {
          name: 'CASOS',
          data: [this.cas1, this.cas2, this.cas3, this.cas4, this.cas5, this.cas6],
        },
        {
          name: 'CERRADOS',
          data: [this.cer1, this.cer2, this.cer3, this.cer4, this.cer5, this.cer6],
        },
        {
           name:'PENDIENTES',
           data: [this.ab1, this.ab2, this.ab3, this.ab4, this.ab5, this.ab6]
        }
      ]    

     }, 750);
  
  }
  

}
