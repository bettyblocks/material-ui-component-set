(() => ({
  name: 'detailViewVerticalChild',
  type: 'DETAIL_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { property, label } = options;
    const { Property, getProperty, useText } = B;
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

    const Label = () => {
      if (useText(label).length !== 0) {
        return useText(label);
      }
      if (name) {
        return name;
      }
      return 'label';
    };

    return (
      <tr className={classes.parent}>
        <td className={classes.firstElement}>
          <Label />
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
