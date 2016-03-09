// data
var json = {
	name: 'localhost',
	children: [
		{
			name: 'Visual Basic',
			children: [
				{
					name: 'VB Array Tutorial',
					href: 'file:///localhost:3000/programming/tutorials/vbarrays.htm'
				},
				{
					name: 'VB 6.0 Code Bank',
					href: 'file:///localhost:3000/programming/tutorials/vb6codebank.htm'
				},
				{
					name: 'VB 6.0 Example Archive',
					href: 'file:///localhost:3000/programming/vb6examples.htm'
				},
			]
		},
		{
			name: 'Games',
			children: [
				{
					name: 'Scrolling Text Time Waster',
					href: 'file:///localhost:3000/misc/scrollingtext/timewaster.php'
				},
				{
					name: 'Snake',
					href: 'file:///localhost:3000/games/snake/'
				},
				{
					name: 'Slider Puzzles',
					href: 'file:///localhost:3000/games/sliderpuzzles/'
				}
			]
		},
		{
			name: 'Apps',
			children: [
				{
					name: 'Gradient Image Generator',
					href: 'file:///localhost:3000/gradient-image-generator/'
				},
				{
					name: 'Image to Color Palette Generator',
					href: 'file:///localhost:3000/color-palette-generator/'
				},
				{
					name: 'Keyboard Layout Analyzer',
					href: 'file:///localhost:3000/keyboard-layout-analyzer/'
				},
				{
					name: 'Text Color Fader',
					href: 'file:///localhost:3000/text-color-fader/'
				},
				{
					name: 'Text to ASCII Art Generator',
					href: 'file:///localhost:3000/software/taag/'
				},
				{
					name: 'Typing Speed Test',
					href: 'file:///localhost:3000/typing-speed-test/'
				},
				{
					name: 'Social Media Showdown',
					href: 'file:///localhost:3000/showdown/'
				},
				{
					name: 'Years Spent Watching YouTube',
					href: 'file:///localhost:3000/years-spent-watching-youtube/'
				}
			]
		},
		{
			name: 'Visualizations',
			children: [
				{
					name: 'Computer Science Salaries',
					href: 'file:///localhost:3000/vis/computer-science-salaries/'
				},
				{
					name: 'Game of Thrones Appearences',
					href: 'file:///localhost:3000/vis/chaos-ladder/'
				},
				{
					name: 'Nutrition Calculator',
					href: 'file:///localhost:3000/vis/nutrition-calculator/'
				},
				{
					name: 'Space Dust',
					href: 'file:///localhost:3000/vis/space-dust/'
				}
			]
		},
		{
			name: 'Blogs',
			children: [
				{
					name: 'Cracking MaGuS\'s Fate Zero Encryption',
					href: 'file:///localhost:3000/blog/2012/05/03/cracking-magus-fate-zero-encryption/'
				},
				{
					name: 'Pronouncing SQL: S-Q-L or Sequal?',
					href: 'file:///localhost:3000/blog/2012/01/26/pronouncing-sql-s-q-l-or-sequel/'
				},
				{
					name: 'Was Mark Zuckerberg an AOL add-on developer?',
					href: 'file:///localhost:3000/blog/2013/04/09/was-mark-zuckerberg-an-aol-add-on-developer/'
				},
				{
					name: 'TheDraw\'s Lost ANSI Art Fonts',
					href: 'file:///localhost:3000/blog/2014/01/22/thedraws-lost-ansi-art-fonts/'
				},
				{
					name: 'Linux Test',
					href: 'file:///localhost:3000/blog/2011/11/28/testing-your-linux-skills/'
				},
				{
					name: 'Distance Your Fingers Move While Typing',
					href: 'file:///localhost:3000/blog/2009/07/12/typing-distance/'
				}
			]
		},
		{
			name: 'Miscellaneous',
			children: [
				{
					name: 'About Pat',
					href: 'file:///localhost:3000/blog/about/'
				},
				{
					name: 'Arial ASCII Art',
					href: 'file:///localhost:3000/arial-ascii-art/'
				},
				{
					name: '179 Ways to Annoy People',
					href: 'file:///localhost:3000/misc/chainletters/179waystoannoypeople.htm'
				},
				{
					name: '90\'s Photomosaics',
					href: 'file:///localhost:3000/software/mosaicer/mosaics.htm'
				}
			]
		},
		{
			name: 'Social',
			children: [
				{
					name: 'Blog',
					href: 'file:///localhost:3000/blog/'
				},
				{
					name: 'Flickr',
					href: 'https://www.flickr.com/'
				},
				{
					name: 'Github',
					href: 'https://github.com/ssolt1'
				},
				{
					name: 'Instagram',
					href: 'https://www.instagram.com/
				},
				{
					name: 'Twitter',
					href: 'https://twitter.com'
				},
				{
					name: '500px',
					href: 'https://500px.com'
				}
			]
		}
	]
};

