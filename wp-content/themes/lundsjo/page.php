<?php
get_header();
?>

<div id="fullpage" class="showcase">
	<div  class="page-wrap section">
		<div class="side col-sm-3 col-lg-2 col-md-2">
			<div class="side-wrap">
				<div class="side-wrap-top">
					<div class="logo"><a href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_url');?>/img/logga.png"></a></div>
				</div>
				<?php //wp_nav_menu(array( 'menu' => 'main_nav', 'menu_class'))?>
				<div class="side-wrap-bottom">
					<nav class="side-menu">
						<div class="menu-toggle"><i class="fa fa-bars"></i></div>
						<ul class="main-menu">
							<li class="portfolio" data-menuanchor="Portfolio"><a class="toggle-child" href="<?php bloginfo('url'); ?>">Portfolio</a>
						</li>
						<li><a class="" href="<?php bloginfo('url'); ?>">Referenser</a>
					</li>
					<li data-menuanchor=""><a href="<?php bloginfo('url'); ?>/#Hur">Hur vi arbetar</a></li>
					<li data-menuanchor=""><a href="<?php bloginfo('url'); ?>/#Om">Om oss</a></li>
					<li data-menuanchor=""><a href="<?php bloginfo('url'); ?>/#Kontakt">kontakt</a></li>
				</ul>

			</nav>
		</div>
	</div>
</div>

<div class="col-sm-3 col-md-2 col-lg-2"></div>
<div class="col-md-9 col-lg-9 col-sm-8 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
<div class="section-wrap">


<?php
			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post(); ?>



					<?php the_content();?>

					<?php

					?>
<?php
				} // end while ?>


			<?php } ?>

	</div>
</div>
</div>
</div>


<?php get_footer(); ?>