import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import unionClassNames from 'union-class-names';
import { createInlineStyleButton } from 'draft-js-buttons';

import ColorPickerButtonComponent from './ColorPickerButton';
import ColorPickerModal from './ColorPickerModal';

import defaultColors from './colors';

export const createColorPickerPlugin = ({ colors }) => {
    return {
        customStyleFn: (styles, block) => {
            return ColorPickerModal.getCurrentColors(styles);
        },
        ColorPickerButton: decorateComponentWithProps(ColorPickerButtonComponent, {
            colors: colors || defaultColors,
        }),
    };
};

export const ColorPickerButton = (props) =>
    <ColorPickerButtonComponent colors={defaultColors} {...props} />
