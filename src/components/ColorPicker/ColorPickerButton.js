import React, { PureComponent } from 'react';
import { createInlineStyleButton } from 'draft-js-buttons';

import ColorPickerModal from './ColorPickerModal';
import ToolbarModal from './ToolbarModal';

export default class ColorPickerButton extends createInlineStyleButton({
    style: 'color',
    children: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 1024 1024"
            width="24"
        >
            <path
                d="M468.825177 127.573537l-220.13977 577.388243h104.699574l45.691645-134.723378h223.718271l49.309033 134.723378h104.70469l-220.179678-577.388243h-87.803765z m42.110073 122.714879l80.604806 239.34518h-164.787091l84.182285-239.386112v0.040932z m-307.939441 531.658736v115.478058h615.878882v-115.478058h-615.878882z"
            />
        </svg>
    ),
}) {
    toggleStyle = e => {
        e.preventDefault();
        e.stopPropagation();
        const {
            ownTheme,
            placeholder,
            onOverrideContent,
            colors,
            store,
        } = this.props;

        const content = (props) => (
            <ToolbarModal
                onOverrideContent={onOverrideContent}
                store={store}
            >
                <ColorPickerModal
                    {...props}
                    onClose={this.onClose}
                    colors={colors}
                />
            </ToolbarModal>
        );
        onOverrideContent(content);
    }

    styleIsActive = () => ColorPickerModal.hasColorStyle(this.props.getEditorState().getCurrentInlineStyle());

    onClose = () => {
        this.props.onOverrideContent(null);
    }
}
