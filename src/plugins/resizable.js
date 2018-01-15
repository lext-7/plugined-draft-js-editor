import Plugin from '../PluginEditor/plugin';

import createResizeablePlugin from '../../lib/draft-js-resizeable-plugin/lib';

class ResizablePlugin extends Plugin {
    name = 'resizable';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createResizeablePlugin({
            defaultHorizontalWidth: 100,
            ...pluginProps.initOptions,
        });
    }
}

export default ResizablePlugin;
