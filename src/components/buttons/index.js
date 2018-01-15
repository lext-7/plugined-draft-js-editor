import React, { PureComponent } from 'react';

import bold from './bold';
import italic from './italic';
import underline from './underline';
import strikethrough from './strikethrough';
import more from './more';
import codeBlock from './codeBlock';

export const BoldButton = bold;
export const ItalicButton = italic;
export const UnderlineButton = underline;
export const StrikethroughButton = strikethrough;
export const createMoreButton = more;
export * from './headers';
export const CodeBlockButton = codeBlock;
