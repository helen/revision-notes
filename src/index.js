import { TextareaControl } from '@wordpress/components';
import { usePrevious } from '@wordpress/compose';
import { dispatch, useSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
 
const RevisionNotesField = () => {
	const [ revisionNote, setRevisionNote ] = useState('');

	const { isSavingPost } = useSelect(
		( select ) => ( {
			isSavingPost:
				select( 'core/editor' ).isSavingPost() &&
				! select( 'core/editor' ).isAutosavingPost(),
		} )
	);
	const prevIsSavingPost = usePrevious( isSavingPost );

	useEffect( () => {
		if (
			! isSavingPost &&
			prevIsSavingPost
		) {
			setRevisionNote('');
		}
	}, [ isSavingPost, prevIsSavingPost ] );

	return (
		<PluginPostStatusInfo>
			<TextareaControl
				label={__( 'Revision note (optional)', 'revision-notes' )}
				help={__( 'Enter a brief note about this change', 'revision-notes' )}
				value={revisionNote}
				onChange={
					(value) => {
						setRevisionNote( value );

						dispatch('core/editor').editPost({
							meta: { revision_note: value },
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
