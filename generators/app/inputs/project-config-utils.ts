'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('../project-config');
import IProjectSetting = require('../settings/project-setting');

const fatalErrorMessage = 'Something awful happened! Please open an issue on GitHub';

const addGeneratorOptions = (generator: YeomanGenerator, settings: IProjectSetting[]) => {
    if (!generator || !settings || settings.length === 0) {
        throw new Error(fatalErrorMessage);
    }

    settings.forEach(setting => {
        generator.option(setting.optionName, setting.option);
    });
};

const getDesiredProjectConfig = async (generator: YeomanGenerator, settings: IProjectSetting[]) => new Promise<IProjectConfig>(async (resolve, reject) => {
    if (!generator || !settings || settings.length === 0) {
        return reject(new Error(fatalErrorMessage));
    }

    const config: IProjectConfig = <IProjectConfig>{};
    const missingSettings: IProjectSetting[] = [];
    const prompts: YeomanGenerator.Question[] = [];

    try {
        settings.forEach(setting => {
            const option = generator.options[setting.optionName];
            if (!setting.tryExtractSettingValue(option, config)) {
                prompts.push(setting.prompt);
                missingSettings.push(setting);
            }
        });

        if (prompts.length > 0) {
            const answers = await generator.prompt(prompts);
            missingSettings.forEach(setting => {
                setting.tryExtractSettingValue(answers[setting.prompt.name], config);
            });
        }
        return resolve(config);
    } catch (err) {
        return reject(new Error(fatalErrorMessage));
    }
});

export {
    addGeneratorOptions,
    getDesiredProjectConfig
};