<nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
    <div class="container topnav">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand topnav" href="/">Twilight Utility Center</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
				<!-- <li>
					<a href="/rules">Rules Reference</a>
				</li> -->
				<li>
					<a href="/techtree">Tech Tree</a>
				</li>
                <li>
                    <a href="/races">Race Overviews</a>
                </li>
				<!-- <li>
					<a href="/planner">Game Planner</a>
				</li> -->
				<li>
					<a href="/turntracker">Turn Tracking</a>
				</li>
				<li>
					<?php
                    session_start(); //necessary to grab $_SESSION variables!
                    //probably scrap inline PHP later, will leave for now
                    if($_SESSION['username']) {
                        echo '<a id="logout_button" role="button" data-toggle="modal" href="#logout_modal">'.$_SESSION['username'].'</a>';
                    }else{
                    ?>
                        <a id="login_button" role="button" data-toggle="modal" href="#login_modal">Login</a>
                    <?php
                    }
                    ?>
				</li>
			</ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
