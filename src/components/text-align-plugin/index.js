import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from '../../../lib/draft-js-inline-toolbar-plugin/lib/utils/createStore';
import createBlockDataButton from './createBlockDataButton';
import {
    TextAlignCenterButton,
    TextAlignJustifyButton,
    TextAlignLeftButton,
    TextAlignRightButton,
} from './buttons';

export const createTextAlignPlugin = (config = {}) => {

    const store = createStore({
        'text-align': null,
    });

    const buttonProps = {
        store,
    };

    const createTextAlignButton = (Button) =>
        decorateComponentWithProps(Button, buttonProps);

    return {
        blockStyleFn: (block, { getEditorState }) => {
            const blockAlignment =
                block.getData() && block.getData().get('text-align');
            if (blockAlignment) {
                return `plugined-editor-align-${blockAlignment}`;
            }
        },
        createBlockDataButton,
        createTextAlignButton,
        TextAlignCenterButton: createTextAlignButton(TextAlignCenterButton),
        TextAlignJustifyButton: createTextAlignButton(TextAlignJustifyButton),
        TextAlignLeftButton: createTextAlignButton(TextAlignLeftButton),
        TextAlignRightButton: createTextAlignButton(TextAlignRightButton),
    };
};
