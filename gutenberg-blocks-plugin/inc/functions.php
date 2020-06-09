<?php
/**
 * gutenberg Blocks plugin loader.
 *
 * @package gutenberg
 */

declare( strict_types = 1 );

namespace gutenberg\Blocks;

use const gutenberg\Content\{ CPT_GAMES, CPT_JOKES, CPT_POSTS, CPT_VIDEOS, TAX_SUBJECT };

use Asset_Loader;
use gutenberg\Autoloader;
use gutenberg\Blocks;
use WP_Query;

/**
 * Set up plugin.
 * Register actions and filters.
 */
function bootstrap() : void {

	Autoloader\register_class_path( __NAMESPACE__, __DIR__ );

	\add_action( 'init', __NAMESPACE__ . '\register_blocks' );
	\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\add_frontend_css' );
	\add_filter( 'rest_post_collection_params', __NAMESPACE__ . '\gutenberg_posts_per_page', 10, 1 );
	\add_action( 'acf/init', __NAMESPACE__ . '\register_acf_block_types' );
}

/**
 * Register front-end CSS.
 */
function add_frontend_css() : void {

	Asset_Loader\autoenqueue(
		dirname( __DIR__ ) . '/dist/asset-manifest.json',
		'blocks-frontend.js',  // This has to match the "entry" object name in the Webpack config.
		[
			'handle' => 'gutenberg-blocks-frontend',
		]
	);
}

/**
 * Register blocks.
 */
function register_blocks() : void {

	Asset_Loader\autoregister(
		dirname( __DIR__ ) . '/dist/asset-manifest.json',
		'blocks.js',  // This has to match the "entry" object name in the Webpack config.
		[
			'scripts' => [ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-api' ],
			'styles'  => [ 'wp-edit-blocks' ],
			'handle'  => 'gutenberg-blocks',
		]
	);

	\register_block_type(
		'gutenberg/jokes-group-block',
		[
			'editor_script'   => 'gutenberg-blocks',
			'editor_style'    => 'gutenberg-blocks',
			'style'           => 'gutenberg-blocks-frontend',
			'attributes'      => [
				'terms' => [
					'type'    => 'array',
					'default' => [
						'label' => esc_html__( 'All subjects', 'gutenberg' ),
						'value' => 'any',
					],
					'items'   => [
						'type' => 'object',
					],
				],
				'term'  => [
					'type'    => 'string',
					'default' => 'any',
				],
			],
			'render_callback' => __NAMESPACE__ . '\render_dynamic_block_jokes',
		]
	);

	\register_block_type(
		'gutenberg/spotlight-block',
		[
			'editor_script'   => 'gutenberg-blocks',
			'editor_style'    => 'gutenberg-blocks',
			'style'           => 'gutenberg-blocks-frontend',
			'attributes'      => [
				'className'     => [
					'type' => 'string',
				],
				'spotlightToggle' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'searchToggle' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'contentSearch' => [
					'type'    => 'boolean',
					'default' => true,
				],
				'search'        => [
					'type' => 'string',
				],
				'post'          => [
					'type' => 'object',
				],
				'postTypesList' => [
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type' => 'object',
					],
				],
				'postType'      => [
					'type'    => 'string',
					'default' => 'any',
				],
				'taxonomies'    => [
					'type'    => 'array',
					'default' => [
						'label' => 'All taxonomies',
						'value' => 'any',
					],
					'items'   => [
						'type' => 'object',
					],
				],
				'taxonomy'      => [
					'type'    => 'string',
					'default' => 'any',
				],
				'terms'         => [
					'type'    => 'array',
					'default' => [
						'label' => 'All terms',
						'value' => 'any',
					],
					'items'   => [
						'type' => 'object',
					],
				],
				'term'          => [
					'type'    => 'string',
					'default' => 'any',
				],
			],
			'render_callback' => __NAMESPACE__ . '\render_dynamic_block_shelf_card',
		]
	);
}

/**
 * Spotlight block callback function.
 *
 * @param mixed $attributes  The php attributes which match the js registered attributes.
 */
