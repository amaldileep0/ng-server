<?php 

namespace api\modules\v1\controllers;


use Yii;
use yii\data\ActiveDataProvider;
use common\models\User;
use api\controllers\ApiBaseController;
use api\modules\v1\components\responses\ApiResponse;

class UserController extends ApiBaseController
{	

	/**
	 * @inheritdoc
	 */
	public function behaviors()
	{
		$behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'get-all-users' => ['GET'],
            ]
        ];
        return $behaviors;
	}

	/**
	 * Index action
	 * @return $statusCode int
	*/
	public function actionIndex()
	{
		throw new \yii\web\HttpException(404);
	}
	public function actionGetAllUsers()
	{	
		$return = [];
		try {
			$users = User::find()->asArray()->all();
	        if ($users) {
	        	foreach ($users as $key => $user) {
	        		$return['users'][$key]['id'] = $user['id'];
	        		$return['users'][$key]['email'] = $user['email'];
	        		$return['users'][$key]['firstName'] = $user['first_name'];
	        		$return['users'][$key]['lastName'] = $user['last_name'];
	        		$return['users'][$key]['createdAt'] = $user['created_at'];
	        	}
	    	}
	    	$this->statusCode = 200;
    		$this->data = $return;
    		$this->message = "";
		} catch (Exception $e) {
			$this->statusCode = 500;
    		$this->data = $return;
    		$this->message = "Someting went wrong while fetching users.";
		}
    	return new ApiResponse($this->statusCode,$this->data,$this->message);
	}
}