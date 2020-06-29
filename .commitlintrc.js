module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        typeenum: [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert',
                'other',
            ],
        ],
    },
};
