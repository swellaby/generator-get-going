'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('../project-config');
import IProjectSetting = require('../settings/project-setting');

const getDesiredProjectConfig = async (generator: YeomanGenerator, settings: IProjectSetting[]) => new Promise<IProjectConfig>(async (resolve, reject) => {
    if (!settings || settings.length === 0) {
        reject(new Error('foo'));
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
            generator.log(`OHHHHH NOOOO. Error details: ${err.message}`);
            reject(new Error('Prompt failed'));
        }
    }));

    resolve(config);
});

export {
    getDesiredProjectConfig
};