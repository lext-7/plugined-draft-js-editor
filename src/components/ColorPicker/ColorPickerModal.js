import React, { PureComponent } from 'react';
import { RichUtils } from 'draft-js'
import classNames from 'classnames';

import ColorCell from './ColorCell';

import colors from './colors';


export default class ColorPickerModal extends PureComponent {

    static getCurrentColorStyles(styles, types, mapper) {
        const customStyles = {};
        const colorRegs = (types || [
            'color', 'backgroundColor',
        ]).map(key => {
            customStyles[key] = [];
            return ({
                key,
                reg: new RegExp(`^${key}-`, 'g'),
            });
        });
        for (const style of styles) {
            colorRegs.some(item => {
                if (item.reg.test(style)) {
                    let value = style;
                    if (mapper) {
                        value = mapper(style, item.reg);
                    }
                    customStyles[item.key].push(value);
                    return true;
                }
            });
        }
        return customStyles;
    }

    static getCurrentColors(styles, types) {
        return this.getCurrentColorStyles(styles, types, (style, typeReg) => `#${style.replace(typeReg, '')}`);
    }

    static hasColorStyle(editorState) {
        let has = false;
        this.getCurrentColorStyles(editorState, null, () => {
            has = true;
        });
        return has;
    }

    constructor(props) {
        super(props);
        this.state = {
            type: 'color',
            input: '',
        };
    }

    getSelectedColor = (type) => {
        return this.constructor.getCurrentColors(this.props.getEditorState().getCurrentInlineStyle(), [type])[type][0];
    }

    applyColor = (color) => {
        let editorState = this.props.getEditorState()
        const currentStyle = editorState.getCurrentInlineStyle();

        const { type } = this.state;

        const targetStyle = color ? `${type}-${color.toUpperCase().replace(/^#/, '')}` : null;
        const removedStyles = this.constructor.getCurrentColorStyles(currentStyle, [type])[type];
        for (const style of removedStyles) {
            if (style !== targetStyle) {
                editorState = RichUtils.toggleInlineStyle(editorState, style)
            }
        }
        if (color) {
            editorState = RichUtils.toggleInlineStyle(editorState, targetStyle)
        }
        this.props.setEditorState(editorState);
        this.props.onClose();
    }

    applyType = (type) => {
        this.setState({
            type,
        });
    }

    applyTextColorType = () => this.applyType('color')

    applyBgColorType = () => this.applyType('backgroundColor')

    applyColorFromInput = () => {
        const { input } = this.state;
        if (/^#[0-9a-fA-F]{6}$/.test(input)) {
            this.applyColor(input);
        }
    }

    onInputChange = (e) => {
        this.setState({
            input: e.target.value,
        });
    }

    render() {
        const {
            onClose,
        } = this.props;

        const {
            type,
            input,
        } = this.state;

        const selectedColor = this.getSelectedColor(type);

        return (
            <div
                className="plugined-editor-modal plugined-editor-color-picker"
            >
                <div className="plugined-editor-color-picker-actions">
                    <div
                        className={classNames({
                            'plugined-editor-color-picker-action': true,
                            'active': type === 'color',
                        })}
                        onClick={this.applyTextColorType}
                    >
                        Text
                    </div>
                    <div
                        className={classNames({
                            'plugined-editor-color-picker-action': true,
                            'active': type === 'backgroundColor',
                        })}
                        onClick={this.applyBgColorType}
                    >
                        Background
                    </div>
                    <div
                        className="plugined-editor-color-picker-action plugined-editor-color-picker-close"
                        onClick={onClose}
                    >
                        Close
                    </div>
                </div>
                <div className="plugined-editor-color-picker-cells">
                    {colors.map(color => (
                        <ColorCell
                            key={color}
                            color={color}
                            onClick={this.applyColor}
                            active={color === selectedColor}
                        />
                    ))}
                    <ColorCell
                        key="erase"
                        onClick={this.applyColor}
                    >
                        <div>
                            <svg viewBox="0 0 1098 1024" width="17.15625" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M511.986063 804.571429l192-219.428571-438.857143 0-192 219.428571 438.857143 0zm578.857143-615.428571q8.571429 19.428571 5.428571 40.857143t-17.428571 37.428571l-512 585.142857q-21.714286 25.142857-54.857143 25.142857l-438.857143 0q-21.714286 0-39.714286-11.714286t-27.142857-31.142857q-8.571429-19.428571-5.428571-40.857143t17.428571-37.428571l512-585.142857q21.714286-25.142857 54.857143-25.142857l438.857143 0q21.714286 0 39.714286 11.714286t27.142857 31.142857z"></path>
                            </svg>
                        </div>
                    </ColorCell>
                </div>
                <div className="plugined-editor-color-picker-footer">
                    <input
                        key="input"
                        className="plugined-editor-color-picker-input"
                        value={input && input.length > 0 ? input : selectedColor || ''}
                        onChange={this.onInputChange}
                    />
                    <button
                        key="button"
                        className="plugined-editor-color-picker-ok"
                        onClick={this.applyColorFromInput}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}
