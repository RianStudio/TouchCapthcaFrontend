<?php



/**
 * Created by PhpStorm.
 * User: yu
 * Date: 16/1/16
 * Time: 下午5:43
 */
class TcValidate
{

    public function validate($k,$v,$location){

            //得到数据,和后台进行检测
            //通过get方式进行检测
            $url = "http://tback.localhost:8080/v";
        $pr=[
            'k'=>$k,
            'v'=>$v,
            'location'=>$location,
        ];

            $curl_result = $this->curl($url,$pr);

//            $result = ($curl_result == "1") ? 1 : 0;

            return $curl_result;

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