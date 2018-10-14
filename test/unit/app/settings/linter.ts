'use strict';

import chai = require('chai');
import linter = require('../../../../generators/app/settings/linter');
const assert = chai.assert;

suite('Linter Tests:', () => {
    test('Should have correct value for golint', () => {
        assert.deepEqual(linter.goLint, 0);
    });

    test('Should have correct value for revive', () => {
        assert.deepEqual(linter.revive, 2);
    });
});