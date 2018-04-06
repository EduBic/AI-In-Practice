
(function(netDrawer, d3) {


    // globla variables
    let mVal = 34;
    let margin = {
        top: mVal, right: mVal,
        bottom: mVal, left: mVal
    };

    let realW = 350,
        realH = 350;

    let w = realW - margin.left - margin.right,
        h = realH - margin.top - margin.bottom;

    // Utilities functions
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let nodes = [];
    let links = [];


    // namespace variables
    let simulation;
    let g;
    let link;
    let node;

    netDrawer.addLink = function(source, target) {
        links.push({ source: source, target: target});
        this.startLinks();
    }

    netDrawer.init = function(svgName, ns = [], ls = []) {
        nodes = ns;
        links = ls;

        console.log("Init network drawer");

        g = d3.select("#" + svgName)
            .attr("width", realW)
            .attr("height", realW)
            .append("g")
            .attr("translate", "transform(" + margin.left + ","
                                            + margin.top + ")");

        simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-40))
            .force("link", d3.forceLink(links))
            .force("y", d3.forceY(realH / 2))
            //.force("x", d3.forceCenterX())
            .force("entities", isolate(
                d3.forceX(realW / 4),
                function(d) { return d.id < 3; }))
            .force("resources", isolate(
                d3.forceX(realW * 3/4),
                function(d) { return d.id >= 3; }))
            //.force("center", d3.forceCenter().x(w/2).y(h/2))
            .alphaTarget(1)
            .on("tick", ticked);

        link = g.append("g")
            // style for link
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
            .selectAll(".link");
        
        node = g.append("g")
            // stle for nodes
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll(".node");
    }

    function isolate(force, filter) {
        let initialize = force.initialize;
        force.initialize = function() { 
            initialize.call(force, nodes.filter(filter)); 
        };
        return force;
    }


    let ticked = function() {
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
        
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }

    netDrawer.startNodes = function() {
        // Apply the general update pattern to the nodes.
        node = node.data(nodes, function(d) { return d.id;});
        node.exit()
            .remove();
        node = node.enter()
            .append("circle")
            .attr("fill", function(d) { 
                if (d.id < 3) {
                    return "#42a4f4";
                } else {
                    return "#41ba43";
                } 
            })
            .attr("r", 8)
            .call(d3.drag()  //Define what to do on drag events
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded))
            .merge(node)
            .attr("id", d => { return d.id; });
        
        // add label to node
        node.append("title")
            .text(function(d) {
                return d.name;
            });
      
        // Update and restart the simulation.
        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();
    }

    netDrawer.startLinks = function() {
        // Apply the general update pattern to the links.
        link = link.data(links, d => { 
            return d.source.id + "-" + d.target.id; 
        });

        link.exit()
            .remove();

        link = link.enter()
          .append("line")
          .merge(link);

        simulation.force("link")
            .links(links);

        simulation.alpha(1)
            .restart();
    }

    function dragStarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragging(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

}(window.netDrawer = window.netDrawer || {}, d3, document));