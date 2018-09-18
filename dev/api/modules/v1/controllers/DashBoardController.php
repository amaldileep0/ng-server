<?php 

namespace api\modules\v1\controllers;


use Yii;
use yii\helpers\ArrayHelper;
use api\controllers\ApiBaseController;


class DashBoardController extends ApiBaseController
{
	
	/**
	 * @inheritdoc
	 */
	public function behaviors()
	{
		return ArrayHelper::merge(
			parent::behaviors(),
			[
				'verbs' => [
						'class' => \yii\filters\VerbFilter::className(),
						'actions' => []
				],
			]
		);
	}

	/**
	 * Index action
	 * @return $statusCode int
	*/
	public function actionIndex()
	{
		throw new \yii\web\HttpException(404);
	}
}