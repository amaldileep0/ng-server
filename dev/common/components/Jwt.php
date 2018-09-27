<?php

namespace common\components;

use yii\base\BaseObject;
use yii\helpers\ArrayHelper;

class Jwt extends BaseObject
{
    protected $secret;

    function __construct($config = [])
    {
        $jwt = \AppInstance::getSettings('jwt');
        $this->secret = ArrayHelper::getValue($jwt,'key');
        parent::__construct($config);
    }

     /**
    * To create JWT
    * $payload : Create token payload as a JSON string 
    */
    function createJwt($payload=[])
    {   
        // Create token header as a JSON string
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        // Encode Header to Base64Url String
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        // Encode Payload to Base64Url String
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secret, true);
        // Encode Signature to Base64Url String
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        return $jwt;
    }
}
