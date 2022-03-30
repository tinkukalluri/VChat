// function stars(pass) {
//     str1 = ''
//     len = pass.length
//     console.log(pass.length)
//     while (len--) {
//         str1 += '$'
//     }
//     return str1;
// }
// console.log(stars("tinku kalluri"))

// var arr = [[1, 2], [3, 4], [5, 6]]

// function fun1() {
//     obj = { "name": "tinku", "age": "20" }
//     console.log(obj)
//     for (let n in arr) {
//         console.log(n)
//         console.log(arr[n][0], arr[n][1])
//     }
// }

// fun1()

var maxSpeed = {
    car: 300,
    bike: 60,
    motorbike: 200,
    airplane: 1000,
    helicopter: 400,
    rocket: 8 * 60 * 60
};
var sortable = [];
for (var vehicle in maxSpeed) {
    console.log(vehicle)
    sortable.push([vehicle, maxSpeed[vehicle]]);
}

sortable.sort(function (a, b) {
    return a[1] - b[1];
});

console.log(sortable)
console.log(maxSpeed.car)