import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createStaticToolbarPlugin from '../../lib/draft-js-static-toolbar-plugin/lib';

import { createButtons, toolbarTypes } from './buttons';
import './staticToolbar.scss';

const buttonNames = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'anchor',
    'image', 'video',
    'h1', 'h2', 'h3',
    'h4', 'h5', 'h6',
    'blockquote',
    'unorderedList', 'orderedList',
    'colorPicker',
    'textAlignLeft', 'textAlignCenter', 'textAlignRight', 'textAlignJustify',
    'codeBlock', 'code',
    'sub', 'sup',
    'undo', 'redo',
    'more',
];

class StaticToolbarPlugin extends Plugin {

    static theme = {
        toolbarStyles: {
            toolbar: 'plugined-editor-static-toolbar',
        },
        buttonStyles: {
            buttonWrapper: 'buttonWrapper',
            button: 'button plugined-editor-button',
            active: 'active',
            addVideoInput: 'input-popup',
        },
    };

    name = 'staticToolbar';

    inited(editor, pluginProps, props) {
        const buttons = createButtons(this, buttonNames, toolbarTypes.showAllOnMore);

        this.plugin = createStaticToolbarPlugin({
            theme: this.constructor.theme,
            structure: buttons,
            ...pluginProps.initOptions,
        });
    }

    render(pluginProps, editorProps, allProps) {
        const { Toolbar } = this.plugin;
        return <Toolbar key={this.name} />
    }
}

export default StaticToolbarPlugin;
