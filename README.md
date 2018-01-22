# plugined-draft-js-editor

A pluginable draft js editor with usefull plugins.  
If you want to use a plugin supported by `plugined-draft-js-editor`, just add it's name to `plugins` prop rather than creating a plugin and adding it into `plugins` prop. Simpify the way you use Draft Editor.

## Demo

[Online demo](https://lext-7.github.io/plugined-draft-js-editor/)

## Usage

### Use default editor

```jsx
import Editor from 'plugined-draft-js-editor';

import { editorStateToHtml, editorStateFromHtml } from 'plugined-draft-js-editor/dist/convert';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(initialState)),
        };
    }

    onChange = editorState => {
        this.setState({
            editorState,
        });
    };

    render() {
        return (
            <Editor
                toolbar="both"
                editorState={this.state.editorState}
                onChange={this.onChange}
            />
        );
    }
}
```

By default, used plugins are as followed:

```javascript
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
```

### Custom used plugins.

```jsx
<Editor
    plugins={[
        'image',
        'inlineToolbar',
        'sideToolbar',
        'video',
    ]}
/>
```

Add plugin names to plugin list, than you can use it without any other code.

### Convert

Haved provided some convert functions.

```javascript
import { editorStateToHtml, editorStateFromHtml } from 'plugined-draft-js-editor/dist/convert';
```
