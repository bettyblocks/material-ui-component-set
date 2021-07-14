(() => ({
  name: 'barChart',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useAllQuery, getProperty, env, useFilter } = B;
    const {
      model,
      property,
      filter,
      amountTooltip,
      sumProperty,
      sumOption,
      barSpacing,
      barWidthInput,
      sumTooltip,
    } = options;
    const isDev = env === 'dev';
    const { name } = getProperty(property) || {};
    const { name: sumName } = getProperty(sumProperty) || {};
    const [results, setResults] = useState([]);
    const where = useFilter(filter);
    const showSumTotal = sumOption ? 'sum' : 'occurrence';

    const { loading, error, data, refetch } =
      model &&
      useAllQuery(model, {
        rawFilter: where,
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

    B.defineFunction('Refetch', () => {
      refetch();
    });

    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Something whent wrong.</div>;
    }

    function findKey(arr, key, sum) {
      const arr2 = [];

      arr.forEach(x => {
        if (arr2.some(val => val.name === x[key])) {
          arr2.forEach(k => {
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

    const Chart = ({ children, height, width }) => (
      <svg
        viewBox={`0 -20 ${width} ${height + 50}`}
        height={height}
        width="auto"
      >
        <line x1="50" y1="300" x2="50" y2="0" style={{ stroke: '#000' }} />
        {children}
      </svg>
    );

    const OnMove = i => {
      const tooltip = document.getElementById(`barText_${i}`);
      tooltip.style.display = 'block';
    };
    const OnLeave = i => {
      const tooltip = document.getElementById(`barText_${i}`);
      tooltip.style.display = 'none';
    };

    const Bar = ({
      fill = '#000',
      x,
      y,
      height,
      width,
      percent,
      index,
      value,
    }) => {
      let text = `${Math.round(percent)}%`;
      if (amountTooltip) {
        text = value.occurrence;
      }
      if (sumTooltip) {
        text = `${value.sum.toFixed(2)}€`;
      }
      return (
        <g>
          <text
            id={`barText_${index}`}
            x={x}
            y={y - 5}
            fill="black"
            className={classes.barText}
          >
            {text}
          </text>
          <rect
            className={classes.bar}
            onMouseMove={() => OnMove(index)}
            onMouseLeave={() => OnLeave(index)}
            fill={fill}
            x={x}
            y={y}
            height={height}
            width={width}
          />
          <text x={x} y="315" transform={`rotate(45, ${x}, 315)`}>
            {value.name}
          </text>
        </g>
      );
    };

    const Line = ({ amount, y }) => (
      <g>
        <line x1="40" y1={y} x2="50" y2={y} style={{ stroke: '#000' }} />
        <text x="0" y={y} dominantBaseline="middle">
          {`${amount}`}
        </text>
      </g>
    );

    function makeScale(value) {
      const content = [];
      content.push(<Line amount="0%" y="300" />);
      const step = 100 / value;
      let amount = 0;
      const ypx = 300 / 4;
      let y = 300;
      for (let index = 0; index < value; index += 1) {
        amount += step;
        y -= ypx;
        content.push(<Line amount={`${amount}%`} y={y} />);
      }
      return content;
    }

    let height;
    function makePScale(value, heightValue) {
      const content = [];
      const h = heightValue.toFixed(2);
      const length = (h.length - 2) / 2;
      const pow = 10 ** length;
      const round = Math.round(h / pow) * pow;
      content.push(<Line amount="0€" y="300" />);
      const step = 100 / value;
      let amount = 0;
      const e = round * (step / 100);
      const ypx = 300 / 4;
      let y = 300;
      for (let index = 0; index < value; index += 1) {
        amount += e;
        y -= ypx;
        content.push(<Line amount={`${Math.round(amount)}€`} y={y} />);
      }
      height = round;
      return content;
    }

    const BarChart = ({ chartData }) => {
      const barWidth = barWidthInput || 35;
      const barMargin = barSpacing || 8;
      const width = chartData.length * (barWidth + barMargin) + 50;
      // const height = greatestValue(chartData.map(item => item[showSumTotal]));
      height = chartData
        .map(item => item[showSumTotal])
        .reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
      const amount = 4;

      return (
        <Chart height={350} width={width}>
          {showSumTotal === 'occurrence'
            ? makeScale(amount)
            : makePScale(amount, height)}
          {chartData.map((item, index) => {
            const percent = (item[showSumTotal] * 100) / height;
            const x = (300 / 100) * percent;
            return (
              <Bar
                index={index}
                key={item.name}
                fill="teal"
                x={index * (barWidth + barMargin) + 55}
                y={300 - x}
                width={barWidth}
                height={x}
                percent={percent}
                value={item}
              />
            );
          })}
        </Chart>
      );
    };

    const tempArray = [
      { name: 'isDev', occurrence: 100, sum: 39.39 },
      { name: 'isDev', occurrence: 100, sum: 93.45 },
    ];

    return isDev ? (
      <div className={classes.wrapper}>
        <BarChart chartData={tempArray} />
      </div>
    ) : (
      <BarChart chartData={findKey(results, name, sumName)} />
    );
  })(),
  styles: () => () => ({
    root: {},
    wrapper: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
    bar: {
      '&:hover': {
        opacity: '0.5',
      },
    },
    barText: {
      fontsize: '12px',
      display: 'none',
    },
  }),
}))();
