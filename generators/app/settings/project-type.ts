'use strict';

/**
 * Enumerates the types of projects.
 *
 * @enum {number}
 */
enum ProjectType {
    boilerplate = 'boilerplate',
    lib = 'lib',
    libCli = 'libcli',
    cli = 'cli'
}

export = ProjectType;