(() => ({
  name: 'Media 3D',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  dependencies: [
    {
      label: 'ReactThreeFiber',
      package: 'npm:@react-three/fiber@8.1.0',
      imports: ['Canvas'],
    },
    {
      label: 'ReactThreeDrei',
      package: 'npm:@react-three/drei@9.74.6',
      imports: ['useGLTF', 'PresentationControls', 'Stage'],
    },
  ],
  jsx: (() => {
    const { env, usePublicFile } = B;
    const isDev = env === 'dev';
    const { modelFileSource, environmentLighting, lockCamera, cameraSpeed } =
      options;
    const {
      ReactThreeFiber: { Canvas },
      ReactThreeDrei: { useGLTF, PresentationControls, Stage },
    } = dependencies;

    const { url: modelSource = '' } = usePublicFile(modelFileSource) || {};

    function ModelPlaceholder() {
      return (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 200 200"
          className={classes.placeholder}
        >
          <g transform="translate(50, 50)">
            <g transform="scale(1) translate(10, 3.8)">
              <path
                fill="rgb(222,222,222)"
                d="M40,46.2 0,23.1 40,0 80,23.1 z"
              />
              <path
                fill="rgb(181,181,181)"
                d="M0,23.1 40,46.2 40,92.4 0,69.3 z"
              />
              <path
                fill="rgb(155,155,155)"
                d="M40,46.2 80,23.1 80,69.3 40,92.4 z"
              />
            </g>
          </g>
        </svg>
      );
    }

    function ModelComponent() {
      const { scene } = useGLTF(modelSource);

      return (
        <Canvas
          dpr={[100, 2]}
          shadows="basic"
          style={{ height: options.height, width: options.width }}
          className={classes.canvas}
        >
          <PresentationControls
            global
            speed={cameraSpeed}
            enabled={!lockCamera}
          >
            <Stage environment={environmentLighting} shadows={false}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <primitive object={scene} />
            </Stage>
          </PresentationControls>
        </Canvas>
      );
    }

    return (
      <div
        className={[classes.outerSpacing, isDev ? classes.devWrapper : ''].join(
          ' ',
        )}
      >
        {isDev ? <ModelPlaceholder /> : <ModelComponent />}
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      canvas: {
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
      },
      devWrapper: {
        display: 'flex',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      placeholder: {
        width: ({ options: { width } }) => width,
        height: ({ options: { height } }) => height,
        maxWidth: ({ options: { width } }) => width,
        maxHeight: ({ options: { height } }) => height,
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
      },
      outerSpacing: {
        width: ({ options: { width } }) => width,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
