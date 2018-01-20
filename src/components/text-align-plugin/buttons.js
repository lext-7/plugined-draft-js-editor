import React from 'react';
import createBlockDataButton from './createBlockDataButton';

export const TextAlignLeftButton = createBlockDataButton({
    blockDataKey: 'textAlign',
    blockDataValue: 'left',
    buttonType: 'align-left',
    children: (
        <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21,15 L15,15 L15,17 L21,17 L21,15 Z M21,7 L15,7 L15,9 L21,9 L21,7 Z M15,13 L21,13 L21,11 L15,11 L15,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M3,7 L3,17 L13,17 L13,7 L3,7 Z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    ),
});

export const TextAlignCenterButton = createBlockDataButton({
    blockDataKey: 'textAlign',
    blockDataValue: 'center',
    buttonType: 'align-center',
    children: (
        <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M5,7 L5,17 L19,17 L19,7 L5,7 Z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    ),
});

export const TextAlignRightButton = createBlockDataButton({
    blockDataKey: 'textAlign',
    blockDataValue: 'right',
    buttonType: 'align-right',
    children: (
        <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9,15 L3,15 L3,17 L9,17 L9,15 Z M9,7 L3,7 L3,9 L9,9 L9,7 Z M3,13 L9,13 L9,11 L3,11 L3,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M11,7 L11,17 L21,17 L21,7 L11,7 Z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    ),
});

export const TextAlignJustifyButton = createBlockDataButton({
    blockDataKey: 'textAlign',
    blockDataValue: 'justify',
    buttonType: 'align-justify',
    children: (
        <svg
            height="24"
            viewBox="0 0 1024 1024"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 64.365714l1024 0 0 128.731429L0 193.097143 0 64.365714zM0 256l1024 0 0 128.731429L0 384.731429 0 256zM0 447.634286l1024 0 0 128.731429L0 576.365714 0 447.634286zM0 640.731429l1024 0 0 128.731429L0 769.462857 0 640.731429zM0 832.365714l1024 0 0 128.731429L0 961.097143 0 832.365714z"></path>
        </svg>
    ),
});
