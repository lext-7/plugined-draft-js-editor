import React from 'react';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import {
    Entity,
    convertToRaw,
    convertFromRaw,
    EditorState,
    ContentState,
} from 'draft-js';

import { VIDEOTYPE } from '../lib/draft-js-video-plugin/lib/video/constants';

const REGEX_LF = new RegExp('\n', 'g');

export function getBlockTypeForTag(tag, lastList) {
    switch (tag) {
    case 'h1':
        return 'header-one';
    case 'h2':
        return 'header-two';
    case 'h3':
        return 'header-three';
    case 'h4':
        return 'header-four';
    case 'h5':
        return 'header-five';
    case 'h6':
        return 'header-six';
    case 'li':
        if (lastList === 'ol') {
            return 'ordered-list-item';
        }
        return 'unordered-list-item';
    case 'blockquote':
        return 'blockquote';
    case 'pre':
        return 'code-block';
    case 'div':
    case 'p':
        return 'unstyled';
    default:
        return null;
    }
}

export function editorStateFromHtml(rawHtml) {
    if (rawHtml === null) {
        return EditorState.createEmpty();
    }

    let html = rawHtml.replace(REGEX_LF, '');
    const contentState = convertFromHTML({
        htmlToStyle: (nodeName, node, currentStyle) => {
            if (node.className !== undefined) {
                currentStyle = currentStyle.add(node.className);
            }

            const style = node.style;

            const bgColor = style.backgroundColor;
            if (bgColor) {
                currentStyle = currentStyle.add(`backgroundColor-${bgColor}`);
            }

            const color = style.color;
            if (color) {
                currentStyle = currentStyle.add(`color-${color}`);
            }


            switch (nodeName) {
            case 'sub':
                currentStyle = currentStyle.add('SUBSCRIPT');
                break;
            case 'sup':
                currentStyle = currentStyle.add('SUPERSCRIPT');
                break;
            }

            return currentStyle;
        },
        htmlToEntity: (nodeName, node) => {
            switch (nodeName) {
            case 'a':
                return Entity.create('LINK', 'MUTABLE', {
                    url: node.href,
                    target: node.target,
                });
            case 'img':
                return Entity.create('image', 'IMMUTABLE', {
                    src: node.src
                });
            case 'iframe':
                return Entity.create(VIDEOTYPE, 'IMMUTABLE', {
                    src: node.src,
                });
            }
        },
        htmlToBlock: (nodeName, node, lastList) => {
            const data = {};

            const style = node.style;

            const textAlign = style.textAlign;
            if (textAlign) {
                data.textAlign = textAlign;
            }

            switch (nodeName) {
            case 'img':
                let caption = '',
                    title = '',
                    alt = '',
                    src = '',
                    srcSet = '',
                    blockType = 'image';
                if (node.title) {
                    title = node.title;
                }
                if (node.alt) {
                    alt = node.alt;
                }
                if (node.srcset) {
                    srcSet = node.srcset;
                } else {
                    srcSet = node.src;
                }
                return {
                    type: 'atomic',
                    data: {
                        src: node.src,
                        srcSet: srcSet,
                        type: blockType,
                        title: title,
                        alt: alt,
                    },
                };

            case 'iframe':
                return {
                    type: 'atomic',
                    data: {
                        src: node.getAttribute('src'),
                        type: 'video',
                    },
                };
            }

            const type = getBlockTypeForTag(nodeName, lastList);

            return {
                type,
                data: {
                    ...data,
                },
            };

        },
    })(html);

    return EditorState.createWithContent(contentState);
}

export function editorStateToHtml(editorState) {
    if (!editorState) {
        return;
    }

    return convertToHTML({
        styleToHTML: style => {
            switch (style) {
            case 'UNDERLINE':
                return <u />;
            case 'BOLD':
                return <strong />;
            case 'ITALIC':
                return <i />;
            case 'STRIKETHROUGH':
                return <strike />;
            case 'SUBSCRIPT':
                return <sub />;
            case 'SUPERSCRIPT':
                return <sup />;
            }
            if (style.startsWith('color-')) {
                const color = `${style.replace(/^color-/, '')}`;
                return <span style={{ color }} />
            }
            if (style.startsWith('backgroundColor-')) {
                const backgroundColor = `#${style.replace(/^backgroundColor-/, '')}`;
                return <span style={{ backgroundColor }} />
            }
        },
        blockToHTML: block => {
            const styles = {};

            const blockData = block.data;
            const textAlign = blockData.textAlign;
            if (textAlign) {
                styles.textAlign = textAlign;
            }

            const type = block.type;
            switch (type) {
            case 'header-one':
                return <h1 style={styles} />;
            case 'header-two':
                return <h2 style={styles} />;
            case 'header-three':
                return <h3 style={styles} />;
            case 'header-four':
                return <h4 style={styles} />;
            case 'header-five':
                return <h5 style={styles} />;
            case 'header-six':
                return <h6 style={styles} />;
            case 'blockquote':
                return <blockquote style={styles} />;
            case 'atomic':
                {
                    return { start: '', end: '' };
                }
            case 'unordered-list-item':
                return {
                    element: <li />,
                    nest: <ul />
                };
            case 'ordered-list-item':
                return {
                    element: <li />,
                    nest: <ol />
                };
            case 'code-block':
                return <pre style={styles} />;
            case 'unstyled':
                return <p style={styles} />;
            default:
                return { start: '', end: '' };
            }
        },
        entityToHTML: (entity, originalText) => {
            const type = entity.type;
            switch (type) {
            case 'IMAGE':
            case 'image':
                return `<p><img src='${entity.data.src}' /></p>`;
            case 'draft-js-video-plugin-video':
                return <iframe src={entity.data.src} />;
            case 'LINK':
                return <a href={entity.data.url}>{originalText}</a>;
            default:
                return originalText;
            }
        },
    })(editorState.getCurrentContent());
}

export function editorStateToJSON(editorState) {
    if (editorState) {
        const content = editorState.getCurrentContent();
        return JSON.stringify(convertToRaw(content), null, 2);
    }
}

export function editorStateFromRaw(rawContent) {
    if (Object.keys(rawContent).length === 0) {
        return EditorState.createEmpty();
    }
    if (rawContent) {
        const content = convertFromRaw(rawContent);
        return EditorState.createWithContent(content);
    } else {
        return EditorState.createEmpty();
    }
}

export function editorStateFromText(text) {
    if (text) {
        return EditorState.createWithContent(ContentState.createFromText(text));
    } else {
        return EditorState.createEmpty();
    }
}
