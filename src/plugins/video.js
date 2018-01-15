import React from 'react';
import Plugin from '../PluginEditor/plugin';

import { composeDecorators } from '../../lib/draft-js-plugins-editor/lib';

import createVideoPlugin from '../../lib/draft-js-video-plugin/lib';

class VideoPlugin extends Plugin {
    name = 'video';

    inited(editor, pluginProps, props) {
        const decorators = [];

        const addDecorator = (pluginName) => {
            let plugin = this.findPlugin(pluginName);
            if (plugin != null) {
                plugin = plugin.getPlugin();
                if (plugin != null && plugin.decorator != null) {
                    decorators.push(plugin.decorator);
                }
            }
        };

        if (!pluginProps.disableAlignment) {
            addDecorator('alignment');
        }
        if (!pluginProps.disableFocus) {
            addDecorator('focus');
        }
        if (!pluginProps.disableResizable) {
            addDecorator('resizable');
        }
        if (!pluginProps.disableDnd) {
            addDecorator('dnd');
        }
        this.plugin = createVideoPlugin({
            decorator: composeDecorators(...decorators),
            ...pluginProps.initOptions,
        });
    }
}

export default VideoPlugin;
