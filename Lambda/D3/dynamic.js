(function () {
 
  angular.module('public')
  .controller('D3collisiondetectionController', D3collisiondetectionController)
  .directive('d3CollisionDetection', d3CollisionDetectionDirective);
 
 
  function d3CollisionDetectionDirective() {
    var ddo =  {
        controller: D3collisiondetectionController,
        controllerAs: 'ctrl',
        template: '<div id="collision-detection" class="d3-directive"></div>'
        };
 
    return ddo;
  }
 
 
 
  D3collisiondetectionController.$inject = ['d3Factory'];
  function D3collisiondetectionController(d3Promise) {
    console.log('D3collisiondetectionController instantiated');
 
 
    d3Promise.d3().then(function() {
      console.log('D3collisiondetectionController d3 promise returned');
 
      /*----------------------------------------------------------------------------------
       * primary animation drawing function
       *----------------------------------------------------------------------------------*/
       function draw() {
 
         d3.select("#collision-detection").select("svg").remove();
 
         var element = d3.select('#collision-detection').node(),
             width = element.getBoundingClientRect().width,
             height = element.getBoundingClientRect().height;
 
         var nodes = d3.range(300).map(function() { return {radius: Math.random() * 12 + 4}; }),
             root = nodes[0],
             color = d3.scale.category20b();
 
         var force = d3.layout.force()
             .gravity(0.05)
             .charge(function(d, i) { return i ? 0 : -2000; })
             .nodes(nodes)
             .size([width, height]);
 
         var svg = d3.select("#collision-detection").append("svg")
             .attr("width", width)
             .attr("height", height);
 
 
         root.radius = 0;
         root.fixed = true;
         force.start();
 
         svg.selectAll("circle")
             .data(nodes.slice(1))
           .enter().append("circle")
             .attr("r", function(d) { return d.radius; })
             .style("fill", function(d, i) { return color(i % 3); });
 
         force.on("tick", function(e) {
           var q = d3.geom.quadtree(nodes),
               i = 0,
               n = nodes.length;
 
           while (++i < n) q.visit(collide(nodes[i]));
 
           svg.selectAll("circle")
               .attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; });
         });
 
         svg.on("mousemove", mousemove);
 
         function mousemove() {
 
           var p1 = d3.mouse(this);
           root.px = p1[0];
           root.py = p1[1];
           force.resume();
 
         }
 
         function collide(node) {
           var r = node.radius + 16,
               nx1 = node.x - r,
               nx2 = node.x + r,
               ny1 = node.y - r,
               ny2 = node.y + r;
           return function(quad, x1, y1, x2, y2) {
             if (quad.point && (quad.point !== node)) {
               var x = node.x - quad.point.x,
                   y = node.y - quad.point.y,
                   l = Math.sqrt(x * x + y * y),
                   r = node.radius + quad.point.radius;
               if (l < r) {
                 l = (l - r) / l * .5;
                 node.x -= x *= l;
                 node.y -= y *= l;
                 quad.point.x += x;
                 quad.point.y += y;
               }
             }
             return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
           };
         }
       }  /* --------------------------- draw() ----------------------------------------------------------*/
 
       /* --------------------------- Responsive behavior ------------------------------------*/
       function resizeChart () {
         console.log('D3collisiondetectionController.resizeChart()');
         draw();
       }
       if (document.addEventListener) {
           window.addEventListener('resize', resizeChart);
       }
       else if (document.attachEvent) {
           window.attachEvent('onresize', resizeChart);
       }
       else {
           window.resize = resizeChart;
       }
       /* --------------------------- Responsive behavior ------------------------------------*/
 
       /* invoke the draw function */
       draw();
 
    });
 
 
  }  /* D3collisiondetectionController */
 
})();