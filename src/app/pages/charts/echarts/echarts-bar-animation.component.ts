import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar-animation',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarAnimationComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;
  results = {};
  colors = ['#4a6745', '#4f096c', '#751212', '#da7d7d', 'red', 'green']

  @Input() set result(results: { title: string; yData: number[], xData: string[] }) {
    this.results = results
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const yData = results.yData.map((data: number, index) => {
       return  {
          value: data,
          itemStyle: {
            color: this.colors[index]
          }
        }
      })

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight, colors.infoLight],
        legend: {
          data: [results.title],
          align: 'left',
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            data: results.xData,
            silent: false,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: results.title,
            type: 'bar',
            data: yData,
            animationDelay: idx => idx * 10,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };

      // for (let i = 0; i < 100; i++) {
      //   xAxisData.push('Category ' + i);
      //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      // }
    });
  }

  constructor(private theme: NbThemeService) {
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
