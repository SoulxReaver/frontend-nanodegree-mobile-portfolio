## Website Performance Optimization portfolio project

### Getting started

#### Webpage

https://soulxreaver.github.io/

### The Build

The project uses gulp tasks to minify CSS, HTML, images and JS files.

#### Install Gulp
npm install -g gulp

#### Install packages
npm i

#### Publish changes
gulp
the build package will be in dist folder.

#### Run

Open dist/index.html to load page speed 
Open dist/view/pizza.html to check the pizza frame rate page

### Part 1: Optimize PageSpeed Insights score for index.html

Goals

index.html achieves a PageSpeed score of at least 90 for Mobile and Desktop

optimizations made to views/js/main.js make views/pizza.html render with a consistent frame-rate at 60fps when scrolling

time to resize pizzas is less than 5ms using the pizza slider on the views/pizza.html page. Resize time is shown in the browser developer tools



### Optimizations
### Part 1: PageSpeed Insights score of > 90 for index.html

inline css for google fonts and style.css
inline js/perfmatters.js 
Add the HTML media="print" attribute to the external style sheet link for print styles.
Add the HTML async attribute to all script tags
Use Gulp task compress to minify HTML,CSS, uglify js.
Use Gulp task imagemin to compress image.
resize pizzeria.jpg to 270x203px

### Part 2: Optimize pizza for frame-rate

#### Before

function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }

All the pizza are the same width so it only needs to calculated once
#### After

  var randomPizzaContainerElements = document.querySelectorAll(".randomPizzaContainer");
  var dx = determineDx(randomPizzaContainerElements[0], size);
  var newwidth = (randomPizzaContainerElements[0].offsetWidth + dx) + 'px';
  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    for (var i = 0; i < randomPizzaContainerElements.length; i++) {
      randomPizzaContainerElements[i].style.width = newwidth;
    }
  }

#### Before
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

We only need to calculate 5 different phases for 100 pizza
#### After

function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  var phases = [];
  for (var i = 0; i < 5; i++) {
    phases.push(Math.sin((document.body.scrollTop / 1250) + (i % 5))); 
  }
  
  for (var i = 0; i < items.length; i++) {
    items[i].style.left = items[i].basicLeft + 100 * phases[i % 5] + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

#### Before 
  for (var i = 0; i < 200; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }

#### After 

// cache DOM element used in for loop
  var movingPizzas = document.getElementById('movingPizzas1');

  // declare elem in for loop initializer to prevent recreation
  for (var i = 0, elem; i < screen.height / s * cols; i++) {
    elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas.appendChild(elem);
  }

## Final Result

Part 1: PageSpeed Insights 

Mobile: 91/100 Desktop 94/100

Part 2: fps

Time To generate pizzas on load: 7.975000000000001ms
Average scripting time to generate last 10 frames: 0.17250000000349247ms
Time to resize pizzas: 0.72999999999ms
