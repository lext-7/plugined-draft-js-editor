import React from 'react';
import Plugin from '../PluginEditor/plugin';

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

class MentionPlugin extends Plugin {
    name = 'mention';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);

        const mentions = pluginProps.mentions || props.mentions || [];
        const suggestions = pluginProps.suggestions || props.suggestions || [];

        this.setState({
            suggestions: suggestions || mentions,
        });
        this.static = {
            mentions,
            search: null,
        };
        this.plugin = createMentionPlugin({
            mentionPrefix: '@',
            ...pluginProps.initOptions,
        });
    }

    willReceiveProps(nextPluginProps, nextProps) {
        const oldMentions = this.props.mentions || this.editor.props.mentions;
        const newMentions = nextPluginProps.mentions || nextProps.mentions;
        if (oldMentions !== newMentions) {
            this.static.mentions = newMentions;
            this.onSearchChange(this.static.search);
        }
    }


    onSearchChange = (search) => {
        if (!search) {
            return;
        }
        const onSearchChange = this.props.onSearchChange || this.editor.props.onSearchChange;
        if (onSearchChange) {
            onSearchChange(search);
        } else {
            this.setState({
                suggestions: defaultSuggestionsFilter(search.value, this.static.mentions),
            });
        }
        this.static.search = search;
    };

    render(pluginProps, editorProps, allProps) {
        const editor = this.editor;
        const suggestions = pluginProps.suggestions || allProps.suggestions || editor.state.suggestions;

        const { MentionSuggestions } = this.plugin;
        return (
            <MentionSuggestions
                key={this.name}
                {...pluginProps}
                onSearchChange={this.onSearchChange}
                suggestions={suggestions}
            />
        );
    }

    destory() {
        super.destory();
        this.static = null;
    }
}

export default MentionPlugin;
