import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createLinkifyPlugin from 'draft-js-linkify-plugin';

class LinkifyPlugin extends Plugin {
    name = 'linkify';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createLinkifyPlugin({
            ...pluginProps.initOptions,
        });
    }
}

export default LinkifyPlugin;
