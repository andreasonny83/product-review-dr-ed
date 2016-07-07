# Product review for DrEd.com

> Product review for DrEd.com built in AngularJS

## Installation

[Download the latest release][release_link] of this project or Git clone this
repository on your machine with:

```sh
git clone https://github.com/andreasonny83/dred-product-review.git
```

### Project Dependencies

To build and run this project in your local machine you need to have
[Node](https://nodejs.org/en/),
[NPM](https://www.npmjs.org/) and
[Gulp](https://github.com/gulpjs/gulp/).

Install all the `npm` dependencies with:

```sh
npm Install
```

## Running the app

To run the project in your browser, open a terminal window, reach your local
directory for this project, then run:

```sh
gulp serve
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

`versionify` :  Update your `package.json` version number.

`serveDist` :   Build a distribution version of the website in a `dist` and
                render it a browser.

## Tests

To run all the automated tests, simply run:

```sh
npm test
```

This will trigger your default browser to open as the test task is done,
displaying an html report.

## License

MIT © [Andrea Sonny](https://andreasonny.mit-license.org/@2016)

[release_link]: https://github.com/andreasonny83/dred-product-review/releases/latest
