<?php
/*
 * Plugin Name: Zoltiq Chatbot
 * Description: A simple plugin to add a Assistant AI to your WordPress Website.
 * Version:     0.5.0
 * Author:      Sebastian Rakowicz
 * Author URI:  https://zoltiq.com
 * License:     GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

//require 'vendor/autoload.php';
require plugin_dir_path(__FILE__) . 'vendor/autoload.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings-html.php';
require_once plugin_dir_path(__FILE__) . 'includes/embedding.php';
require_once plugin_dir_path(__FILE__) . 'includes/history.php';
require_once plugin_dir_path(__FILE__) . 'includes/chat.php';
require_once plugin_dir_path(__FILE__) . 'includes/chat-html.php';
require_once plugin_dir_path(__FILE__) . 'plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

/* If this file is called directly, exit. */
defined( 'WPINC' ) || die;

/* If this file is called directly, exit. */
if ( ! defined( 'ABSPATH' ) ) {
	die();
}




/*

$sql = "SELECT 
         p.ID AS id,
         p.post_content AS description, 
         p.post_title AS title, 
         pm_price.meta_value AS price, 
         pm_reg.meta_value AS regular_price,
         pm_rating.meta_value AS rating,
         wp2.guid AS image_url
       FROM $wpdb->posts AS p
         LEFT JOIN $wpdb->postmeta AS pm_price 
            ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN $wpdb->postmeta AS pm_reg
            ON p.ID = pm_reg.post_id AND pm_reg.meta_key = '_regular_price'
         LEFT JOIN $wpdb->postmeta AS pm_rating 
            ON p.ID = pm_rating.post_id AND pm_rating.meta_key = '_wc_average_rating'
         LEFT JOIN $wpdb->postmeta AS pm_thumb
            ON p.ID = pm_thumb.post_id AND pm_thumb.meta_key = '_thumbnail_id'
         LEFT JOIN $wpdb->posts AS wp2
            ON wp2.ID = pm_thumb.meta_value AND wp2.post_type = 'attachment'

";

// Przygotowujemy zmienne na dynamiczne JOINy i warunki
$dynamicJoins = "";
$dynamicConditions = "";
$args = ['bluza'];
$attributes = '{"color": "czarny"}';


// Jeśli parametr attributes (JSON) został przekazany, dekodujemy go
if (!empty($attributes)) {
    $attrFilters = json_decode($attributes, true);


    if (json_last_error() === JSON_ERROR_NONE && is_array($attrFilters)) {
        foreach ($attrFilters as $attrKey => $attrValue) {
            // Mapowanie nazw atrybutów na odpowiadające im taksonomie.
            // Przykładowo: "color" powinno mapować się do "pa_color",
            // "size" do "pa_rozmiar", a "gender" np. do "pa_gender".
            $taxonomyMap = [
                'color'  => 'pa_color',
                'size'   => 'pa_rozmiar',
                // dodaj kolejne mapowania w razie potrzeby
            ];
            
            if (isset($taxonomyMap[$attrKey]) && !empty($attrValue)) {
                // Tworzymy unikalne aliasy dla każdego atrybutu, aby uniknąć konfliktów
                $aliasSuffix = $attrKey;
                
                $dynamicJoins .= "
                 LEFT JOIN {$wpdb->term_relationships} AS tr_{$aliasSuffix} 
                    ON p.ID = tr_{$aliasSuffix}.object_id
                 LEFT JOIN {$wpdb->term_taxonomy} AS tt_{$aliasSuffix} 
                    ON tr_{$aliasSuffix}.term_taxonomy_id = tt_{$aliasSuffix}.term_taxonomy_id
                 LEFT JOIN {$wpdb->terms} AS t_{$aliasSuffix} 
                    ON tt_{$aliasSuffix}.term_id = t_{$aliasSuffix}.term_id
                ";
                
                // Dodajemy warunek: taksonomia musi odpowiadać danej atrybutowi 
                // oraz nazwa terminu musi być równa przekazanej wartości.
                //$dynamicConditions .= " AND tt_{$aliasSuffix}.taxonomy = '" . esc_sql($taxonomyMap[$attrKey]) . "' 
                //                         AND t_{$aliasSuffix}.name = '" . esc_sql($attrValue) . "' ";
                $dynamicConditions .= " AND tt_{$aliasSuffix}.taxonomy = %s AND t_{$aliasSuffix}.name = %s ";
                $args[] = $taxonomyMap[$attrKey];
                $args[] = $attrValue;
            }
        }
    }
}


// Dołączamy dynamiczne JOINy do zapytania SQL
$sql .= $dynamicJoins;
    
// Dodajemy główne warunki WHERE
$sql .= "
       WHERE p.post_type = 'product'
         AND p.post_status = 'publish'
         AND MATCH(p.post_title, p.post_content) AGAINST(%s)
       ";



// Dołączamy dynamiczne warunki, jeśli zostały wygenerowane
if (!empty($dynamicConditions)) {
    $sql .= $dynamicConditions;
}



$prepared = $wpdb->prepare($sql, ...$args);
$posts = $wpdb->get_results($prepared, ARRAY_A);
echo var_dump($posts);
exit;
*/



