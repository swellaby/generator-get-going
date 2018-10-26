'use strict';

import chai = require('chai');
import linterInput = require('../../../../generators/app/inputs/linter-input');
import nameInput = require('../../../../generators/app/inputs/name-input');
import ownerInput = require('../../../../generators/app/inputs/owner-input');
import projectInputs = require('../../../../generators/app/inputs/project-inputs');
import taskRunnerInput = require('../../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../../generators/app/inputs/vscode-input');
const assert = chai.assert;

suite('projectInputs Tests:', () => {
    test('Should have correct number of inputs', () => {
        assert.deepEqual(projectInputs.length, 6);
    });

    test('Should have correct first input', () => {
        const input = projectInputs[0];
        assert.deepEqual(input, nameInput.input);
    });

    test('Should have correct second input', () => {
        const input = projectInputs[1];
        assert.deepEqual(input, ownerInput.input);
    });

    test('Should have correct third input', () => {
        const input = projectInputs[2];
        assert.deepEqual(input, typeInput.input);
    });

    test('Should have correct fourth input', () => {
        const input = projectInputs[3];
        assert.deepEqual(input, linterInput.input);
    });

    test('Should have correct fifth input', () => {
        const input = projectInputs[4];
        assert.deepEqual(input, taskRunnerInput.input);
    });

    test('Should have correct sixth input', () => {
        const input = projectInputs[5];
        assert.deepEqual(input, vscodeInput.input);
    });
});