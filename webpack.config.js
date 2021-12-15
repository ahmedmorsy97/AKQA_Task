const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production", // "production" | "development" | "none"
    entry: "./src/index.js",
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash]",
        publicPath: "/assets/",
        uniqueName: "akqa-task",
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
        ],
    },
    resolve: {
        // options for resolving module requests
        modules: ["node_modules", path.resolve(__dirname, "src")],
        // directories where to look for modules (in order)
        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used
        alias: {
            // a list of module name aliases
            // aliases are imported relative to the current context
            "module": "new-module",
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            "only-module$": "new-module",
            // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
            "module": path.resolve(__dirname, "src/third/module.js"),
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            "module": path.resolve(__dirname, "src/third"),
            // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
            [path.resolve(__dirname, "src/module.js")]: path.resolve(__dirname, "src/alternative-module.js"),
            // alias "./app/module.js" -> "./app/alternative-module.js"
        },
        /* Alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
        /* Expert resolve configuration (click to show) */
    },
    performance: {
        hints: "warning",
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: "source-map",
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web",
    externalsType: "var", // (defaults to output.library.type)
    // Type of externals, when not specified inline in externals
    ignoreWarnings: [/warning/],
    stats: "errors-only",
    stats: {
        // lets you precisely control what bundle information gets displayed
        preset: "errors-only",

        env: true,
        outputPath: true,
        publicPath: true,

        assets: true,

        entrypoints: true,
        chunkGroups: true,

        chunks: true,

        modules: true,

        children: true,

        logging: true,
        // show logging in output
        loggingDebug: /webpack/,
        // show debug type logging for some loggers
        loggingTrace: true,
        // show stack traces for warnings and errors in logging output

        warnings: true,
        // show warnings

        errors: true,
        // show errors
        errorDetails: true,
        // show details for errors
        errorStack: true,
        // show internal stack trace for errors
        moduleTrace: true,
        // show module trace for errors
        // (why was causing module referenced)

        builtAt: true,
        // show timestamp in summary
        errorsCount: true,
        // show errors count in summary
        warningsCount: true,
        // show warnings count in summary
        timings: true,
        // show build timing in summary
        version: true,
        // show webpack version in summary
        hash: true,
        // show build hash in summary
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:8000'
        },
        static: path.join(__dirname, 'public'),
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
    },
    // experiments: {
    //     asyncWebAssembly: true,
    //     outputModule: true,
    //     topLevelAwait: true,
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
          }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          inject: true,
          template: path.resolve(__dirname, 'src', 'index.html'),
        }),
    ],
    optimization: {
        chunkIds: "size",
        moduleIds: "size",
        mangleExports: "size",
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
              map: {
                inline: false,
                annotation: true,
              },
            },
          }),
        ],
        splitChunks: {
            cacheGroups: {
                "akqa-task": {
                    test: /\.sass$/,
                    type: "css/mini-extract",
                }
            },

            fallbackCacheGroup: { /* Advanced (click to show) */ }

        }
    },
}