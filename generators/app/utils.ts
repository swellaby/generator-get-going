'use strict';

import path = require('path');

export const templateRootPath = path.join(__dirname, 'templates');
export const projectsTemplateRootPath = path.join(templateRootPath, 'projects');
export const sharedTemplateRootPath = path.join(templateRootPath, 'shared');
export const conditionalTemplatesRootPath = path.join(templateRootPath, 'conditional');
export const taskRunnerTemplatesRootPath = path.join(conditionalTemplatesRootPath, 'task-runners');