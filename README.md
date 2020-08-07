# TwitterAppReact

This repo is for the React port of the MSFT internal TwitterBot application. Solution is setup with `dotnet new react` to host off a .NET Core backend in case we decide to port the current backend.

React app is in the **ClientApp** directory. 

## How to run React app in VSCode

1. Make sure you have `npm` installed.
1. In a command prompt, change directory to `TwitterAppReact/ClientApp`.
1. Run `npm start`.
1. Open another command prompt and change directory to `TwitterAppReact`, then enter `code .`.
1. Saving changes in any file under the `/ClientApp` directory will immediately re-render the React app.

## Tests

Tests are built with Jest/Enzyme, and are contained under `__test__` directories with the file format `ComponentName.test.js`. To run tests, run `npm test` in the `/ClientApp` directory. 
