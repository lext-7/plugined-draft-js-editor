import React from 'react';
import { createInlineStyleButton } from '../../../lib/draft-js-buttons/lib/';

export default createInlineStyleButton({
    style: 'ITALIC',
    children: <i>I</i>,
});
