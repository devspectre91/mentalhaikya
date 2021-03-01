const squares= squared(25);


function squared(num){
    let arr=[];
    for(let i=1; i<=num; i++){
       let obj={};
       obj.value=i;
       obj.square=i*i;
       arr.push(obj);
    }    
    return arr;
}

