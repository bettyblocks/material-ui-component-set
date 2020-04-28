(() => ({
  name: 'Chart',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, GetAll } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const chartType = options.chartType;
    const { Chart } = window.ApexCharts;
    const chartVal = B.getProperty(options.valueProperty);
    const chartLabel = B.getProperty(options.labelProperty);

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

          const { results } = data;

          let labels = results.map(obj => obj[chartLabel.name]);
          labels = [...new Set(labels)];

          let liveSeries = [];
          const series2 = results.map(obj => obj[chartVal.name]);

          let count;
          if (chartVal.kind === 'string') {
            count = {};
            series2.forEach(i => {
              count[i] = ++count[i] || 1;
            });
          } else if (chartVal.kind === 'integer') {
            count = {};
            results.forEach(e =>
              count[e[chartLabel.name]]
                ? (count[e[chartLabel.name]] += e[chartVal.name])
                : (count[e[chartLabel.name]] = e[chartVal.name]),
            );
          }

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

          return (
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
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
