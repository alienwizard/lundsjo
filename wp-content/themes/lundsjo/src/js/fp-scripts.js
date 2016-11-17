
var grid;

	    $(document).ready(function() {
        var url = window.location.href + "wp-content/themes/lundsjo";
        var w = window.innerWidth;

        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                    if (target.length) {
                        $("html, body").animate({
                            scrollTop: target.offset().top
                        }, 1e3);
                        return false
                    }
                }
            })
        });

        var current_slide = 0;
        var slides = $(".slideshow-items");
        var startingslide = $(slides[current_slide])[0];
        var startingSrc = $(startingslide).attr("src");


        $(".parallax-slider").attr("src", startingSrc);

        var image = $(".parallax-slider").attr("src");

        $('.parallax-slider').imagesLoaded( function() {

        	//setTimeout(,4000);
        	//Display the grid after 3 seconds
        	setTimeout(function(){ displayGrid(current_slide, slides, startingslide, startingSrc); }, 3000);


        });






        if (w < 900 && w > 600) {

					grid = true;

					/*

        	var msnry = new Masonry( '.portfolio-grid', {
  				// options
  				         itemSelector: ".project-item",
                    columnWidth: 200,
                    fitWidth: true


			});
							*/
        } else {

					grid = true;

/*
            var msnry = new Masonry( '.portfolio-grid', {

                    // options
                    itemSelector: ".project-item",
                    fitWidth: true,
                    transitionDuration: "0.8s"
            })
*/

        }
        $(window).resize(function() {
        	/*
        	console.log('resize');
            $grid.imagesLoaded().progress(function() {
                $grid.masonry("layout")
            })
            */
        });
        $(".toggle-child").click(function() {
            var sibling = $(this).next();
            $(sibling).slideToggle(function() {
                console.log("toggled")
            })
        });
        var toggle = 0;
        $("li a").click(function(event) {
            //event.children('ul').slideToggle();
            var clicked = $(event.target).parent()
        });
        $(".menu-toggle").click(function() {
            $(".main-menu").slideToggle("slow")
        });
        var hide = 0;
        var landingTop = $(".parallax-window").scrollTop();
        var landingBot = landingTop + $(".parallax-window").height();
        var top = $(window).scrollTop();
        var toggle = 0;
        var w = window.innerWidth;
        var h = window.innerHeight;
        var nav = $(".side");
        $("body").append(nav);
        if (w <= 600) {
            $(".tillbaka").click(function() {});
            var nav = $(".side");
            $("body").append(nav);
            $(".side").css({
                width: "100%",
                position: "fixed",
                top: "0"
            });
            $(".side-wrap-bottom").css({
                display: "block",
                width: "100%"
            });
            $(".side-wrap-top").css({
                display: "block",
                padding: "10px",
                width: "30%",
                float: "left"
            });
            $("nav.side-menu").css({
                marginTop: "0"
            });
            $(".main-menu li").css({
                float: "left"
            });
            $(".logo h2").css({
                fontSize: "4vw"
            });
            $(".logo h4").css({
                fontSize: "2vw"
            });
            $("ul.main-menu li a").css({
                fontSize: "12px"
            })
        } else {
            $(".tillbaka").mouseenter(function() {
                $(".hidden-menu").slideDown()
            });
            $(".side-wrap-bottom").mouseleave(function() {});
            $(".hidden-menu").mouseover(function() {});
            if (landingBot / 2 < top && $(".parallax-window").length > 0) {
                $(".side ul.main-menu li a").css({
                    color: "rgb(113, 113, 113)"
                });
                $(".side").css({
                    backgroundColor: "rgba(187, 187, 187, 0.0)"
                });
                $(".side ul.main-menu li a").mouseover(function() {
                    $(this).css({
                        color: "black"
                    })
                }).mouseleave(function() {
                    $(this).css({
                        color: "rgb(113, 113, 113)"
                    })
                })
            } else if (landingBot / 2 > top && $(".parallax-window").length > 0) {
                $(".side").css({
                    backgroundColor: "rgba(187, 187, 187, 0.5)"
                });
                $(".hidden-menu li").css({
                    color: "#383838"
                });
                $(".side ul.main-menu li a").css({
                    color: "#383838"
                });
                $(".side ul.main-menu li a").mouseover(function() {
                    $(this).css({
                        color: "white"
                    })
                }).mouseleave(function() {
                    $(this).css({
                        color: "black"
                    })
                })
            }
        }
        $(window).scroll(function() {
            var landingTop = $(".parallax-window").scrollTop();
            var landingBot = landingTop + $(".parallax-window").height();
            var top = $(window).scrollTop();
            var bottom = top + $(document).height();
            var viewport = $(window).scrollTop();
            var area = $(".referens-section").height();
            var refsec = $(".referens-section");
            var referens = refsec.offset();
            var boxar = $(".kund-box");
            var windowH = $(window).height();
            var windowBottomPosition = windowH + top;
            var scrollSpeed = 50;
            for (var i = boxar.length - 1; i >= 0; i--) {
                var element = $(boxar[i]);
                var epos = element.offset();
                var h = $(element).height();
                var b = epos.top + h;
                if (b >= top && epos.top <= windowBottomPosition) {
                    var title = $(boxar[i].childNodes[3]);
                    //$(title).animate({bottom: top - $(title).offset().top - windowH / scrollSpeed +'%'})
                    $(title).css({
                        transform: "translateY(" + (top - $(title).offset().top) / 20 + "px)"
                    })
                }
            }
            if (w > 600) {
                if (landingBot / 2 < top) {
                    $(".side ul.main-menu li a").css({
                        color: "rgb(113, 113, 113)"
                    });
                    $(".trigger-cat").css({
                        color: "rgb(113, 113, 113)"
                    });
                    $(".side").css({
                        backgroundColor: "rgba(187, 187, 187, 0.0)"
                    });
                    $(".side ul.main-menu li a").mouseover(function() {
                        $(this).css({
                            color: "black"
                        })
                    }).mouseleave(function() {
                        $(this).css({
                            color: "rgb(113, 113, 113)"
                        })
                    });
                    $(".hidden-menu li").mouseover(function() {
                        $(this).css({
                            color: "black"
                        })
                    }).mouseleave(function() {
                        $(this).css({
                            color: "rgb(113, 113, 113)"
                        })
                    })
                } else {
                    $(".hidden-menu li").css({
                        color: "black"
                    });
                    $(".hidden-menu li").mouseover(function() {
                        $(this).css({
                            color: "white"
                        })
                    });
                    $(".hidden-menu li").mouseleave(function() {
                        $(this).css({
                            color: "black"
                        })
                    });
                    $(".side").css({
                        backgroundColor: "rgba(187, 187, 187, 0.5)"
                    });
                    $("ul.main-menu li a").css({
                        color: "#383838"
                    });
                    $(".side ul.main-menu li a").mouseover(function() {
                        $(this).css({
                            color: "white"
                        })
                    }).mouseleave(function() {
                        $(this).css({
                            color: "black"
                        })
                    })
                }
                if (top <= 100) {
                    //console.log('top')
                    $(".side").css({
                        //width: '17%',
                        position: "fixed"
                    });
                    $(".side-wrap-bottom").css({
                        display: "block"
                    });
                    $(".side-wrap-top").css({
                        display: "block"
                    });
                    $("nav.side-menu").css({
                        display: "block"
                    });
                    $(".logo ").css({})
                } else if (top > 100) {
                    $(".logo ").css({});
                    if (toggle != 1) {
                        $(".side").css({
                            position: "fixed"
                        });
                        $(".side-wrap-top").css({});
                        $("nav.side-menu").css({})
                    }
                }
                $(".main-menu a").click(function() {
                    $(".side").css({
                        top: "0px"
                    })
                });
                $("#meny-toggle").click(function() {
                    console.log(w);
                    if (w > 600) {
                        if (toggle == 1) {
                            hide = 1;
                            $(".side-wrap-bottom").css({});
                            $("nav.side-menu").css({
                                display: "none"
                            });
                            $(".side-wrap-top").css({});
                            toggle = 0
                        } else {
                            console.log("click");
                            $(".side").css({});
                            $(".side-wrap-bottom").css({
                                display: "block",
                                height: "100%",
                                //width: '100%',
                                position: "absolute",
                                left: "0px",
                                backgroundColor: "rgba(144, 144, 144, 0.5)"
                            });
                            $("nav.side-menu").css({
                                display: "block"
                            });
                            $(".side-wrap-top").css({});
                            $(".side").css({
                                backgroundColor: "rgba(144, 144, 144, 0)"
                            });
                            toggle++
                        }
                    } else {}
                })
            } else {
                $("#meny-toggle").click(function() {
                    console.log("mobile")
                })
            }
        })
    })

        function displayGrid(current_slide, slides, grid) {
            current_slide++;
            console.log(current_slide);
            if ($(slides).length <= current_slide) {
                current_slide = 0
            }
            console.log($(slides[current_slide])[0]);
            var slide = $(slides[current_slide])[0];
            console.log(slide.innerHTML);
            var src = $(slide.innerHTML).attr("src");
            console.log($(".parallax-slider").innerHTML);
            console.log(slides[current_slide]);
            var image = $(".parallax-slider").attr("src");
            $(".parallax-slider").fadeOut(1e3, function() {



              $.get( "http://aartslundsjo.mediahelpcrm.se/wp-json/wp/v2/showcase", function( data ) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                  console.log(data[i].better_featured_image.source_url);

                  $('.grid_canvas').append('<div class="project-item animated zoomIn"><a href="'+ data[i].link +'"><img src="'+data[i].better_featured_image.source_url+'"> <div class="title-bak"><h3 class="project-text">'+ data[i].title.rendered +'</h3></div></a></div>');

                  var msnry = new Masonry( '.grid_canvas', {

                          // options
                          itemSelector: ".project-item",
                          fitWidth: true,
                          transitionDuration: "0.8s"
                  })

                  msnry.layout();



                }


                });








            })
            //setTimeout(sayHi, 4000)
        }