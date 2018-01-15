import React from 'react';
import Plugin from '../PluginEditor/plugin';

class PluginTemplate extends Plugin {
    name = 'pluginTemplate';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
    }

    render(pluginProps, editorProps, allProps) {
    }

    destory(editor) {
        super.destory();
    }
}

export default PluginTemplate;
