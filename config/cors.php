<?php

return [

    'paths' => ['api/*', 'score/*', '*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['https://g-score-go-fe.vercel.app'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
