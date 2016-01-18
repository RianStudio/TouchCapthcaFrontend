<?php
//error_reporting();
use SDK\TcValidate;
/**
 * Created by PhpStorm.
 * User: yu
 * Date: 16/1/8
 * Time: 上午10:26
 */



$value=new TcValidate($_REQUEST['tc_key'],$_REQUEST['tc_base'],$_REQUEST['tc_postion']);

//$result=$value->validate();

var_dump($value);
//这里需要前端访问的类对传递上来的数据进行再次的校验

