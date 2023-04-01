const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "pdp",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3000/remoteEntry.js"
      },
      exposes: {},
      /*All of the libraries that are shared from this page*/
      shared: {
        // Share all the dependencies by looking at the package,json
        ...deps,
        react: {
          // singleton: true => there can be only one React on a page, at a time
          /* This is important to React as it does have some data at the library level, and it is singleton in 
          nature + multiple instances of React in the smae page can/will break the app */
          /* Webpack does and manages the code sharing, which is why the receiving packet is as small as the 
          chunk of code being shared => here Header is shared just for <1KB. The dependencies for the code 
          are brought in, only when & where the shared code is imported */
          singleton: true,
          // Overwrite the React 
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};