#!/usr/bin/env node
process.argv.splice(0, 2);

const help = `
Usage: unibuild <command> [options]

Commands:
        
    build           Build the project
    init            Init a project
    ?               Print this help message
    --help          Print this help message

For more type unibuild <command> --help`;

if (process.argv.length === 0) {
    console.log(help);
}

switch (process.argv[0]) {
    case '?':
    case '--help':
        console.log(help); 
        break;
    case 'init':
        init();
        break;
    case 'build':
        build();
        break;
}

function build() {
    const buildHelp = `
Usage: unibuild build [options]

Options:
    --style <style>     Set the style of the application
    -p <...os>          Set the target platforms
    --platform <...os>  Set the target platforms
    -a <...arch>        Set the target architectures
    --arch <...arch>    Set the target architectures

Example:
    unibuild build --style commmon -p linux, win32 -a amd64
    `;

    process.argv.splice(0, 1);
    if (process.argv.length === 0) {
        return;
    }
    switch (process.argv[0]) {
        case '--help':
            console.log(buildHelp);
            return;
    }
}

function init() {
    process.argv.splice(0, 1);
    if (process.argv.length === 0) {
        return;
    }
}