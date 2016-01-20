<?php


include_once "../SDK/TcValidate.php";
//error_reporting();

/**
 * Created by PhpStorm.
 * User: yu
 * Date: 16/1/8
 * Time: 上午10:26
 */


    $value = new TcValidate();

    //var_dump($value);

    $result = $value->validate($_REQUEST['tc_key'], $_REQUEST['tc_base'], $_REQUEST['tc_postion']);

    var_dump($result);

    if ($result) {
        echo "yes";
    } else {
        echo "no";
    }
//这里需要前端访问的类对传递上来的数据进行再次的校验

