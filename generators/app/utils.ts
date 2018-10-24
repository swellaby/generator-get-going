'use strict';

import path = require('path');

export const templateRootPath = path.join(__dirname, 'templates');
export const conditionalTemplatesRootPath = path.join(templateRootPath, 'conditional');
export const taskRunnerTemplatesRootPath = path.join(conditionalTemplatesRootPath, 'task-runners');