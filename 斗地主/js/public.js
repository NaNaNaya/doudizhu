// 生成牌面HTML代码的函数
function makePoker(poker) {
    console.log(poker)
    // {num:1 ,color: 3}
    // 普通花色的坐标数据
    let color = [
        { x: 0, y: 0 },       // 方块花色的坐标
        { x: -156, y: -0 },       // 梅花花色的坐标
        { x: -0, y: -252 },       // 红桃花色的坐标
        { x: -156, y: -252 },       // 黑桃花色的坐标
    ];
    let x, y;

    if (poker.num != 14) {
        x = color[poker.color].x
        y = color[poker.color].y
    } else {
        if (poker.color == 0) {
            x = -156;
            y = 0;
        } else {
            x = 0;
            y = 0;
        }
    }

    return '<li data-num="'+poker.num+'" data-color="'+poker.color+'" style="width: 150px; height: 228px; border:1px solid #9e9e9e; border-radius: 10px; background: url(./images/'+poker.num+'.jpg) '+x+'px '+y+'px;"></li>';
}

// 牌组数据排序函数
function sortPoker(poker_data) {

    poker_data.sort((x, y) => {
        if (x.num != y.num) {
            return y.num - x.num    // 如果点不同的话就按点数来排序
        } else {
            return y.color - x.color  // 如果点相同的话就按花色来的排序
        }
    });

    //return poker_data;
}

