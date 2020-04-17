(() => ({
  name: 'Recaptcha',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const isDev = B.env === 'dev';
        const isReady = () =>
          typeof window !== 'undefined' &&
          typeof window.grecaptcha !== 'undefined' &&
          typeof window.grecaptcha.ready;

        const [validated, setValidated] = useState(false);
        const [ready, setReady] = useState(isReady());
        const [widget, setWidget] = useState(null);
        const element = useRef(null);
        let readyCheck;

        const updateReadyState = () => {
          if (isReady()) {
            setReady(true);
            clearInterval(readyCheck);
          }
        };

        useEffect(() => {
          if (ready && element.current && !widget && options.sitekey) {
            setWidget(
              window.grecaptcha.render(element.current, {
                sitekey: options.sitekey,
                callback: () => {
                  setValidated(true);
                },
              }),
            );
          }
        }, [ready, element.current]);

        useEffect(() => {
          if (!ready) {
            readyCheck = setInterval(updateReadyState, 1000);
          }
        }, []);

        useEffect(() => {
          const script = document.createElement('script');
          script.src =
            'https://www.google.com/recaptcha/api.js?render=explicit';
          script.async = true;
          script.defer = true;

          document.body.appendChild(script);

          return () => {
            document.body.removeChild(script);
          };
        }, []);

        useEffect(
          () => () => {
            if (readyCheck) {
              clearInterval(readyCheck);
            }

            if (widget) {
              window.grecaptcha.reset(widget);
            }
          },
          [],
        );

        useEffect(() => {
          B.defineFunction('NoRobot', event => {
            if (!validated) {
              event.preventDefault();
            }
          });
        }, [validated]);

        return (
          <div className={classes.root} ref={element}>
            {isDev ? 'Recaptcha' : null}
          </div>
        );
      })()}
    </div>
  ),
  styles: () => () => ({}),
}))();
