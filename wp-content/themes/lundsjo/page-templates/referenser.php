<?php

get_header();


?>

<div class="page-wrap" id="referenser">

		<div class="side col-sm-3 col-lg-2 col-md-2">
			<div class="side-wrap">
				<div class="side-wrap-top">
					<div class="logo"><a href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_url');?>/img/logga.png"></a></div>
				</div>
				<?php //wp_nav_menu(array( 'menu' => 'main_nav', 'menu_class'))?>
				<div class="side-wrap-bottom">
				<?php wp_nav_menu( array( 'menu' => 'singlemenu', 'menu_class' => 'main-menu', 'container' => 'nav', 'container_class' => 'side-menu', 'walker' => new My_Walker_Nav_Menu()) ); ?>
		</div>
	</div>
</div>

	<div class="col-sm-3 col-md-2 col-lg-2"></div>
	<div class="col-sm-8 col-md-9 col-lg-9 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">

	<div class="section-wrap">

<?php

if ( have_posts() ) {
				while ( have_posts() ) {
					the_post();
					//
					// Post Content here
					the_content();
					//
				} // end while
			} // end if

?>

</div>

</div>
</div>

<?php get_footer(); ?>
