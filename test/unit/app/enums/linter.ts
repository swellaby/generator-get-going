'use strict';

import chai = require('chai');
import Linter = require('../../../../generators/app/enums/linter');
const assert = chai.assert;

suite('Linter Tests:', () => {
    test('Should have correct value for golint', () => {
        assert.deepEqual(Linter.golint, 'golint');
    });

    test('Should have correct value for revive', () => {
        assert.deepEqual(Linter.revive, 'revive');
    });
});