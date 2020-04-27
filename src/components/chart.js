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
    const { Chart } = window.ApexCharts;

    const defaultOptions = {
      options: {
        chart: {
          width: 600,
          type: 'pie',
        },
        labels: ['Gorilla', 'Monkey', 'Panda', 'Unicorn'],
      },
      series: [25, 40, 20, 15],
    };

    const devChart = (
      <Chart
        options={defaultOptions.options}
        series={defaultOptions.series}
        type="pie"
        width={600}
      />
    );

    const prodLabels = () => (
      <GetAll modelId={options.model} filter={options.filter}>
        {({ loading, error, data }) => {
          if (loading) return 'loading...';
          if (error) return 'failed';

          const { totalCount, results } = data;

          return (
            <div>
              <p>There are {totalCount} records.</p>
              <ul>
                {results.map(row => (
                  <li key={row.id}>{row.name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </GetAll>
    );

    /*     const prodSeries = () => {};

    const prodOptions = {
      options: {
        chart: {
          type: options.charttype,
        },
        labels: prodLabels,
      },
      series: prodSeries,
    };

    const prodChart = (
      <Chart
        options={prodOptions.options}
        series={prodOptions.series}
        type={options.charttype}
        width={options.width}
      />
    ); */

    return isDev ? <div>{devChart}</div> : prodLabels;
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
