<?php

/**
 * Checks if the database version meets the minimum requirements.
 *
 * Supports both MySQL and MariaDB. Adds an error message if the version is too low.
 *
 * @return bool True if the database version is below the required minimum, false otherwise.
 */
function check_minimum_db_version() {
	global $wpdb;
	
	$db_version = $wpdb->db_version(); 
	$db_vendor = $wpdb->get_var("SELECT @@version_comment");
	$err = false;
	$info_db = [];
	
	if (stripos($db_vendor, 'MariaDB') !== false && version_compare( $db_version, '10.5', '<' ) ) {
		$info_db['db_engine'] = 'MariaDB';
		$info_db['db_version'] = $db_version;
		$info_db['db_required_version'] = '10.5';
		$err = true;
	} else if (stripos($db_vendor, 'MySQL') !== false && version_compare( $db_version, '5.7', '<' )) {
		$info_db['db_engine'] = 'MySQL';
		$info_db['db_version'] = $db_version;
		$info_db['db_required_version'] = '5.7';
		$err = true;
	};
	
	if($info_db) {
		add_settings_error(
			'chatbot_settings_messages', 
			'chatbot_error',            
			'Required minimum database version: '. $info_db['db_engine'] .' '. $info_db['db_required_version'] .'. Your version: ' . $info_db['db_version'] ,
			'error'                   
		);
	}
	
	return $err;
}