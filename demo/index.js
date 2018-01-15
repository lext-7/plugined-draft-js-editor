import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import { EditorState, convertFromRaw } from 'draft-js';

import Editor from '../src/PluginedEditor';
import './index.scss';

import mentions from './mentions';
import mockUpload from './mockUpload';
import stickers from './stickers';

const initialState = {
    entityMap: {
        '0': {
            type: 'image',
            mutability: 'IMMUTABLE',
            data: {
                src: 'https://www.draft-js-plugins.com/images/draft-js-plugins.png',
            },
        },
        '1': {
            type: 'draft-js-video-plugin-video',
            mutability: "IMMUTABLE",
            data: {
                "src": "https://www.youtube.com/watch?v=iEPTlhBmwRg"
            },
        },
    },
    blocks: [
        {
            key: '9gm3s',
            text:
                'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: 'ov7r',
            text: ' ',
            type: 'atomic',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
                {
                    offset: 0,
                    length: 1,
                    key: 0,
                },
            ],
            data: {},
        },
        /*{
            key: '8k5k9',
            text: ' ',
            type: 'atomic',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
                {
                    offset: 0,
                    length: 1,
                    key: 1,
                },
            ],
            data: {},
        },*/
        {
            key: 'e23a8',
            text: 'See advanced examples further down …',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
    ],
};

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(initialState)),
        };
        this.pluginPros = {
            video: {
                initOptions: {
                    getSrc: ({ src }) => src,
                },
            },
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
                parent={this}
                mentions={mentions}
                handleUpload={mockUpload}
                stickers={stickers}
                pluginProps={this.pluginPros}
            />
        );
    }
}

render(<App />, document.getElementById('app'));
