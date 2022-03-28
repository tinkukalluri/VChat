function stars(pass) {
    str1 = ''
    len = pass.length
    console.log(pass.length)
    while (len--) {
        str1 += '$'
    }
    return str1;
}
console.log(stars("tinku kalluri"))