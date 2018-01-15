import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class ColorCell extends PureComponent {
    onClick = () => {
        const { color, onClick } = this.props;
        if (onClick) {
            onClick(color);
        }
    }

    render() {
        const { color, active, children } = this.props;
        return (
            <div
                className={classNames({
                    'plugined-editor-color-picker-cell': true,
                    active,
                })}
                style={{ backgroundColor: color }}
                onClick={this.onClick}
                children={children}
            />
        );
    }
}
