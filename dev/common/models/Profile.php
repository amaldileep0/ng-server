<?php

namespace common\models;

use Yii;
use yii\web\UploadedFile;

/**
 * This is the model class for table "profile".
 *
 * @property int $id
 * @property int $user_id
 * @property int $age
 * @property string $image
 * @property string $gender
 * @property int $dob
 * @property string $address
 *
 * @property User $user
 */
class Profile extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'profile';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id'], 'required'],
            [['user_id', 'age', 'dob'], 'integer'],
            [['gender'], 'string'],
            [['address'], 'string', 'max' => 150],
            [['image'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
            [['user_id'], 'unique'],
            [['id'], 'unique'],
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
            'age' => Yii::t('app', 'Age'),
            'image' => Yii::t('app', 'Image'),
            'gender' => Yii::t('app', 'Gender'),
            'dob' => Yii::t('app', 'Dob'),
            'address' => Yii::t('app', 'Address'),
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
     * @return \common\models\Query\ProfileQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\Query\ProfileQuery(get_called_class());
    }

    public function upload()
    {
        if ($this->validate()) {
            $path = Yii::getAlias('@service');
            $target_dir = "/profileImages/";
            $filePath = $path.$target_dir;
            if (!file_exists($filePath)) {
                mkdir($filePath, 0777, true);
            }
            $filename = $target_dir.$this->image->baseName . '.' . $this->image->extension;
            if ($this->image->saveAs($path.$filename)) {
                return ['status' => true, 'path' => $filename];    
            }
        } 
        return ['status' => false, 'path' => ''];
    
    }
}
