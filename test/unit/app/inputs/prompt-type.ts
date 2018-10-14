'use strict';

import chai = require('chai');
import promptType = require('../../../../generators/app/inputs/prompt-type');
const assert = chai.assert;

suite('PromptType Tests:', () => {
    test('Should have correct value for input prompt type', () => {
        assert.deepEqual(promptType.input, 'input');
    });

    test('Should have correct value for confirm prompt type', () => {
        assert.deepEqual(promptType.confirm, 'confirm');
    });
});