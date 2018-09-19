<?php

namespace api\components;

use yii\filters\auth\AuthMethod;
use yii\web\UnauthorizedHttpException;
use api\components\ApiRequestHandler;
use yii;

class ApiAuth extends AuthMethod
{
    
    public function authenticate($user, $request, $response)
    {   
        $apirequestHandler = new ApiRequestHandler();
        $apirequestHandler->setRequestData();
        if ($apirequestHandler->header->status == 200) {
            $authToken = $request->getHeaders()->get('token');
            if ($authToken !== null) {
                $identity = $user->loginByAccessToken($authToken, get_class($this));
                if ($identity === null) {
                    yii::info("AuthToken is missing/Invalid", 'api_request');
                    $this->handleFailure($response);
                }
                try{
                    $identity->token->touch('lastaccess_at');
                } catch (Exception $e) {
                }
                return $identity;
            }
                return null;
        } else {
            throw new yii\web\BadRequestHttpException;
        }
    }

    public function challenge($response)
    {

    }
    public function handleFailure($response)
    {
        throw new UnauthorizedHttpException;
    }
}