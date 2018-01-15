import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createLinkPlugin from '../../lib/draft-js-anchor-plugin/lib';

class AnchorPlugin extends Plugin {
    name = 'anchor';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createLinkPlugin({
            ...pluginProps.initOptions,
        });
    }
}

export default AnchorPlugin;
