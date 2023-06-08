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
    const { modelFileSource } = options;
    const {
      ReactThreeFiber: { Canvas },
      ReactThreeDrei: { useGLTF, PresentationControls, Stage },
    } = dependencies;

    const { url: modelSource = '' } = usePublicFile(modelFileSource) || {};

    function ModelPlaceholder() {
      return (
        <svg className={classes.placeholder}>
          <rect x="19.5" y="8.5" rx="2" />
          <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
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
        >
          {/* eslint-disable-next-line react/no-unknown-property */}
          <color attach="background" args={[options.backgroundColor]} />
          <PresentationControls
            global
            speed={0.4}
            // polar={[0.1, Math.PI / 4]}
            enabled
          >
            <Stage environment="studio" shadows={false}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <primitive scale={0.3} object={scene} />
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
      devWrapper: {
        display: 'flex',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      placeholder: {
        maxHeight: '100%',
        '& rect': {
          stroke: '#AFB5C8',
          fill: '#F7F8FA',
          width: 47,
          height: 30,
        },
        '& > path': {
          fill: '#666D85',
        },
        width: ({ options: { width } }) => width,
        height: ({ options: { height } }) => height,
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
