import search from '../lib/search';

import * as plugins from './index';

const keywordPlugins = Object
  .keys(plugins)
  .map(name => plugins[name])
  .filter(plugin => !!plugin.keyword);

/**
 * Plugin for autocomplete other plugins
 * @param  {String} term
 */
const pluginsPlugin = (term, callback) => {
  let results = search(keywordPlugins, term, (plugin) => plugin.keyword)
    .filter(plugin => plugin.keyword !== term);
  results = results.map(res => ({
    id: `plugin${res.name}`,
    title: res.name,
    icon: res.icon,
    term: `${res.keyword}`,
  }));
  callback(term, results);
};

export default {
  name: 'Plugins',
  fn: pluginsPlugin,
};