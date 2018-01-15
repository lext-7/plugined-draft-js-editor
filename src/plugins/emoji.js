import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createEmojiPlugin from 'draft-js-emoji-plugin';

class EmojiPlugin extends Plugin {
    name = 'emoji';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);

        this.plugin = createEmojiPlugin({
            ...pluginProps.initOptions
        });
    }

    render(pluginProps, editorProps, allProps) {
        const { EmojiSelect, EmojiSuggestions } =  this.plugin;
        return (
            <div key={this.name}>
                <EmojiSuggestions {...pluginProps.suggetins} />
                <EmojiSelect {...pluginProps.select} />
            </div>
        );
    }
}

export default EmojiPlugin;
