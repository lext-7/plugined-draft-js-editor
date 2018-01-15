import React, { PureComponent } from 'react';
import Editor from './';

export default class PluginedEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.plugins = this.createPlugins();
    }

    createPlugins() {
        if (this.props.plugins) {
            return this.props.plugins;
        }
        const { toolbar } = this.props;
        const plugins = [
            'mention',
            'focus',
            'alignment',
            'resizable',
            'dnd',
            'image',
            'video',
            'undo',
            'linkify',
            'hashtag',
            'anchor',
            'textAlign',
            'colorPicker',
            'sideToolbar',
            'dndUpload',
            'buttons',
        ];

        if (toolbar === 'static') {
            plugins.push('staticToolbar');
        } else if (toolbar === 'both') {
            plugins.push('staticToolbar');
            plugins.push('inlineToolbar');
        } else {
            plugins.push('inlineToolbar');
        }
        return plugins;
    }

    render() {
        return (
            <Editor
                plugins={this.plugins}
                {...this.props}
            />
        );
    }
}
