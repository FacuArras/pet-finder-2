const path = require("path");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");

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
        extensions: [".tsx", ".js", ".ts"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
};