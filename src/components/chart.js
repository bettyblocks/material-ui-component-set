(() => ({
  name: 'chart',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATASET'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { filter, modelId, chartType } = options;
    const { GetAll, Children } = B;
    const labelProperty = B.getProperty(options.labelProperty);

    const { Chart } = window.Chart;
    const isDev = B.env === 'dev';

    function create_UUID() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
      );
      return uuid;
    }

    const ChartCanvas = props => {
      const chartRef = useRef(null);
      useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');
        new Chart(myChartRef, {
          type: chartType,
          data: {
            //Bring in data
            labels: props.labels,
            datasets: props.dataSets,
          },
          options: {
            //Customize chart options
            legend: { display: props.showLegend },
          },
        });
      });
      return (
        <div>
          <canvas ref={chartRef}></canvas>
        </div>
      );
    };

    const devCanvas = () => {
      let dataProperties = useRef([]);
      const [data, setData] = useState([]);
      const addProp = newProp => {
        const index = dataProperties.current
          .map(e => e.uuid)
          .indexOf(newProp.uuid);
        if (index == -1) {
          dataProperties.current.push(newProp);
        } else {
          dataProperties.current[index] = newProp;
        }
        setData([
          ...dataProperties.current.map(setItem => {
            return {
              label: setItem.label,
              borderColor: setItem.borderColor,
              backgroundColor: setItem.backgroundColor,
              data: Array.from({ length: options.take }, () =>
                Math.floor(Math.random() * 40),
              ),
            };
          }),
        ]);
      };
      const isEmpty = children.length === 0;
      const isPristine = isEmpty && B.env === 'dev';

      const dataLabels = Array.from(
        { length: options.take },
        () => 'label prop',
      );

      return (
        <div>
          <div
            className={[
              classes.root,
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
              !isEmpty ? classes.dataSets : '',
            ].join(' ')}
          >
            <Children uuid={create_UUID()} addProp={addProp}>
              {children}
            </Children>
            {isPristine ? 'Drag some data sets in here' : ''}
          </div>
          <ChartCanvas showLegend={false} labels={dataLabels} dataSets={data} />
        </div>
      );
    };

    const prodCanvas = () => {
      let dataProperties = useRef([]);
      const addProp = newProp => {
        dataProperties.current.push(newProp);
      };

      if (!modelId || !labelProperty) {
        return devCanvas();
      }
      return (
        <div>
          <div className={classes.hidden}>
            <Children addProp={addProp}>{children}</Children>
          </div>
          <GetAll
            modelId={modelId}
            filter={filter}
            skip={0}
            take={options.take}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <span>Loading...</span>;
              }

              if (error) {
                return <span>Something went wrong: {error.message} :(</span>;
              }

              const { totalCount, results } = data;
              const labels = results.map(item => {
                return item[labelProperty.name];
              });
              const dataSets = dataProperties.current.map(setItem => {
                return {
                  label: setItem.label,
                  borderColor: setItem.borderColor,
                  backgroundColor: setItem.backgroundColor,
                  data: results.map(item => {
                    return item[setItem.name];
                  }),
                };
              });
              return (
                <ChartCanvas
                  showLegend={true}
                  labels={labels}
                  dataSets={dataSets}
                />
              );
            }}
          </GetAll>
        </div>
      );
    };

    return isDev ? devCanvas() : prodCanvas();
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {
        color: '#eb4034',
      },
      dataSets: {
        color: '#eb4034',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      hidden: {
        display: 'none',
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '5px',
        width: '100%',
        color: '#262A3A',
        boxSizing: 'border-box',
        marginBottom: '5px',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
