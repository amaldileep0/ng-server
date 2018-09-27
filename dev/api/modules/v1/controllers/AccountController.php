<?php

namespace api\modules\v1\controllers;

use yii;
use yii\helpers\ArrayHelper;
use common\models\LoginForm;
use api\controllers\ApiBaseController;
use yii\filters\AccessControl;
use api\modules\v1\components\responses\ApiResponse;
/**
 * Default controller for the `v1` module
 */
class AccountController extends ApiBaseController
{	

	public function behaviors()
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [
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
                ],
                 
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
        $obj = new \stdClass();
        if ($model->load(Yii::$app->getRequest()->getBodyParams(), '') && $model->login()) {
            $obj->token = Yii::$app->user->identity->token->token;
            $this->statusCode = 200;
            $this->data = $obj;
            $this->message = "Login Successfull.";
        } else {
            $this->statusCode = 400;
            $this->data = null;
            $this->message = "Incorrect username or password.";
        }
        return new ApiResponse($this->statusCode, $this->data, $this->message);
    }

    public function actionLogout() 
    {
        die('dead');
    }
    public function actionResetPassword()
    {

    }
}
