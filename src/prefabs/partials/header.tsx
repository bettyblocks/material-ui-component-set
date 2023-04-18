import {
  Icon,
  ThemeColor,
  color,
  font,
  option,
  prefab,
  showIf,
  sizes,
  variable,
} from '@betty-blocks/component-sdk';
import {
  Box,
  Row,
  Column,
  AppBar,
  OpenPageButton,
  rowOptions,
  boxOptions,
  columnOptions,
  appBarOptions,
  openPageButtonOptions,
} from '../structures';

const attrs = {
  icon: Icon.ContainerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'header', 'top menu'],
  description: 'This is a top menu partial.',
};

const outerBoxOptions = { ...boxOptions };
outerBoxOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});

const outerRowOptions = { ...rowOptions };
outerRowOptions.maxRowWidth = option('CUSTOM', {
  label: 'Width',
  value: 'Full',
  configuration: {
    as: 'BUTTONGROUP',
    dataType: 'string',
    allowedInput: [
      { name: 'S', value: 'S' },
      { name: 'M', value: 'M' },
      { name: 'L', value: 'L' },
      { name: 'XL', value: 'XL' },
      { name: 'Full', value: 'Full' },
    ],
  },
});

const outerColOptions = { ...columnOptions };
outerColOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});

const innerBoxOptions = { ...boxOptions };
innerBoxOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});
innerBoxOptions.backgroundColor = color('Background color', {
  value: ThemeColor.PRIMARY,
});

const innerRowOptions = { ...rowOptions };

const innerColOptions = { ...columnOptions };
innerColOptions.innerSpacing = sizes('Inner space', {
  value: ['0rem', '0rem', '0rem', '0rem'],
});

const appbarOptions = { ...appBarOptions };
appbarOptions.font = font('Title text style', { value: 'Body1' });
appbarOptions.title = variable('Title', { value: [''] });
appbarOptions.urlFileSource = variable('Source', {
  value: [
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
  ],
  configuration: {
    placeholder: 'Starts with https:// or http://',
    as: 'MULTILINE',
    condition: showIf('type', 'EQ', 'url'),
  },
});

const firstButtonOptions = { ...openPageButtonOptions };
firstButtonOptions.buttonText = variable('Button text', { value: ['Menu 1'] });
firstButtonOptions.outerSpacing = sizes('Outer space', {
  value: ['0rem', 'M', '0rem', 'M'],
});

const secondButtonOptions = { ...openPageButtonOptions };
secondButtonOptions.buttonText = variable('Button text', { value: ['Menu 2'] });
secondButtonOptions.outerSpacing = sizes('Outer space', {
  value: ['0rem', '0rem', '0rem', 'M'],
});

const buttonStyling = {
  backgroundColor: {
    type: 'STATIC',
    value: 'transparent',
  },
  boxShadow: 'none',
  color: {
    type: 'THEME_COLOR',
    value: 'white',
  },
  fontFamily: 'Roboto',
  fontSize: '0.875rem',
  fontStyle: 'none',
  fontWeight: '400',
  padding: ['0rem', '0rem'],
  textDecoration: 'none',
  textTransform: 'none',
};

export default prefab('Top menu', attrs, undefined, [
  Box({ options: outerBoxOptions }, [
    Row({ options: outerRowOptions }, [
      Column({ options: outerColOptions }, [
        Box({ options: innerBoxOptions }, [
          Row({ options: innerRowOptions }, [
            Column({ options: innerColOptions }, [
              AppBar({ options: appbarOptions }, [
                OpenPageButton({
                  options: firstButtonOptions,
                  style: { overwrite: buttonStyling },
                }),
                OpenPageButton({
                  options: secondButtonOptions,
                  style: { overwrite: buttonStyling },
                }),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
]);
