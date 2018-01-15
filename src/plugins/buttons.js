import React, { PureComponent } from 'react';
import Plugin from '../PluginEditor/plugin';

import {
    BoldButton,
    ItalicButton,
    UnderlineButton,
    StrikethroughButton,
    createMoreButton,
    HeaderOneButton,
    HeaderTwoButton,
    HeaderThreeButton,
    HeaderFourButton,
    HeaderFiveButton,
    HeaderSixButton,
    CodeBlockButton,
} from '../components/buttons';

import {
    BlockquoteButton,
    OrderedListButton,
    UnorderedListButton,
    CodeButton,
    SubButton,
    SupButton,
} from '../../lib/draft-js-buttons/lib';

class ButtonFinder {
    constructor(fn) {
        this.fn = fn;
    }

    find(...args) {
        return this.fn(...args);
    }
}

const addButtonWrapper = (ChildComponent) => class extends PureComponent {

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
        return (
            <div
                className="buttonWrapper"
                onMouseDown={this.preventBubblingUp}
            >
                <ChildComponent {...this.props} />
            </div>
        );
    }
};

export const buttons = {
    bold: BoldButton,
    italic: ItalicButton,
    underliner: UnderlineButton,
    strikethrough: StrikethroughButton,
    h1: HeaderOneButton,
    h2: HeaderTwoButton,
    h3: HeaderThreeButton,
    h4: HeaderFourButton,
    h5: HeaderFiveButton,
    h6: HeaderSixButton,
    codeBlock: CodeBlockButton,
    code: CodeButton,
    textAlignLeft: new ButtonFinder((plugin) => {
        let textAlignPlugin = plugin.findPlugin('textAlign');
        if (textAlignPlugin != null) {
            textAlignPlugin = textAlignPlugin.getPlugin();
            if (textAlignPlugin != null && textAlignPlugin.TextAlignLeftButton != null) {
                return textAlignPlugin.TextAlignLeftButton;
            }
        }
        return null;
    }),
    textAlignRight: new ButtonFinder((plugin) => {
        let textAlignPlugin = plugin.findPlugin('textAlign');
        if (textAlignPlugin != null) {
            textAlignPlugin = textAlignPlugin.getPlugin();
            if (textAlignPlugin != null && textAlignPlugin.TextAlignRightButton != null) {
                return textAlignPlugin.TextAlignRightButton;
            }
        }
        return null;
    }),
    textAlignCenter: new ButtonFinder((plugin) => {
        let textAlignPlugin = plugin.findPlugin('textAlign');
        if (textAlignPlugin != null) {
            textAlignPlugin = textAlignPlugin.getPlugin();
            if (textAlignPlugin != null && textAlignPlugin.TextAlignCenterButton != null) {
                return textAlignPlugin.TextAlignCenterButton;
            }
        }
        return null;
    }),
    textAlignJustify: new ButtonFinder((plugin) => {
        let textAlignPlugin = plugin.findPlugin('textAlign');
        if (textAlignPlugin != null) {
            textAlignPlugin = textAlignPlugin.getPlugin();
            if (textAlignPlugin != null && textAlignPlugin.TextAlignJustifyButton != null) {
                return textAlignPlugin.TextAlignJustifyButton;
            }
        }
        return null;
    }),
    blockquote: BlockquoteButton,
    orderedList: OrderedListButton,
    unorderedList: UnorderedListButton,
    sub: SubButton,
    sup: SupButton,
    colorPicker: new ButtonFinder((plugin) => {
        let colorPickerPlugin = plugin.findPlugin('colorPicker');
        if (colorPickerPlugin != null) {
            colorPickerPlugin = colorPickerPlugin.getPlugin();
            if (colorPickerPlugin != null && colorPickerPlugin.ColorPickerButton != null) {
                return colorPickerPlugin.ColorPickerButton;
            }
        }
        return null;
    }),
    anchor: new ButtonFinder((plugin) => {
        let anchorPlugin = plugin.findPlugin('anchor');
        if (anchorPlugin != null) {
            anchorPlugin = anchorPlugin.getPlugin();
            if (anchorPlugin != null && anchorPlugin.LinkButton != null) {
                return anchorPlugin.LinkButton;
            }
        }
        return null;
    }),
    image: new ButtonFinder((plugin) => {
        let imagePlugin = plugin.findPlugin('image');
        if (imagePlugin != null) {
            imagePlugin = imagePlugin.getPlugin();
            if (imagePlugin != null && imagePlugin.ImageButton != null) {
                return imagePlugin.ImageButton;
            }
        }
        return null;
    }),
    video: new ButtonFinder((plugin) => {
        let videoPlugin = plugin.findPlugin('video');
        if (videoPlugin != null) {
            videoPlugin = videoPlugin.getPlugin();
            if (videoPlugin != null && videoPlugin.AddVideoButton != null) {
                return videoPlugin.AddVideoButton;
            }
        }
        return null;
    }),
    undo: new ButtonFinder((plugin) => {
        let undoPlugin = plugin.findPlugin('undo');
        if (undoPlugin != null) {
            undoPlugin = undoPlugin.getPlugin();
            if (undoPlugin != null && undoPlugin.UndoButton != null) {
                return addButtonWrapper(undoPlugin.UndoButton);
            }
        }
        return null;
    }),
    redo: new ButtonFinder((plugin) => {
        let undoPlugin = plugin.findPlugin('undo');
        if (undoPlugin != null) {
            undoPlugin = undoPlugin.getPlugin();
            if (undoPlugin != null && undoPlugin.RedoButton != null) {
                return addButtonWrapper(undoPlugin.RedoButton);
            }
        }
        return null;
    }),
};

