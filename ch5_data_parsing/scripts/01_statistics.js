const array = [4,2,9,12,6,23, NaN, 9,71,55, undefined, 49];

const objs = [
    {label: "label1", value: 5},
    {label: "label2", value: 3},
    {label: "label3", value: 9}
]

const min_val = d3.min(array);
const min_2 = d3.min(objs, d => d.value);
const min_3 = Math.min(array);
const max_1 = d3.max(array);
const max_2 = d3.max(objs.map(d => d.value));
const extent = d3.extent(array);
const extent_2 = d3.extent(objs, d => d.value)
const sum_1 = d3.sum(array);
const mean = d3.mean(objs, d => d.value);
const median = d3.median(array);
const variance = d3.variance(array)
const sqr_var = Math.sqrt(variance)
const devia = d3.deviation(array)

console.log(min_val);
console.log(min_2);
console.log(min_3);
console.log(max_1);
console.log(max_2);
console.log(extent);
console.log(extent_2);
console.log(sum_1);
console.log(mean);
console.log(median);
console.log(variance);
console.log(sqr_var);
console.log(devia);

const arr_2 = [4,2,9,12,6,23,9,71,55,49];
arr_2.sort((a, b) => a-b);
const quartile25 = d3.quantile(arr_2, .25);
const quartile50 = d3.quantile(arr_2, .5);
const quartile75 = d3.quantile(arr_2, .75)
console.log(arr_2);
console.log(quartile25);
console.log(quartile50);
console.log(quartile75);
console.log(d3.quantile(arr_2, 1)) //71

const arr_3 = [4,2,9,12,6,23,9,71,55,49];
const objs_2 = [{value: 5}, {value: 3}, {value: 9}];
arr_3.sort((a, b) => d3.descending(a, b));
console.log(arr_3);
objs_2.sort((a, b) => d3.ascending(a.value, b.value));
console.log(objs_2);