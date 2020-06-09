/**
 * Internal dependencies
 */
const { __ } = wp.i18n;

import metadata from './block.json';
import attributes from './attributes';
import styles from './styles';
import edit from './edit';
import save from './save';
import './styles.scss';

export const { name } = metadata;

export const settings = {
	title: __( 'Joke Block', 'gutenberg' ),
	category: 'common',
	icon: 'smiley',
	edit,
	save,
	attributes,
	styles,
};
