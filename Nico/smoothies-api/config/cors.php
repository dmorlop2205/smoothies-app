<?php

return [
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Development: allow any origin (tighten in production).
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Wildcard origins require credentials to be false.
    'supports_credentials' => false,
];

