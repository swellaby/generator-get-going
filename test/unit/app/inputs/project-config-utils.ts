'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import IProjectConfig = require('../../../../generators/app/project-config');
import projectConfigUtils = require('../../../../generators/app/inputs/project-config-utils');

const assert = Chai.assert;

suite('projectConfigUtils Tests:', () => {
    suite('getDesiredProjectConfig Tests:', () => {
        test('Should return correct config', async () => {
            const config = await projectConfigUtils.getDesiredProjectConfig(null);
            assert.isNull(config);
        });
    });
});