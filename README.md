[![Build Status](https://travis-ci.org/bettyblocks/material-ui-component-set.svg?branch=master)](https://travis-ci.org/bettyblocks/material-ui-component-set)

# A Betty Blocks Component Toolkit

This is a component set for the [page builder](https://blog.bettyblocks.com/webinar-page-builder-part-1) of the [Betty Blocks](https://www.bettyblocks.com) platform based on [Material-UI](https://material-ui.com).

## Usage

This repository contains both the component set and the required Material-UI library. You must load this dependency into your application before you can use the component set.

If the Material-UI dependency is not yet installed in your application do this, clone this repository and run:

`$ yarn bundle`

This generates a `bundle.js` file in the `dist` folder containing the Material-UI library. When it's finished, follow the next tutorial to upload this file to your bettyblocks application.

https://github.com/bettyblocks/cli/wiki/Tutorial:-Use-libraries#uploading-the-dependency-to-the-betty-blocks-asset-store

Now you can get started with the component set in your application. Use the following link to learn how to use the component set.

https://github.com/bettyblocks/cli/wiki/Usage#start-the-development-server

## Our workflow

1.  Let your us know what you are working on by creating a JIRA ticket via our Techsupport department.

2.  Branch from `acceptance`.

    ```bash
    $ git checkout acceptance
    $ git pull
    $ git checkout -b feat/a-summary-of-your-ticket-{STORY-ID}
    ```

3.  Work on your feature.

4.  When you're confident about your work, submit a pull request to `edge` and assign it to one of the reviewers. You can comment on your techsupport ticket in Jira **"In review"** and provide the link to the pull request. 

    - If there are conflicts, do not merge `edge` into your branch, you can try merging `acceptance` in your branch and else contact techsupport.

5. Once the ticket is in review our tech department will either give you feedback to make changes or it will be added to the sprint of a team so that the feature can go through our testing process. 

6.  Once testing is complete, the techsupport ticket will be promoted to ready for acceptance and you can create a pull request to `acceptance`.

7.  When your work is merged into `acceptance`, you can assume that it will be released with the next release.

## Commit messages

Commit messages should be descriptive in what kind of problem it solves or feature it implements.
Like `fix: this solves this bug` or `feat: implemented this feature`

Further guidelines about git messages are available here: https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional