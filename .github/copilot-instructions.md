# ioBroker KNMI Weather Adapter

This is an ioBroker adapter that fetches weather data from the KNMI (Netherlands) weather service. It's a Node.js application written in JavaScript that runs as part of the ioBroker home automation platform. The adapter runs on a schedule (every 5 minutes) to fetch weather data and create ioBroker states.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap and test the repository:
  - `npm install` -- takes 40-60 seconds. Expect deprecation warnings (normal for older dependencies). NEVER CANCEL.
  - `npm run test:package` -- takes under 1 second. Validates package.json and io-package.json structure.
  - `npx eslint main.js lib/` -- takes under 1 second. Check code style on main files.
  - `node -c main.js` -- takes under 1 second. Verify main.js syntax is valid.

- Type checking (optional):
  - `npx tsc --noEmit` -- takes 5-10 seconds. Expect some type errors in dependencies (normal).

- Translation and documentation tasks:
  - `npx gulp --tasks` -- List available gulp tasks for translations and package updates.
  - `npx gulp default` -- Update package version and README.

## Important Limitations

- **NO BUILD PROCESS NEEDED**: This is pure JavaScript. Do not look for build steps or compilation.
- **CANNOT RUN STANDALONE**: This adapter requires ioBroker runtime environment. You cannot start it with `node main.js`.
- **BROKEN LINT COMMAND**: `npm run lint` runs ESLint with no file patterns, so it lints 0 files. Use `npx eslint main.js lib/` instead.
- **DEPRECATED TEST COMMANDS**: `npm test` fails due to deprecated mocha.opts. Use individual test commands instead.

## Validation

- ALWAYS run `npm install` and `npm run test:package` after making changes.
- Use `npx eslint main.js lib/` to check code style (expect 1-2 style errors in existing code).
- Check syntax with `node -c main.js` to verify no syntax errors.
- ALWAYS verify io-package.json and package.json remain valid JSON after edits.
- Test TypeScript compatibility with `npx tsc --noEmit` if making significant changes.

## Manual Testing Scenarios

Since this adapter cannot run without ioBroker:
1. Verify package structure: `npm run test:package`
2. Check main.js loads: `node -c main.js`
3. Validate configuration: Ensure io-package.json contains valid adapter configuration
4. Lint core files: `npx eslint main.js lib/`
5. Check for TypeScript issues: `npx tsc --noEmit` (some dependency errors are normal)

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of running bash commands to save time.

### Repository Root Structure
```
.eslintrc.json          - ESLint configuration
.github/                - GitHub workflows and templates
.gitignore             - Git ignore patterns
README.md              - Project documentation
admin/                 - Web UI files and translations
gulpfile.js           - Build automation for translations
io-package.json       - ioBroker adapter configuration
lib/                  - Library files (stateAttr.js, tools.js)
main.js               - Main adapter entry point
package.json          - NPM configuration
test/                 - Test files
tsconfig.json         - TypeScript configuration (type checking only)
```

### Key Files and Their Purpose

- **main.js** - Main adapter logic, extends ioBroker adapter-core
- **io-package.json** - ioBroker-specific configuration (version, description, dependencies)
- **lib/stateAttr.js** - Defines weather data state attributes for ioBroker
- **lib/tools.js** - Translation utilities
- **admin/** - Web interface files for adapter configuration
- **test/package.js** - Validates package structure
- **gulpfile.js** - Automation for translations and package updates

### Package.json Scripts
```json
{
  "test:package": "mocha test/package --exit",     // Validates package files
  "test:unit": "mocha test/unit --exit",           // Deprecated unit tests
  "lint": "npm run lint:js",                       // Broken - runs eslint with no files
  "lint:js": "eslint",                            // Broken - no file patterns
  "release": "release-script"                      // Release automation
}
```

### Working Commands
- `npm install` - Install dependencies (40-60 seconds)
- `npm run test:package` - Validate package structure (< 1 second)
- `npx eslint main.js lib/` - Lint main files (< 1 second)
- `node -c main.js` - Check main.js syntax (< 1 second)
- `npx tsc --noEmit` - Type check (5-10 seconds, expect dependency errors)
- `npx gulp --tasks` - List gulp tasks
- `npx gulp default` - Update package and README

### Broken/Deprecated Commands
- `npm run lint` - Lints 0 files (configuration issue)
- `npm test` - Fails due to deprecated mocha.opts
- `npm run test:js` - Fails due to deprecated mocha.opts

## Project-Specific Notes

- **API Dependency**: Requires API key from weerlive.nl for weather data
- **Schedule**: Runs every 5 minutes when installed in ioBroker
- **GPS Configuration**: Reads location from ioBroker system configuration
- **Weather Data**: Fetches current conditions, forecasts, and rain radar
- **ioBroker Integration**: Creates states under adapter namespace for weather data
- **Translation Support**: Multi-language support via gulp tasks and i18n files
- **Dependencies**: Uses deprecated 'request' package (consider modernizing to axios/fetch)

## CI/CD Information

The GitHub Actions workflow (.github/workflows/test-and-release.yml):
- Runs `npm run lint` (currently broken)
- Runs `npm run test:package` (validates package structure)
- Tests on Node.js 12.x, 14.x, 16.x
- Tests on Ubuntu, Windows, MacOS
- Publishes to NPM on tagged releases

## CRITICAL Timing Expectations

- `npm install`: 40-60 seconds - NEVER CANCEL
- `npm run test:package`: < 1 second
- `npx eslint main.js lib/`: < 1 second  
- `npx tsc --noEmit`: 5-10 seconds - NEVER CANCEL
- `node -c main.js`: < 1 second
- `npx gulp default`: < 5 seconds

## Security and Dependencies

- Project has 36 known vulnerabilities (typical for older Node.js projects)
- Uses deprecated packages: request, request-promise-native
- ESLint 7.x is deprecated but functional
- Dependencies are pinned in package-lock.json (do not update without testing)