export const moreButtons = [
    'strikethrough',
    'h4', 'h5', 'h6',
    'codeBlock', 'code',
    'textAlignLeft', 'textAlignRight', 'textAlignCenter', 'textAlignJustify',
    'sub', 'sup',
];

let morePlugin;

export const toolbarTypes = {
    showOnlyOneStatus: 0,
    showAllOnMore: 1,
    showAll: 2,
};

export const createButtons = (plugin, buttonNames, toolbarType = toolbarTypes.showOnlyOneStatus) => {
    if (!buttons.more) {
        morePlugin = createMoreButton();
        buttons.more = morePlugin.MoreButton;
    }

    return buttonNames.map((nameProps) => {
        let name;
        let showOnMore = null;
        if (typeof nameProps === 'object') {
            name = nameProps.name;
            showOnMore = nameProps.showOnMore;
        } else {
            name = nameProps;
            showOnMore = moreButtons.indexOf(name) !== -1;
        }

        let button = buttons[name];

        if ( button instanceof ButtonFinder) {
            button = button.find(plugin);
        }

        if (!button) {
            return null;
        }

        if (name === 'more') {
            return button;
        }

        if (toolbarTypes.showAll === toolbarType) {
            return button;
        }
        if (!showOnMore && toolbarTypes.showAllOnMore === toolbarType) {
            return button;
        }
        return morePlugin.createButton(button, showOnMore);
    }).filter(button => !!button);
}

export const createButtonsPlugin = () => ({
    customStyleMap: {
        SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
        SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' },
    },
    customStyleFn: (styles, block) => {
        let customStyles = {};
        for(const style of styles) {
            switch(style) {
            case 'CODE':
                customStyles = Object.assign(customStyles, {
                    background: 'rgba(0, 0, 0, 0.05)',
                    fontFamily: 'Monaco, Consolas, "Courier New", "Courier", monospace',
                    padding: '0 3px',
                    margin: '0 4px',
                    borderRadius: '2px',
                });
                break;
            }
        }
        return customStyles;
    },
});

export class ButtonsPlugin extends Plugin {
    name = 'buttons';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createButtonsPlugin();
    }
}
