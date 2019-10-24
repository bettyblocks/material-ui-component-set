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
  - [Default theme](#default-theme)

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

**Theme**

Adding theme support to your components is a good practice. By doing this you allow the user to change the appearance of all the components used in the application at once. Theming is a safe and predictable way to apply global styling to your application. A theme variable can be applied by using the theme object inside of the styles:

```
{
  heading: {
    color: theme.colors.default
  }
}
```

Use the [default theme](#default-theme) as a reference on which keys you can use.

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
    styles: B => ({
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

[Back to top](#)
