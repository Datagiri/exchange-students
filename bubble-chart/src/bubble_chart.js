
function bubbleChart() {
  // Constants for sizing
  var width = 600;
  var height = 800;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 100);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var progCenters = {
    "Bachelors": { x: width / 5,     y: height / 2 },
    "DD":        { x: 2 * width / 5,     y: height / 2 },
    "Masters":   { x: 3 * width / 5,     y: height / 2 },
    "Postgrad":  { x: 4 * width / 5,     y: height / 2 },
  };

  var deptCenters = {
    "EE": { x: width / 5,         y: height / 4 },
    "ME": { x: 2 * width / 5,     y: height / 4 },
    "CE": { x: 3 * width / 5,     y: height / 4 },
    "EN": { x: 4 * width / 5,     y: height / 4 },
    "CL": { x: width / 5,         y: 2 * height / 4 },
    "AE": { x: 2 * width / 5,     y: 2 * height / 4 },
    "MG": { x: 3 * width / 5,     y: 2 * height / 4 },
    "CS": { x: 4 * width / 5,     y: 2 * height / 4 },
    "MM": { x: width / 5,         y: 3 * height / 4 },
    "PH": { x: 2 * width / 5,     y: 3 * height / 4 },
    "IDC": { x: 3 * width / 5,    y: 3 * height / 4 },
    "BS": { x: 4 * width / 5,     y: 3 * height / 4 },
    "HS": { x: 4 * width / 5,     y: 3 * height / 4 },
    "CH": { x: 4 * width / 5,     y: 3 * height / 4 },
    "SC": { x: 4 * width / 5,     y: 3 * height / 4 },
    "CESE": { x: 4 * width / 5,  y: 3 * height / 4 },
  };


  // locations of the prog titles.
  var progTitle = {
    "Bachelors":    { x: width / 5 - 60,         y: height / 2 + 40},
    "Dual Degree":  { x: 2 * width / 5 - 5,      y: height / 2 + 40},
    "Masters":      { x: 3 * width / 5 + 45,     y: height / 2 + 40},
    "PhD":          { x: 4 * width / 5 + 50,     y: height / 2 + 40},
  };


  // locations of the dept titles.
  var deptTitle = {
    "Electrical":         { x: 1 * width / 5 - 40,    y: 1 * height / 4 - 120},
    "Mechanical":         { x: 2 * width / 5 - 5,     y: 1 * height / 4 - 120},
    "Chemical":           { x: 3 * width / 5 + 15,    y: 1 * height / 4 - 120},
    "Energy":             { x: 4 * width / 5 + 30,    y: 1 * height / 4 - 120},
    "Civil":              { x: 1 * width / 5 - 40,    y: 2 * height / 4 - 50},
    "Aerospace":          { x: 2 * width / 5 - 5,     y: 2 * height / 4 - 50},
    "Management":         { x: 3 * width / 5 + 15,    y: 2 * height / 4 - 50},
    "Comp. Science":      { x: 4 * width / 5 + 30,    y: 2 * height / 4 - 50},
    "Metallurgy":         { x: 1 * width / 5 - 40,    y: 3 * height / 4 - 40},
    "Physics":            { x: 2 * width / 5 - 5,     y: 3 * height / 4 - 40},
    "Design":             { x: 3 * width / 5 + 15,    y: 3 * height / 4 - 40},
    "Other":              { x: 4 * width / 5 + 30,    y: 3 * height / 4 - 40},
  };

  // Used when setting up force and
  // moving around nodes
  var damper = 0.112;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  // Charge is negative because we want nodes to repel.
  // Dividing by 8 scales down the charge to be
  // appropriate for the visualization dimensions.
  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }

  // Here we create a force layout and
  // configure it to use the charge function
  // from above. This also sets some contants
  // to specify how the force layout should behave.
  // More configuration is done below.
  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);


  // Nice looking colors
  var fillColor = d3.scale.ordinal()
    .domain(["EE", "ME", "CE", "EN", "CL", "AE", "MG ", "CS", "MM", "PH", "IDC", "BS", "HS", "CH", "SC", "CESE"])
    // .range(['#1F78B4', '#33A02C', '#E31A1C', '#FF7F00', '#6A3D9A', '#B15928', '#A6CEE3', '#B2DF8A', '#FB9A99', '#FDBF6F', '#CAB2D6', '#FFFF99', '#FFFF99', '#FFFF99', '#FFFF99', '#FFFF99']);
    .range(['#8DD3C7', '#FFFFB3', '#BEBADA', '#FB8072', '#80B1D3', '#FDB462', '#C3EE79', '#FCCDE5', '#D9D9D9', '#BC80BD', '#CCEBC5', '#FFED6F', '#FFED6F', '#FFED6F', '#FFED6F', '#FFED6F']);


  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 60]);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: 2.5 * radiusScale(+d.count) / 3,
        value: d.count,
        name: d.dept,
        sem: d.sem,
        group: d.deptcode,
        prog: d.program,
        deg: d.degree,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // Use the max numstud in the data as the max in the scale's domain
    // note we have to ensure the numstud is a number by converting it
    // with `+`.
    var maxAmount = d3.max(rawData, function (d) { return +d.count; }) + 25;
    radiusScale.domain([0, maxAmount]);

    nodes = createNodes(rawData);
    // Set the force's nodes to our newly created nodes array.
    force.nodes(nodes);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    // Set initial layout to single group.
    groupBubbles();
  };





  function groupBubbles() {
    hideLabels();

    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }
  function splitBubbles(displayName) {
    hideLabels();

    if(displayName === 'prog') { 
      showProgs();
      force.on('tick', function (e) {
        bubbles.each(moveToProg(e.alpha))
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
      });
    }
    else if(displayName === 'dept'){ 
      showDepts();
      force.on('tick', function (e) {
        bubbles.each(moveToDept(e.alpha))
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
      });
    }

    force.start();
  }





  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }
  function moveToProg(alpha) {
    return function (d) {
      var target = progCenters[d.prog];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
    };
  }
  function moveToDept(alpha) {
    return function (d) {
      var target = deptCenters[d.group];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
    };
  }



  function hideLabels() {
    svg.selectAll('.prog').remove();
    svg.selectAll('.dept').remove();
  }



  function showProgs() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var progsData = d3.keys(progTitle);
    var progs = svg.selectAll('.prog')
      .data(progsData);

    progs.enter().append('text')
      .attr('class', 'prog')
      .attr('x', function (d) { return progTitle[d].x; })
      .attr('y', function (d) { return progTitle[d].y - 200; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function showDepts() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var deptData = d3.keys(deptTitle);
    var depts = svg.selectAll('.dept')
      .data(deptData);

    depts.enter().append('text')
      .attr('class', 'dept')
      .attr('x', function (d) { return deptTitle[d].x; })
      .attr('y', function (d) { return deptTitle[d].y; })
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span>' +
                  d.name +
                  '</span><br/>' +
                  '<span>' +
                  d.deg +
                  '</span><br/>' +
                  '<span> Number of students: ' +
                  d.value +
                  '</span>';
    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }



  chart.toggleDisplay = function (displayName) {
    if (displayName === 'all') {
      groupBubbles();
    } else {
      splitBubbles(displayName);
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/dept-prog-summary.csv', display);

// setup the buttons.
setupButtons();