function render_dynamic_block_shelf_card( array $attributes ) : string {
	$container_class = 'single-content';
	if ( isset( $attributes['results'] ) ) {
		$container_class = 'content-grid';
	}

	$card_objects = get_shelf_posts( $attributes );

	$block_content = '';

	$array_of_post_ids_to_skip = [ get_the_ID() ];

	if ( $card_objects->have_posts() ) {

		$classes = [ 'spotlight-block' ];
		if ( isset( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		$block_content .= '
		<div class="' . esc_attr( join( ' ', $classes ) ) . '">
			<div class="' . "{$container_class} o-container" . '">';

		while ( $card_objects->have_posts() ) {

			if ( in_array( $card_objects, $array_of_post_ids_to_skip, true ) ) {
				continue;
			}
			$card_objects->the_post();

			$template_loader = new Blocks\gutenberg_Template_Loader();
			$template        = $template_loader->get_template_part( 'card', get_post_type() );
			$card            = include $template;

			$block_content .= $card;
		}

		$block_content .= '
			</div>
		</div>';
	}

	wp_reset_postdata();

	return $block_content;
}

/**
 * Return a WP_Query object for rendering the card(s).
 *
 * @param array $attributes The block's attributes.
 *
 * @return WP_Query
 */
function get_shelf_posts( array $attributes ) : WP_Query {

	$allowed_post_types = [
		CPT_GAMES,
		CPT_POSTS,
		CPT_VIDEOS,
		'page',
	];

	$results = 1;
	if ( isset( $attributes['results'] ) ) {
		$results = max( 1, (int) $attributes['results'] );
	}

	$post_id = 0;
	if ( isset( $attributes['post']['id'] ) ) {
		$post_id = absint( $attributes['post']['id'] );
	}

	$tax_query = [];
	if ( 'any' !== $attributes['taxonomy'] && 'any' !== $attributes['term'] ) {
		$tax_query = [
			[
				'taxonomy' => sanitize_text_field( $attributes['taxonomy'] ),
				'field'    => 'slug',
				'terms'    => sanitize_text_field( $attributes['term'] ),
			],
		];
	}

	$post_type = sanitize_text_field( $attributes['postType'] );
	if ( 'any' === $post_type ) {
		$post_type = $allowed_post_types;
	}

	$current_post_id = get_the_ID();

	$query_args = [
		'no_found_rows'  => true,
		'p'              => $post_id,
		'posts_per_page' => $results,
		'post_type'      => $post_type,
		'tax_query'      => $tax_query,  // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- optional tax lookup.
		'post_status'    => 'publish',
	];

	$query = new WP_Query( $query_args );

	// Query for more posts of any type if there aren't enough results.
	if ( $query->post_count < $results && ! is_array( $post_type ) ) {

		$found_ids = array_map(
			function( $p ) {
				return $p->ID;
			},
			$query->posts
		);

		$fallback_query = new WP_Query(
			wp_parse_args(
				[
					'no_found_rows'  => true,
					'post_type'      => array_diff( $allowed_post_types, [ $post_type ] ),
					'posts_per_page' => $results - $query->post_count,
				],
				$query_args
			)
		);

		$query->posts = array_merge( $query->posts, $fallback_query->posts );

		$query->post_count = count( $query->posts );
	}

	return $query;
}

/**
 * Dynamic blocks callback.
 *
 * @param string $attributes The terms used in the query to enable filtering.
 * @param string $content The contents of the block.
 *
 * @return mixed The final html markup of the jokes group wrapper and the internal joke blocks parsed from a jokes cpt page.
 */
function render_dynamic_block_jokes( $attributes, $content ) {
	$tax_query = [];
	if ( isset( $attributes['term'] ) && 'any' !== $attributes['term'] ) {
		$tax_query      = [
			[
				'taxonomy' => TAX_SUBJECT,
				'field'    => 'slug',
				'terms'    => sanitize_text_field( $attributes['term'] ),
			],
		];
	}

	$query_args = [
		'posts_per_page'         => 20,
		'update_post_meta_cache' => false,
		'no_found_rows'          => true,
		'post_type'              => CPT_JOKES,
		'post_status'            => 'publish',
		'tax_query'              => $tax_query, //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
	];

	$query = new WP_Query( $query_args );

	$block_content    = '';
	$block_collection = [];

	if ( $query->have_posts() ) {

		$block_content .= '<div class="jokes-block-wrapper">';
		while ( $query->have_posts() ) {
			$query->the_post();
			$post_id = get_the_ID();
			$post    = get_post( $post_id );
			$blocks  = parse_blocks( $post->post_content );

			$joke_block = '';
			$class_name = '';
			foreach ( $blocks as $block ) {
				$joke_block .= render_block( $block );
				if ( isset( $block[ 'attrs' ][ 'className' ] ) ) {
					$class_name = $block[ 'attrs' ][ 'className' ];
				}
			}

			$block_collection[] = [ 'classname' => ( $class_name ) ?: '', 'html' => $joke_block ];

		}

		$block_content .= sort_joke_group_block_by_image( $block_collection );
		$block_content .= '</div>';
	}

	wp_reset_postdata();

	return $block_content;

}

/**
 * Sort the joke blocks into two sections, those with images and those without, return these as a string with the no-image jokes after those with
 *
 * @param  array  $block_collection
 *
 * @return string
 */
function sort_joke_group_block_by_image( array $block_collection ): string {

	$no_image_classname = 'is-style-no_image';

	$rtn                       = '';
	$joke_collection_images    = [];
	$joke_collection_no_images = [];

	foreach ( $block_collection as $block ) {

		$class_name = explode( ' ', $block[ 'classname' ] );

		if ( in_array( $no_image_classname, $class_name ) ) {
			$joke_collection_no_images [] = $block[ 'html' ];
		} else {
			$joke_collection_images[] = $block[ 'html' ];
		}
	}

	$rtn .= implode( '', array_merge_recursive( $joke_collection_images, $joke_collection_no_images ) );

	return $rtn;

}

/**
 * Override REST API's posts per_page maximum value.
 *
 * @param array $number The value of the per page posts limit.
 *
 * @return array
 */
function gutenberg_posts_per_page( $number ) {
	if ( isset( $number['per_page'] ) ) {
		$number['per_page']['maximum'] = 500;
	}
	return $number;
}

/**
 * ACF Block registration
 */
function register_acf_block_types() {
	// register a poll block.
	acf_register_block_type(
		[
			'mode'            => 'edit',
			'name'            => 'poll',
			'title'           => __( 'Poll Block', 'gutenberg' ),
			'description'     => __( 'A poll block.', 'gutenberg' ),
			'render_template' => 'template-parts/blocks/acf-poll-block.php',
			'category'        => 'formatting',
			'icon'            => 'admin-comments',
			'keywords'        => [ 'poll', 'block' ],
		]
	);
}
