<?php 

namespace api\modules\v1\controllers;


use Yii;
use yii\data\ActiveDataProvider;
use common\models\User;
use api\controllers\ApiBaseController;
use api\modules\v1\components\responses\ApiResponse;
use common\models\RegisterForm;
use yii\web\NotFoundHttpException;

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
                'register' => ['POST'],
                'delete' => ['DELETE']
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
			$users = User::find()->joinAuth()->getCustomers()->asArray()->all();
	        if ($users) {
	        	foreach ($users as $key => $user) {
	        		$return['users'][$key]['id'] = $user['id'];
	        		$return['users'][$key]['email'] = $user['email'];
	        		$return['users'][$key]['firstName'] = $user['first_name'];
	        		$return['users'][$key]['lastName'] = $user['last_name'];
	        		$return['users'][$key]['createdAt'] = date('d-M-Y H:i:s',$user['created_at']);
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
	public function actionRegister()
	{	
		$return = [];
		$model = new RegisterForm();
		if ($model->load(Yii::$app->getRequest()->getBodyParams(), '')) {
			//$model->firstName = "";
			if ($model->signup()) {
                $this->statusCode = 200;
                $this->data = $return;
                $this->message = "Registration successful.";
            } else {
            	$return['error'] = $model->getErrors();
            	$this->statusCode = 400;
                $this->data = $return;
                $this->message = "";
            }
		} 
		return new ApiResponse($this->statusCode,$this->data,$this->message); 
	}
	public function actionDelete($id)
	{
		$user = $this->findModel($id);
		if($user->delete()){
			$auth = \Yii::$app->authManager;
			$auth->revokeAll($id);
			$this->statusCode = 204;
		} else {
			$this->statusCode = 500;
		}
		return new ApiResponse($this->statusCode);
	}
	protected function findModel($id)
	{
		if (($model = User::findOne($id)) !== null) {
			return $model;
		}
		throw new NotFoundHttpException('The requested page does not exist.');
	}

}