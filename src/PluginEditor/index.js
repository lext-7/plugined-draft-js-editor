import React from 'react';
import ReactDOM from 'react-dom';

import { EditorState } from 'draft-js';
import Editor from '../../lib/draft-js-plugins-editor/lib';

class PluginEditor extends React.Component {
    static plugins = {};

    constructor(props) {
        super(props);
        this.state = {
            editorPlugins: [],
        };
        this.static = {};
        this.plugins = [];
        const plugins = this.createPlugins(props);
        this.update(plugins, props);
    }

    componentDidMount() {
        this.static.didMount = true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.plugins !== this.props.plugins) {
            this.update(nextProps.plugins, nextProps);
        }
        this.plugins.forEach(plugin =>
            plugin.willReceiveProps(this.getPluginProps(plugin.name, nextProps), nextProps));
    }

    getEditorRef = (editor) => {
        this.editor = editor;
    }

    createPlugins(props) {
        return (props.plugins || []).map((plugin) => {
            if (typeof plugin === 'string') {
                const pluginConstructor = this.constructor.plugins[plugin];
                if (pluginConstructor) {
                    return new pluginConstructor();
                }
                return null;
            }
            return plugin;
        }).filter(plugin => !!plugin);
    }


    update(plugins, props) {
        let hasNew = false;
        const createdPlugins = [];
        plugins.forEach((plugin) => {
            if (this.plugins.indexOf(plugin) === -1) {
                plugin.init(this, this.getPluginProps(plugin.name, props), props);
                this.plugins.push(plugin);
                createdPlugins.push(plugin);
                hasNew = true;
            }
        });

        createdPlugins.forEach(plugin =>
            plugin.inited(this, this.getPluginProps(plugin.name, props), props));

        let hasRemoved = false;
        const filteredPlugins = this.plugins.filter((plugin) => {
            const contains = plugins.indexOf(plugin) !== -1;
            if (!contains) {
                hasRemoved = true;
            }
            return contains;
        });
        if (hasRemoved) {
            this.plugins = filteredPlugins;
        } else if (hasNew) {
            this.plugins = this.plugins.slice();
        }

        if (hasRemoved || hasNew) {
            const editorPlugins = this.plugins.map(plugin => plugin.getPlugin());
            this.setStateWhenever({
                editorPlugins,
            });
        }
    }

    getPluginProps(pluginName, props) {
        if (props && props.pluginProps) {
            return props.pluginProps[pluginName] || {};
        }
        return {};
    }

    findPlugin(pluginName) {
        return this.plugins.find(plugin => plugin.name == pluginName);
    }

    render() {
        const props = this.props;
        let editorProps = {
            editorState: this.props.editorState,
            onChange: this.props.onChange,
            ref: this.getEditorRef,
            plugins: this.state.editorPlugins,
        };

        this.plugins.forEach(plugin => {
            const nextEditorProps = plugin.reduceEditorProps(editorProps);
            if (nextEditorProps) {
                editorProps = nextEditorProps;
            }
        });

        const children = [
            <Editor
                key="editor"
                {...editorProps}
            />
        ];

        this.plugins.forEach(plugin =>
            plugin.mount(children, this.getPluginProps(plugin.name, props), editorProps, props));
        return (
            <div className="plugined-editor">
                {children}
            </div>
        );
    }

    setStateWhenever(state) {
        if (this.static.didMount) {
            this.setState(state);
        } else {
            this.state = {
                ...this.state,
                ...state
            };
        }
    }
}

export default PluginEditor;
