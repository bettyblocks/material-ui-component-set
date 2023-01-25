(() => ({
  name: 'PieChart',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'apexcharts',
      package: 'npm:apexcharts@3.16.0',
      imports: ['*'],
    },
    {
      label: 'reactApexcharts',
      package: 'npm:react-apexcharts@1.4.0',
      imports: ['*'],
    },
  ],
  jsx: (() => {
    const {
      reactApexcharts: { Chart },
    } = dependencies;
    const { useAllQuery, getProperty, env } = B;
    const { model, property, sumProperty } = options;
    const isDev = env === 'dev';
    const [results, setResults] = useState([]);
    const { name } = getProperty(property) || {};
    const { name: sumName } = getProperty(sumProperty) || {};

    // eslint-disable-next-line no-unused-vars
    const { loading, error, data, refetch } =
      model &&
      useAllQuery(model, {
        take: 50,
        onCompleted(res) {
          const hasResult = res && res.result && res.result.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(resp) {
          B.triggerEvent('onError', resp);
        },
      });

    useEffect(() => {
      if (!isDev && data) {
        setResults(data.results);
      }
    }, [data]);

    function findKey(arr, key, sum) {
      const arr2 = [];
      arr.forEach((x) => {
        if (arr2.some((val) => val.name === x[key])) {
          arr2.forEach((k) => {
            if (k.name === x[key]) {
              // eslint-disable-next-line no-param-reassign
              k.occurrence += 1;
              if (sum) {
                const t = k.sum + parseFloat(x[sum], 10);
                // eslint-disable-next-line no-param-reassign
                k.sum = parseFloat(t, 10);
              }
            }
          });
        } else {
          const a = {};
          a.name = x[key];
          a.occurrence = 1;
          if (sum) {
            const number = parseFloat(x[sum], 10);
            a.sum = +number.toFixed(2);
          }
          arr2.push(a);
        }
      });
      return arr2;
    }
    const labels = [];
    const series = [];

    findKey(results, name, sumName).forEach((item) => {
      labels.push(item.name);
      if (sumName) {
        series.push(item.sum);
      } else {
        series.push(item.occurrence);
      }
    });

    const value = {
      options: {
        labels,
      },
      series,
    };
    return isDev ? (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src="https://assets.bettyblocks.com/042b1bea0a6f497597e858b9a32c82f9_assets/files/pie"
        width={380}
      />
    ) : (
      <Chart
        options={value.options}
        series={value.series}
        type="pie"
        width="380"
      />
    );
  })(),
  styles: () => () => ({
    root: {},
  }),
}))();
