'use strict';

import YeomanGenerator = require('yeoman-generator');
import IProjectConfig = require('./interfaces/project-config');
import IProjectInput = require('./interfaces/project-input');

const fatalErrorMessage = 'Something awful happened! Please open an issue on GitHub';

const addGeneratorOptions = (generator: YeomanGenerator, inputs: IProjectInput[]) => {
    if (!generator || !inputs || inputs.length === 0) {
        throw new Error(fatalErrorMessage);
    }

    inputs.forEach(input => {
        generator.option(input.optionName, input.option);
    });
};

const extractConfigFromInputs = async(generator: YeomanGenerator, inputs: IProjectInput[]): Promise<IProjectConfig> => {
    const config: IProjectConfig = <IProjectConfig>{
        testConfig: {
            coverageOutFilename: 'coverage.out',
            coverageReportRootDirectory: '.coverage',
            testResultsJsonFilename: 'results.json',
            testResultsReportRootDirectory: '.testresults'
        }
    };
    const missingInputs: IProjectInput[] = [];
    const prompts: YeomanGenerator.Question[] = [];

    inputs.forEach(input => {
        const option = generator.options[input.optionName];
        if (!input.tryExtractInputValue(option, config)) {
            prompts.push(input.prompt);
            missingInputs.push(input);
        }
    });

    if (prompts.length > 0) {
        const answers = await generator.prompt(prompts);
        missingInputs.forEach(input => {
            input.tryExtractInputValue(answers[input.prompt.name], config);
        });
    }
    return config;
};

const getDesiredProjectConfig = async (generator: YeomanGenerator, inputs: IProjectInput[]) => new Promise<IProjectConfig>(async (resolve, reject) => {
    if (!generator || !inputs || inputs.length === 0) {
        return reject(new Error(fatalErrorMessage));
    }

    try {
        const config = await extractConfigFromInputs(generator, inputs);
        return resolve(config);
    } catch (err) {
        return reject(new Error(fatalErrorMessage));
    }
});

export {
    addGeneratorOptions,
    getDesiredProjectConfig
};