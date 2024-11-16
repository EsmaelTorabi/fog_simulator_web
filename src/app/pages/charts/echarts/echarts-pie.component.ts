import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {Result} from "../../layout/models/result";

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements  OnDestroy {
  options: any = {};
  themeSubscription: any;
  @Input() set result(result: Result){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Network', 'Cost', 'Energy Consumption', 'Runtime'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: result.networkCost, name: 'network Cost' },
              { value: result.totalCpuTime, name: 'Total Cpu Time' },
              { value: result.transferCost, name: 'Transfer Cost' },
              { value: result.runtime, name: 'Run Time' },
              { value: result.accessibility, name: 'Accessibility' },
              { value: result.availability, name: 'Availability' },
              { value: result.downloadCost, name: 'Download Cost' },
              { value: result.energyCost, name: 'Runtime' },
              { value: result.storageCost, name: 'Runtime' },
              { value: result.uploadCost, name: 'Runtime' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });

  }
  constructor(private theme: NbThemeService) {
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
