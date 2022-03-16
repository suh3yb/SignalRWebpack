# ASP.NET Core SignalR using TypeScript and Webpack

**This repo is created following [Tutorial: Get started with ASP.NET Core SignalR using TypeScript and Webpack](https://docs.microsoft.com/en-gb/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-6.0&tabs=visual-studio-code)**

### Prerequisites

- Node.js with npm
- Visual Studio Code
- C# for Visual Studio Code (latest version)
- .NET 6.0 SDK

### To run the application

1. Run Webpack in release mode by executing the following command in the project root:
   ```bash
   npm run release
   ```
   This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.
1. Build and run the app by executing the following command in the project root:
   ```bash
   dotnet run
   ```
1. Open a browser to `https://localhost:<port>` (check your terminal for the port). The `wwwroot/index.html` file is served. Copy the URL from the address bar.
1. Open another browser instance (any browser). Paste the URL in the address bar.
1. Choose either browser, type something in the Message text box, and select the Send button. The unique user name and message are displayed on both pages instantly.
