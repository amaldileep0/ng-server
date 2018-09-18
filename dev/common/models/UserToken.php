<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "user_token".
 *
 * @property int $id
 * @property int $user_id
 * @property string $token
 * @property int $created_at
 * @property string $timezone
 * @property int $lastaccess_at
 *
 * @property User $user
 */
class UserToken extends \yii\db\ActiveRecord
{   
    
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'updatedAtAttribute' => 'lastaccess_at',
                'value' => time(),
            ],
        ];
    }
    
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_token';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'created_at'], 'required'],
            [['user_id', 'created_at', 'lastaccess_at'], 'integer'],
            [['token'], 'string', 'max' => 255],
            [['timezone'], 'string', 'max' => 100],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'user_id' => Yii::t('app', 'User ID'),
            'token' => Yii::t('app', 'Token'),
            'created_at' => Yii::t('app', 'Created At'),
            'timezone' => Yii::t('app', 'Timezone'),
            'lastaccess_at' => Yii::t('app', 'Lastaccess At'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\Query\UserTokenQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Query\UserTokenQuery(get_called_class());
    }
}
