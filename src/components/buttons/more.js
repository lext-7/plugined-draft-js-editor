import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import unionClassNames from 'union-class-names';

import createStore from '../../../lib/draft-js-inline-toolbar-plugin/lib/utils/createStore'

export class MoreButton extends Component {
    static storeKey = 'isMoreOpened';

    activate = event => {
        event.preventDefault();
        this.props.store.updateItem(this.constructor.storeKey, !this.isActive());
        this.forceUpdate();
    };

    preventBubblingUp = event => {
        event.preventDefault();
    };

    isActive = () => this.props.store.getItem(this.constructor.storeKey);

    render() {
        const { theme } = this.props;
        const className = this.isActive()
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
                    data-button-type="more"
                    type="button"
                >
                    <svg viewBox="0 0 1024 1024" width="16" height="16" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M326.24128 1.152 186.9056 140.45696 558.42816 512 186.9056 883.54304 326.24128 1022.848 837.0944 512Z"></path>
                    </svg>
                </button>
            </div>
        );
    }
}

export default () => {
    const store = createStore({
        [MoreButton.storeKey]: false,
    });

    return {
        MoreButton: decorateComponentWithProps(MoreButton, {
            store,
        }),
        createButton: (ButtonComponent, showOnMore) => class extends Component {
            componentDidMount() {
                store.subscribeToItem(MoreButton.storeKey, this.onChange);
            }

            componentWillUnmount() {
                store.unsubscribeFromItem(MoreButton.storeKey, this.onChange);
            }

            isActive = () => store.getItem(MoreButton.storeKey);

            onChange = () => {
                this.forceUpdate();
            }

            render() {
                const active = this.isActive();
                if (showOnMore ? !active : active) {
                    return null;
                }
                return <ButtonComponent {...this.props} />;
            }
        },
    };
};
