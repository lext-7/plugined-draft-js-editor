import Plugin from '../PluginEditor/plugin';

import createFocusPlugin from 'draft-js-focus-plugin';

class FocusPlugin extends Plugin {
    name = 'focus';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createFocusPlugin();
    }
}

export default FocusPlugin;
