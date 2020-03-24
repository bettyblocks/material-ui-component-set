(() => ({
    name: 'Span',
    type: 'SPAN',
    allowedTypes: [],
    orientation: 'VERTICAL',
    jsx: (() => {
      const { Link } = window.MaterialUI.Core;
      const { link, text } = options;
      const isDev = B.env === 'dev';

      const content = (text[0].length === 0 && isDev)
        ? "Empty content"
        : <B.Text value={text} />;
      const typography = link 
        ? <Link href="#">{content}</Link>
        : content;

      return isDev ? <span>{typography}</span> : typography;
    })(),
    styles: () => () => ({}),
  }))();
  