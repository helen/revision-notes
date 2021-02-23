import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
 
const PluginPostStatusInfoTest = () => (
    <PluginPostStatusInfo>
        <p>Post Status Info SlotFill</p>
    </PluginPostStatusInfo>
);
 
registerPlugin(
	'post-status-info-test',
	{
		render: PluginPostStatusInfoTest
	}
);