var tTime = 2000;
if (localStorage && Date.now) {
	var lastVisit = localStorage.getItem('lastVisit') || 0;
	var timeElapsed = Date.now() - lastVisit;

	console.log('-');
	console.log(lastVisit);
	console.log(timeElapsed);

	if ( timeElapsed < 30000 ) {
		tTime = 0;
	}

	localStorage.setItem('lastVisit', Date.now());
}

// vis
var w = 1200,
	h = 800,
	rx = w / 2,
	ry = h / 2,
	m0,
	rotate = 0;

var cluster = d3.layout.cluster()
	.size([360, ry - 120])
	.sort(null);

var diagonal = d3.svg.diagonal.radial()
	.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("#vis").append("div")
	.style("width", w + "px")
	.style("height", h + 120 + "px")
	.style('margin', '0 auto');

var vis = svg.append("svg:svg")
	.attr("width", w)
	.attr("height", h + 90)
	.append("svg:g")
		.attr("transform", "translate(" + rx + "," + (ry+40) + ")");

vis.append("svg:path")
	.attr("class", "arc")
	.attr('d', d3.svg.arc().innerRadius(1).outerRadius(1).startAngle(0).endAngle(2 * Math.PI))
	.transition()
		.delay(0)
		.duration(tTime)
		.attr("d", d3.svg.arc().innerRadius(ry - 120).outerRadius(ry).startAngle(0).endAngle(2 * Math.PI));

// extra paths
for (var ii = 0; ii < 10; ii++) {
	vis.append("svg:path")
		.attr("class", "arc")
		.attr('d', d3.svg.arc().innerRadius(1).outerRadius(1).startAngle(0).endAngle(2 * Math.PI))
		.style('fill-opacity', 1 - (0.1 * (ii+1)))
		.transition()
			.delay(0)
			.duration(tTime)
			.attr("d", d3.svg.arc().innerRadius(ry + ((ii+0)*4)).outerRadius(ry + ((ii+1)*4)).startAngle(0).endAngle(2 * Math.PI));
}

var nodes = cluster.nodes(json);

var link = vis.selectAll("path.link")
	.data(cluster.links(nodes))
	.enter().append("svg:path")
		.attr("class", "link")
		.attr('d', d3.svg.diagonal.radial().projection(function(d) { return [0, 0 / 180 * Math.PI]; }))
		.transition()
			.duration(tTime)
			.attr("d", diagonal);

var node = vis.selectAll("g.node")
	.data(nodes)
	.enter().append("svg:g")
		.attr("class", "node")
		.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + 0 + ")"; })
		.style('opacity', 0);

node
	.transition()
		.duration(tTime)
		.style('opacity', 1)
		.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

node.append("svg:circle")
	.attr("r", 3);

node.append("svg:text")
	.attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
	.attr("dy", ".31em")
	.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
	.text(function(d) {
		return d.name;
	})
	.on('mouseenter', function(d) {
		if (d.children) return;
		d3.select(this).classed('textHover', true);
	})
	.on('mouseleave',function() {
		d3.select(this).classed('textHover', false);
	})
	.on('click', function(d) {
		if (!d.href) return;
		window.location = d.href;
	});
