// 用于保存当局游戏的数据
// 用于保存当局游戏的数据
let gameData = {
    boss: null,          // 当前哪位玩家是地主
    play: null,          // 当前到哪位玩家出牌
    hintnum:0,  
    // selectPoker:[]      // 当前玩家选择中的牌的数据
    select: {
        type: 0,            // 选中牌的牌型
        poker: [],          // 选中牌的数据
        max: 0               // 选中牌的牌型中用于判断大小的值
    },
    // 当前桌面牌组数据
    desktop: {
        type: 0,            // 选中牌的牌型
        poker: [],          // 选中牌的数据
        max: 0               // 选中牌的牌型中用于判断大小的值
    },
    multiple: 1              // 本局游戏结算的倍数
}
let player = [
    {
        name: '诸葛亮',
        img: '',
        gold: 10000,
        poker: [],
        result: '',
        account: 0
    },
    {
        name: '关羽',
        img: '',
        gold: 10000,
        poker: [],
        result: '',
        account: 0
    },
    {
        name: '猪八戒',
        img: '',
        gold: 10000,
        poker: [],
        result: '',
        account: 0
    }
];


function gameRun() {           // window.onload
    let kaichang = document.getElementById("kaichang");
    let xipai = document.getElementById("xipai");
    let fapai = document.getElementById("fapai");
    let qdz = document.getElementById("qdz");
    let buqiang = document.getElementById("buqiang");
    let guo1 = document.getElementById("guo1");
    let guo2 = document.getElementById("guo2");
    let guo3 = document.getElementById("guo3");
    let xuanpai = document.getElementById("xuanpai");
    let bgmusic = document.getElementById("bgmusic");
    let bgmusic2 = document.getElementById("bgmusic2");
    let onlyone = document.getElementById("onlyone");
    let onlytwo = document.getElementById("onlytwo");
    let win = document.getElementById("win");
    let lose = document.getElementById("lose");

    let time;
    let t;

    $(".people1 .name").text(player[0].name);
    $(".people2 .name").text(player[1].name);
    $(".people3 .name").text(player[2].name);

    $(".people1 .gold").text(player[0].gold);
    $(".people2 .gold").text(player[1].gold);
    $(".people3 .gold").text(player[2].gold);

//  kaichang.play();
	bgmusic.play();
    /* 
        初始化玩家数据
    */
    // 初始化牌组
    // 初始牌组HTML代码
    let poker_html = '';
    for (let i = 0; i < 54; i++) {
        // $(".all_poker").append('<li class="back"></li>')
        poker_html += '<li class="back" style="top:-' + 1.5 * i + 'px"></li>';    // 通过循环得到牌组的HTML代码
    }
    $(".all_poker").html(poker_html);       // 把牌组的HTML代码放入页面对应的元素中

    // 初始牌组数据
    let all_poker = [];
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            all_poker.push({ num: i, color: j })
        }
    }
    all_poker.push({ num: 14, color: 0 })
    all_poker.push({ num: 14, color: 1 })
    // console.log(all_poker)

    // const 常量名   常量是无法重新赋值的

    let click = 0;      // 点击次数

    // 绑定洗牌事件
    /* 
        由于绑定事件的元素在洗牌的过程中会删除所以绑定的事件失效
        这种情况，我们需要使用侦听绑定或者叫做监听绑定
        通过父级元素来绑定事件
    */
    // $(".all_poker li").click(function(){
    $(".mid_top").on("click", ".all_poker li", function () {
        if ($(".all_poker").is(':animated')) {
            return false;
        }
        // 如果点击次数为零，则执行洗牌事件
        if (click == 0) {
            // 调用洗牌动画
            clearPoker()
        } else if (click == 1) {
            // 发牌动画 
            dealPoker()
            bgmusic.play();
        }

    })

    // 洗牌动画函数
    function clearPoker() {
        // 把初始牌组数据的顺序打乱

        for (let i = 0; i < 5; i++) {
            all_poker.sort(function (x, y) {
                return Math.random() - 0.5;
            })
        }
        // 洗牌动画
        // 保存原牌组的代码方便恢复
        let poker_html = $(".mid_top").html()
        // 1、删除原来的牌组 
        $(".all_poker").remove()

        // 2、生成三个临时牌组用于动画使用
        let temp_html = '';
        for (let j = 0; j < 2; j++) {
            temp_html += '<ul class="all_poker" style="top:-' + j * 330 + 'px">';
            for (let i = 0; i < 27; i++) {
                temp_html += '<li class="back" style="top:-' + i + 'px"></li>';
            }
            temp_html += '</ul>';
        }
        bgmusic.play();
        xipai.play();
        $(".mid_top").append(temp_html)
        $(".all_poker").eq(0).animate({ left: "-118px" }, 200);
        $(".all_poker").eq(1).animate({ left: "118px" }, 200);

        setTimeout(function () {
            $(".all_poker").eq(0).find('li').css({ 'transform': 'rotateZ(180deg) rotateY(45deg) rotateX(-45deg) ', 'transition': 'transform 1s' });
            $(".all_poker").eq(1).find('li').css({ 'transform': 'rotateZ(180deg) rotateY(-45deg) rotateX(-45deg) ', 'transition': 'transform 1s' });
        }, 200)

        setTimeout(function () {
            for (let i = 0; i < 27; i++) {
                setTimeout(function () {
                    $(".all_poker").eq(0).find('li').eq(i).css({ 'transition': 'transform 0.5s', 'transform': 'rotateZ(180deg) rotateY(45deg) rotateX(-70deg) ' });
                    $(".all_poker").eq(1).find('li').eq(i).css({ 'transition': 'transform 0.5s', 'transform': 'rotateZ(180deg) rotateY(-45deg) rotateX(-70deg)' });
                }, (1000 / 27) * i)

            }
        }, 1200)
        // 4、恢复原牌组
        setTimeout(function () {
            $('.mid_top').html(poker_html)
            click = 1;
            // console.log(all_poker)

        }, 3000)
        xipai.pause();
    }

    // 发牌的动画
    function dealPoker() {

        fapai.play();
        let num = 0;
        let poker_html = '';
        $(".profile .remainder").css("display", "inline-block");
        function go() {
            // 给左边玩家发牌
            $(".all_poker li:last").animate({ left: "-600px", top: "250px" }, 80, function () {
                $(".all_poker li:last").remove();
                player[0].poker.push(all_poker.pop());
                $(".people1 .remainder").text(player[0].poker.length);

                poker_html1 = makePoker(player[0].poker[player[0].poker.length - 1]);       // 生成对应数据的牌页面
                $(".play_1").append(poker_html1);
                $(".play_1 li:last").css({ top: num * 32 + 'px' })
                $(".play_1").css({ top: -num * 16 + 'px' })

                // 给中间玩家发牌
                $(".all_poker li:last").animate({ top: "600px" }, 80, function () {
                    $(".all_poker li:last").remove();
                    player[1].poker.push(all_poker.pop());
                    $(".people2 .remainder").text(player[1].poker.length);

                    poker_html = makePoker(player[1].poker[player[1].poker.length - 1]);       // 生成对应数据的牌页面
                    $(".play_2").append(poker_html);
                    $(".play_2 li:last").css({ left: num * 36 + 'px' })
                    $(".play_2").css({ left: -num * 18 + 'px' })


                    // 给右边玩家发牌
                    $(".all_poker li:last").animate({ left: "600px", top: "250px" }, 80, function () {
                        $(".all_poker li:last").remove();
                        player[2].poker.push(all_poker.pop());
                        $(".people3 .remainder").text(player[2].poker.length);

                        poker_html1 = makePoker(player[2].poker[player[2].poker.length - 1]);       // 生成对应数据的牌页面
                        $(".play_3").append(poker_html1);
                        $(".play_3 li:last").css({ top: num * 32 + 'px' })
                        $(".play_3").css({ top: -num * 16 + 'px' })

                        if (++num <= 16) {
                            go();
                        } else {
                            // console.log(player)
                            // 把所有玩家的有手牌进行排序
                            sortPoker(player[0].poker)
                            sortPoker(player[1].poker)
                            sortPoker(player[2].poker)
                            console.log(player)

                            setTimeout(() => {
                                $(".play_1 li").css({ "background": '' }).addClass("back")     // 把牌背重新生成
                                $(".play_2 li").css({ "background": '' }).addClass("back")     // 把牌背重新生成
                                $(".play_3 li").css({ "background": '' }).addClass("back")     // 把牌背重新生成

                                setTimeout(() => {
                                    $('.play_1 li').remove()
                                    $('.play_2 li').remove()
                                    $('.play_3 li').remove()
                                    // poker_html = ''
                                    // 按已经排序好的数据重新生成牌面
                                    for (let i = 0; i < player[1].poker.length; i++) {
                                        $('.play_1').append(makePoker(player[0].poker[i]))
                                        $('.play_1 li:last').css({ top: i * 32 + 'px' })

                                        // poker_html = makePoker(player[1].poker[i])
                                        $('.play_2').append(makePoker(player[1].poker[i]))
                                        $('.play_2 li:last').css({ left: i * 36 + 'px' })

                                        $('.play_3').append(makePoker(player[2].poker[i]))
                                        $('.play_3 li:last').css({ top: i * 32 + 'px' })
                                    }
                                    // $('.play_2').html(poker_html)

                                    /* 
                                        发牌已经结束，进入抢地主阶段
                                        调用抢地主的函数
                                    */
                                    getBoss();
                                }, 500)
                            }, 500)
                        }
                    });
                });
            });
        }
        go();
        click = 2;
    }

    // 抢地主函数
    function getBoss(get, num, get_data) {
        $(".beishu").css("display","block");
        $(".beishu").text("倍数："+ gameData.multiple);
        // 设置参数的默认值
        if (get == undefined) {
            // 随机点名一个玩家开始抢地主
            get = Math.floor(Math.random() * 3)
        }
        num = num == undefined ? 0 : num;
        get_data = get_data == undefined ? [null, null, null] : get_data;

        // 可以通过num的值来判断已经选择了几次
        if (num == 3) {
            // 如果三个玩家都不抢地主的情况
            if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 0) {
                alert("本局无人抢地主，流局！！")
                window.location.href = window.location.href;
                console.log(get_data[2])
            } else {
                if (get_data[0] != 3 && get_data[1] != 3 && get_data[2] != 3) {
                    for (let i = 0; i < 3; i++) {
                        if (get_data[i] == 2) {
                            setBoss(i)
                        }
                    }
                } else if (get_data[0] == 3 && get_data[1] == 0 && get_data[2] == 0) {
                    setBoss(0)
                } else if (get_data[0] == 0 && get_data[1] == 3 && get_data[2] == 0) {
                    setBoss(1)
                } else if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 3) {
                    setBoss(2)
                } else if (get_data[0] == 2 && get_data[1] == 0 && get_data[2] == 0) {
                    setBoss(0)
                } else if (get_data[0] == 0 && get_data[1] == 2 && get_data[2] == 0) {
                    setBoss(1)
                } else if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 2) {
                    setBoss(2)
                } else {
                    num++
                    getBoss(get, num, get_data)
                }

                // if (get_data[0] == 1 && get_data[1] == 0 && get_data[2] == 0) {
                //     setBoss(0)
                // } else if (get_data[0] == 0 && get_data[1] == 1 && get_data[2] == 0) {
                //     setBoss(1)
                // } else if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 1) {
                //     setBoss(2)
                // }
            }
        } else {

            // 所有的组件先隐藏
            $(".get-boss").hide();

            // 把对应选择权的玩家的组件显示
            $(".get-boss").eq(get).show()

            // 解绑事件
            $(".get-boss .get").off()       // 把目标 元素上的所有事件解除
            $(".get-boss .cancel").off()

            // 动态绑定抢地主跟不抢的事件
            $(".get-boss").eq(get).find(".get").on("click", () => {

                qdz.play();
                gameData.multiple=gameData.multiple*2;
                 $(".beishu").text("倍数："+ gameData.multiple);

                let flag;//获取到get的前一个玩家
                if (get == 0) {
                    flag = 2
                } else if (get == 1) {
                    flag = 0;
                } else {
                    flag = 1;
                }

                if (num == 0) {
                    get_data[get] = 3;
                } else if (get_data[flag] == null || get_data[flag] == 0) {
                    get_data[get] = 2;
                } else {
                    get_data[get] = 1;
                }
                // 设置当前玩的选择

                num++

                // 如果当前玩家抢地主是第四轮抢的话就肯定能抢到地主了
                if (num == 5 || num == 4) {
                    setBoss(get)
                    return
                }
                let play_get = get - 1 < 0 ? 2 : get - 1;
                let boss_get = play_get - 1 < 0 ? 2 : play_get - 1;
                if (num == 3 && get_data[boss_get] == 0 && get_data[play_get] != 0) {
                    let pre_get = get - 1 < 0 ? 2 : get - 1;
                    num++
                    alert(1)
                    getBoss(pre_get, num, get_data)
                    return
                }
                get = ++get > 2 ? 0 : get;
                getBoss(get, num, get_data)
            })

            $(".get-boss").eq(get).find(".cancel").on("click", () => {
                buqiang.play();
                get_data[get] = 0;      // 设置当前玩的选择

                num++
                let boss;
                // 第四次选择不抢的话也肯得到谁是地主了
                if (num == 5) {
                    let pre_get = get + 1 > 2 ? 0 : get + 1;
                    console.log(get_data[pre_get])
                    if (get_data[pre_get] == 1 || get_data[pre_get] == 2) {
                        boss = pre_get;
                    } else {
                        boss = pre_get + 1 > 2 ? 0 : pre_get + 1;
                    }
                    setBoss(boss)
                } else {
                    get = ++get > 2 ? 0 : get;
                    getBoss(get, num, get_data);
                }

            })
        }
    }

    // 设置当前哪个玩家为地主的函数
    function setBoss(boss) {
        // 隐藏与解绑所有抢地主相关的元素
        $('.get-boss').hide();
        $('.get-boss .get').off();
        $('.get-boss .cancel').off();

        // 设置当前地主玩家
        gameData.boss = boss;
        $(".dizhu_img").css("display","block")

        /* 把桌面的三张牌使用动画方法翻开 */
        $('.all_poker li').eq(0).animate({ "left": "-300px" })
        $('.all_poker li').eq(1).animate({ "left": "300px" }, () => {
            // 最后三张牌的数据放到地主玩家挡手牌中
            player[gameData.boss].poker.push(all_poker[0], all_poker[1], all_poker[2])
            sortPoker(player[gameData.boss].poker);

            // 动画与页面
            $('.all_poker li').remove()
            for (let i = 0; i < all_poker.length; i++) {
                $('.all_poker').append(makePoker(all_poker[i]))
                if (i == 0) {
                    $('.all_poker li:last').css({ left: "-300px" })
                } else if (i == 2) {
                    $('.all_poker li:last').css({ left: "300px" })
                }
            }
            $('.all_poker li').animate({ top: "-100px" }, 300)
            if (boss == 0) {
                $('.all_poker li').animate({ left: "-700px", top: "250px" }, 500, function () {
                    $('.all_poker li').remove();
                    $(".dizhu_img").animate({left:"-400px"},500)
                })
            } else if (boss == 1) {
                $('.all_poker li').animate({ top: "500px" }, 500, function () {
                   
                    $('.all_poker li').remove();
                    $(".dizhu_img").animate({top: "670px",left: "-150px"},500)
                })
            } else {
                $('.all_poker li').animate({ left: "700px", top: "250px" }, 500, function () {
                    $('.all_poker li').remove();
                    $(".dizhu_img").animate({left: "1200px"},500)

                })
            }

            // 玩家重新排序手牌的动画
            //$(".paly_1 li")
            // $(".play_"+(boss+1)+" li").remove()
            setTimeout(() => {
                $(".play_" + (boss + 1)).find("li").remove()
                for (let i = 0; i < player[boss].poker.length; i++) {
                    if (boss == 1) {
                        $(".play_" + (boss + 1)).append('<li class="back" style="left:' + i * 36 + 'px"></li>')
                    } else {
                        $(".play_" + (boss + 1)).append('<li class="back" style="top:' + i * 32 + 'px"></li>')

                    }
                }
            }, 500);

            setTimeout(() => {
                $(".play_" + (boss + 1)).find("li").remove()
                for (let i = 0; i < player[boss].poker.length; i++) {
                    $(".play_" + (boss + 1)).append(makePoker(player[boss].poker[i]));
                    if (boss == 1) {
                        $(".play_" + (boss + 1) + ' li:last').css({ left: i * 36 + 'px' })
                        $(".play_" + (boss + 1)).css({ left: -i * 18 + 'px' })
                    } else {
                        $(".play_" + (boss + 1) + ' li:last').css({ top: i * 32 + 'px' })
                        $(".play_" + (boss + 1)).css({ top: -i * 16 + 'px' })
                    }

                }
                $(".people" + (gameData.boss + 1) + " .remainder").text(player[gameData.boss].poker.length);
                // 调用出牌阶段方法
                gameData.play = boss;       // 设置当前出牌的玩家
                playPoker(0)
            }, 1000)
        })
    }

    // 出牌阶段
    function playPoker(pass) {
        // 隐藏所有玩家出牌的组件
        $('.play-btn').hide();
        $('.clock').hide();
        // 当前玩家的出牌组件显示
        $('.play-btn').eq(gameData.play).show();
        $('.clock').eq(gameData.play).show();
        console.log("pass:" + pass)
        //出牌倒计时20秒
        t = 20;
        $('.clock p').html(t);
        time = setInterval(function () {
            if (t <= 0) {
                clearInterval(time);
                t = 20;

                //下一个玩家出牌
                $(".play_" + (gameData.play + 1) + ' li').removeClass('on');
                gameData.select.type = 0;
                gameData.select.poker = [];
                gameData.select.max = 0;
                if (gameData.desktop.type == 0) {
                    let temparr = findOnePoker(player[gameData.play].poker, gameData.desktop.max);
                    gameData.select.poker = []
                    for (let i = 0; i < temparr[0].length; i++) {
                        let poker = {};
                        poker.num = temparr[0][i].num;
                        poker.color = temparr[0][i].color;
                        gameData.select.poker.push(poker);
                    }
                    for (let j = 0; j < player[gameData.play].poker.length; j++) {
                        $('.play_' + (gameData.play + 1) + ' li').eq(j).removeClass('on');
                    }
                    for (let i = 0; i < gameData.select.poker.length; i++) {
                        for (let j = 0; j < player[gameData.play].poker.length; j++) {
                            if (gameData.select.poker[i].num == player[gameData.play].poker[j].num && gameData.select.poker[i].color == player[gameData.play].poker[j].color) {
                                $('.play_' + (gameData.play + 1) + ' li').eq(j).addClass('on');
                                console.log(player[gameData.play].poker[j])
                            }
                        }
                    }
                    $(".play-btn").eq(gameData.play).find('.play').click();
                    return;
                }
                $(".play-btn").eq(gameData.play).find('.cancel').click();
            } else {
                t--;
                $('.clock p').html(t);
            }
        }, 1000);
        // 通过pass值的判断等于2，相当就是有两位玩家跳过出牌。这时桌面牌应该清空
        if (pass == 2) {
            gameData.desktop.type = 0;
            gameData.desktop.poker = [];
            gameData.desktop.max = 0;
            $(".all_poker").html('');
        }

        // 解绑事件
        $('.clock').off();
        $('.play-btn').off();
        $('.play_' + (gameData.play + 1) + ' li').off();
        $(".play-btn .play").off();
        $(".play-btn .cancel").off();
        $(".play-btn .hint").off();

        // 绑定选牌事件
        $('.play_' + (gameData.play + 1) + ' li').on('click', function () {
            xuanpai.play();
            // 判断当前元素是否有被选中的样式判断该元素是否补选中
            if ($(this).hasClass("on")) {
                // 去掉被选中的样式
                $(this).removeClass("on");


                // [{num:1, color:2}, {num:2, color:3}]      poker = {num:2, color:3}

                let poker = {};
                poker.num = $(this).attr("data-num");
                poker.color = $(this).attr("data-color");

                // 通过循环得到选中元素的下标
                for (let i = 0; i < gameData.select.poker.length; i++) {
                    // if(gameData.select.poker[i] == poker){        // 对象是不能直接进行比较相等的
                    if (gameData.select.poker[i].num == poker.num && gameData.select.poker[i].color == poker.color) {

                        gameData.select.poker.splice(i, 1);       // 通过下标删除数组中对应的元素
                        break;
                    }
                }
                console.log(gameData.select.poker)


            } else {
                // 把选择中牌变成被选中的样式
                $(this).addClass("on");
                // 把选中的牌的数据放入，选择的牌组数据中
                let poker = {};
                poker.num = $(this).attr("data-num");
                poker.color = $(this).attr("data-color");
                gameData.select.poker.push(poker);
                console.log("选中牌on:")
                console.log(gameData.select.poker)
            }

        })

        // 绑定出牌事件
        $(".play-btn").eq(gameData.play).on("click", '.play', function () {
            // alert("出牌")
            clearInterval(time); //点击出牌倒计时停止读秒
            // 检查出的牌是否符合规则
            console.log(gameData.select.poker)
            if (!checkPoker(gameData.select)) {
                alert("不符合规则1")
                time = setInterval(timing, 1000);
            } else {
                console.log("出牌pk" + gameData.select)
                // 判断手牌能不能打出
                if (checkVS()) {

                    /* 判断出牌类型是否为炸弹，是则加倍 */
                    if (gameData.select.type == 4) {
                        gameData.multiple = gameData.multiple * 2;
                        console.log("gameData.multiple:")
                        console.log(gameData.multiple)

                        $(".boom").css("display","block")
                        $(".boom").animate({height: "350px"},3000,function(){
                            $(".boom").css("display","none")
                        })
                               
                    }
                    if (gameData.select.type == 11||
                        gameData.select.type == 12||
                        gameData.select.type == 13||
                        gameData.select.type == 14||
                        gameData.select.type == 15||
                        gameData.select.type == 16||
                        gameData.select.type == 17||
                        gameData.select.type == 18||
                        gameData.select.type == 19||
                        gameData.select.type == 20||
                        gameData.select.type == 21||
                        gameData.select.type == 22) {
                        $(".plane").css("display","block")
                        $(".plane").animate({left:"2000px"},3000,function(){

                        $(".plane").css("left","-100px")
                        $(".plane").css("display","none")

                        })
                    }
                     
                    if (gameData.select.type == 666) {
                        gameData.multiple = gameData.multiple * 2;
                        console.log("gameData.multiple:")
                        console.log(gameData.multiple)

                        $(".rocket").css("display","block")
                        $(".rocket").animate({bottom:"100%"},400,function(){
                            $(".rocket").animate({bottom:"40%"},400,function(){
                                $(".rocket").css("display","none")
                                $(".rocket-boom").css("display","block")
                                $(".rocket-boom").animate({background:"url(../images/王炸.gif) no-repeat 100%"},1500,function(){
                                    $(".rocket-boom").animate({background:"url(../images/王炸文字.png) no-repeat 100%"},1000,function(){
                                         $(".rocket-boom").css("display","none")
                                    })
                                       
                                })

                            })
                        })
                    }
                   $(".beishu").text("倍数："+ gameData.multiple);


                    // 1、删除玩家手牌对应出牌的数据
                    /* 
                        seletc => [{num:1,color:2}, {num:1, color:3}]
                        play => [{num:1,color:2}, {num:1, color:3}, {num:2, color:3}]

                        需要注意在循环遍历时有可能遍历的数组会发生变化，如果有这样的可以需要小心处理。
                        1、尽可能不要直接在遍历时进行变化
                        2、或者等遍历完之再作处理
                        3、需要变的值可以通过临时变量来复制等操作来完成
                     */

                    for (let i = 0; i < gameData.select.poker.length; i++) {

                        for (let j = 0; j < player[gameData.play].poker.length; j++) {
                            if (gameData.select.poker[i].num == player[gameData.play].poker[j].num &&
                                gameData.select.poker[i].color == player[gameData.play].poker[j].color
                            ) {
                                player[gameData.play].poker.splice(j, 1);
                                break;
                            }
                        }
                    }
                    $(".people" + (gameData.play + 1) + " .remainder").text(player[gameData.play].poker.length);


                    $(".play_" + (gameData.play + 1)).find("li").remove()
                    for (let i = 0; i < player[gameData.play].poker.length; i++) {
                        $(".play_" + (gameData.play + 1)).append(makePoker(player[gameData.play].poker[i]));
                        if (gameData.play == 1) {
                            $(".play_" + (gameData.play + 1) + ' li:last').css({ left: i * 36 + 'px' })
                            $(".play_" + (gameData.play + 1)).css({ left: -i * 18 + 'px' })
                        } else {
                            $(".play_" + (gameData.play + 1) + ' li:last').css({ top: i * 32 + 'px' })
                            $(".play_" + (gameData.play + 1)).css({ top: -i * 16 + 'px' })
                        }
                    }

                    $(".all_poker").html('');
                    for (let i = 0; i < gameData.select.poker.length; i++) {
                        $(".all_poker").append(makePoker(gameData.select.poker[i]));
                        $('.all_poker li:last').css({ left: i * 36 + 'px' })
                        $('.all_poker').css({ left: -i * 20 + 'px' })
                    }

                    // 1、如果能出的话，首选需要把手牌的数据替换掉桌面的数据
                    // gameData.desktop = gameData.select  // 由于数据是对象直接进行赋值的话是引用赋值，所以不能直接进行赋值
                    gameData.desktop.type = gameData.select.type;
                    gameData.desktop.max = gameData.select.max;
                    // 由于数组也是引用赋值，所以数组的拷贝需要使用循环进行遍历
                    gameData.desktop.poker = [];
                    for (let i = 0; i < gameData.select.poker.length; i++) {
                        gameData.desktop.poker[i] = {};
                        gameData.desktop.poker[i].num = gameData.select.poker[i].num;
                        gameData.desktop.poker[i].color = gameData.select.poker[i].color;
                    }
                    playVoice(gameData.desktop);
                    // 2、选中的牌组数据要清空
                    gameData.select.type = 0;
                    gameData.select.poker = [];
                    gameData.select.max = 0;

                    // 最后一张牌了
                    if (player[gameData.play].poker.length == 1) {

                        onlyone.play();
                        bgmusic.pause();
                        bgmusic2.play();
                    }
                    // 最后一张牌了
                    if (player[gameData.play].poker.length == 2) {

                        onlytwo.play();
                        bgmusic.pause();
                        bgmusic2.play();
                    }
                    // 玩家手牌数据删除后，有可能玩家就已经没朋手牌了。所以每一次出牌都应该先进行本局游戏的胜负
                    if (player[gameData.play].poker.length == 0) {
                        // 进入结算阶段
                        $('.play-btn').hide();
                        $('.clock').hide();
                        console.log("进入结算阶段");
                        gameClose()

                        return false;
                    }

                    $(".play_" + (gameData.play + 1)).find("li").remove()
                    for (let i = 0; i < player[gameData.play].poker.length; i++) {
                        $(".play_" + (gameData.play + 1)).append(makePoker(player[gameData.play].poker[i]));
                        if (gameData.play == 1) {
                            $(".play_" + (gameData.play + 1) + ' li:last').css({ left: i * 36 + 'px' })
                            $(".play_" + (gameData.play + 1)).css({ left: -i * 18 + 'px' })
                        } else {
                            $(".play_" + (gameData.play + 1) + ' li:last').css({ top: i * 32 + 'px' })
                            $(".play_" + (gameData.play + 1)).css({ top: -i * 16 + 'px' })
                        }
                    }

                    gameData.play = ++gameData.play > 2 ? 0 : gameData.play;     // 设置下一个出牌的玩家
                    // 使用自调函数让下一个玩家出牌
                    playPoker(0)

                } else {
                    alert("你的牌没有打过大家！")
                    time = setInterval(timing, 1000);
                }
            }

        })

        // 绑定过牌事件
        $(".play-btn").eq(gameData.play).find('.cancel').click(function () {
            clearInterval(time); //点击出牌倒计时停止读秒
            if (gameData.desktop.type == 0) {
                alert("你必须出牌");
                time = setInterval(timing, 1000);
            } else {

                randomPass = Math.floor(Math.random() * 3);
                if (randomPass == 0) {
                    guo1.play();
                } else if (randomPass == 1) {
                    guo2.play();
                } else {
                    guo3.play();
                }
                $(".play_" + (gameData.play + 1) + ' li').removeClass('on');
                gameData.select.type = 0;
                gameData.select.poker = [];
                gameData.select.max = 0;
                $(".play_" + (gameData.play + 1)).find("li").remove()
                for (let i = 0; i < player[gameData.play].poker.length; i++) {
                    $(".play_" + (gameData.play + 1)).append(makePoker(player[gameData.play].poker[i]));
                    if (gameData.play == 1) {
                        $(".play_" + (gameData.play + 1) + ' li:last').css({ left: i * 36 + 'px' })
                        $(".play_" + (gameData.play + 1)).css({ left: -i * 18 + 'px' })
                    } else {
                        $(".play_" + (gameData.play + 1) + ' li:last').css({ top: i * 32 + 'px' })
                        $(".play_" + (gameData.play + 1)).css({ top: -i * 16 + 'px' })
                    }
                }
                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;     // 设置下一个出牌的玩家
                // 使用自调函数让下一个玩家出
                playPoker(++pass);
            }
        })



        $(".play-btn").eq(gameData.play).find('.hint').click(function () {
            let temparr;
            switch(gameData.desktop.type){
                case 1:
                    temparr=findOnePoker(player[gameData.play].poker,gameData.desktop.max);
                    break;
                case 2:
                    temparr=findDoublePoker(player[gameData.play].poker,gameData.desktop.max);
                    break;
                case 3:
                    temparr=findSanzhangPoker(player[gameData.play].poker,gameData.desktop.max);
                    break;
                case 4:
                    temparr=findBomb(player[gameData.play].poker,gameData.desktop.max);
                    break;
                case 5:
                        temparr=findSDY(player[gameData.play].poker,gameData.desktop.max);
                        break;
                    case 6:
                        temparr=findSZ(player[gameData.play].poker,gameData.desktop.max,gameData.desktop.poker.length);
                        break;
                    case 7:
                        temparr=findSDE(player[gameData.play].poker,gameData.desktop.max);
                        break;
                    
            }
            if(gameData.hintnum>=temparr.length){
                gameData.hintnum=0
            }
            gameData.select.poker=[]
            if(temparr[gameData.hintnum]){
                for(let i=0;i<temparr[gameData.hintnum].length;i++){
                    let poker={};
                    poker.num=temparr[gameData.hintnum][i].num;
                    poker.color=temparr[gameData.hintnum][i].color;
                    gameData.select.poker.push(poker);
                }
                gameData.hintnum++;

            }

            for(let j=0;j<player[gameData.play].poker.length;j++){
                $('.play_' + (gameData.play + 1) + ' li').eq(j).removeClass('on');
            }
            for(let i=0;i<gameData.select.poker.length;i++){
                for(let j=0;j<player[gameData.play].poker.length;j++){
                    if(gameData.select.poker[i].num==player[gameData.play].poker[j].num&&gameData.select.poker[i].color==player[gameData.play].poker[j].color){
                        $('.play_' + (gameData.play + 1) + ' li').eq(j).addClass('on');
                        console.log(player[gameData.play].poker[j])
                    }
                }
            }
        })


    }

    function timing() {
        if (t <= 0) {
            clearInterval(time);
            t = 20;
            alert("出牌时间到")
            //下一个玩家出牌
            $(".play_" + (gameData.play + 1) + ' li').removeClass('on');
            gameData.select.type = 0;
            gameData.select.poker = [];
            gameData.select.max = 0;
            if (gameData.desktop.type == 0) {
                let temparr = findOnePoker(player[gameData.play].poker, gameData.desktop.max);
                gameData.select.poker = []
                for (let i = 0; i < temparr[0].length; i++) {
                    let poker = {};
                    poker.num = temparr[0][i].num;
                    poker.color = temparr[0][i].color;
                    gameData.select.poker.push(poker);
                }
                for (let j = 0; j < player[gameData.play].poker.length; j++) {
                    $('.play_' + (gameData.play + 1) + ' li').eq(j).removeClass('on');
                }
                for (let i = 0; i < gameData.select.poker.length; i++) {
                    for (let j = 0; j < player[gameData.play].poker.length; j++) {
                        if (gameData.select.poker[i].num == player[gameData.play].poker[j].num && gameData.select.poker[i].color == player[gameData.play].poker[j].color) {
                            $('.play_' + (gameData.play + 1) + ' li').eq(j).addClass('on');
                            console.log(player[gameData.play].poker[j])
                        }
                    }
                }
                $(".play-btn").eq(gameData.play).find('.play').click();
                return;
            }
            $(".play-btn").eq(gameData.play).find('.cancel').click();
        } else {
            t--;
            $('.clock p').html(t);
        }
    }

    // 结算阶段函数
    function gameClose() {
        bgmusic.pause();
        bgmusic2.pause();
        if (gameData.play == 1) {
            win.play();
        } else {
            lose.play();
        }
        console.log(gameData);
        let count = gameData.multiple * 100;
        console.log(gameData.boss == gameData.play)
        // 本局是地主赢了还是农民赢了
        if (gameData.boss == gameData.play) {
            console.log("地主赢了")

            // 除了地主外其它玩家都进行减分
            for (let i = 0; i < 3; i++) {
                if (i != gameData.boss) {
                    player[i].gold -= count / 2;
                    player[i].result = '败';
                    player[i].account = -count / 2;
                }
            }
            // 地主玩家加分
            player[gameData.boss].gold += count;
            player[gameData.boss].result = '胜';
            player[gameData.boss].account = count;

        } else {
            console.log("地主输了")
            // 地主玩家减分
            player[gameData.boss].gold -= count;
            player[gameData.boss].result = '败';
            player[gameData.boss].account = -count;

            // 除了地主外其它玩家都进行加分
            for (let i = 0; i < 3; i++) {
                if (i != gameData.boss) {
                    player[i].gold += count / 2;
                    player[i].result = '胜';
                    player[i].account = count / 2 * 1;
                }
            }
        }
        $('#play1-information').find('td').eq(0).html(player[0].name);
        $('#play1-information').find('td').eq(1).html(player[0].account);
        $('#play1-information').find('td').eq(2).html(player[0].gold);

        $('#play2-information').find('td').eq(0).html(player[1].name);
        $('#play2-information').find('td').eq(1).html(player[1].account);
        $('#play2-information').find('td').eq(2).html(player[1].gold);

        $('#play3-information').find('td').eq(0).html(player[2].name);
        $('#play3-information').find('td').eq(1).html(player[2].account);
        $('#play3-information').find('td').eq(2).html(player[2].gold);

        $(".table-button").css("display", "block");
        $(".daji-div").css("display", "block");
        $(".dialog").css("display", "block");

        $(".people1 .gold").text(player[0].gold);
        $(".people2 .gold").text(player[1].gold);
        $(".people3 .gold").text(player[2].gold);
    }
}

$(function () {
    gameRun();
    $(".button-area").find(".button-restart").on("click", () => {
        $(".table-button").css("display", "none");
        $(".daji-div").css("display", "none");
        $(".dialog").css("display", "none");
        $('.play_1').html('');
        $('.play_2').html('');
        $('.play_3').html('');
        for (let i = 0; i < 3; i++) {
            player[i].poker = []
        }
        gameData.select.type = 0;
        gameData.select.poker = [];
        gameData.select.max = 0;
        gameData.desktop.type = 0;
        gameData.desktop.poker = [];
        gameData.desktop.max = 0;
        $(".profile .remainder").css("display", "none")
        $(".beishu").css("display","none");
        gameData.multiple=1;
        $(".dizhu_img").css({left: "45%",top:"-10px"}).css("display","none")

        gameRun();
    })
    $(".button-area").find(".button-end").on("click", () => {
        window.location.href = "the-first-page.html"
    })
})