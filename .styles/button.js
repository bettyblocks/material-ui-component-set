"use strict";
// import { styleType, colorValue } from '@betty-blocks/component-sdk';
Object.defineProperty(exports, "__esModule", { value: true });
const basis = {
    // backgroundColor: {
    //   type: 'THEME_COLOR',
    //   value: 'primary',
    // },
    borderColor: {
        type: 'THEME_COLOR',
        value: 'primary',
    },
    borderRadius: ['0.25rem'],
    borderStyle: 'none',
    borderWidth: ['0rem'],
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    color: {
        type: 'THEME_COLOR',
        value: 'white',
    },
    fontFamily: 'Roboto',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 'normal',
    lineHeight: '1',
    padding: ['1.5rem', '1rem', '0.6875rem', '1rem'],
    textDecoration: 'none',
    textTransform: 'uppercase',
};
const states = [
    {
        name: 'disabled',
        cssObject: {
            backgroundColor: {
                type: 'THEME_COLOR',
                value: 'secondary',
            },
        },
    },
];
exports.default = {
    type: 'BUTTON',
    name: 'MyCustomStylo',
    basis,
    states,
};
