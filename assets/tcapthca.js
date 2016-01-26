/**
 * Created by yu on 16/1/26.
 */
createHtml();
init();
function  init(){
    showA();
    showD();
    //读取配置文件
    $.ajaxSettings.async = false;
    $.getJSON("assets/tconfig.json",function(data){
        tc_app_key=data.conf.sk;
        tc_app_secret=data.conf.ss;
        ajax_url=data.server.getUrl;
    });
    $.ajaxSettings.async = true;
    var massage;
    //没有加载的时候需要展示的图片
    //js流程,加载完成之后,进行数据的展示
    massage=new Object();
    $.ajax({
        type: "GET",
        url: ajax_url,
        data: {k:tc_app_key, s:tc_app_secret},
        dataType: "json",
        success: function(data){
            //对返回结果进行判断
            if(data.type == 0){
                showA();
                hiddenD();
                //文字改成验证失败
                $("#div-a").html("请检查APP密钥,通讯失败!");
            }else{

                showC();
                massage=data;
                console.log(data);
                initDraggable(massage);
                //存入本地cookie,放到隐藏文本域
                $.cookie('tc_cookie', data.c);
            }
        },
        error : function() {
            console.log("加载失败啦~");
        },
        beforeSend:function(){
            showA();
        }
    });

    function initDraggable(massage){
        showInput()
        //初始化图片
        var pic=massage.a;
        var bg_pic=massage.r;
        var icon=massage.w;
        //进行按钮的裁剪
        $("#drag_img").attr("src",icon);
        $("#div-c").css('background',"url('"+pic+"')");
        $("#div-b").css('background',"url('"+bg_pic+"')");
        //初始化碎片所在位置
        $('#but-u').css('top',0);
        $('#but-u').css('left',0);
        //碎片随机移动
        //ajax获取对应的坐标
        var fix=10;
        $("#but-u").draggable(
            {
                containment: "parent",
                create: function (event, ui) {

                }, drag: function (event, ui) {
                // Keep the left edge of the element
                // at least 100 pixels from the container
                ui.position.left = Math.min(250, ui.position.left);
//                        $("#drag").addClass('but-drag');
                showC();
                //console.log('left:'+ui.position.left+'  top:'+ui.position.top);

            }, stop: function (event, ui) {

                setHiddenValue(ui.position.left,ui.position.top,tc_app_key,tc_app_secret);
                //停止之后,进行检测
                if( Math.abs( ui.position.left - massage.x )  < fix && Math.abs( ui.position.top - massage.y )  < fix  ){
                    showCom();
                    showB();
                }
            }
            }
        );
    }
}

function createHtml(){
    var box_1=$("<div></div>").attr({"id":"box_1","class":"box_1"});
    var box_2=$("<div></div>").attr({"id":"box_2","class":"box_2"});

    var input_1 = $("<input />").attr({"type":"hidden","name":"tc_key","id":"tc_key"});
    var input_2 = $("<input />").attr({"type":"hidden","name":"tc_base","id":"tc_base"});
    var input_3 = $("<input />").attr({"type":"hidden","name":"tc_postion","id":"tc_postion"});
    var input_4 = $("<input />").attr({"type":"hidden","name":"tc_cookie","id":"tc_cookie"});

    var div_a=$("<div></div>").attr({"id":"div-a","class":" div-a pic-k "});
    var div_b=$("<div></div>").attr({"id":"div-b","class":" div-b pic-k "});
    var div_c=$("<div></div>").attr({"id":"div-c","class":" div-c pic-k "});

    var img_drag=$("<div></div>").attr({"id":"but-u","class":" but "});
    var img_img=$("<img />").attr({"src":"xxx","id":"drag_img"});

    var em = $("<em><em/>").attr({"id": "wtext"}).html("拖拽图片进行验证");
    var but=$("<button>").attr("type","button").html("重新载入图片").click(function(){init()});

    box_2.append(em,but);
    img_drag.append(img_img);
    div_c.append(img_drag);
    box_1.append(input_1,input_2,input_3,input_4,div_a,div_b,div_c);
    $("#captchca_box").append(box_1,box_2);
}

function setHiddenValue(x,y,key,secret){
    //获取对应的key
    //简单的加密
    $.base64.utf8encode = true;
    var postion_str= $.base64.btoa($.base64.btoa(x.toString()) + "cute" + $.base64.btoa(y.toString()));
    var s= $.base64.btoa(secret);
    var tc_key= $.base64.btoa(key);
    $("#tc_base").val(s);
    $("#tc_key").val(tc_key);
    $("#tc_postion").val(postion_str);
    $("#tc_cookie").val($.cookie('tc_cookie'));

}



function showInput(){
    $("#wtext").html("等待验证~");
}

function showCom(){
    $("#wtext").html("验证完成~");

}

function showD(){
    $("#box_2").removeClass('hidden');
}

function hiddenD(){
    $("#box_2").addClass('hidden');
}

function showA(){
//        $( "#div-a" ).addClass('hidden');
    $( "#div-b" ).addClass('hidden');
    $( "#div-c" ).addClass('hidden');
    $( "#div-a" ).removeClass('hidden');
//        $( "#div-b" ).removeClass('hidden');
//        $( "#div-c" ).removeClass('hidden');
}
function showB(){
    $( "#div-a" ).addClass('hidden');
//        $( "#div-b" ).addClass('hidden');
    $( "#div-c" ).addClass('hidden');
//        $( "#div-a" ).removeClass('hidden');
    $( "#div-b" ).removeClass('hidden');
//        $( "#div-c" ).removeClass('hidden');
}
function showC(){
    $( "#div-a" ).addClass('hidden');
    $( "#div-b" ).addClass('hidden');
//        $( "#div-c" ).addClass('hidden');
//        $( "#div-a" ).removeClass('hidden');
//        $( "#div-b" ).removeClass('hidden');
    $( "#div-c" ).removeClass('hidden');
}
