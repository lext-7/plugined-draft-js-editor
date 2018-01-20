
import createBlockDataButton from './createBlockDataButton';
import {
    TextAlignCenterButton,
    TextAlignJustifyButton,
    TextAlignLeftButton,
    TextAlignRightButton,
} from './buttons';

export const createTextAlignPlugin = (config = {}) => {
    return {
        blockStyleFn: (block, { getEditorState }) => {
            const blockAlignment =
                block.getData() && block.getData().get('textAlign');
            if (blockAlignment) {
                return `plugined-editor-align-${blockAlignment}`;
            }
        },
        createBlockDataButton,
        TextAlignCenterButton,
        TextAlignJustifyButton,
        TextAlignLeftButton,
        TextAlignRightButton,
    };
};
