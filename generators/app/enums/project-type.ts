'use strict';

/**
 * Enumerates the types of projects.
 *
 * @enum {number}
 */
enum ProjectType {
    boilerplate = 'boilerplate',
    lib = 'lib',
    libcli = 'libcli',
    cli = 'cli'
}

export = ProjectType;