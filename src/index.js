import { TextareaControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
 
const RevisionNotesField = () => {
	// The revision note only needs to be saved anew each time,
	// and directly editing a core meta field leads to a "dirty" editor state,
	// so we use a custom REST field instead that always returns an empty string.
	const { editPost } = useDispatch( 'core/editor' );
	const revisionNote = useSelect( ( select ) => select( 'core/editor' ).getEditedPostAttribute( 'revision_note' ) );

	return (
		<PluginPostStatusInfo>
			<TextareaControl
				label={ __( 'Revision note (optional)', 'revision-notes' ) }
				help={ __( 'Enter a brief note about this change', 'revision-notes' ) }
				value={ revisionNote }
				onChange={
					(value) => {
						editPost({
							revision_note: value,
						});
					}
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
