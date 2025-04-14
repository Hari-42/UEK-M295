function doubling(number, callback){
    let result = number * 2;
    callback(result);
}

doubling(2, function(result){
    console.log(result);
});