var path = require("path");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs')


function generateHtmlPlugins (templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/template')

module.exports = {
  entry: {
    index: "./src/js/main.js"
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "all.min.js"
    // [chunkhash]: her build işleminde benzersiz bir çıktı üretmek için kullanılır.
  },
  module: {
    rules: [
      {
        test: [/.js$/], // test => Hangi dosya tiplerinin işlemden geçeceğini belirttiğimiz property
        exclude: /(node_modules)/, // exclude => Hangi klasörlerin işlemden geçmeyeceğini belirttiğimiz property
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: [/.css$|.scss$|.sass$/],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ],
        exclude: path.resolve(__dirname, "src/index.html")
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: "./src/template/index.pug",
    //   filename: "index.html",
    //   inject: true
    //   // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
    // }),
    new MiniCssExtractPlugin({
      filename: "styles.min.css"
    })
  ].concat(htmlPlugins)
};
