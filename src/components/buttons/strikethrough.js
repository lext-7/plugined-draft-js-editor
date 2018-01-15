import React from 'react';
import { createInlineStyleButton } from '../../../lib/draft-js-buttons/lib/';

export default createInlineStyleButton({
    style: 'STRIKETHROUGH',
    children: <strike>&ensp;S&ensp;</strike>,
});
