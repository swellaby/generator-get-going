'use strict';

module.exports = {
    extends: '@swellaby/eslint-config/lib/bundles/ts-node',
    overrides: [
        {
            files: [ 'generators/**/*.js' ],
            rules: {
                quotes: [ 'off' ]
            }
        },
        {
            files: [ 'test/integration/int-test-utils.js' ],
            rules: {
                'max-len': [ 'off' ]
            }
        }
    ]
};
