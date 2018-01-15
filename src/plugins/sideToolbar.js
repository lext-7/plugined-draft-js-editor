import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createSideoolbarPlugin from '../../lib/draft-js-side-toolbar-plugin/lib';
import BlockTypeSelect from '../../lib/draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect';

import { createButtons } from './buttons';

import './sideToolbar.scss';

const buttonNames = [
    'image',
    'video',
    'undo',
    'redo'
];

class SideToolbarPlugin extends Plugin {

    static theme = {
        toolbarStyles: {
            wrapper: 'plugined-editor-side-toolbar',
        },
        buttonStyles: {
            buttonWrapper: 'buttonWrapper',
            button: 'button plugined-editor-button',
            active: 'active',
            addVideoInput: 'input',
        },
        blockTypeSelectStyles: {
            blockType: 'blockType',
            spacer: 'spacer',
            popup: 'popup',
        },
    };

    name = 'sideToolbar';

    inited(editor, pluginProps, props) {
        const buttons = createButtons(this, buttonNames);

        this.plugin = createSideoolbarPlugin({
            theme: this.constructor.theme,
            structure: [
                ({ getEditorState, setEditorState, theme, stick, onStick }) => (
                    <BlockTypeSelect
                        getEditorState={getEditorState}
                        setEditorState={setEditorState}
                        theme={theme}
                        structure={buttons}
                        stick={stick}
                        onStick={onStick}
                  />
                )
            ],
            ...pluginProps.initOptions,
        });
    }

    render(pluginProps, editorProps, allProps) {
        const { SideToolbar } = this.plugin;
        return <SideToolbar key={this.name} />
    }
}

export default SideToolbarPlugin;
