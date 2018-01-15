import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createUndoPlugin from '../../lib/draft-js-undo-plugin/lib';

class UndoPlugin extends Plugin {
    name = 'undo';

    static theme = {
        redo: 'button plugined-editor-button',
        undo: 'button plugined-editor-button',
    };

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createUndoPlugin({
            theme: this.constructor.theme,
            undoContent: (
                <span data-tooltip="UNDO">↺</span>
            ),
            redoContent: (
                <span data-tooltip="REDO">↻</span>
            ),
            ...pluginProps.initOptions,
        });
    }

    render(pluginProps, editorProps, allProps) {
        if (pluginProps.showButtons) {
            const { UndoButton, RedoButton } = this.plugin;
            return (
                <div key={this.name}>
                    <UndoButton />
                    <RedoButton />
                </div>
            );
        }
        return null;
    }
}

export default UndoPlugin;
