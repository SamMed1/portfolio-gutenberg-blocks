/**
 * Internal dependencies
 */
const { __ } = wp.i18n;

import metadata from './block.json';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './styles.scss';

export const { name } = metadata;

export const settings = {
	title: __( 'Hero Banner Block', 'gutenberg' ),
	category: 'common',
	icon: 'excerpt-view',
	edit,
	save,
	attributes,
};
