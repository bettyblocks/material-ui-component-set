(() => ({
  name: 'detailViewVerticalChild',
  type: 'STEP_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { property } = options;
    const { Property, getProperty } = B;
    const { kind, name } = getProperty(property) || {};
    const emptyProperty = property.id === '' || property === '';
    const { data } = parent || {};

    const Value = () => {
      if (emptyProperty) {
        return 'value';
      }
      if (kind === 'email_address') {
        return (
          <a href={`mailto:${data && data[name]}`}>
            <Property id={property} />
          </a>
        );
      }
      return <Property id={property} />;
    };

    return (
      <tr className={classes.parent}>
        <td className={classes.firstElement}>
          {emptyProperty ? 'label' : name}
        </td>
        <td>
          <Value />
        </td>
      </tr>
    );
  })(),
  styles: () => () => ({
    parent: {
      '& td': {
        paddingBottom: 16,
        color: '#3E4356',
      },
    },
    firstElement: {
      paddingRight: 24,
      textAlign: 'right',
      color: '#878C9C !important',
    },
  }),
}))();
