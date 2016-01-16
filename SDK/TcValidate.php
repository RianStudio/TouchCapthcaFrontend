<?php

namespace  SDK;


/**
 * Created by PhpStorm.
 * User: yu
 * Date: 16/1/16
 * Time: 下午5:43
 */
class TcValidate
{
     protected $location ;
    protected $k ;
    protected $v ;

    function __construct($k,$v,$location)
    {
        $this->k=$k;
        $this->v=$v;
        $this->location=$location;

    }


    public function validate(){
        //得到数据,和后台进行检测
        

    }


    private function curl($url,$arr){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // post数据
        curl_setopt($ch, CURLOPT_POST, 1);
        // post的变量
        curl_setopt($ch, CURLOPT_POSTFIELDS, $arr);
        $output = curl_exec($ch);
        curl_close($ch);
        //打印获得的数据
        return $output;

    }
}