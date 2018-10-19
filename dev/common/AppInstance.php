<?php

use yii\base\Object;
use yii\helpers\ArrayHelper;
use common\helpers\Utility;


/**
 * Class AppInstance
 */
class AppInstance extends Object
{
    /**
     * @var
     */
    private static $settings;
    private static $uniqueId;
    
    /**
     * Called on bootstrap of the app
     * @param \yii\base\Application $application
     */
    public static function systemInit()
    {   

        if (!self::$settings) {
            self::$settings = json_decode(file_get_contents(__DIR__ . '/../config.json'),true);
            $env = self::getSettings('environment.env');
            $s = self::$settings;
            if (file_exists(__DIR__ . "/../config-$env.json")) {
                $l = json_decode(file_get_contents(__DIR__ . "/../config-$env.json"),true);
                $s = ArrayHelper::merge($s, $l);
            }
            if (file_exists(__DIR__ . '/../config-local.json')) {
                $l = json_decode(file_get_contents(__DIR__ . '/../config-local.json'),true);
                $s = ArrayHelper::merge($s, $l);
            }
            self::$settings = json_decode(json_encode($s));
        }

        self::$uniqueId = rand(1000, 2000000000);

    }
    public static function beginTransaction($isolationLevel = null, $options = null)
    {
        return \Yii::$app->db->beginTransaction($isolationLevel);
    }

    public static function beforeRun()
    {
        Yii::$app->formatter->defaultTimeZone = self::getSettings('environment.timezone','Asia/Kolkota');
    }
   
    /**
     * @param string|null $filter optional criteria to filter what settings to return
     */
    public static function getSettings($filter = null,$default = null)
    {    
        if ($filter)
            return Utility::getValue(self::$settings,$filter,$default);
        else
            return self::$settings;
    }
    public static function currentUserId()
    {
        if (isset(Yii::$app->user))
            return Yii::$app->user->id;
        return null;
    }

    public static function currentUser()
    {
        if (isset(Yii::$app->user))
            return Yii::$app->user->identity;
        return null;
    }

    public static function currentUserCan($permission)
    {
        if (isset(Yii::$app->user))
            return Yii::$app->user->can($permission);
        return false;
    }

    public static function cacheGet($key)
    {
        return Yii::$app->cache->get($key);
    }

    public static function cacheSet($key,$value,$duration = 0,$dependency = null)
    {
        return Yii::$app->cache->set($key,$value,$duration,$dependency);
    }

    public static function cacheDelete($key)
    {
        return Yii::$app->cache->delete($key);
    }

    public static function cacheExists($key)
    {
        return Yii::$app->cache->exists($key);
    }
}