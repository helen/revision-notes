import { TextareaControl } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
 
const RevisionNotesField = () => {
	const meta = useSelect((select) =>
      select('core/editor').getEditedPostAttribute('meta'),
    );

	return (
		<PluginPostStatusInfo>
			<TextareaControl
				label={__( 'Revision note (optional)', 'revision-notes' )}
				help={__( 'Enter a brief note about this change', 'revision-notes' )}
				value={meta.revision_note}
				onChange={(value) =>
					dispatch('core/editor').editPost({
						meta: { revision_note: value },
					})
				}
			/>
		</PluginPostStatusInfo>
	);
}

registerPlugin(
	'revision-notes',
	{
		render: RevisionNotesField
	}
);
