'use strict';

import chai = require('chai');
import projectInputs = require('../../../../generators/app/inputs/project-inputs');
import nameInput = require('../../../../generators/app/inputs/name-input');
import typeInput = require('../../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');
const assert = chai.assert;

suite('projectInputs Tests:', () => {
    test('Should have correct number of inputs', () => {
        assert.deepEqual(projectInputs.length, 3);
    });

    test('Should have correct first input', () => {
        const input = projectInputs[0];
        assert.deepEqual(input, nameInput.input);
    });

    test('Should have correct second input', () => {
        const input = projectInputs[1];
        assert.deepEqual(input, typeInput.input);
    });

    test('Should have correct third input', () => {
        const input = projectInputs[2];
        assert.deepEqual(input, vscodeInput.input);
    });
});