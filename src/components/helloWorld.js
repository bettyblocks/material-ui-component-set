(() => ({
  name: 'HelloWorld',
  type: 'ROW',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionId } = options;
    const { useAction } = B;

    const [name, setName] = useState('');

    const [mutation] = useAction(actionId, {
      onCompleted: data => {
        console.log(data);

        B.triggerEvent('OnActionSuccess', data.actionb5);
      },
    });

    return (
      <div>
        <h1>Hello World</h1>
        <input
          type="text"
          value={name}
          onChange={({ target: { value } }) => {
            setName(value);
          }}
        />
        <br />
        <button
          onClick={() => {
            mutation({
              variables: {
                input: { name },
              },
            });
          }}
        >
          Submit
        </button>
      </div>
    );

    return (
      <h1
        onClick={() => {
          mutation();
        }}
      >
        Hello World!
      </h1>
    );
  })(),
  styles: () => () => ({}),
}))();
