<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'project-3' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'j*KwQ2Fdab@HZBoxW#%o2U[Reu96A-Y7ed~TC.P| 3[H|FX/~GN%*`$df%n+FP}a' );
define( 'SECURE_AUTH_KEY',  'RY15yE<qCb#rKEmB?uq,Pd>UNaoj?n.FxQgrbHR6Q<y(&]!BZ=i*p>g0jOuduHg=' );
define( 'LOGGED_IN_KEY',    'O|e|5Kn?o`5iD}ZO|w72I~?ES_hjo8<:NSWF[aWl9@ahs/E=?SLpWonB/av%O.Me' );
define( 'NONCE_KEY',        'Bbt,|Y<DS+3*r),?Ef.ypb.&}yb,~uq(r3!cv3j9n_HovBsYi(f;QJQ>}myr,$?|' );
define( 'AUTH_SALT',        ']&A4>uqfkA([ypap`<&H9z*>m>?Dwk^C,0(3O-`CdcBk-?/rCd}!8im>Kgo$k)jN' );
define( 'SECURE_AUTH_SALT', ')<4FhO8K}K+o()V064R#s+#Ph>%d_5CzC1yC?Yz-dN`^c8Z!wxJ;!jaK.9I(w*ri' );
define( 'LOGGED_IN_SALT',   'q2,@Zk!3!H]maP&VHiweL>{tH=dU#<*Q7I=21}BF39FJIL6|a_iZsv(SROB,aD)x' );
define( 'NONCE_SALT',       'ZPsS&u6A+r:T*^qx1Qo)HbAfQ#c3i {0:tJmeDiu}/;,0Cd>Lzy|8`uIGo[d|<Dn' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
