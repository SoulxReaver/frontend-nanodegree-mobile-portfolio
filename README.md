## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

#### Part 1: Optimize PageSpeed Insights score for index.html

Goals

index.html achieves a PageSpeed score of at least 90 for Mobile and Desktop

optimizations made to views/js/main.js make views/pizza.html render with a consistent frame-rate at 60fps when scrolling

time to resize pizzas is less than 5ms using the pizza slider on the views/pizza.html page. Resize time is shown in the browser developer tools

### The Build

The project uses gulp tasks to minify CSS, HTML, images and JS files.

####Install Gulp
npm install -g gulp

####Install packages
npm i

#### Publish changes
gulp

###Optimizations
####Part 1: PageSpeed Insights score of > 90 for index.html

Add the HTML media="print" attribute to the external style sheet link for print styles.
Add the HTML async attribute to all script tags
Use Gulp task to minify HTML,CSS.
Use Gulp task to uglify JS
Use Gulp task to compress image.

####Part 2

