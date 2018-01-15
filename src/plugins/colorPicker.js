import React from 'react';
import Plugin from '../PluginEditor/plugin';

import { createColorPickerPlugin } from '../components/ColorPicker';

class ColorPickernPlugin extends Plugin {
    name = 'colorPicker';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createColorPickerPlugin({
            colors: props.colors || pluginProps.colors,
            ...pluginProps.initOptions,
        });
    }
}

export default ColorPickernPlugin;
