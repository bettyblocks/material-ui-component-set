(() => ({
  name: 'pieChart',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useAllQuery, getProperty, env, useFilter } = B;
    const {
      model,
      property,
      index: indexLayout,
      tooltip: tooltiponhover,
      filter,
      width,
      percentageInTooltip,
      sumProperty,
      sumTotal,
    } = options;
    const isDev = env === 'dev';
    const { name } = getProperty(property) || {};
    const { name: sumName } = getProperty(sumProperty) || {};
    const [results, setResults] = useState([]);
    const [wheel, setWheel] = useState(false);
    const where = useFilter(filter);
    const showSumTotal = sumName ? 'sum' : 'occurrence';

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

    B.defineFunction('Spin', () => setWheel(!wheel));
    function spin() {
      const svg = document.querySelector('svg');
      let rotate = 0;
      const interval = setInterval(() => {
        rotate += 0.1;
        svg.style.transform = `rotate(${rotate}rad)`;
      }, 10);
      return () => clearInterval(interval);
    }
    useEffect(() => {
      if (!isDev && wheel) {
        spin();
      }
    }, [wheel]);

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

    const ToolTip = () => (
      <div id="tooltip" className={classes.tooltip}>
        <p id="text" className={classes.tooltiptext}>
          tooltip
        </p>
      </div>
    );

    const OnMove = (x, y, value, color, percent) => {
      const tooltip = document.getElementById('tooltip');
      const tooltiptext = document.getElementById('text');

      let text = value.occurrence;
      if (sumTotal) {
        text = `€${value.sum.toFixed(2)}`;
      }
      if (percentageInTooltip) {
        text = `${Math.round(percent)}%`;
      }
      tooltiptext.textContent = `${value.name}: ${text}`;
      tooltiptext.style.backgroundColor = color;
      tooltip.style.left = `${x - 50}px`;
      tooltip.style.top = `${y - 60}px`;
      tooltip.style.display = 'block';
    };
    const OnLeave = () => {
      const tooltip = document.getElementById('tooltip');
      tooltip.style.display = 'none';
    };

    let totalAngleP = 0;
    const Slice = props => {
      const {
        angle,
        rotate,
        radius,
        value,
        color,
        index,
        percent,
        diameter,
        ...rest
      } = props;
      const r = radius;
      const dx = r * Math.sin(angle);
      const dy = r * (1 - Math.cos(angle));

      totalAngleP += angle * 0.5;
      const deg = totalAngleP * (180 / Math.PI);
      const rad = (Math.PI * deg) / 180;
      const mX = radius * 0.7 * Math.cos(rad) + radius;
      const mY = radius * 0.7 * Math.sin(rad) + radius;
      totalAngleP += angle * 0.5;

      let text = value.occurrence;
      if (sumTotal) {
        text = `€${value.sum.toFixed(2)}`;
      }
      if (percentageInTooltip) {
        text = `${Math.round(percent)}%`;
      }

      return (
        <g>
          <g
            onMouseMove={e =>
              tooltiponhover &&
              OnMove(e.clientX, e.clientY, value, color, percent)
            }
            onMouseLeave={() => OnLeave()}
            className={classes.slice}
          >
            <path {...rest} d={`M${r} ${r}V0a${r} ${r} 0 0 1 ${dx} ${dy}z`} />
            <text x={mX} y={mY} textAnchor="middle" dominantBaseline="middle">
              {text}
            </text>
          </g>
          {indexLayout && !wheel && (
            <g>
              <circle
                cx={diameter + 50}
                cy={`${index * 25 + 20}`}
                r="8"
                fill={color}
              />
              <text x={diameter + 66} y={`${index * 25 + 23}`} fill="black">
                {value.name}
              </text>
            </g>
          )}
        </g>
      );
    };

    let totalAngle = 0;
    const Spacing = props => {
      const { radius, angle } = props;
      totalAngle += angle;
      const deg = totalAngle * (180 / Math.PI);
      const rad = (Math.PI * deg) / 180;
      const mX = radius * Math.cos(rad);
      const mY = radius * Math.sin(rad);
      return (
        <path
          stroke="#fff"
          strokeWidth="2"
          d={`M${radius} ${radius} l${mX} ${mY}`}
        />
      );
    };

    const PieChart = props => {
      const { arrayData, radius } = props;
      const total = arrayData.reduce((a, b) => a + b[showSumTotal], 0);
      const diameter = 2 * radius;

      let rotate = 0.5 * Math.PI;

      return (
        <>
          <ToolTip />
          <svg width={diameter + 150} height={diameter}>
            {arrayData.map((value, i) => {
              const angle = (2 * Math.PI * value[showSumTotal]) / total;
              const percent = (value[showSumTotal] * 100) / total;

              const fill = `hsl(${70 * i}, 100%, 50%)`;
              const transform = `rotate(${rotate}rad)`;
              const transformOrigin = `${radius}px ${radius}px`;

              rotate += angle;

              return (
                <Slice
                  angle={angle}
                  rotate={rotate}
                  radius={radius}
                  style={{ fill, transform, transformOrigin }}
                  value={value}
                  color={fill}
                  index={i}
                  percent={percent}
                  diameter={diameter}
                />
              );
            })}
            {arrayData.map(value => {
              const angle = (2 * Math.PI * value[showSumTotal]) / total;
              rotate += angle;

              return <Spacing angle={angle} radius={radius} />;
            })}
          </svg>
        </>
      );
    };

    PieChart.defaultProps = {
      radius: width,
    };

    const tempArray = [
      { name: 'Todo', occurrence: 14, sum: 39.66 },
      { name: 'Onhold', occurrence: 55, sum: 523.87 },
      { name: 'Inprogress', occurrence: 80, sum: 896.4 },
      { name: 'Testing', occurrence: 34, sum: 150.37 },
      { name: 'Done', occurrence: 77, sum: 931.9 },
    ];

    return isDev ? (
      <div className={classes.wrapper}>
        <PieChart arrayData={tempArray} />
      </div>
    ) : (
      <div>
        <PieChart arrayData={findKey(results, name, sumName)} />
      </div>
    );
  })(),
  styles: () => () => ({
    root: {},
    tooltip: {
      position: 'fixed',
      display: 'none',
      height: 0,
    },
    tooltiptext: {
      color: '#fff',
      textAlign: 'center',
      width: 'fit-content',
      padding: 8,
      borderRadius: 5,
      margin: 0,
    },
    slice: {
      '&:hover path': {
        opacity: 0.5,
      },
    },
    wrapper: {
      '& > *': {
        pointerEvents: 'none',
      },
      width: '100%',
      height: ({ options: { width } }) => `${width * 2}px`,
    },
  }),
}))();
