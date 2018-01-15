import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';

class AlignmentPlugin extends Plugin {
    name = 'alignment';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createAlignmentPlugin();
    }

    render(pluginProps, editorProps, allProps) {
        const { AlignmentTool } = this.plugin;
        return <AlignmentTool key={this.name} />
    }
}

export default AlignmentPlugin;
