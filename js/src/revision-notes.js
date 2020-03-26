( function( wp ) {

	/*
		Based on code from the BLock Editor Handbook.
	 */

	var registerPlugin = wp.plugins.registerPlugin;
	var PluginSidebar  = wp.editPost.PluginSidebar;
	var el             = wp.element.createElement;
	var Text           = wp.components.TextControl;
	var withSelect     = wp.data.withSelect;
	var withDispatch   = wp.data.withDispatch;
	var compose        = wp.compose.compose;

	var MetaBlockField = compose(
		withDispatch( function( dispatch, props ) {
			return {
				setMetaFieldValue: function( value ) {
					dispatch( 'core/editor' ).editPost(
						{ meta: { [ props.fieldName ]: value } }
					);
				}
			}
		} ),
		withSelect( function( select, props ) {
			return {
				metaFieldValue: select( 'core/editor' )
				.getEditedPostAttribute( 'meta' )
					[ props.fieldName ],
			}
		} )
	)( function( props ) {
		return el( Text, {
			label: '(optional))',
			value: props.metaFieldValue,
			onChange: function( content ) {
				props.setMetaFieldValue( content );
			},
		} );
	} );


	registerPlugin( 'revision-notes-sidebar', {
		render: function() {
			return el( PluginSidebar,
				{
					name: 'revision-notes',
					icon: 'admin-post',
					title: 'Revision Notes',
				},
				el( 'div',
					{ className: 'revision-notes' },
					el( MetaBlockField,
						{ fieldName: 'revision_note' }
					)
				)
			);
		},
	} );
} )( window.wp );