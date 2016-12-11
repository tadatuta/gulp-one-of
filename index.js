const filter = require('through2-filter').obj;
const fileSuffix = require('file-suffix');

module.exports = function oneOf() {
    const args = Array.prototype.slice.apply(arguments);
    const collected = {};

    return filter(file => {
        const suffix = fileSuffix(file.path);

        if (args.length && !args.includes[suffix]) {
            return true;
        }

        const suffixRegexp = new RegExp('\.' + suffix + '$');
        const stem = file.path.replace(suffixRegexp, '');

        if (!collected[stem]) {
            collected[stem] = true;
            return true;
        }

        return false;
    });
};
