const ml = require("ml-regression");
// import SLR from "ml-regression"
const SLR = ml.SLR;

let x = [0,1,2,3,4,5,6,7,8,9]; 
let y = [23,22,434,543,766,565,334,33,454,245]; 

const res = new SLR(x,y);
console.log('res',res);
console.log('slope',res.slope);
console.log('intercept:',res.intercept);
console.log('coefficients::',res.coefficients);
console.log('res',res.toString(3));