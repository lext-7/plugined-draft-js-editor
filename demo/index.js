import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import { EditorState, convertFromRaw } from 'draft-js';

import Editor from '../src/PluginedEditor';
import { editorStateToHtml, editorStateFromHtml } from '../src/convert';
import './index.scss';

import mentions from './mentions';
import mockUpload from './mockUpload';
import stickers from './stickers';

const html = `
<p>
    <strong>bold</strong>
    <i>italic</i>
    <u>underline</u>
    <strike>strikethrough</strike>
    <a href="http://www.baidu.com">link</a>
    <span style="color:#61BD6D">textcolor</span>
    <span style="background-color:#61BD6D">bgcolor</span>
    <code>code</code>
    <sub>sub</sub>
    <sup>sup</sup>
</p>
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>
<h6>h6</h6>
<ul>
    <li>ul</li>
</ul>
<ol>
    <li>ol</li>
</ol>
<blockquote>blockquote</blockquote>
<pre>code</pre>
<p style="text-align:left">text-align-left</p>
<p style="text-align:center">text-align-cente</p>
<p style="text-align:right">text-align-right</p>
<p style="text-align:justify">text-align-justify</p>
<h1 style="text-align:center">text-aling-cente with h1</h1>
<p>ppp</p>
<p>image</p>
<p></p>
<p>
    <img src='http://i.imgur.com/HYXFLl7.jpg' />
</p>
<p>vidoe</p>
<p></p>
<iframe src="https://player.youku.com/embed/XMzMzMzIxNjYwOA=="> </iframe>
<p></p>
`;

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editorState: editorStateFromHtml(html),
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
        console.log(editorStateToHtml(editorState))
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
