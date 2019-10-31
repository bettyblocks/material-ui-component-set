[![Build Status](https://travis-ci.org/bettyblocks/component-set.svg?branch=acceptance)](https://travis-ci.org/bettyblocks/component-set)

# Betty Blocks Component Toolkit

- [Introduction](#introduction)
  - [What is the Component Toolkit?](#what-is-the-component-toolkit%3F)
  - [Core concepts](#core-concepts)
- [Building](#building)
  - [CLI Installation](#cli-installation)
  - [Setting up a Component Set](#setting-up-a-component-set)
  - [Building your first component](#building-your-first-component)
  - [Use your components inside the Page Builder](#use-your-components-inside-the-page-builder)
- [API Docs](#api-docs)
- [Attachments](#attachments)

## Introduction

Betty Blocks is a no-code platform for business users. Not using Betty Blocks yet? No worries: Read more about using the Betty Blocks platform at our website [https://www.bettyblocks.com](https://www.bettyblocks.com).

### What is the Component Toolkit?

At first, the Component Toolkit was used internally by Betty Blocks to build components for the [Page Builder](https://docs.bettyblocks.com/en/articles/998115-what-is-the-page-builder). We want the Page Builder to be flexible easy to use. The Component Toolkit gives developers a framework to build components which directly integrate with the platform.

### Core concepts

A component is essentially just a JavaScript object with configuration. Betty Blocks uses this configuration to render components. Before you start building components, there are five core concepts you should grasp:

**JSX**

The component's markup is written using JSX ([what is JSX?](https://facebook.github.io/jsx)) syntax. This allows you to use HTML tags and implement custom behavior using JavaScript. A component showing a heading will look like this in JSX:

```
<div>
  <h1>Hello World</h1>
</div>
```

We can add logic between brackets (`{}`) to conditionally render the title:

```
<div>
  <h1>{1 === 1 ? "Hello World" : "Foo bar"}</h1>
</div>
```

For a more in-depth guide on how to use JSX, you can check out the [React documentation](https://reactjs.org/docs/introducing-jsx.html).

**Styles**

Building components without styling is boring; fortunately you can safely style your components using the component styles. If you're familiar with CSS ([https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)) you've probably encountered issues with scoping. To make sure component styles don't interfere with each other, they are scoped to component-level. The following example will spice up the heading with some color:

```
{
  heading: {
    color: "#E9004C"
  }
}
```

The keys we define in our styles object will be translated to classes which you can use inside of the JSX:

```
<div>
  <h1 className={classes.heading}>Hello World</h1>
</div>
```

If you'd like to read more about what you can do with styles, see the [JSS documentation](https://cssinjs.org/jss-syntax).

**Options**

Sometimes you want parts of your components to be configurable by the no-code developer. You can leverage the Betty Blocks platform by using the options. The options will be visible in the Page Builder on component selection, and can be used to configure all sorts of things. When building a heading component, it makes sense to make the text configurable:

```
{
  label: "Heading text",
  key: "text",
  value: "Hello World",
  type: TEXT
}
```

The option will be shown as a text input in the Page Builder, allowing the no-code developer to override the `value`. The output of the option can be used in the JSX by accessing the options object:

```
<div>
  <h1>{options.text}</h1>
</div>
```

You can also use the `value` of your options inside the styles. For example, allow the no-code developer to select a heading color:

```
{
  label: "Heading color",
  key: "color",
  value: "#E9004C",
  type: COLOR
}
```

```
{
  heading: {
    color: ({ options }) => options.color
  }
}
```

Read more about which kind of options you can use [insert_link_here].

**Component API**

We allow integrating components with core features of the Betty Blocks platform (like Endpoints, Webservices and Models) through usage of the Component API.

```
{
  label: "Link to an endpoint",
  key: "linkTo",
  value: null,
  type: ENDPOINT
}
```

Use an option of type `ENDPOINT` to render a link to one of your other endpoints:

```
<div>
  <B.Link to={options.linkTo}>Link to a page</B.Link>
</div>
```

Read more about how and when to use the Component API [insert_link_here].

## Building

### CLI Installation

```
yarn add @betty-blocks/component-toolkit
```

### Setting up a Component Set

```
$ component-toolkit create-component-set --name='Hello World' [options]
```

### Building your first component

// @TODO: Step by step guide

**Example component**

```
(function Component() {
  return {
    name: 'Heading',
    type: HEADING,
    allowedTypes: [],
    orientation: HORIZONTAL,
    jsx: (
      <div>
        <h1 className={classes.heading}>
          {options.text}
        </h1>
      </div>
    ),
    styles: B => theme => ({
      heading: {
        color: "#E9004C"
      }
    })
  }
})();
```

**Example prefab**

```
(function Prefab() {
  return {
    name: 'Hello World',
    icon: HEADING_ICON,
    category: CONTENT,
    structure: [
      {
        component: 'Heading',
        options: [
          {
            label: "Heading text",
            key: "text",
            value: "Hello World",
            type: TEXT
          }
        ],
        descendants: []
      }
    ]
  }
})();
```

### Use your components inside the Page Builder

## API Docs

// @TODO: Link to generated typedocs

## Attachments

### Default theme

```
const defaultTheme = {
  colors: {
    primary: '#3F51B5',
    secondary: '#90a4ae',
    success: '#8bc34a',
    info: '#90caf9',
    warning: '#ff9800',
    danger: '#f44336',
    black: '#000',
    white: '#fff',
    dark: '#4D4D4D',
    medium: '#999999',
    light: '#CCCCCC',
    accent1: '#d8d8d8',
    accent2: '#828282',
    accent3: '#666666',
  },
  typography: {
    title1: {
      color: '#000000',
      desktopSize: '6rem',
      tabletLandscapeSize: '6.625rem',
      tabletPortraitSize: '4.6875rem',
      mobileSize: '3.5625rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '300',
      letterSpacing: 'normal',
    },
    title2: {
      color: '#000000',
      desktopSize: '3.75rem',
      tabletLandscapeSize: '3.25rem',
      tabletPortraitSize: '3.25rem',
      mobileSize: '2.4375rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '300',
      letterSpacing: 'normal',
    },
    title3: {
      color: '#000000',
      desktopSize: '3rem',
      tabletLandscapeSize: '2.75rem',
      tabletPortraitSize: '2.5rem',
      mobileSize: '1.6875rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    title4: {
      color: '#000000',
      desktopSize: '2.125rem',
      tabletLandscapeSize: '1.625rem',
      tabletPortraitSize: '1.625rem',
      mobileSize: '1.25rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    title5: {
      color: '#000000',
      desktopSize: '1.5rem',
      tabletLandscapeSize: '1.375rem',
      tabletPortraitSize: '1.25rem',
      mobileSize: '1.125rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    title6: {
      color: '#000000',
      desktopSize: '1.25rem',
      tabletLandscapeSize: '1.125rem',
      tabletPortraitSize: '1.125rem',
      mobileSize: '1rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '500',
      letterSpacing: 'normal',
    },
    subtitle1: {
      color: '#000000',
      desktopSize: '1rem',
      tabletLandscapeSize: '1rem',
      tabletPortraitSize: '1rem',
      mobileSize: '0.875rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    subtitle2: {
      color: '#000000',
      desktopSize: '0.875rem',
      tabletLandscapeSize: '0.875rem',
      tabletPortraitSize: '0.875rem',
      mobileSize: '0.75rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '500',
      letterSpacing: 'normal',
    },
    body1: {
      color: '#000000',
      desktopSize: '1rem',
      tabletLandscapeSize: '1rem',
      tabletPortraitSize: '1rem',
      mobileSize: '0.875rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    body2: {
      color: '#000000',
      desktopSize: '0.875rem',
      tabletLandscapeSize: '0.875rem',
      tabletPortraitSize: '0.875rem',
      mobileSize: '0.75rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    caption1: {
      color: '#000000',
      desktopSize: '0.75rem',
      tabletLandscapeSize: '0.75rem',
      tabletPortraitSize: '0.75rem',
      mobileSize: '0.75rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    caption2: {
      color: '#000000',
      desktopSize: '0.625rem',
      tabletLandscapeSize: '0.625rem',
      tabletPortraitSize: '0.625rem',
      mobileSize: '0.625rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'inherit',
      fontWeight: '400',
      letterSpacing: 'normal',
    },
    button: {
      color: '#ffffff',
      desktopSize: '0.875rem',
      tabletLandscapeSize: '0.875rem',
      tabletPortraitSize: '0.875rem',
      mobileSize: '0.875rem',
      fontFamily: 'Roboto, sans-serif',
      textTransform: 'uppercase',
      fontWeight: '500',
      letterSpacing: 'normal',
    },
  },
  icons: {
    iconSmall: '2.125rem',
    iconMedium: '3rem',
    iconLarge: '3.75rem',
    iconXLarge: '6rem',
  },
  borders: {
    borderSize: {
      small: '0.0625rem',
      medium: '0.125rem',
      large: '0.25rem',
      xLarge: '0.5rem',
    },
    borderRadius: {
      small: '0.0625rem',
      medium: '0.125rem',
      large: '0.25rem',
      xLarge: '0.5rem',
    },
  },
  spacing: {
    small: {
      desktopSpacing: '0.5rem',
      tabletLandscapeSpacing: '0.5rem',
      tabletPortraitSpacing: '0.25rem',
      mobileSpacing: '0.25rem',
    },
    medium: {
      desktopSpacing: '1rem',
      tabletLandscapeSpacing: '1rem',
      tabletPortraitSpacing: '0.5rem',
      mobileSpacing: '0.5rem',
    },
    large: {
      desktopSpacing: '1.5rem',
      tabletLandscapeSpacing: '1.5rem',
      tabletPortraitSpacing: '1rem',
      mobileSpacing: '1rem',
    },
    xLarge: {
      desktopSpacing: '2rem',
      tabletLandscapeSpacing: '2rem',
      tabletPortraitSpacing: '1.5rem',
      mobileSpacing: '1.5rem',
    },
  },
};
```

[Back to top](#)
