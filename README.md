# Product review for DrEd.com

> Product review for DrEd.com built in AngularJS

[![Build Status](https://travis-ci.org/andreasonny83/product-review-dr-ed.svg?branch=master)](https://travis-ci.org/andreasonny83/product-review-dr-ed)

Demo version available [here][demo]

## Installation

[Download the latest release][release_link] of this project or Git clone this
repository on your machine with:

```sh
git clone https://github.com/andreasonny83/product-review-dr-ed.git
```

### Project Dependencies

To build and run this project in your local machine you need to have
[Node](https://nodejs.org/en/),
[NPM](https://www.npmjs.org/) and
[Gulp](https://github.com/gulpjs/gulp/).

Install all the `npm` and `Bower` dependencies with:

```sh
npm Install && bower install
```

## Running the app

To run the project in your browser, open a terminal window, reach your local
directory for this project, then run:

```sh
npm start
```

This will render the application in your browser and will watch over your
file changes.

## Development

Keep running `gulp serve` in your terminal while developing new code to make
sure your browser stays up to date with your file changes.

Once done, build your production version with

```sh
gulp build
```

## Gulp tasks

`serve` :     Render a debug version of your project in your browser and
              start watching over file changes.

`build` :       Build a distribution version of the website in a
                `dist` folder.

`test` :        Runt the automated tests

## Tests

To run all the automated tests, simply run:

```sh
npm test
```

## License

MIT © [Andrea Sonny](https://andreasonny.mit-license.org/@2016)

[release_link]: https://github.com/andreasonny83/product-review-dr-ed/releases/latest
[demo]: http://product-review.sonnywebdesign.com/?product=Malaria-tablets
