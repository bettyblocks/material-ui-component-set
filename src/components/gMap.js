(() => ({
  name: 'GoogleMap',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'GoogleMap',
      package: 'npm:google-map-react@2.2.0',
      imports: ['*'],
    },
  ],
  jsx: (() => {
    const { env, useText } = B;
    const { GoogleMap } = dependencies;
    const isDev = env === 'dev';
    const { lat, long, markerText, zoom } = options;

    const { default: GoogleMapReact } = GoogleMap;

    const txtLat = parseFloat(useText(lat));
    const txtLong = parseFloat(useText(long));
    const txtZoom = parseFloat(useText(zoom));
    const txtText = useText(markerText);

    function Marker({ text }) {
      return (
        <div
          style={{
            color: 'white',
            background: 'grey',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {text}
        </div>
      );
    }

    const defaultProps = {
      center: {
        lat: txtLat,
        lng: txtLong,
      },
      zoom: txtZoom,
    };

    return isDev ? (
      <div className={classes.root}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker lat={txtLat} lng={txtLong} text={txtText} />
        </GoogleMapReact>
      </div>
    ) : (
      <p>This should be a map, but there is no JSX yet for that</p>
    );
  })(),
  styles: () => () => {
    return {
      root: {
        height: '300px',
        width: '100%',
      },
    };
  },
}))();
