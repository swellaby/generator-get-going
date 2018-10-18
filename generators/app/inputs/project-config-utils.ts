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

    await Promise.all(settings.map(async setting => {
        try {
            const option = generator.options[setting.optionName];
            if (!setting.tryExtractOptionValue(option, config)) {
                const answer = await generator.prompt([setting.prompt]);
                setting.tryExtractOptionValue(answer[setting.prompt.name], config);
            }
        } catch (err) {
            return reject(new Error(fatalErrorMessage));
        }
    }));

    resolve(config);
});

export {
    addGeneratorOptions,
    getDesiredProjectConfig
};