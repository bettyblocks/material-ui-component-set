(() => ({
  name: 'Chart',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, GetAll } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const chartType = options.charttype;
    const { Chart } = window.ApexCharts;

    let defaultSeries;
    switch (chartType) {
      case 'pie':
        defaultSeries = [25, 40, 20, 15];
        break;
      case 'bar':
        defaultSeries = [{ data: [25, 40, 20, 15] }];
        break;
    }
    const defaultOptions = {
      options: {
        chart: {
          width: 600,
          type: 'pie',
        },
        labels: ['Gorilla', 'Monkey', 'Panda', 'Unicorn'],
      },
      series: defaultSeries,
    };

    const devChart = (
      <Chart
        options={defaultOptions.options}
        series={defaultOptions.series}
        type={chartType}
        width={600}
      />
    );

    const liveChart = (
      <GetAll modelId={options.model} filter={options.filter}>
        {({ loading, error, data }) => {
          if (loading) return 'loading...';
          if (error) return error;

          const { totalCount, results } = data;

          let labels = results.map(obj => obj.status);
          labels = [...new Set(labels)];

          let liveSeries = [];
          let series2 = results.map(obj => obj.status);

          var count = {};
          series2.forEach(i => {
            count[i] = ++count[i] || 1;
          });

          let values;
          switch (chartType) {
            case 'pie':
              liveSeries = Object.values(count);
              break;
            case 'bar':
              values = Object.values(count);
              liveSeries = [{ data: values }];
              break;
            case 'line':
              values = Object.values(count);
              liveSeries = [{ data: values }];
              break;
          }

          const chartOptions = {
            options: {
              chart: {
                width: 600,
                type: chartType,
              },
              labels: labels,
            },
            series: liveSeries,
          };

          let blah = [{ data: [25, 40, 20, 15] }];

          return (
            <Chart
              options={chartOptions.options}
              series={liveSeries}
              type={chartType}
              width={600}
            />
          );
        }}
      </GetAll>
    );

    return isDev ? <div>{devChart}</div> : liveChart;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '4rem',
      height: '100%',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
    },
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      '&::after': {
        content: '"Paper"',
      },
    },
  }),
}))();
