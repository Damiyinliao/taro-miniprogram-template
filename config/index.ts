import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import devConfig from './dev';
import prodConfig from './prod';
import path from 'path';
import ComponentsPlugin from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  console.log('command', command)
  console.log('mode', mode)
  const baseConfig: UserConfigExport = {
    projectName: 'taro-miniprogram-template',
    date: '2024-2-27',
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html'], // 配置需要使用的 Taro 插件
    designWidth (input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'vue3',
    compiler: {
      type: 'webpack5',
      prebundle: { enable: false, force: true }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.module.rule('svg').test(/\.svg$/).type('asset/source');
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/, /\.vue\?vue/, // .vue
          ],
          resolvers: [NutUIResolver({taro: true})]
        }))
      },
      imageUrlLoaderOption: {
        limit: 5000,
        exclude: [path.resolve(__dirname, '../src/assets/svg')],
        name: 'static/images/[name].[hash:8].[ext]',
      },
      miniCssExtractPluginOption: {
        //忽略css文件引入顺序
        ignoreOrder: true
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,  //忽略css文件引入顺序
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
          resolvers: [NutUIResolver({taro: true})]
        }));
        chain.merge({
          module: {
            rule: {
              image: {
                test: /\.(png|jpe?g|gif|bmp)$/,
                type: 'asset',
                parser: {
                  dataUrlCondition: (asset): boolean => {
                    return asset.size <= 500;
                  },
                },
                generator: {
                  publicPath: '/',
                  filename() {
                    return 'static/images/[name][ext]';
                  },
                },
              },
            }
          }
        })
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})

