export class WidgetChartService {
  public static options(title: string, legendId: string) {
    return {
      legendId,
      title: {
        display: true,
        text: title
      },
      responsive: false,
      legend: {
        display: false,
        position: 'bottom',
      },
      legendCallback: (chart) => {
          const text = [];
          text.push('<div class="chart-legend">');
          for (let i = 0; i < chart.config.data.datasets[0].data.length; i++) {
            text.push(
              '<div class="chart-legend-item">' +
              '<span style="background-color:' + WidgetChartService.getColor(null, i) + '">'
            );
            if (chart.data.labels[i]) {
              text.push(chart.data.labels[i]);
            }
            text.push('</span></div>');
          }
          text.push('</div>');
          return text.join('');
        },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            const totalSum = data.datasets[0].data.reduce(function add(a, b) {
              return a + b;
            }, 0);
            const percentage = Math.round((data.datasets[0].data[item.index] / totalSum) * 100);
            return data.labels[item.index] + ': ' + data.datasets[0].data[item.index] + ' (' + percentage + '%)';
          }
        }
      }
    };
  }

  public static getColor(context, index=null) {
    const colors = ['rgba(151,187,205,1)', 'rgba(220,220,220,1)', 'rgba(247,70,74,1)', 'rgba(70,191,189,1)',
      'rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)'];
    if (index === null) {
      index = context.dataIndex;
    }
    if (colors[index]) {
      return colors[index];
    } else {
      let i = colors.length - 1;
      let colorIndex = 0;
      let foundColor = false;
      while (!foundColor) {
        i++;
        if (i === index) {
          foundColor = true;
        }
        if (!foundColor) {
          colorIndex++;
          if (colorIndex > (colors.length - 1)) {
            colorIndex = 0;
          }
        }
      }
      return colors[colorIndex];
    }
  }
}
