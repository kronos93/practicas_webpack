import webpack from 'webpack';

import DevConfig from './webpack.config.dev';
import ProdConfig from './webpack.config.prod';
//Utilerias
let c = console.log;
export default (env, args) => { //https://webpack.js.org/configuration/configuration-types/#exporting-a-function
  // c(env);
  // c(args);
  let isProduction = (env && env.prod) === true ? true : false;
  c(isProduction);

  let config = isProduction ? ProdConfig : DevConfig;
  return config;
};
