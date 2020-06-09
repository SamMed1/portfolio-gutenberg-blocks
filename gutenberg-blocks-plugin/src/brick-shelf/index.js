/* Block dependencies */
import metadata from './block.json';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './styles.scss';

/* WordPress dependencies */
const { __ } = wp.i18n;

export const { name } = metadata;

export const settings = {
	title: __( 'Brick Shelf Block', 'gutenberg' ),
	category: 'common',
	icon: 'smiley',
	edit,
	save,
	attributes,
};
