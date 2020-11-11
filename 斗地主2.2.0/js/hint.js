
/*  寻找值为num,花色为color的牌 */
function findPoker(poker,num,color){
    let length=0;
    for(let i=0;i<poker.length;i++){
        if(poker[i].num==num&&poker[i].color==color){
            return ture;
        }
    }
    return false;
}

/*  寻找值为num的牌，并返回牌的数量 */
function findPokerNum(poker,num){
    let length=0;
    for(let i=0;i<poker.length;i++){
        if(poker[i].num==num){
            length++;
        }
    }
    return length;
}

/*  寻找值为num的牌，并返回牌组 */
function findPokerArr(poker,num){
    let arrpoker=[];
    let length=0;
    for(let i=0;i<poker.length;i++){
        if(poker[i].num==num){
            arrpoker[length]={}
            arrpoker[length].num=poker[i].num;
            arrpoker[length].color=poker[i].color;
            length++;
        }
    }
    return arrpoker;
}

/* 寻找值为num的牌是否在顺子之中 */
function findPokerNumIsStraight(poker,num){
    let flag={status:false,min:0,length:0,rlength:0};
    for(let i=num;i<13;i++){
        if(findPokerNum(poker,i)>0){
            flag.length++;
            flag.rlength++;
        }else{
            break;
        }
    }
    for(let i=num-1;i>0;i--){
        if(findPokerNum(poker,i)>0){
            flag.length++;
        }else{
            flag.min=i;
            break;
        }
    }
    if(flag.length>=5){
        flag.status=true;
    }
    return flag;
}


/*寻找大于value的所有单张手牌*/
function findOnePoker(poker,minvalue){
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==1&&!findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==2&&findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
            i=i-1;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3&&findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
            i=i-2;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==2&&!findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
            i=i-1;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3&&!findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
            i=i-2;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==1&&findPokerNumIsStraight(poker,poker[i].num).status){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
        }
    }
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num==14&&poker[i].color==1){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
        }
    }
    return temparr;
}


/*寻找大于value的所有双张手牌*/
function findDoublePoker(poker,minvalue){
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>0;i--){
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==2){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            index++;
            i=i-1;
        }
    }
    for(let i=poker.length-1;i>0;i--){
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            index++;
            i=i-2;
        }
    }
    
    return temparr;
}

/*寻找大于value的所有三张手牌*/
function findSanzhangPoker(poker,minvalue){
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>1;i--){
       
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            temparr[index][2] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            temparr[index][2].num = arrpoker[2].num;
            temparr[index][2].color = arrpoker[2].color;
            index++;
            i=i-2;
        }
    }
    return temparr;
}
function findBomb(poker,minvalue){
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>1;i--){
       
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==4){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            temparr[index][2] ={};
            temparr[index][3] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            temparr[index][2].num = arrpoker[2].num;
            temparr[index][2].color = arrpoker[2].color;
            temparr[index][3].num = arrpoker[3].num;
            temparr[index][3].color = arrpoker[3].color;
            index++;
            i=i-3;
        }
    }
    return temparr;
}

function removePoker(poker,num,color){
    let flag=-1;
    for(let i=0;i<poker.length;i++){
        if(poker[i].num==num&&poker[i].color==color){
            flag=i;
            break;
        }
    }
    console.log(flag);
    for(let i=flag;i<poker.length;i++){
        if(i!=poker.length-1){
           poker[i].num=poker[i+1].num;
           poker[i].color=poker[i+1].color; 
        }else{
            poker.pop();
        }
    }
    return poker;
}

function getPoker(poker){
    let temp=[];
    for(let i=0;i<poker.length;i++){
        temp[i]={};
        temp[i].num=poker[i].num;
        temp[i].color=poker[i].color; 
    }
    return temp;
}

function findSDY(poker1,minvalue){
    poker=getPoker(poker1);
    let temparr=[]
    let index=0;
    let flag=false;
    for(let i=poker.length-1;i>1;i--){
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            temparr[index][2] ={};
            temparr[index][3] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            temparr[index][2].num = arrpoker[2].num;
            temparr[index][2].color = arrpoker[2].color;
            poker=removePoker(poker,arrpoker[0].num,arrpoker[0].color)
            poker=removePoker(poker,arrpoker[1].num,arrpoker[1].color)
            poker=removePoker(poker,arrpoker[2].num,arrpoker[2].color)
            for(let j=poker.length-1;j>=0;j--){
                if(findPokerNum(poker,poker[j].num)>=1&&findPokerNum(poker,poker[j].num)<4){
                    temparr[index][3].num = poker[j].num;
                    temparr[index][3].color = poker[j].color;
                    flag=true;
                    break;
                }
            }
            if(flag==true){
              index++; 
            } 
            i=i-2;
        }
        poker=getPoker(poker1);
    }
    return temparr;
}
function findSZ(poker,minvalue,length){
    console.log(minvalue+""+length)
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>1;i--){
        temparr[index] = [];
        if(poker[i].num>(minvalue-length+1)&&findPokerNumIsStraight(poker,poker[i].num).rlength>=length){
            for(let j=0;j<length;j++){
                temparr[index][j] ={};
                let arrpoker=findPokerArr(poker,poker[i].num*1+j);
                temparr[index][j].num = arrpoker[0].num;
                temparr[index][j].color = arrpoker[0].color;
            }
            console.log(temparr[index])
            return temparr;
        }
    }
    return temparr;
}

function findSDE(poker1,minvalue){
    poker=getPoker(poker1);
    let temparr=[]
    let index=0;
    let flag=false;
    for(let i=poker.length-1;i>1;i--){
        if(poker[i].num>minvalue&&findPokerNum(poker,poker[i].num)==3){
            temparr[index] = [];
            temparr[index][0] ={};
            temparr[index][1] ={};
            temparr[index][2] ={};
            temparr[index][3] ={};
            temparr[index][4] ={};
            let arrpoker=findPokerArr(poker,poker[i].num);
            temparr[index][0].num = arrpoker[0].num;
            temparr[index][0].color = arrpoker[0].color;
            temparr[index][1].num = arrpoker[1].num;
            temparr[index][1].color = arrpoker[1].color;
            temparr[index][2].num = arrpoker[2].num;
            temparr[index][2].color = arrpoker[2].color;
            poker=removePoker(poker,arrpoker[0].num,arrpoker[0].color)
            poker=removePoker(poker,arrpoker[1].num,arrpoker[1].color)
            poker=removePoker(poker,arrpoker[2].num,arrpoker[2].color)
            for(let j=poker.length-1;j>=0;j--){
                if(findPokerNum(poker,poker[j].num)>=2&&findPokerNum(poker,poker[j].num)<4&&poker[j].num!=14){
                    temparr[index][3].num = poker[j].num;
                    temparr[index][3].color = poker[j].color;
                    temparr[index][4].num = poker[j-1].num;
                    temparr[index][4].color = poker[j-1].color;
                    flag=true;
                    break;
                }
            }
            if(flag==true){
              index++; 
            } 
            i=i-2;
        }
        poker=getPoker(poker1);
    }
    return temparr;
}
