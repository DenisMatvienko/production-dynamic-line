import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({ isDev, paths }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    // Plugins list
    new HTMLWebpackPlugin({
      // Add root template
      template: paths.html,
    }),
    // Add index.html into build folder
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      // with help of DefinePlugin, we can add into app (like i18n) global variable
      // first we need in i18n isDev check
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ];

  if (isDev) {
    // if is Dev mode we are add these plugins in build,
    // but if prod-didn't.
    // This check made for prevent addition BuildAnalyzerPlugin in to prod build
    // because BuildAnalyzerPlugin running in GitHub actions, and still be running
    // interfere successfully build bundle in actions
    // https://www.npmjs.com/package/webpack-bundle-analyzer

    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }));
  }

  return plugins;
}
