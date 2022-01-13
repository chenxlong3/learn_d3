// d3.select("div")
// .append("div").text("Two")
// .append("div").text("Three")
// .append("div").text("Four");

d3.select("div")
.selectAll("div")
.data(["Two", "Three", "Four"])
.enter()
.append("div").text(d => d);