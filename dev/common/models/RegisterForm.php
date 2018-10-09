<?php
namespace common\models;

use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class RegisterForm extends Model
{
    public $email;
    public $password;
    public $firstName;
    public $lastName;
    public $confirmPass;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['firstName', 'trim'],
            ['firstName', 'required'],
            ['firstName', 'string', 'min' => 3, 'max' => 255],
            ['lastName', 'trim'],
            ['lastName', 'required'],
            ['lastName', 'string', 'min' => 1, 'max' => 255],
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This email address has already been taken.'],
            ['password', 'required'],
            ['password', 'string', 'min' => 6],
            ['confirmPass', 'compare', 'compareAttribute' => 'password'],
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }
            $user = new User();
            $user->email = $this->email;
            $user->setPassword($this->password);
            $user->first_name = $this->firstName;
            $user->last_name = $this->lastName;
            $user->generateAuthKey();
            $user->save();
            try {
                $this->setAuth($user);
            } catch (Exception $e) {
                $user->delete();
                $user = null;
            }
        return $user;
    }

    protected function setAuth($user)
    {
        $auth = \Yii::$app->authManager;
        $customerRole = $auth->getRole('CUSTOMER');
        $auth->assign($customerRole, $user->getId());

    }
}
