const ml = require("ml-regression");
// import SLR from "ml-regression"
const SLR = ml.SLR;

let x = [0,1,2,3,4,5,6,7,8,9]; 
let y = [23,22,434,543,766,565,334,33,454,245]; 

const res = new SLR(x,y);
console.log('res',res);


//计算移动平均数
const moveAverage =(arr,num)=>{
    if(Array.isArray(arr)&&!isNaN(num)){
        num=Number(num);
        const len = arr.length;
        if(len>0&&num>1&&len>num){
            const res = arr.map((item,index)=>{
                if(num%2==1){
                    const offset =Math.ceil(num-1)/2;
                    if(index>=offset){
                        return average(arr.slice(index-offset,index+offset+1))
                    }else{
                        return average(arr.slice(0,index+offset))
                    }
                }else{
                    const left =Math.ceil((num-1)/2);
                    const right =Math.ceil((num-1)/2);
                    if(index>=left){
                        return average(arr.slice(index-left,index+right))
                    }else{
                        return average(arr.slice(0,index+right))
                    }
                }
            
            })
            return res;
        }else{
            console.log('参数设定有误：参数arr数组长度必须大于num');
            return [];
        }
    }else{
        console.log('参数有误：参数arr不是数组或num不是数字');
        return [];
    }

    function average(arr){
        var sum=0;
        for(let i = 0; i < arr.length; i++){
            sum += arr[i];
        }
        return Math.round((sum / arr.length)*100)/100;
    }
   
}

console.log('1:',moveAverage([1,2,3,4,5,6,7,8,9,10],2));
console.log('2:',moveAverage([1,2,3,4,5,6,7,8,9,10],3));
console.log('3:',moveAverage([1,2,3,4,5,6,7,8,9,10],5));
console.log('4:',moveAverage([1,2,3,4,5,6,7,8,9,10],8));