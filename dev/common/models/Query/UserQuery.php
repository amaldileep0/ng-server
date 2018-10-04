<?php

namespace common\models\Query;

/**
 * This is the ActiveQuery class for [[\common\models\UserToken]].
 *
 * @see \common\models\UserToken
 */
class UserQuery extends \yii\db\ActiveQuery
{
    
   /* public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \common\models\UserToken[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\UserToken|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
    public function joinAuth()
    {
        $this->join('INNER JOIN','{{%auth_assignment}}','`user`.`id` =  `auth_assignment`.`user_id`');
        $this->join('INNER JOIN','{{%auth_item}}','`auth_item`.`name` =  `auth_assignment`.`item_name`');
        return $this;
    }
    public function getCustomers() 
    {
        $this->andWhere(['`auth_item`.`name`' => ['CUSTOMER']]);
        return $this;
    } 
   
}
