/**
 * Set up a new panel in the post edit sidebar to enable the user to save a revision note as post meta.
 *
 * Based on code taken from the block editor handbook.
 */
( function( wp ) {
	let { registerPlugin }         = wp.plugins;
	let PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
	let __                         = wp.i18n.__;
	let TextArea                   = wp.components.TextareaControl;
	let el                         = wp.element.createElement;
	let withSelect                 = wp.data.withSelect;
	let withDispatch               = wp.data.withDispatch;
	let FirstLoad                  = true;


	var mapSelectToProps = function ( select ) {
		if ( FirstLoad && select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ 'revision_note' ] ) {
			/*
			On the first load, the value will be whatever the last saved revision note is. We don't want that though,
			so clear it out.
			 */
			FirstLoad = false;
			wp.data.dispatch( 'core/editor' ).editPost( { meta: { revision_note: '' } } )
		}
		return {
			metaFieldValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ 'revision_note' ],
		}
	};

	var NewRevisionNote = function ( props ) {
		return el( TextArea, {
			value   : props.metaFieldValue,
			onChange: function ( content ) {
				props.setMetaFieldValue( content );
			},
		} );
	};

	var mapDispatchToProps = function ( dispatch ) {
		return {
			setMetaFieldValue: function ( value ) {
				dispatch( 'core/editor' ).editPost(
					{ meta: { revision_note: value } }
				);
			}
		}
	};

	var NewRevisionNoteWithData           = withSelect( mapSelectToProps )( NewRevisionNote );
	var NewRevisionNoteWithDataAndActions = withDispatch( mapDispatchToProps )( NewRevisionNoteWithData );


	/**
	 * Builds and returns the panel contents.
	 */
	const RevisionNotePanel = function () {
		return el(
			PluginDocumentSettingPanel,
			{
				className  : 'revision-notes',
				title      : __( 'Revision Note', 'revision-notes' ),
				initialOpen: true,
			},
			__( 'Add an optional revision note.', 'revision-notes' ),
			el( NewRevisionNoteWithDataAndActions ),
		);
	};

	registerPlugin( 'revision-note-panel', {
		render: RevisionNotePanel,
		icon  : 'admin-page',
	} );
} )( window.wp );
