(() => ({
  name: 'Chart',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'Recharts',
      package: 'npm:recharts@2.1.14',
      imports: [
        'LineChart',
        'Line',
        'XAxis',
        'YAxis',
        'CartesianGrid',
        'Tooltip',
        'Legend',
        'ResponsiveContainer',
      ],
    },
  ],
  jsx: (() => {
    const { env } = B;
    const { Recharts } = dependencies;
    const isDev = env === 'dev';
    const { chartType } = options;

    console.log('heb ik een bundle?', Recharts);

    // if (!Recharts) {
    //   return (
    //     <div>
    //       <div style={{ border: '3px solid red' }}>Loading dependencies</div>
    //     </div>
    //   );
    // }

    const {
      BarChart,
      Bar,
      LineChart,
      Line,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
    } = Recharts;

    const data = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

    const LineChartContent = (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );

    const BarChartContent = (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );

    const ChartContent =
      chartType === 'line' ? LineChartContent : BarChartContent;

    return isDev ? (
      <div className={classes.root}>
        <ResponsiveContainer width="100%" height="100%">
          {ChartContent}
        </ResponsiveContainer>
      </div>
    ) : (
      <p>Hello world</p>
    );
  })(),
  styles: (B) => (theme) => {
    return {
      root: {
        height: '100%',
      },
    };
  },
}))();
