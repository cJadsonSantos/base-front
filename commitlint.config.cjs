module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: ['commitlint-plugin-function-rules'],
    rules: {
        'header-max-length': [0],
        'function-rules/header-max-length': [
            2,
            'always',
            (parsed) => {
                if (parsed.header.length > 100) {
                    return [
                        false,
                        `Header must not be longer than 100 characters. Current length: ${parsed.header.length}`
                    ];
                }
                if (
                    !parsed.header.match(
                        /^((feat)|(test)|(build)|(chore)|(ci)|(docs)|(fix)|(perf)|(refactor)|(style))(\([a-z0-9./_-]+\))?:/gm
                    )
                ) {
                    return [
                        false,
                        `The commit message must follow the pattern: "<type>(<scope>): <description>".`
                    ];
                }
                return [true];
            }
        ]
    }
};