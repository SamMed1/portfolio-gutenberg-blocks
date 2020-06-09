<?php
/**
 * Plugin Name: Gutenberg Blocks.
 * Description: Bespoke Gutenberg blocks for gutenberg.
 * Author: Sam Medhurst
 */

declare( strict_types = 1 );

namespace gutenberg\Blocks;

require_once __DIR__ . '/inc/functions.php';

\add_action( 'plugins_loaded', __NAMESPACE__ . '\bootstrap' );
