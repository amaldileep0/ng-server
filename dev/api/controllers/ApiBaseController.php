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
    public $error;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);
        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                // restrict access to
                'Origin' => ['http://localhost:4200'], 
                // Allow only POST and PUT methods
                'Access-Control-Request-Method' => ['GET', 'POST','OPTIONS','DELETE'],
                 // Allow only headers 'X-Wsse'
                'Access-Control-Request-Headers' => ['*'],
                // Allow credentials (cookies, authorization headers, etc.) to be exposed to the browser
                'Access-Control-Allow-Credentials' => true,
                // Allow the X-Pagination-Current-Page header to be exposed to the browser.
                'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page'],
            ],
        ];
        $behaviors['bootstrap'] = [
            'class' => ContentNegotiator::className(),
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];
        //re-add authentication filter
        $behaviors['authenticator'] = [
            'class' => ApiAuth::className()
        ];
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        $behaviors['authenticator']['except'] = ['options', 'login', 'register'];
        return $behaviors;
    }
}