/*
$sql = "SELECT 
         p.ID AS id,
         p.post_content AS description, 
         p.post_title AS title, 
         pm_price.meta_value AS price, 
         pm_reg.meta_value AS regular_price,
         pm_rating.meta_value AS rating,
         wp2.guid AS image_url
       FROM $wpdb->posts AS p
         LEFT JOIN $wpdb->postmeta AS pm_price 
            ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN $wpdb->postmeta AS pm_reg
            ON p.ID = pm_reg.post_id AND pm_reg.meta_key = '_regular_price'
         LEFT JOIN $wpdb->postmeta AS pm_rating 
            ON p.ID = pm_rating.post_id AND pm_rating.meta_key = '_wc_average_rating'
         LEFT JOIN $wpdb->postmeta AS pm_thumb
            ON p.ID = pm_thumb.post_id AND pm_thumb.meta_key = '_thumbnail_id'
         LEFT JOIN $wpdb->posts AS wp2
            ON wp2.ID = pm_thumb.meta_value AND wp2.post_type = 'attachment'

";

$color = 'czerwony';
$size = 'large';

// Jeśli ustawiono filtr koloru, dołącz dodatkowe tabele i warunki
if( !empty( $color ) ) {
    $sql .= "
         LEFT JOIN $wpdb->term_relationships AS tr_color 
            ON p.ID = tr_color.object_id
         LEFT JOIN $wpdb->term_taxonomy AS tt_color 
            ON tr_color.term_taxonomy_id = tt_color.term_taxonomy_id
         LEFT JOIN $wpdb->terms AS t_color 
            ON tt_color.term_id = t_color.term_id
    ";
}

// Optionally add joins for the size filter
if( !empty( $size ) ) {
    $sql .= "
         LEFT JOIN $wpdb->term_relationships AS tr_size 
            ON p.ID = tr_size.object_id
         LEFT JOIN $wpdb->term_taxonomy AS tt_size 
            ON tr_size.term_taxonomy_id = tt_size.term_taxonomy_id
         LEFT JOIN $wpdb->terms AS t_size 
            ON tt_size.term_id = t_size.term_id
    ";
}

$sql .= "
       WHERE p.post_type = 'product'
         AND p.post_status = 'publish'
         AND MATCH(p.post_title, p.post_content) AGAINST(%s)
";
$args = ['bluza'];

// Dodajemy warunek filtra dla atrybutu kolor, używając taksonomii 'pa_color'
if( !empty( $color ) ) {
    $sql .= " AND tt_color.taxonomy = 'pa_color' AND t_color.name = %s";
    $args[] = $color;
}

// Append the size filter condition if a size is provided
if( !empty( $size ) ) {
    $sql .= " AND tt_size.taxonomy = 'pa_rozmiar' AND t_size.name = %s";
    $args[] = $size;
}

$prepared = $wpdb->prepare($sql, ...$args);
$posts = $wpdb->get_results($prepared, ARRAY_A);
echo var_dump($posts);
exit;
*/


/* Initialize plugin update checker */
$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://plugins.zoltiq.com/chatbot/details.json',
	__FILE__,
	'zoltiq-chatbot'
);


/**
 * Add a settings link to the plugin entry in the plugins list.
 *
 * @param array $links Existing plugin action links.
 * @return array Modified plugin action links with a settings page link.
 */
function chat_plugin_action_links($links) {
    $settings_link = '<a href="../wp-admin/options-general.php?page=chatbot-settings">' . __('Settings', 'chatbot-settings') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'chat_plugin_action_links');


/**
 * Initializes the chat plugin functionality by adding a full-text index
 */
function initialize_chat_plugin() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'posts';
  
    $wpdb->query("ALTER TABLE `$table_name` ADD FULLTEXT `wp_fulltext` (`post_title`, `post_content`)");
}
register_activation_hook(__FILE__, 'initialize_chat_plugin');




add_action( 'woocommerce_after_register_post_type', 'map_taxionomy', 10 );

function map_taxionomy() {
    $attribute_taxonomies = wc_get_attribute_taxonomies();
    $taxonomyMap = new stdClass();
    
    //$taxonomyMap = [];
    $example = [];

    
    foreach ( $attribute_taxonomies as $item ) {
        // We make sure we have both fields
        if ( isset($item->attribute_label, $item->attribute_name) ) {
            $taxonomyMap->taxonomy_map[ strtolower(preg_replace('/\s+/', '_', $item->attribute_label)) ] = "pa_" . $item->attribute_name;
        }
    }
    
    foreach($taxonomyMap->taxonomy_map as $key => $v){
        // We make sure the taxonomy exists
        if ( ! taxonomy_exists($v) ) {
            echo 'Taxonomy '. $v .' not yet registered.';
            return;
        }

        // We retrieve all therms (values) from taxonomy
        $terms = get_terms([
            'taxonomy'   => $v,
            'hide_empty' => false,
        ]);

        if ( is_wp_error($terms) ) {
            echo 'Error: ' . $terms->get_error_message();
            return;
        }

        if ( empty($terms) ) {
            echo 'No value in taxonomy ' . $v;
            return;
        }
        $example[$key] = $terms[0]->slug;
    }
    $taxonomyMap->example = json_encode($example);
    update_option('chatbot_taxonomy', $taxonomyMap);
}