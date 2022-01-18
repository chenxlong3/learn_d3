const range = d3.range(10);
const range_2 = d3.range(-5,5);
const range_3 = d3.range(-25, 75, 10);
const ticks = d3.ticks(-25, 75, 20);
const ticks_2 = d3.ticks(5, 7.5, 5);
const tick_step = d3.tickStep(5, 7.5, 5);
const tick_inc = d3.tickIncrement(5, 7.5, 5);

console.log(range);
console.log(range_2);
console.log(range_3);
console.log(ticks);
console.log(ticks_2);
console.log(tick_step);
console.log(tick_inc);
