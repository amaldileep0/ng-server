<?php 

namespace api\modules\v1\controllers;


use Yii;
use yii\data\ActiveDataProvider;
use common\models\User;
use api\controllers\ApiBaseController;
use api\modules\v1\components\responses\ApiResponse;
use common\models\RegisterForm;
use common\models\Profile;
use yii\web\NotFoundHttpException;
use AppInstance;

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
                'get-user' => ['GET'],
                'delete' => ['DELETE'],
                'edit' => ['POST']
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
	    	} else {
	    		$return['users'] = [];
	    	}
	    	$this->statusCode = 200;
    		$this->data = $return;
    		$this->message = "";
		} catch (Exception $e) {
			$this->statusCode = 500;
    		$this->data = $return;
    		$this->message = "Someting went wrong while fetching users.";
		}
    	return new ApiResponse($this->statusCode, $this->data, $this->message);
	}
	public function actionRegister()
	{	
		$return = [];
		$model = new RegisterForm();
		if ($model->load(Yii::$app->getRequest()->getBodyParams(), '')) {
			if ($model->signup()) {
                $this->statusCode = 200;
                $this->data = $return;
                $this->message = "Registration successful.";
            } else {
            	$return['error'] = $model->getErrors();
            	$this->statusCode = 400;
                $this->data = $return;
                $this->message = "Something went wrong while saving data";
            }
		} 
		return new ApiResponse($this->statusCode,$this->data,$this->message); 
	}
	public function actionDelete($id)
	{
		$user = $this->findModel($id);
		if($user->delete()) {
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
		} else {
			return null;
		}
	}
	public function actionGetUser($id)
	{	
		$return = [];
		$user = $this->findModel($id);
		if ($user) {
			$profile = $user->profile;
			$return['user']['id'] = $user->id;
	        $return['user']['email'] = $user->email;
	        $return['user']['firstName'] = $user->first_name;
	        $return['user']['lastName'] = ($user->last_name) ? $user->last_name : "Not avialable";
	        $return['user']['createdAt'] = date('d-M-Y H:i:s',$user->created_at);
	        
	        $return['user']['age'] = isset($profile->age) ? $profile->age : "" ;
	        $return['user']['image'] = isset($profile->image) ? $profile->image : ""; 
	        $return['user']['gender'] = isset($profile->gender) ? $profile->gender : "";
	        $return['user']['dob'] = isset($profile->dob) ? date('Y-m-d',$profile->dob) : "";
	        $return['user']['address'] = isset($profile->address) ? $profile->address : "";
	        
	        $this->statusCode = 200;
	        $this->message = "";
	        $this->data = $return;
		} else {
			$this->statusCode = 404;
			$this->message = "The requested user does not exist.";
			$this->data = new \stdClass();
		}
		return new ApiResponse($this->statusCode,$this->data,$this->message);
	}
	public function actionEdit()
	{
		$bodyparams = Yii::$app->getRequest()->getBodyParams();
		if ($bodyparams['id']) {
			$transaction = \AppInstance::beginTransaction();
			try {
				$user = $this->findModel($bodyparams['id']);
				if($user) {
					$profile = $user->profile;
					if(!$profile) {
						$profile = new Profile();
						$profile->user_id = $user->id;
					}
					$user->email = $bodyparams['email'];
					$user->first_name = $bodyparams['firstName'];
					$user->last_name = $bodyparams['lastName'];
					
					$profile->age = $bodyparams['age'];
					$profile->address = $bodyparams['address'];
					$profile->gender = $bodyparams['gender'];
					$profile->dob = ($bodyparams['dob']) ? strtotime(implode('-', $bodyparams['dob'])) : null;
					if ($profile->save() && $user->save()) {
						$transaction->commit();
						$this->statusCode = 200;
						$this->message = "Updated successful.";
						$this->data = new \stdClass();
					} else {
						$transaction->rollback();
						$error1 = $user->getErrors();
						$error2 = $profile->getErrors();

						if ($error1 || $error2) {
							$this->statusCode = 400;
							$this->message = "Validation failed";
							$this->data = ['error' => array_merge($error1,$error2) ];
						} else {
							$this->statusCode = 200;
							$this->message = "Updated successfully.";
							$this->data = new \stdClass();
						}
					}
				} else {
					$this->statusCode = 404;
					$this->message = "The requested user does not exist.";
					$this->data = new \stdClass();
				}
				
			} catch (Exception $e) {
				$transaction->rollback();
				$this->statusCode = 500;
				$this->message = "Someting went wrogn while saving user";
				$this->data = new \stdClass();
			}
		} else {
			$this->statusCode = 400;
			$this->message = "Parameter missing";
			$this->data = new \stdClass();
		}
		return new ApiResponse($this->statusCode,$this->data,$this->message);
	}

}