const path = require("path");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");
const Dotenv = require("dotenv-webpack");

if (dev) {
    liveServer.start({
        root: "./",
        file: "index.html"
    });
};

module.exports = {
    watch: dev,
    mode: "development",
    entry: "./src/index.tsx",
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
        },
        extensions: [".tsx", ".js", ".ts"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
};