// 检查牌组的函数
/* 
    牌型分类：
    1       单张
    2       对子
    3       三张
    4       普炸
    5       三带一
    6       顺子
    7       三带二
    8       连对
    9       四带二张
    10      四带两对
    11      两飞不带翅膀
    12      两飞带单翅膀
    13      两飞带双翅膀
    14      三飞不带翅膀
    15      三飞带单翅膀
    16      三飞带双翅膀
    17      四飞不带翅膀
    18      四飞带单翅膀
    19      四飞带双翅膀
    20      五飞不带翅膀
    21      五飞带单翅膀
    22      六飞不带翅膀
    666     王炸
*/
function checkPoker(data) {
    // 为了方便牌型判断需要先把选中的牌组数据进行排序
    sortPoker(data.poker);

    let length = data.poker.length;       // 用于分析牌组的张数

    switch (length) {
        // 判断一张牌的情况
        case 1:
            data.type = 1;          // 设置当前选择牌的牌型
            // 判断是否为大小王
            if (data.poker[0].num == 14) {
                if (data.poker[0].color == 0) {
                    data.max = 14;
                } else {
                    data.max = 15;
                }
            } else {
                data.max = data.poker[0].num;
            }

            return true;        // 符合规则返回true
            break;

        // 判断两张牌的情况
        case 2:
            if (data.poker[0].num != data.poker[1].num) {
                return false;
            } else {
                // 判断是否为王炸
                if (data.poker[0].num == 14) {
                    data.type = 666;        // 设置牌型为王炸
                    data.max = 14;
                } else {
                    data.type = 2;          // 设置型为对子
                    data.max = data.poker[0].num;
                }
                return true;
            }
            break;

        // 判断三张牌的情况
        case 3:
            if (data.poker[0].num == data.poker[2].num) {
                data.type = 3;      // 设置牌型为3张
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断四张牌的情况
        case 4:
            if (data.poker[0].num == data.poker[3].num) {
                data.type = 4;      // 设置牌型为普通炸弹
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            } else if (data.poker[0].num == data.poker[2].num || data.poker[1].num == data.poker[3].num) {
                data.type = 5;      // 设置牌型为三带一
                data.max = data.poker[1].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断五张牌的情况
        case 5:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为三带二
            if (data.poker[0].num == data.poker[2].num && data.poker[3].num == data.poker[4].num ||
                data.poker[0].num == data.poker[1].num && data.poker[2].num == data.poker[4].num
            ) {
                data.type = 7;      // 设置牌型为三代二
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断六张牌的情况
        case 6:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为四带二
            if (data.poker[0].num == data.poker[3].num ||
                data.poker[1].num == data.poker[4].num ||
                data.poker[2].num == data.poker[5].num
            ) {
                data.type = 9;      // 设置牌型为四带二
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为两飞不带翅膀
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1
            ) {
                data.type = 11;      // 设置牌型为飞机
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 七张牌的情况
        case 7:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            return false;
            break;

        // 八张牌的情况
        case 8:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            /* 
                八张牌的飞机可能性
                 65444333
                 66655543
                 64443333
                 65554443
            */
            // 判断是否为飞双飞带单翅膀
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1 ||   // 判断前6张牌是否连续

                data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[2].num == data.poker[5].num * 1 + 1 ||    // 判断后6张牌是否连续

                data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[1].num == data.poker[4].num * 1 + 1   // 判断中间6张牌是否连续
            ) {
                data.type = 12;      // 设置牌型为飞机
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }

            // 判断四带两对
            /* 
                44445566
                44555566
                44556666
            */
            if (data.poker[4].num == data.poker[7].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num      // 判断前四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;

            }

            if (data.poker[2].num == data.poker[5].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[6].num == data.poker[7].num      // 判断中间四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;

            }

            if (data.poker[0].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num        // 判断后四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;

            }
            return false;
            break;
        case 9:
            // 判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为三飞不带翅膀
            // 777666555
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1
            ) {
                data.type = 14;
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 10:
            // 判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为双飞带双翅膀
            // 8877666555
            // 7766655544
            // 6665554433

            //判断8877666555和7766655544 
            if (data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[4].num == data.poker[7].num * 1 + 1 ||

                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[9].num &&
                data.poker[2].num == data.poker[5].num * 1 + 1
            ) {
                data.type = 13;
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;
            }
            // 判断6665554433
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num &&
                data.poker[8].num == data.poker[9].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1
            ) {
                data.type = 13;
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为连对
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 11:
            // 判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 12:
            // 判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为三飞机带单翅膀
            // 777666555443
            // 877766655543
            // 887776665554
            // 998777666555

            // 判断前面两种情况
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1 ||

                data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[1].num == data.poker[4].num * 1 + 1 &&
                data.poker[4].num == data.poker[7].num * 1 + 1) {

                data.type = 15;      // 设置牌型飞机
                data.max = data.poker[1].num;   // 设置牌型的判断值
                return true;
            }
            // 后两种飞机情况
            // 887776665554
            //  998777666555
            if (data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[2].num == data.poker[5].num * 1 + 1 &&
                data.poker[5].num == data.poker[8].num * 1 + 1 ||

                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1) {

                data.type = 15;      // 设置牌型飞机
                data.max = data.poker[3].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为四飞机不带翅膀
            // 999888777666
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1) {

                data.type = 17;      // 设置牌型飞机
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 13:
            return false;
            break;
        case 14:
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 15:
            // 判断是否为三飞机带两翅膀

            // j j 10 10 9 9 888777666    后面0对 
            // 10 10 99 888777666 55      后面1对
            // 99 888777666 5544          后面两对
            //  888777666 554433         后面三对

            // j j 10 10 9 9 888777666    后面0对
            if (data.poker[0].num == data.poker[1].num &&
                date.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1) {

                data.type = 16;      // 设置牌型飞机
                data.max = data.poker[6].num;   // 设置牌型的判断值
                return true;
            }

            // 10 10 9 9 888777666 55      后面1对
            if (data.poker[0].num == data.poker[1].num &&
                date.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[13].num == data.poker[14].num &&
                data.poker[4].num == data.poker[7].num * 1 + 1 &&
                data.poker[7].num == data.poker[10].num * 1 + 1) {

                data.type = 16;      // 设置牌型飞机
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;
            }

            // 99 888777666 5544          后面两对
            if (data.poker[0].num == data.poker[1].num &&
                date.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[12].num &&
                data.poker[13].num == data.poker[14].num &&
                data.poker[2].num == data.poker[5].num * 1 + 1 &&
                data.poker[5].num == data.poker[8].num * 1 + 1) {

                data.type = 16;      // 设置牌型飞机
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }

            // j j 10 10 9 9 888777666    后面0对
            if (data.poker[0].num == data.poker[1].num &&
                date.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1) {

                data.type = 16;      // 设置牌型飞机
                data.max = data.poker[6].num;   // 设置牌型的判断值
                return true;
            }

            // 五飞不带翅膀
            // 999 888 777 666 555
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&

                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1) {
                data.type = 20;      // 设置牌型飞机
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 16:
            // 判断是否为8连对
            // qq jj 1010 99 88 77 66 55
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否四飞带一个翅膀
            // Q J 10 9 888 777 666 555 
            //   J 10 9 888 777 666 555 4
            //     10 9 888 777 666 555 4 3
            //        9 888 777 666 555 4 3 3
            //          888 777 666 555 4 4 3 3

            // Q J 10 9 888 777 666 555 
            if (data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[13].num == data.poker[15].num &&
                data.poker[4].num == data.poker[7].num &&
                data.poker[7].num == data.poker[10].num &&
                data.poker[10].num == data.poker[13].num) {

                data.type = 18;      // 设置牌型飞机
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;
            }

            //   J 10 9 888 777 666 555 4
            if (data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[3].num == data.poker[6].num &&
                data.poker[6].num == data.poker[9].num &&
                data.poker[9].num == data.poker[12].num) {

                data.type = 18;      // 设置牌型飞机
                data.max = data.poker[3].num;   // 设置牌型的判断值
                return true;
            }
            //    10 9 888 777 666 555 4 3
            if (data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[13].num &&
                data.poker[2].num == data.poker[5].num &&
                data.poker[5].num == data.poker[8].num &&
                data.poker[8].num == data.poker[11].num) {

                data.type = 18;      // 设置牌型飞机
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            //     9 888 777 666 555 4 3 3
            if (data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[1].num == data.poker[4].num &&
                data.poker[4].num == data.poker[7].num &&
                data.poker[7].num == data.poker[10].num) {

                data.type = 18;      // 设置牌型飞机
                data.max = data.poker[1].num;   // 设置牌型的判断值
                return true;
            }
            //      888 777 666 555 4 4 3 3
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[0].num == data.poker[3].num &&
                data.poker[3].num == data.poker[6].num &&
                data.poker[6].num == data.poker[9].num) {

                data.type = 18;      // 设置牌型飞机
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 17:
            return false;
            break;
        case 18:
            // 判断是否九连对
            // qq jj 1010 99 88 77 66 55 44
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否6飞不带翅膀
            // 999 888 777 666 555 444  
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[15].num == data.poker[17].num &&

                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1 &&
                data.poker[12].num == data.poker[15].num * 1 + 1) {

                data.type = 22;      // 设置牌型6飞不带翅膀
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        case 19:
            return false;
            break;
        case 20:
            // 判断是否10连对
            // qq jj 1010 99 88 77 66 55 44 33
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否四飞机带两翅膀
            //AA KK QQ JJ 101010 999 888 777
            //   KK QQ JJ 101010 999 888 777 66
            //      QQ JJ 101010 999 888 777 66 55
            //         JJ 101010 999 888 777 66 55 44
            //            101010 999 888 777 66 55 44 33

            //AA KK QQ JJ 101010 999 888 777
            if (data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num &&

                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[13].num &&
                data.poker[14].num == data.poker[16].num &&
                data.poker[17].num == data.poker[19].num &&

                data.poker[8].num == data.poker[11].num * 1 + 1 &&
                data.poker[11].num == data.poker[14].num * 1 + 1 &&
                data.poker[14].num == data.poker[17].num * 1 + 1) {

                data.type = 19;      // 设置牌型飞机
                data.max = data.poker[8].num;   // 设置牌型的判断值
                return true;
            }

            //   KK QQ JJ 101010 999 888 777 66
            if (data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&

                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[15].num == data.poker[17].num &&
                data.poker[18].num == data.poker[19].num &&

                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1 &&
                data.poker[12].num == data.poker[15].num * 1 + 1) {

                data.type = 19;      // 设置牌型飞机
                data.max = data.poker[6].num;   // 设置牌型的判断值
                return true;
            }
            //    QQ JJ 101010 999 888 777 66 55
            if (data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num &&

                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[13].num == data.poker[15].num &&

                data.poker[16].num == data.poker[17].num &&
                data.poker[18].num == data.poker[19].num &&

                data.poker[4].num == data.poker[7].num * 1 + 1 &&
                data.poker[7].num == data.poker[10].num * 1 + 1 &&
                data.poker[10].num == data.poker[13].num * 1 + 1) {

                data.type = 19;      // 设置牌型飞机
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;
            }
            //     JJ 101010 999 888 777 66 55 44
            if (data.poker[0].num == data.poker[1].num &&

                data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[13].num &&

                data.poker[14].num == data.poker[15].num &&
                data.poker[16].num == data.poker[17].num &&
                data.poker[18].num == data.poker[19].num &&

                data.poker[2].num == data.poker[5].num * 1 + 1 &&
                data.poker[5].num == data.poker[8].num * 1 + 1 &&
                data.poker[8].num == data.poker[11].num * 1 + 1) {

                data.type = 19;      // 设置牌型飞机
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否5飞机带一个翅膀
            // A K Q J 10 999 888 777 666 555
            //   K Q J 10 999 888 777 666 555 4
            //     Q J 10 999 888 777 666 555 4 3
            //       J 10 999 888 777 666 555 4  4 3
            //         10 999 888 777 666 555 4  4 3 3
            //            999 888 777 666 555 4  4 3 3 3

            // A K Q J 10 999 888 777 666 555
            if (data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[13].num &&
                data.poker[14].num == data.poker[16].num &&
                data.poker[17].num == data.poker[19].num &&

                data.poker[5].num == data.poker[8].num * 1 + 1 &&
                data.poker[8].num == data.poker[11].num * 1 + 1 &&
                data.poker[11].num == data.poker[14].num * 1 + 1 &&
                data.poker[14].num == data.poker[17].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[5].num;   // 设置牌型的判断值
                return true;
            }
            //  K Q J 10 999 888 777 666 555 4
            if (data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[13].num == data.poker[15].num &&
                data.poker[16].num == data.poker[18].num &&

                data.poker[4].num == data.poker[7].num * 1 + 1 &&
                data.poker[7].num == data.poker[10].num * 1 + 1 &&
                data.poker[10].num == data.poker[13].num * 1 + 1 &&
                data.poker[13].num == data.poker[16].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[4].num;   // 设置牌型的判断值
                return true;
            }
            //   Q J 10 999 888 777 666 555 4 4
            if (data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[12].num == data.poker[14].num &&
                data.poker[15].num == data.poker[17].num &&

                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1 &&
                data.poker[12].num == data.poker[15].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[3].num;   // 设置牌型的判断值
                return true;
            }
            //    J 10 999 888 777 666 555 4 4 3
            if (data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[11].num == data.poker[13].num &&
                data.poker[14].num == data.poker[16].num &&

                data.poker[2].num == data.poker[5].num * 1 + 1 &&
                data.poker[5].num == data.poker[8].num * 1 + 1 &&
                data.poker[8].num == data.poker[11].num * 1 + 1 &&
                data.poker[11].num == data.poker[14].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            //     10 999 888 777 666 555 4 4 3 3
            if (data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[10].num == data.poker[12].num &&
                data.poker[13].num == data.poker[15].num &&

                data.poker[1].num == data.poker[4].num * 1 + 1 &&
                data.poker[4].num == data.poker[7].num * 1 + 1 &&
                data.poker[7].num == data.poker[10].num * 1 + 1 &&
                data.poker[10].num == data.poker[13].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[1].num;   // 设置牌型的判断值
                return true;
            }
            //      999 888 777 666 555 4 4 3 3 3
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[1].num &&
                data.poker[12].num == data.poker[14].num &&

                data.poker[0].num == data.poker[3].num * 1 + 1 &&
                data.poker[3].num == data.poker[6].num * 1 + 1 &&
                data.poker[6].num == data.poker[9].num * 1 + 1 &&
                data.poker[9].num == data.poker[12].num * 1 + 1) {

                data.type = 21;      // 设置牌型飞机
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        default:
            break;
    }

}

// 检查当前牌型是否为顺子
function checkStraight(poker) {
    for (let i = 0; i < poker.length - 1; i++) {

        if (poker[i].num * 1 != poker[i + 1].num * 1 + 1 || poker[0].num == 13|| poker[0].num == 14|| poker[0].num == 15) {
            return false;
        }
    }
    return true;
}

// 检查当前牌型是否为连对
function checkDouble(poker) {
    //  334455
    for (let i = 0; i < poker.length - 2; i += 2) {
        if (poker[i].num != poker[i + 1].num || poker[i].num != poker[i + 2].num * 1 + 1|| poker[0].num == 13|| poker[0].num == 14|| poker[0].num == 15) {
            return false;
        }
    }
    return true;
}

// 检查当前手牌是否大于桌上的牌的函数
function checkVS() {
    // 如果桌面上没有牌的话可以直接打出
    if (gameData.desktop.type == 0) {
        return true;
    }

    // 如果出的牌是王炸的话可以直接打出
    if (gameData.select.type == 666) {
        return true;
    }

    // 出的是普通炸弹并且桌上的不是炸弹或者王炸就可以直接打出
    if (gameData.select.type == 4 && (gameData.desktop.type != 4 && gameData.desktop.type != 666)) {
        return true;
    }

    // 如果桌面上的牌是王炸那无论是什么牌都不能打出
    if (gameData.desktop.type == 666) {
        return false;
    }

    // 一般组数据大小的判断
    if (gameData.select.type == gameData.desktop.type &&
        gameData.select.poker.length == gameData.desktop.poker.length &&
        parseInt(gameData.select.max) > parseInt(gameData.desktop.max)
    ) {
        return true;
    } else {
        return false;
    }
}


function playVoice(poker) {
    let dan3 = document.getElementById("dan3");

    let dan4 = document.getElementById("dan4");
    let dan5 = document.getElementById("dan5");
    let dan6 = document.getElementById("dan6");
    let dan7 = document.getElementById("dan7");
    let dan8 = document.getElementById("dan8");
    let dan9 = document.getElementById("dan9");
    let dan10 = document.getElementById("dan10");
    let danj = document.getElementById("danj");
    let danq = document.getElementById("danq");
    let dank = document.getElementById("dank");
    let dana = document.getElementById("dana");
    let dan2 = document.getElementById("dan2");
    let dan13 = document.getElementById("dan13");
    let dan14 = document.getElementById("dan14");
    let wangzha = document.getElementById("wangzha");
    let wangzha1 = document.getElementById("wangzha1");
    let zhadan = document.getElementById("zhadan");
    let sandaiyi = document.getElementById("sandaiyi");
    // 对子音频
    let dui3 = document.getElementById("dui3");
    let dui4 = document.getElementById("dui4");
    let dui5 = document.getElementById("dui5");
    let dui6 = document.getElementById("dui6");
    let dui7 = document.getElementById("dui7");
    let dui8 = document.getElementById("dui8");
    let dui9 = document.getElementById("dui9");
    let dui10 = document.getElementById("dui10");
    let duij = document.getElementById("duij");
    let duiq = document.getElementById("duiq");
    let duik = document.getElementById("duik");
    let duia = document.getElementById("duia");
    let dui2 = document.getElementById("dui2");

    // s三个音频
    let sange3 = document.getElementById("sange3")
    let sange4 = document.getElementById("sange4")
    let sange5 = document.getElementById("sange5")
    let sange6 = document.getElementById("sange6")
    let sange7 = document.getElementById("sange7")
    let sange8 = document.getElementById("sange8")
    let sange9 = document.getElementById("sange9")
    let sange10 = document.getElementById("sange10")
    let sangej = document.getElementById("sangej")
    let sangeq = document.getElementById("sangeq")
    let sangek = document.getElementById("sangek")
    let sangea = document.getElementById("sangea")
    let sange2 = document.getElementById("sange3")
    //    顺子音频
    let shunzi = document.getElementById("shunzi")
    let shunziyx = document.getElementById("shunziyx")
    // 三代一对lety
    let sandaier = document.getElementById("sandaier")
    // 飞机
    let feiji = document.getElementById("feiji")
    let feijiyx = document.getElementById("feijiyx")
    // 连对
    let liandui = document.getElementById("liandui")
    // 四代二
    let sidaier = document.getElementById("sidaier")
    // 四代两队
    let sidaierdui = document.getElementById("sidaierdui")


    switch (poker.poker.length) {
        case 1:
            if (poker.max == 1) {
                dan3.play();
            } else if (poker.max == 2) {
                dan4.play();
            } else if (poker.max == 3) {
                dan5.play();
            } else if (poker.max == 4) {
                dan6.play();
            } else if (poker.max == 5) {
                dan7.play();

            } else if (poker.max == 6) {
                dan8.play();

            } else if (poker.max == 7) {
                dan9.play();

            } else if (poker.max == 8) {
                dan10.play();

            } else if (poker.max == 9) {
                danj.play();

            } else if (poker.max == 10) {
                danq.play();

            } else if (poker.max == 11) {
                dank.play();

            } else if (poker.max == 12) {
                dana.play();

            } else if (poker.max == 13) {
                dan2.play();

            } else if (poker.max == 14) {
                dan13.play();

            } else if (poker.max == 15) {
                dan14.play();
            }
            break;
        case 2:
            if (poker.max == 14) {
                wangzha.play();
                setTimeout(() => {
                    wangzha1.play()
                }, 1000);
            } else if (poker.max == 1) {
                dui3.play();
            } else if (poker.max == 2) {
                dui4.play();
            } else if (poker.max == 3) {
                dui5.play();
            } else if (poker.max == 4) {
                dui6.play();
            } else if (poker.max == 5) {
                dui7.play();
            } else if (poker.max == 6) {
                dui8.play();
            } else if (poker.max == 7) {
                dui9.play();
            } else if (poker.max == 8) {
                dui10.play();
            } else if (poker.max == 9) {
                duij.play();
            } else if (poker.max == 10) {
                duiq.play();
            } else if (poker.max == 11) {
                duik.play();
            } else if (poker.max == 12) {
                duia.play();
            } else if (poker.max == 13) {
                dui2.play();
            }
            break;
        case 3:
            if (poker.max == 1) {
                sange3.play();
            } else if (poker.max == 2) {
                sange4.play();
            } else if (poker.max == 3) {
                sange5.play();
            } else if (poker.max == 4) {
                sange6.play();
            } else if (poker.max == 5) {
                sange7.play();
            } else if (poker.max == 6) {
                sange8.play();
            } else if (poker.max == 7) {
                sange9.play();
            } else if (poker.max == 8) {
                sange10.play();
            } else if (poker.max == 9) {
                sangej.play();
            } else if (poker.max == 10) {
                sangeq.play();
            } else if (poker.max == 11) {
                sangek.play();
            } else if (poker.max == 12) {
                sangea.play();
            } else if (poker.max == 13) {
                sange2.play();
            }
            break;
        case 4:
            if (poker.type == 4) {
                zhadan.play();
                setTimeout(() => {
                    wangzha1.play()
                }, 1000);
            }
            if (poker.type == 5) {
                sandaiyi.play();
            }
            break;
        case 5:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 7) {  //三代二
                sandaier.play();
            }
            break;
        case 6:
            if (poker.type == 6) {
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 11) {  //飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            } if (poker.type == 8) {
                liandui.play();
            } if (poker.type == 9) {
                sidaier.play();
            }
            break;
        case 7:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            break;
        case 8:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            if (poker.type == 12) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 10) {//四代二对
                sidaierdui.play();
            }
            break;
        case 9:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 14) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            break;
        case 10:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 13) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 11:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            break;
        case 12:
            if (poker.type == 6) {//顺子
                shunzi.play();
                setTimeout(() => {
                    shunziyx.play()
                }, 500);
            }
            if (poker.type == 15) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 13:
            if (poker.type == 6) {//顺子
                shunzi.play();
            }
            if (poker.type == 15) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 14:
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 15:
            feiji.play();
            setTimeout(() => {
                feijiyx.play()
            }, 1000);
            break;
        case 16:
            if (poker.type == 18) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 18:
            if (poker.type == 22) {//飞机
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            if (poker.type == 8) {//连对
                liandui.play();
            }
            break;
        case 20:
            if (poker.type == 8) {//连对
                liandui.play();
            } else {
                feiji.play();
                setTimeout(() => {
                    feijiyx.play()
                }, 1000);
            }
            break;
        default:
            break;
    }
}

/*寻找大于value的所有单张手牌*/
function findOnePoker(poker,minvalue){
    let temparr=[]
    let index=0;
    for(let i=poker.length-1;i>=0;i--){
        temparr[index] = [];
        temparr[index][0] ={};
        if(poker[i].num>minvalue){
            temparr[index][0].num = poker[i].num;
            temparr[index][0].color = poker[i].color;
            temparr[index][0].index = i;
            index++;
        }
    }
    return temparr;
}