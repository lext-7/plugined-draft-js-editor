import Plugin from '../PluginEditor/plugin';

import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

class DNDPlugin extends Plugin {
    name = 'dnd';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createBlockDndPlugin();
    }
}

export default DNDPlugin;
