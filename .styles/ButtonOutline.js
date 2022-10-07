"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.states = exports.basis = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.basis = {
    backgroundColor: component_sdk_1.themeColor('primary'),
    borderColor: component_sdk_1.themeColor('primary'),
    borderRadius: ['0.25rem'],
    borderStyle: 'none',
    borderWidth: ['0rem'],
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    color: component_sdk_1.themeColor('white'),
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
exports.states = {
    disabled: {
        backgroundColor: component_sdk_1.themeColor('secondary'),
        color: component_sdk_1.staticColor('#ff00ff'),
    },
};
exports.default = component_sdk_1.style('Button', {
    name: 'outline',
    basis: exports.basis,
    states: exports.states,
});
