import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import unionClassNames from 'union-class-names';

export default ({ children, blockDataKey, blockDataValue, buttonType }) => class extends PureComponent {

    componentDidMount() {
        const { store } = this.props;
        if (store) {
            store.subscribeToItem(blockDataKey, this.onChange);
        }
    }

    componentWillUnmount() {
        const { store } = this.props;
        if (store) {
            store.unsubscribeFromItem(blockDataKey, this.onChange);
        }
    }

    onChange = () => this.forceUpdate();

    preventBubblingUp = event => {
        event.preventDefault();
    };

    activate = event => {
        event.preventDefault();
        const { getEditorState, setEditorState, store } = this.props;
        const isActive = this.isActive();
        setEditorState(setBlockData(getEditorState(), { [blockDataKey]: isActive ? undefined : blockDataValue }));
        store.updateItem(blockDataKey, blockDataValue);
    };

    isActive = () => getSelectedBlocksMetadata(
        this.props.getEditorState(),
    ).get(blockDataKey) === blockDataValue;

    render() {
        const { theme, wrapIcon } = this.props;
        const isActive = this.isActive();
        const className = isActive
            ? unionClassNames(theme.button, theme.active)
            : theme.button;

        return (
            <div
                className={theme.buttonWrapper}
                onMouseDown={this.preventBubblingUp}
            >
                <button
                    className={className}
                    onClick={this.activate}
                    data-button-type={buttonType}
                    type="button"
                    children={children}
                />
            </div>
        );
    }
};
