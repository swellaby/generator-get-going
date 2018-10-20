'use strict';

import chai = require('chai');
import promptType = require('../../../../generators/app/enums/prompt-type');
const assert = chai.assert;

suite('PromptType Tests:', () => {
    test('Should have correct value for input prompt type', () => {
        assert.deepEqual(promptType.input, 'input');
    });

    test('Should have correct value for confirm prompt type', () => {
        assert.deepEqual(promptType.confirm, 'confirm');
    });

    test('Should have correct value for list prompt type', () => {
        assert.deepEqual(promptType.list, 'list');
    });
});