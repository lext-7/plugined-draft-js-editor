import React, { PureComponent } from 'react';
import { RichUtils } from 'draft-js'

export default class ToolbarModal extends PureComponent {

    clickingInModal = false;

    componentWillMount() {
        this.props.store.subscribeToItem('selection', this.onSelectionChanged);
      }

    componentWillUnmount() {
        this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged);
    }

    onSelectionChanged = () => {
        setTimeout(() => {
            if (!this.clickingInModal) {
                this.props.onOverrideContent(null);
            }
            this.clickingInModal = false;
        }, 0);
    };

    preventBubblingUp = (event) => {
        if (event.target.tagName !== 'INPUT') {
            event.preventDefault();
        }
        this.clickingInModal= true;
    }

    render() {
        const {
            className,
            children,
        } = this.props;
        return (
            <div className={className} onMouseDown={this.preventBubblingUp}>
                {children}
            </div>
        );
    }
}
