<?php
function siteURL()
{
    $protocol =  isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http" . "://";
    $domainName = $_SERVER['HTTP_HOST'] . '/';

    return $protocol . $domainName;
}

define('SITE_URL', siteURL());
?>
<!doctype html>
<html lang="en-US">
<head>
    <meta name="robots" content="noindex, follow">

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Petya Maiko</title>
    <meta name="description" content="Petya Maiko HEXA TEST">

    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="article">
    <meta property="og:title" content="Petya Maiko">
    <meta property="og:description" content="Petya Maiko HEXA TEST">
    <meta property="og:url" content="<?php echo SITE_URL?>">
    <meta property="og:site_name" content="Petya Maiiko">
    <meta property="og:image" content="<?php echo SITE_URL?>assets/images/preview.jpg">
    <meta property="og:image:width" content="600">
    <meta property="og:image:height" content="300">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Petya Maiko">
    <meta name="twitter:description" content="Petya Maiko HEXA TEST">
    <meta name="twitter:site" content="@HEXA">
    <meta name="twitter:image" content="<?php echo SITE_URL?>assets/images/preview.jpg">
    <meta name="twitter:creator" content="@Petya Maiko">

    <link rel="preload" href="/assets/fonts/Poppins/Poppins-Light.ttf" as="font" crossorigin="anonymous" />
    <link rel="preload" href="/assets/fonts/Poppins/Poppins-Bold.ttf" as="font" crossorigin="anonymous" />
    <link rel="preload" href="/assets/fonts/OpenSans/OpenSans-Regular.ttf" as="font" crossorigin="anonymous" />
    <link rel="preload" href="/assets/fonts/OpenSans/OpenSans-SemiBold.ttf" as="font" crossorigin="anonymous" />

    <link rel="shortcut icon" type="image/x-icon" href="/favicon.png">
    <link rel="stylesheet" href="/assets/css/styles.min.css?v=1" >
</head>
<body>
<div class="wrapper">
    <article class="article">
        <div class="wrap">
            <div class="article__content">
                <div class="article__title">
                    <h2>
                        Deleniti explicari democritum
                    </h2>
                </div>
                <div class="article__description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing <br>elit,
                        sed do eiusmod tempor incididunt ut labore et <br>dolore magna aliqua.
                    </p>
                    <p>
                        Ut enim ad minim veniam, quis nostrud exercitation <br>ullamco
                        laboris nisi ut aliquip ex ea commodo <br>consequat. Duis aute irure dolor
                        in reprehenderit in <br>voluptate velit esse cillum dolore eu fugiat.
                    </p>
                </div>
            </div>
        </div>
    </article>

    <header class="header">
        <div class="header__container">
            <div class="row">
                <div class="header__wrapper">
                    <div class="logo">
                        <a href="#petyamaiko">LOGO</a>
                    </div>

                    <div id="toggleMenu" class="icon icon--menu">
                        <div class="drop-down-menu" style="display: none">
                            <ul class="drop-down-menu__list">
                                <li class="drop-down-menu__item">
                                    <a href="#petyamaiko"
                                       class="drop-down-menu__link"
                                    >
                                        About
                                    </a>
                                </li>
                                <li class="drop-down-menu__item">
                                    <a href="#petyamaiko"
                                       class="drop-down-menu__link"
                                    >
                                        Testimonials
                                    </a>
                                </li>
                                <li class="drop-down-menu__item">
                                    <a href="#petyamaiko"
                                       class="drop-down-menu__link"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li class="drop-down-menu__item">
                                    <a href="#petyamaiko"
                                       class="drop-down-menu__link"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>

                            <button class="btn-order-now">
                                Order now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="date-section">
        <div class="wrap">
            <div class="date-section__content">
                <div class="date-section__title">
                    Deleniti explicari <br>democritum nam no, <br>no debitis
                    praullamco <br>laboris
                </div>
                <div class="date-section__wrapper">
                    <div class="pointer pointer--horizontal"></div>
                    <div class="pointer pointer--vertical">
                        <div class="time-line">
                            <div class="time-line__items">
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="0"
                                            data-date="TODAY"
                                            data-description="TODAY - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        TODAY
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="1"
                                            data-date="2017"
                                            data-description="2017 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2017
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="2"
                                            data-date="2015"
                                            data-description="2015 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2015
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="3"
                                            data-date="2012"
                                            data-description="2012 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2012
                                    </button>
                                </div>
                                <div class="time-line__item active">
                                    <button class="btn-simple"
                                            data-id="4"
                                            data-date="2011"
                                            data-description="2011 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2011
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="5"
                                            data-date="2007"
                                            data-description="2007 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2007
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="6"
                                            data-date="2006"
                                            data-description="2006 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2006
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="7"
                                            data-date="2004"
                                            data-description="2004 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2004
                                    </button>
                                </div>
                                <div class="time-line__item">
                                    <button class="btn-simple"
                                            data-id="8"
                                            data-date="2001"
                                            data-description="2001 - Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi."
                                    >
                                        2001
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="current-date">
                        2011
                    </div>
                </div>
                <div class="current-description">
                    Te nam semper partiendo. Diam abhorreant ex vis, usu cu suas solum quodsi.
                </div>
            </div>
        </div>
    </section>

    <article class="article">
        <div class="wrap">
            <div class="article__content">
                <div class="article__title">
                    <h2>
                        Praullamco laboris nisi ut

                    </h2>
                </div>
                <div class="article__description">
                    <p>
                        Aulla pariatur. Excepteur.
                    </p>
                    <p>
                        Sint occaecat cupidatat non proident, sunt in culpa qui <br>officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit <br>voluptatem accusantium doloremque laudantium.
                    </p>
                </div>
            </div>
        </div>
    </article>
</div>

<script src="/assets/js/main.min.js?v=1"></script>
</body>
</html>
