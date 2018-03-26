
// namespace treeDrawer
(function(treeDrawer, d3) {

    var width = 500,
        height = 500;

    function onPanZoom() {
        d3.select("g#treeG")
            .attr("transform",
                "translate(" + d3.event.transform.x +"," 
                            + d3.event.transform.y + ")")
    }


    var svg = d3.select("#tree-svg")
          .attr("width", width)
          .attr("height", height)
          .call(d3.zoom().on("zoom", onPanZoom));

    var tree = d3.tree()
        .size([width, height]);


    treeDrawer.drawTree = function(rawData) {

        document.getElementById("console").innerHTML = "ciao";

        // reset prev. tree
        d3.select("g#treeG")
            .remove()
        
        var treeGroup = svg.append("g")
                            .attr("id", "treeG");
        
        var root = d3.hierarchy(rawData);
        var nodes = root.descendants();
        var links = tree(root).links();
        
        treeGroup.selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkVertical()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; }))
        
        // take all g.node DOM elements
        // bind with nodes variable
        // if nodes > g.node then 
        //    (enter) append g.node elements
        
        treeGroup.selectAll("g.node")
            .data(nodes)
            .enter() // if lack g.node elements
            // add this:
            .append("g")
            .attr("class", "node")
            // we move the g elem for move circle with label
            .attr("transform", d => {
                return "translate(" + d.x + "," 
                                    + d.y + ")";
            })
            // and to g add this
            .append("circle")
            .attr("r", 4)
            
        // Add label for each g.node
        d3.selectAll("g.node")
            .append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {
                return d.data.id; 
            });
    }

}(window.treeDrawer = window.treeDrawer || {}, d3, document));


/**
 * Summary for namespace:
 *
 *  var privateVar = ...
 *
 *  function privateFun() { ... }
 *
 * 
 *  namespace.publicVar = ...
 *
 *  namespace.publicFun = function( ) { ... }
 * 
 */

