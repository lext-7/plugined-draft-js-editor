import React from 'react';
import Plugin from '../PluginEditor/plugin';

import { createTextAlignPlugin } from '../components/text-align-plugin';

class TextAlignPlugin extends Plugin {
    name = 'textAlign';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createTextAlignPlugin();
    }
}

export default TextAlignPlugin;
