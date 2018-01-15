import Plugin from '../PluginEditor/plugin';

import createBlockDndPlugin from '../../lib/draft-js-drag-n-drop-upload-plugin/lib';
import addImage from '../../lib/draft-js-image-plugin/lib/modifiers/addImage';

class DNDUploadPlugin extends Plugin {
    name = 'dndUpload';

    init(editor, pluginProps, props) {
        super.init(editor, pluginProps, props);
        this.plugin = createBlockDndPlugin({
            handleUpload: pluginProps.handleUpload || props.handleUpload,
            addImage,
            ...pluginProps.initOptions,
        });
    }
}

export default DNDUploadPlugin;
