import React from 'react';
import Plugin from '../PluginEditor/plugin';

import { composeDecorators } from '../../lib/draft-js-plugins-editor/lib';

import createImagePlugin from '../../lib/draft-js-image-plugin/lib/';

class ImagePlugin extends Plugin {
    name = 'image';

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

        let handleUpload;
        let dndUploadPlugin = this.findPlugin('dndUpload');
        if (dndUploadPlugin != null) {
            dndUploadPlugin = dndUploadPlugin.getPlugin();
            if (dndUploadPlugin != null) {
                handleUpload = dndUploadPlugin.handleDroppedFiles;
            }
        }

        this.plugin = createImagePlugin({
            decorator: composeDecorators(...decorators),
            handleUpload: pluginProps.handleImageUpload || props.handleImageUpload || handleUpload,
            ...pluginProps.initOptions,
        });
    }

    static createImageEntity(src) {
        return {
            "type": "image",
            "mutability": "IMMUTABLE",
            "data": {
                src,
            }
        };
    }
}

export default ImagePlugin;
