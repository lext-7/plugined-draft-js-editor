import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createStickerPlugin from 'draft-js-sticker-plugin';

class StickerPlugin extends Plugin {
    name = 'sticker';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createStickerPlugin({
            stickers: pluginProps.stickers || props.stickers,
            ...pluginProps.initOptions,
        });
    }

    render(pluginProps, editorProps, allProps) {
        const { StickerSelect } = this.plugin;
        return <StickerSelect key={this.name} editor={allProps.parent} />
    }
}

export default StickerPlugin;
