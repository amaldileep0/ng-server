<?php

namespace api\controllers;

use yii\filters\ContentNegotiator;
use yii\helpers\ArrayHelper;
use api\components\ApiAuth;
use yii\web\Response;
use yii;

class ApiBaseController extends \yii\rest\Controller
{   
    public $statusCode;
    public $data;
    public $message = "";

    /*
    * Set JSON as default API format
    */
    public function behaviors()
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [
                'bootstrap'=> [
                        'class' => ContentNegotiator::className(),
                    'formats' => [
                        'application/json' => Response::FORMAT_JSON,
                    ],
                ],
                    'corsFilter' => [
                        'class' => \yii\filters\Cors::className(),
                    ],
                    'authenticator' => [
                        'class' => ApiAuth::className(),
                        'except' =>['login']
                    ],
            ]
        );
    }
}