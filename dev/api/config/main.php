<?php
return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'defaultRoute' => 'v1/account',
    'bootstrap' => ['log'],
    'modules' => [
        'v1' => [
            'class' => 'api\modules\v1\module'
        ]
    ],
    'components' => [
       'user' => [
            'identityClass' => 'common\models\User',
            'enableSession' => false,
            'loginUrl' => null,
            'enableAutoLogin' => true,
        ],
        'request' => [
            'class' => '\yii\web\Request',
            'enableCookieValidation' => false,
                'parsers' => [
                'application/json' => 'yii\web\JsonParser',
                'multipart/form-data' => 'yii\web\MultipartFormDataParser'
            ],
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'format' => yii\web\Response::FORMAT_JSON,
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                if ($response->data !== null) {
                    $response->data = [
                        'success' => $response->isSuccessful,
                        'body' => $response->data,
                    ];
                }
            },
        ],

        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'info', 'trace'],
                ],
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                    'categories' => ['yii\web\HttpException:*'],
                    'logFile' => '@app/runtime/logs/http_errors.log',
                ],
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['info'],
                    'categories' => ['api_request'],
                    'logFile' => '@app/runtime/logs/api_request.log',
                    'logVars' => [],
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules'=>[
                'v1/user/delete/<id:\d+>' => 'v1/user/delete',
                'v1/user/edit/<id:\d+>' => 'v1/user/edit',
                '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>'
            ]
        ],     
    ],
    'params' => [
        'adminEmail' => getenv('ADMIN_EMAIL')
    ],
];
