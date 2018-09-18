<?php

namespace api\modules\v1\controllers;

use yii;
use api\modules\v1\components\responses\ApiResponse;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\ContentNegotiator;
use yii\filters\AccessControl;
use api\components\ApiAuth;
use yii\helpers\ArrayHelper;
use common\models\LoginForm;
use yii\web\Response;

/**
 * Default controller for the `v1` module
 */
class AccountController extends \yii\rest\Controller
{	
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
                'authenticator' => [
                    'class' => ApiAuth::className(),
                    'only' => ['logout']
                ],
                'verbs' => [
                    'class' => \yii\filters\VerbFilter::className(),
                    'actions' => [
                        'login' => ['POST'],
                        'logout' => ['POST'],
                    ]
                ],
                'access' => [
                    'class' => AccessControl::className(),
                    'only' => ['logout'],
                    'rules' => [
                        [
                            'actions' => ['logout'],
                            'allow' => true,
                            'roles' => ['@'],
                        ],
                    ],
                ]
            ]
        );
    }

    /*
    *Default action
    */
	public function actionIndex() 
	{	
        throw new \yii\web\HttpException(404);
	}

    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->getRequest()->getBodyParams(), '') && $model->login()) {
            return [
                'token' => Yii::$app->user->identity->token->token
            ];
        } else {
            $model->validate();
            return $model;
        }
    }

    public function actionLogout() 
    {

    }
    public function actionResetPassword()
    {

    }
}
