<?php
namespace console\controllers;

use Yii;
use yii\console\Controller;

class RbacController extends Controller
{ 

    public function actionCreateRole()
    {   
        
        $auth = Yii::$app->authManager;
        //adds super admin role
        $super = $auth->createRole('SUPERADMIN');
        $auth->add($super);
        
        //adds staff role
        $staff = $auth->createRole('STAFF');
        $auth->add($staff);

        //adds staff role
        $customer = $auth->createRole('CUSTOMER');
        $auth->add($customer);
          
        //adds admin role,and sets admin as superadmin's child
        $admin = $auth->createRole('ADMIN');
        $auth->add($admin);

        $auth->addChild($super, $admin);

        $auth->assign($super, 1);
    }
}