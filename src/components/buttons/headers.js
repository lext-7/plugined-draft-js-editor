import React from 'react';
import { createBlockStyleButton } from '../../../lib/draft-js-buttons/lib/';

const numberToEnMap = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
};

export const createHeaderButton = (weight) => createBlockStyleButton({
    blockType: `header-${numberToEnMap[weight]}`,
    children: `H${weight}`,
});

export const HeaderOneButton = createHeaderButton('1');
export const HeaderTwoButton = createHeaderButton('2');
export const HeaderThreeButton = createHeaderButton('3');
export const HeaderFourButton = createHeaderButton('4');
export const HeaderFiveButton = createHeaderButton('5');
export const HeaderSixButton = createHeaderButton('6');
