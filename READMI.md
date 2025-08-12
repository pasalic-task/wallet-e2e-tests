# Wallet E2E Tests
Automated end-to-end tests for the Wallet application using WebdriverIO. test\e2e.spec.ts
https://webdriver.io/

## Clone the repository

Clone the repository and navigate to the project folder.

## Instalation

1. `node -v`
 -You need latest version of Node.js 18, 20 or 22.
2. `npm install`
 -Installs the necessary dependencies for the project.


## Execution

1. `npx wdio run wdio.conf.ts`
-This command runs the tests in the "Default test setup" project configuration.
2. `set BROWSER=firefox && npx wdio run wdio.conf.ts`
-Supported browsers depend on your wdio.conf.ts capabilities configuration (e.g., 'chrome', 'firefox', 'edge').