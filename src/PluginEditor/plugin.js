class Plugin {
    init(editor, pluginProps, props) {
        this.editor = editor;
        this.props = pluginProps;
    }

    inited(editor, pluginProps, props) {

    }

    getPlugin() {
        return this.plugin;
    }

    willReceiveProps(pluginProps, props) {

    }

    reduceEditorProps(editorProps) {

    }

    render(pluginProps, editorProps, allProps) {
        return null;
    }


    mount(root, pluginProps, editorProps, allProps) {
        this.props = editorProps;
        const ele = this.render(pluginProps, editorProps, allProps);
        if (ele) {
            root.push(ele);
        }
    }

    destory(editor) {
        this.editor = null;
        this.plugin = null;
        this.props = null;
    }

    setState(state) {
        const editor = this.editor;
        editor.setStateWhenever(state);
    }

    findPlugin(pluginName) {
        const editor = this.editor;
        return editor.findPlugin(pluginName);
    }
}

export default Plugin;
