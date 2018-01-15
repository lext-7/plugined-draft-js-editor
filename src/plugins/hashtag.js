import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createHashtagPlugin from 'draft-js-hashtag-plugin';

class HashtagPlugin extends Plugin {
    name = 'hashtag';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createHashtagPlugin({
            ...pluginProps.initOptions,
        });
    }
}

export default HashtagPlugin;
