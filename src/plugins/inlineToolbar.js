import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createInlineToolbarPlugin from '../../lib/draft-js-inline-toolbar-plugin/lib';

import { createButtons } from './buttons';
import './inlineToolbar.scss';

const buttonNames = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'anchor',
    'h1', 'h2', 'h3',
    'h4', 'h5', 'h6',
    'blockquote',
    'unorderedList', 'orderedList',
    'colorPicker',
    'textAlignLeft', 'textAlignCenter', 'textAlignRight', 'textAlignJustify',
    'codeBlock', 'code',
    'sub', 'sup',
    'more',
];

class InlineToolbarPlugin extends Plugin {

    static theme = {
        toolbarStyles: {
            toolbar: 'plugined-editor-inline-toolbar',
        },
        buttonStyles: {
            buttonWrapper: 'buttonWrapper',
            button: 'button plugined-editor-button',
            active: 'active',
        },
    };

    name = 'inlineToolbar';

    inited(editor, pluginProps, props) {

        const buttons = createButtons(this, buttonNames);

        this.plugin = createInlineToolbarPlugin({
            theme: this.constructor.theme,
            structure: buttons,
            ...pluginProps.initOptions,
        });
    }

    render(pluginProps, editorProps, allProps) {
        const { InlineToolbar } = this.plugin;
        return <InlineToolbar key={this.name} />
    }
}

export default InlineToolbarPlugin;
