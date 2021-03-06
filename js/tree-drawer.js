
/**
 * namespace treeDrawer 
 * works only if exist an <svg> tag into page
 * with id="tree-svg"
 */
(function(treeDrawer, d3) {

    // global setting for svg
    // https://bl.ocks.org/mbostock/3019563
    let margin = {
        top: 20, right: 20, // for labels 
        bottom: 20, left: 20
    };

    let realW = 500,
        realH = 500;

    let width = realW - margin.left - margin.right,
        height = realH - margin.top - margin.bottom;

    function onPanZoom() {
        d3.select("g#treeG")
            .attr("transform",
                "translate(" + d3.event.transform.x +"," 
                            + d3.event.transform.y + ")")
    }


    var svg = d3.select("#tree-svg")
          .attr("width", realW)
          .attr("height", realH)
          .call(d3.zoom().on("zoom", onPanZoom));

    var tree = d3.tree()
        .size([width, height]);

    // Build graph in real time
    treeDrawer.testGraph = function() {
        treeDrawer.nextNode({ id: 1});
        treeDrawer.addChild({ id: 2});
        treeDrawer.addChild({ id: 6});
        treeDrawer.nextNode({ id: 2});
        treeDrawer.addChild({ id: 3});
        treeDrawer.addChild({ id: 7});
        treeDrawer.nextNode({ id: 7});
        treeDrawer.addChild({ id: 8});
    };


    var realTimeGraph = {};
    var currentNode = undefined;
        
    treeDrawer.addChild = function(node) {
        currentNode.children = currentNode.children || [];
        currentNode.children.push(node);
    
        //console.log(realTimeGraph);
        treeDrawer.drawTree(realTimeGraph);
    };
        
    treeDrawer.nextNode = function(node) {
        if (currentNode == undefined) {
            realTimeGraph = node;
        }
        currentNode = node;
        console.log("update pointer", currentNode);
    };

    treeDrawer.drawTree = function(rawData) {
        //document.getElementById("console").innerHTML = "ciao";

        // reset prev. tree
        d3.select("g#treeG")
            .remove()
        
        var treeGroup = svg.append("g")
                            .attr("id", "treeG")
                            .attr("transform", "translate(" + 
                                margin.left + "," +
                                margin.top + ")");
        
        var root = d3.hierarchy(rawData);
        var nodes = root.descendants();
        var links = tree(root).links();
        
        /*treeGroup.selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkVertical()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; }))*/

        treeGroup.selectAll("g.link")
            .data(links)
            .enter()
            .append("g")
            .attr("class", "link")
            .append("path")
            .attr("d", d3.linkVertical()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; }));
        
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

        d3.selectAll("g.link")
            .append("text")
            .attr('x', d => { 
                return (d.source.x + d.target.x) / 2 + (d.source.x < d.target.x ? 8 : -8); 
            })
            .attr('y', d => { 
                return (d.source.y + d.target.y) / 2; 
            })
			.text(d => {
                if (d.source.data.links != undefined) {
                    let link = d.source.data.links.filter(link => {
                        return link.id === d.target.data.id;
                    })[0];
                    
                    return link.cost;
                } else {
                    return "";
                }
            });	
    };

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

