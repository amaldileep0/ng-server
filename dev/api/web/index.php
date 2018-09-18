<?php

// Composer
require(__DIR__ . '/../../vendor/autoload.php');

// Environment
require(__DIR__ . '/../../common/Environment.php');

$environment = new Environment([
    //'envVar'=>'YII_ENV',
    //'env'=>null,
    //'debugVar'=>'YII_DEBUG',
    //'debug'=>null,
]);


// Yii
require(__DIR__ . '/../../vendor/yiisoft/yii2/Yii.php');

// Bootstrap application
require(__DIR__ . '/../../common/config/bootstrap.php');

// AppInstance
require(__DIR__ . '/../../common/AppInstance.php');
AppInstance::systemInit();

$config = yii\helpers\ArrayHelper::merge(
    require __DIR__ . '/../../common/config/main.php',
    require __DIR__ . '/../../common/config/main-local.php',
    require __DIR__ . '/../config/main.php'
);

$app = new yii\web\Application($config);
AppInstance::beforeRun();
$app->run();



