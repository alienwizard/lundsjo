/*!


 * Bootstrap v3.3.5 (http://getbootstrap.com)


 * Copyright 2011-2015 Twitter, Inc.


 * Licensed under the MIT license


 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery), +function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {
            end: b[c]
        };
        return !1;
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }
    var c = '[data-dismiss="alert"]', d = function(b) {
        a(b).on("click", c, this.close);
    };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove();
        }
        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), 
        b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };
    c.VERSION = "3.3.5", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, 
            d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, c.prototype.toggle = function() {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), 
            this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), 
            a && c.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = c, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            a.preventDefault();
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), 
        this;
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
        return this.$items.eq(f);
    }, c.prototype.to = function(a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a);
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0], k = a.Event("slide.bs.carousel", {
            relatedTarget: j,
            direction: h
        });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active");
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), 
            f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([ b, h ].join(" ")).addClass("active"), e.removeClass([ "active", h ].join(" ")), 
                i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m);
                }, 0);
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), 
            this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this;
    };
    var e = function(c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), 
    a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d);
    }
    function c(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), 
            "string" == typeof b && e[b]();
        });
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase([ "scroll", g ].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e);
        }, this)).end();
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : e.data();
        c.call(f, h);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this), e = b(d), f = {
                relatedTarget: this
            };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), 
            c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))));
        }));
    }
    function d(b) {
        return this.each(function() {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }
    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    g.VERSION = "3.3.5", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e), g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
            }
            return !1;
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d), g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), 
                d.trigger("click");
                var h = " li:not(.disabled):visible a", i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), 
                    i.eq(j).trigger("focus");
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), 
        this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, 
        this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, 
    c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function(b) {
        var d = this, e = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), 
            d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f);
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
        }));
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function(b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b();
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
        } else b && b();
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        });
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), 
        this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, c.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), 
        c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), 
        c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show());
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState) if (this.inState[a]) return !0;
        return !1;
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), 
        c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide());
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, 
                f.removeClass(n).addClass(h);
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l);
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), 
            b && b();
        }
        var e = this, f = a(this.$tip), g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), 
        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), 
        this.hoverState = null, this);
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function() {
        return this.getTitle();
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
            top: 0,
            left: 0
        } : b.offset(), g = {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        }, h = d ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, e, g, h, f);
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
        }
        return e;
    }, c.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a;
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.enable = function() {
        this.enabled = !0;
    }, c.prototype.disable = function() {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, 
        c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), 
            a.$tip = null, a.$arrow = null, a.$viewport = null;
        });
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, 
    c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), 
        this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function c(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }
    b.VERSION = "3.3.5", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function() {
        var b = this, c = "offset", d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var b = a(this), e = b.data("target") || b.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [ [ f[c]().top + d, e ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1]);
        });
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--; ) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), 
        d.trigger("activate.bs.scrollspy");
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b) {
        this.element = a(b);
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {
                relatedTarget: b[0]
            }), g = a.Event("show.bs.tab", {
                relatedTarget: e[0]
            });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    });
                });
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, 
            b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            e && e();
        }
        var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), 
        g.removeClass("in");
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this;
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show");
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), 
            "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            });
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this;
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), 
            null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery);

$(window).on("load", function() {
    var w = window.innerWidth;
    if (w > 600 && $("body").attr("class") != "single") {
        var timeoutID;
        timeoutID = window.setTimeout(slowAlert, 1e3);
        function slowAlert() {
            $(".side-menu ul").slideDown();
        }
    }
});

$(document).ready(function() {
    $(".menu-toggle").click(function() {
        console.log(this);
        $(".main-menu").slideToggle();
    });
    var hide = 0;
    var landingTop = $(".parallax-window").scrollTop();
    var landingBot = landingTop + $(".parallax-window").height();
    var top = $(window).scrollTop();
    var toggle = 0;
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(w);
    var nav = $(".side");
    $("body").append(nav);
    if (w <= 600) {
        $(".tillbaka").click(function() {
            $(".hidden-menu").slideToggle();
        });
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
            "float": "left"
        });
        $("nav.side-menu").css({
            marginTop: "0"
        });
        $(".main-menu li").css({
            "float": "left"
        });
        $(".logo h2").css({
            fontSize: "4vw"
        });
        $(".logo h4").css({
            fontSize: "2vw"
        });
        $("ul.main-menu li a").css({
            fontSize: "12px"
        });
    } else {
        $(".tillbaka").mouseenter(function() {
            $(".hidden-menu").slideDown();
            console.log();
        });
        $(".side-wrap-bottom").mouseleave(function() {
            $(".hidden-menu").slideUp();
        });
        $(".hidden-menu").mouseover(function() {
            $(".hidden-menu").slideDown();
        });
        console.log($(".parallax-window").length);
        if (landingBot / 2 < top && $(".parallax-window").length > 0) {
            $(".side ul.main-menu li a").css({
                color: "rgb(113, 113, 113)"
            });
            console.log("meny bakgrund bort");
            $(".side").css({
                backgroundColor: "rgba(187, 187, 187, 0.0)"
            });
            $(".side ul.main-menu li a").mouseover(function() {
                $(this).css({
                    color: "black"
                });
            }).mouseleave(function() {
                $(this).css({
                    color: "rgb(113, 113, 113)"
                });
            });
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
                });
            }).mouseleave(function() {
                $(this).css({
                    color: "black"
                });
            });
        }
    }
    $(window).scroll(function() {});
    $(window).scroll(function() {
        console.log(w);
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
        console.log(top);
        console.log(landingBot);
        for (var i = boxar.length - 1; i >= 0; i--) {
            var element = $(boxar[i]);
            var epos = element.offset();
            var h = $(element).height();
            var b = epos.top + h;
            console.log(b);
            console.log(top);
            if (b >= top && epos.top <= windowBottomPosition) {
                console.log(top);
                console.log(h);
                console.log(epos.top);
                console.log("inarea");
                console.log($(boxar[i]));
                var title = $(boxar[i].childNodes[3]);
                console.log($(title).offset().top);
                //$(title).animate({bottom: top - $(title).offset().top - windowH / scrollSpeed +'%'})
                $(title).css({
                    transform: "translateY(" + (top - $(title).offset().top) / 20 + "px)"
                });
            }
        }
        console.log(w);
        if (w > 600) {
            if (landingBot / 2 < top) {
                $(".side ul.main-menu li a").css({
                    color: "rgb(113, 113, 113)"
                });
                $(".trigger-cat").css({
                    color: "rgb(113, 113, 113)"
                });
                console.log("meny bakgrund bort");
                $(".side").css({
                    backgroundColor: "rgba(187, 187, 187, 0.0)"
                });
                $(".side ul.main-menu li a").mouseover(function() {
                    $(this).css({
                        color: "black"
                    });
                }).mouseleave(function() {
                    $(this).css({
                        color: "rgb(113, 113, 113)"
                    });
                });
                $(".hidden-menu li").mouseover(function() {
                    $(this).css({
                        color: "black"
                    });
                }).mouseleave(function() {
                    $(this).css({
                        color: "rgb(113, 113, 113)"
                    });
                });
            } else {
                $(".hidden-menu li").css({
                    color: "black"
                });
                $(".hidden-menu li").mouseover(function() {
                    $(this).css({
                        color: "white"
                    });
                });
                $(".hidden-menu li").mouseleave(function() {
                    $(this).css({
                        color: "black"
                    });
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
                    });
                }).mouseleave(function() {
                    $(this).css({
                        color: "black"
                    });
                });
            }
            //console.log(top);
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
                $(".logo ").css({});
            } else if (top > 100) {
                $(".logo ").css({});
                if (toggle != 1) {
                    $(".side").css({
                        position: "fixed"
                    });
                    $(".side-wrap-top").css({});
                    $("nav.side-menu").css({});
                }
            }
            $(".main-menu a").click(function() {
                $(".side").css({
                    top: "0px"
                });
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
                        toggle = 0;
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
                        toggle++;
                    }
                } else {}
            });
        } else {
            $("#meny-toggle").click(function() {
                console.log("mobile");
            });
        }
    });
});

/*! jQuery v1.12.0 | (c) jQuery Foundation | jquery.org/license */
!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [], d = a.document, e = c.slice, f = c.concat, g = c.push, h = c.indexOf, i = {}, j = i.toString, k = i.hasOwnProperty, l = {}, m = "1.12.0", n = function(a, b) {
        return new n.fn.init(a, b);
    }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function(a, b) {
        return b.toUpperCase();
    };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return e.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this);
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a) {
            return n.each(this, a);
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(e.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: g,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], 
        c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, 
        f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g;
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === n.type(a);
        },
        isWindow: function(a) {
            return null != a && a == a.window;
        },
        isNumeric: function(a) {
            var b = a && a.toString();
            return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
            try {
                if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }
            if (!l.ownFirst) for (b in a) return k.call(a, b);
            for (b in a) ;
            return void 0 === b || k.call(a, b);
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a;
        },
        globalEval: function(b) {
            b && n.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b) {
            var c, d = 0;
            if (s(a)) {
                for (c = a.length; c > d; d++) if (b.call(a[d], d, a[d]) === !1) break;
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
            return a;
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "");
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [ a ] : a) : g.call(c, a)), 
            c;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (h) return h.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c;
            }
            return -1;
        },
        merge: function(a, b) {
            var c = +b.length, d = 0, e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function(a, b, c) {
            var d, e, g = 0, h = [];
            if (s(a)) for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e); else for (g in a) e = b(a[g], g, c), 
            null != e && h.push(e);
            return f.apply([], h);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = e.call(arguments, 2), 
            d = function() {
                return a.apply(b || this, c.concat(e.call(arguments)));
            }, d.guid = a.guid = a.guid || n.guid++, d) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: l
    }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), 
    n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        i["[object " + b + "]"] = b.toLowerCase();
    });
    function s(a) {
        var b = !!a && "length" in a && a.length, c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date(), v = a.document, w = 0, x = 0, y = ga(), z = ga(), A = ga(), B = function(a, b) {
            return a === b && (l = !0), 0;
        }, C = 1 << 31, D = {}.hasOwnProperty, E = [], F = E.pop, G = E.push, H = E.push, I = E.slice, J = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }, K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", L = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]", O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)", P = new RegExp(L + "+", "g"), Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"), R = new RegExp("^" + L + "*," + L + "*"), S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"), T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"), U = new RegExp(O), V = new RegExp("^" + M + "$"), W = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            TAG: new RegExp("^(" + M + "|[*])"),
            ATTR: new RegExp("^" + N),
            PSEUDO: new RegExp("^" + O),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + K + ")$", "i"),
            needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
        }, X = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/, $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _ = /[+~]/, aa = /'|\\/g, ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"), ca = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        }, da = function() {
            m();
        };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
        } catch (ea) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b));
                } : function(a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1;
                }
            };
        }
        function fa(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w = b && b.ownerDocument, x = b ? b.nodeType : 9;
            if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== x && (o = $.exec(a))) if (f = o[1]) {
                    if (9 === x) {
                        if (!(j = b.getElementById(f))) return d;
                        if (j.id === f) return d.push(j), d;
                    } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), 
                    d;
                } else {
                    if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                    if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), 
                    d;
                }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x) w = b, s = a; else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u), 
                        r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
                        while (h--) r[h] = l + " " + qa(r[h]);
                        s = r.join(","), w = _.test(a) && oa(b.parentNode) || b;
                    }
                    if (s) try {
                        return H.apply(d, w.querySelectorAll(s)), d;
                    } catch (y) {} finally {
                        k === u && b.removeAttribute("id");
                    }
                }
            }
            return i(a.replace(Q, "$1"), b, d, e);
        }
        function ga() {
            var a = [];
            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
            }
            return b;
        }
        function ha(a) {
            return a[u] = !0, a;
        }
        function ia(a) {
            var b = n.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function ja(a, b) {
            var c = a.split("|"), e = c.length;
            while (e--) d.attrHandle[c[e]] = b;
        }
        function ka(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function la(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function ma(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function na(a) {
            return ha(function(b) {
                return b = +b, ha(function(c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        c = fa.support = {}, f = fa.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, m = fa.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, 
            p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), 
            c.attributes = ia(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), c.getElementsByTagName = ia(function(a) {
                return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
            }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function(a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [ c ] : [];
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(ba, ca);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(ba, ca);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0;
            }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), 
                a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), 
                a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
            }), ia(function(a) {
                var b = n.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                q.push(",.*:");
            })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O);
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), 
            b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1;
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [ a ], h = [ b ];
                if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return ka(a, b);
                c = a;
                while (c = c.parentNode) g.unshift(c);
                c = b;
                while (c = c.parentNode) h.unshift(c);
                while (g[d] === h[d]) d++;
                return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
            }, n) : n;
        }, fa.matches = function(a, b) {
            return fa(a, null, null, b);
        }, fa.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}
            return fa(b, n, null, [ a ]).length > 0;
        }, fa.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b);
        }, fa.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()], f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
        }, fa.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, fa.uniqueSort = function(a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1);
            }
            return k = null, a;
        }, e = fa.getText = function(a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
                } else if (3 === f || 4 === f) return a.nodeValue;
            } else while (b = a[d++]) c += e(b);
            return c;
        }, d = fa.selectors = {
            cacheLength: 50,
            createPseudo: ha,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ba, ca).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = fa.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], 
                                n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [ w, n, t ];
                                    break;
                                }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), 
                            j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), 
                            k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [ w, t ]), m === b)) break;
                            return t -= e, t === d || t % d === 0 && t / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [ a, a, "", b ], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function(a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g]);
                    }) : function(a) {
                        return e(a, 0, c);
                    }) : e;
                }
            },
            pseudos: {
                not: ha(function(a) {
                    var b = [], c = [], d = h(a.replace(Q, "$1"));
                    return d[u] ? ha(function(a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
                    };
                }),
                has: ha(function(a) {
                    return function(b) {
                        return fa(a, b).length > 0;
                    };
                }),
                contains: ha(function(a) {
                    return a = a.replace(ba, ca), function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
                    };
                }),
                lang: ha(function(a) {
                    return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === o;
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !d.pseudos.empty(a);
                },
                header: function(a) {
                    return Y.test(a.nodeName);
                },
                input: function(a) {
                    return X.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: na(function() {
                    return [ 0 ];
                }),
                last: na(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: na(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: na(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: na(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: na(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: na(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) d.pseudos[b] = la(b);
        for (b in {
            submit: !0,
            reset: !0
        }) d.pseudos[b] = ma(b);
        function pa() {}
        pa.prototype = d.filters = d.pseudos, d.setFilters = new pa(), g = fa.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = R.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(Q, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), 
                f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break;
            }
            return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
        };
        function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function ra(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j, k = [ w, f ];
                if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else while (b = b[d]) if (1 === b.nodeType || e) {
                    if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
                    if (i[d] = k, k[2] = a(b, c, g)) return !0;
                }
            };
        }
        function sa(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
            return c;
        }
        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function va(a, b, c, d, e, f) {
            return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function(f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || ta(b || "*", h.nodeType ? [ h ] : h, []), q = !a || !f && b ? p : ua(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ua(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i);
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
                    }
                } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
            });
        }
        function wa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function(a) {
                return a === b;
            }, h, !0), l = ra(function(a) {
                return J(b, a) > -1;
            }, h, !0), m = [ function(a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return b = null, e;
            } ]; f > i; i++) if (c = d.relative[a[i].type]) m = [ ra(sa(m), c) ]; else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
                    return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
                        value: " " === a[i - 2].type ? "*" : ""
                    })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a));
                }
                m.push(c);
            }
            return sa(m);
        }
        function xa(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function(f, g, h, i, k) {
                var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k), y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                        while (q = a[o++]) if (q(l, g || n, h)) {
                            i.push(l);
                            break;
                        }
                        k && (w = y);
                    }
                    c && ((l = !q && l) && r--, f && t.push(l));
                }
                if (r += s, c && s !== r) {
                    o = 0;
                    while (q = b[o++]) q(t, u, g, h);
                    if (f) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));
                        u = ua(u);
                    }
                    H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
                }
                return k && (w = y, j = v), t;
            };
            return c ? ha(f) : f;
        }
        return h = fa.compile = function(a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xa(e, d)), f.selector = a;
            }
            return f;
        }, i = fa.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length);
                }
                i = W.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
                        break;
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e;
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, 
        m(), c.sortDetached = ia(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"));
        }), ia(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || ja("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), c.attributes && ia(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || ja("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), ia(function(a) {
            return null == a.getAttribute("disabled");
        }) || ja(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), fa;
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, 
    n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = function(a, b, c) {
        var d = [], e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
            if (e && n(a).is(c)) break;
            d.push(a);
        }
        return d;
    }, v = function(a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c;
    }, w = n.expr.match.needsContext, x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return n.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (y.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a);
        }
        return n.grep(a, function(a) {
            return n.inArray(a, b) > -1 !== c;
        });
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [ d ] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, n.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
                for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
            }));
            for (b = 0; e > b; b++) n.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, 
            c;
        },
        filter: function(a) {
            return this.pushStack(z(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(z(this, a || [], !0));
        },
        is: function(a) {
            return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length;
        }
    });
    var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = n.fn.init = function(a, b, c) {
        var e, f;
        if (!a) return this;
        if (c = c || A, "string" == typeof a) {
            if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : B.exec(a), 
            !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (e[1]) {
                if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), 
                x.test(e[1]) && n.isPlainObject(b)) for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                return this;
            }
            if (f = d.getElementById(e[2]), f && f.parentNode) {
                if (f.id !== e[2]) return A.find(a);
                this.length = 1, this[0] = f;
            }
            return this.context = d, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), n.makeArray(a, this));
    };
    C.prototype = n.fn, A = n(d);
    var D = /^(?:parents|prev(?:Until|All))/, E = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    n.fn.extend({
        has: function(a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    });
    function F(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a;
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return u(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return u(a, "parentNode", c);
        },
        next: function(a) {
            return F(a, "nextSibling");
        },
        prev: function(a) {
            return F(a, "previousSibling");
        },
        nextAll: function(a) {
            return u(a, "nextSibling");
        },
        prevAll: function(a) {
            return u(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return u(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return u(a, "previousSibling", c);
        },
        siblings: function(a) {
            return v((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return v(a.firstChild);
        },
        contents: function(a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), 
            this.length > 1 && (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())), 
            this.pushStack(e);
        };
    });
    var G = /\S+/g;
    function H(a) {
        var b = {};
        return n.each(a.match(G) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function() {
            for (e = a.once, d = b = !0; g.length; h = -1) {
                c = g.shift();
                while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, 
                c = !1);
            }
            a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
        }, j = {
            add: function() {
                return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                    n.each(b, function(b, c) {
                        n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c);
                    });
                }(arguments), c && !b && i()), this;
            },
            remove: function() {
                return n.each(arguments, function(a, b) {
                    var c;
                    while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--;
                }), this;
            },
            has: function(a) {
                return a ? n.inArray(a, f) > -1 : f.length > 0;
            },
            empty: function() {
                return f && (f = []), this;
            },
            disable: function() {
                return e = g = [], f = c = "", this;
            },
            disabled: function() {
                return !f;
            },
            lock: function() {
                return e = !0, c || j.disable(), this;
            },
            locked: function() {
                return !!e;
            },
            fireWith: function(a, c) {
                return e || (c = c || [], c = [ a, c.slice ? c.slice() : c ], g.push(c), b || i()), 
                this;
            },
            fire: function() {
                return j.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!d;
            }
        };
        return j;
    }, n.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", n.Callbacks("once memory"), "resolved" ], [ "reject", "fail", n.Callbacks("once memory"), "rejected" ], [ "notify", "progress", n.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return n.Deferred(function(c) {
                        n.each(b, function(b, f) {
                            var g = n.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? n.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b = 0, c = e.call(arguments), d = c.length, f = 1 !== d || a && n.isFunction(a.promise) ? d : 0, g = 1 === f ? a : n.Deferred(), h = function(a, b, c) {
                return function(d) {
                    b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
                };
            }, i, j, k;
            if (d > 1) for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
            return f || g.resolveWith(k, c), g.promise();
        }
    });
    var I;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a), this;
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0);
        },
        ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [ n ]), 
            n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))));
        }
    });
    function J() {
        d.addEventListener ? (d.removeEventListener("DOMContentLoaded", K), a.removeEventListener("load", K)) : (d.detachEvent("onreadystatechange", K), 
        a.detachEvent("onload", K));
    }
    function K() {
        (d.addEventListener || "load" === a.event.type || "complete" === d.readyState) && (J(), 
        n.ready());
    }
    n.ready.promise = function(b) {
        if (!I) if (I = n.Deferred(), "complete" === d.readyState) a.setTimeout(n.ready); else if (d.addEventListener) d.addEventListener("DOMContentLoaded", K), 
        a.addEventListener("load", K); else {
            d.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
            var c = !1;
            try {
                c = null == a.frameElement && d.documentElement;
            } catch (e) {}
            c && c.doScroll && !function f() {
                if (!n.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (b) {
                        return a.setTimeout(f, 50);
                    }
                    J(), n.ready();
                }
            }();
        }
        return I.promise(b);
    }, n.ready.promise();
    var L;
    for (L in n(l)) break;
    l.ownFirst = "0" === L, l.inlineBlockNeedsLayout = !1, n(function() {
        var a, b, c, e;
        c = d.getElementsByTagName("body")[0], c && c.style && (b = d.createElement("div"), 
        e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(e));
    }), function() {
        var a = d.createElement("div");
        l.deleteExpando = !0;
        try {
            delete a.test;
        } catch (b) {
            l.deleteExpando = !1;
        }
        a = null;
    }();
    var M = function(a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
    }, N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
                } catch (e) {}
                n.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function Q(a) {
        var b;
        for (b in a) if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function R(a, b, d, e) {
        if (M(a)) {
            var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), 
            j[k] || (j[k] = i ? {} : {
                toJSON: n.noop
            }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), 
            g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), 
            "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, 
            f;
        }
    }
    function S(a, b, c) {
        if (M(a)) {
            var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [ b ] : (b = n.camelCase(b), 
                    b = b in d ? [ b ] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([ a ], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0);
            }
        }
    }
    n.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a);
        },
        data: function(a, b, c) {
            return R(a, b, c);
        },
        removeData: function(a, b) {
            return S(a, b);
        },
        _data: function(a, b, c) {
            return R(a, b, c, !0);
        },
        _removeData: function(a, b) {
            return S(a, b, !0);
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), 
                    P(f, d, e[d])));
                    n._data(f, "parsedAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                n.data(this, a);
            }) : arguments.length > 1 ? this.each(function() {
                n.data(this, a, b);
            }) : f ? P(f, a, n.data(f, a)) : void 0;
        },
        removeData: function(a) {
            return this.each(function() {
                n.removeData(this, a);
            });
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function() {
                n.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    n._removeData(a, b + "queue"), n._removeData(a, c);
                })
            });
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    }), function() {
        var a;
        l.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, e;
            return c = d.getElementsByTagName("body")[0], c && c.style ? (b = d.createElement("div"), 
            e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            b.appendChild(d.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), 
            c.removeChild(e), a) : void 0;
        };
    }();
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"), V = [ "Top", "Right", "Bottom", "Left" ], W = function(a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
    };
    function X(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function() {
            return d.cur();
        } : function() {
            return n.css(a, b, "");
        }, i = h(), j = c && c[3] || (n.cssNumber[b] ? "" : "px"), k = (n.cssNumber[b] || "px" !== j && +i) && U.exec(n.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g);
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, 
        d.start = k, d.end = e)), e;
    }
    var Y = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) Y(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(n(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, Z = /^(?:checkbox|radio)$/i, $ = /<([\w:-]+)/, _ = /^$|\/(?:java|ecma)script/i, aa = /^\s+/, ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    function ca(a) {
        var b = ba.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    !function() {
        var a = d.createElement("div"), b = d.createDocumentFragment(), c = d.createElement("input");
        a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        l.leadingWhitespace = 3 === a.firstChild.nodeType, l.tbody = !a.getElementsByTagName("tbody").length, 
        l.htmlSerialize = !!a.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML, 
        c.type = "checkbox", c.checked = !0, b.appendChild(c), l.appendChecked = c.checked, 
        a.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, 
        b.appendChild(a), c = d.createElement("input"), c.setAttribute("type", "radio"), 
        c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), 
        l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !!a.addEventListener, 
        a[n.expando] = 1, l.attributes = !a.getAttribute(n.expando);
    }();
    var da = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: l.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    };
    da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, 
    da.th = da.td;
    function ea(a, b) {
        var c, d, e = 0, f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([ a ], f) : f;
    }
    function fa(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
    }
    var ga = /<|&#?\w+;/, ha = /<tbody/i;
    function ia(a) {
        Z.test(a.type) && (a.defaultChecked = a.checked);
    }
    function ja(a, b, c, d, e) {
        for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++) if (g = a[r], 
        g || 0 === g) if ("object" === n.type(g)) n.merge(q, g.nodeType ? [ g ] : g); else if (ga.test(g)) {
            i = i || p.appendChild(b.createElement("div")), j = ($.exec(g) || [ "", "" ])[1].toLowerCase(), 
            m = da[j] || da._default, i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2], f = m[0];
            while (f--) i = i.lastChild;
            if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])), 
            !l.tbody) {
                g = "table" !== j || ha.test(g) ? "<table>" !== m[1] || ha.test(g) ? 0 : i : i.firstChild, 
                f = g && g.childNodes.length;
                while (f--) n.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k);
            }
            n.merge(q, i.childNodes), i.textContent = "";
            while (i.firstChild) i.removeChild(i.firstChild);
            i = p.lastChild;
        } else q.push(b.createTextNode(g));
        i && p.removeChild(i), l.appendChecked || n.grep(ea(q, "input"), ia), r = 0;
        while (g = q[r++]) if (d && n.inArray(g, d) > -1) e && e.push(g); else if (h = n.contains(g.ownerDocument, g), 
        i = ea(p.appendChild(g), "script"), h && fa(i), c) {
            f = 0;
            while (g = i[f++]) _.test(g.type || "") && c.push(g);
        }
        return i = null, p;
    }
    !function() {
        var b, c, e = d.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (l[b] = c in a) || (e.setAttribute(c, "t"), l[b] = e.attributes[c].expando === !1);
        e = null;
    }();
    var ka = /^(?:input|select|textarea)$/i, la = /^key/, ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, na = /^(?:focusinfocus|focusoutblur)$/, oa = /^([^.]*)(?:\.(.+)|)/;
    function pa() {
        return !0;
    }
    function qa() {
        return !1;
    }
    function ra() {
        try {
            return d.activeElement;
        } catch (a) {}
    }
    function sa(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) sa(a, h, c, d, b[h], f);
            return a;
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, 
        d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = qa; else if (!e) return a;
        return 1 === f && (g = e, e = function(a) {
            return n().off(a), g.apply(this, arguments);
        }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function() {
            n.event.add(this, b, e, d, c);
        });
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), 
                (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                    return "undefined" == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || "").match(G) || [ "" ], h = b.length;
                while (h--) f = oa.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), 
                o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, 
                j = n.event.special[o] || {}, l = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), 
                j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), 
                n.event.global[o] = !0);
                a = null;
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(G) || [ "" ], j = b.length;
                while (j--) if (h = oa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), 
                o) {
                    l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], 
                    h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
                    while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), 
                    g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), 
                    delete k[o]);
                } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"));
            }
        },
        trigger: function(b, c, e, f) {
            var g, h, i, j, l, m, o, p = [ e || d ], q = k.call(b, "type") ? b.type : b, r = k.call(b, "namespace") ? b.namespace.split(".") : [];
            if (i = m = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), 
            q = r.shift(), r.sort()), h = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), 
            b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = e), c = null == c ? [ b ] : n.makeArray(c, [ b ]), 
            l = n.event.special[q] || {}, f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
                if (!f && !l.noBubble && !n.isWindow(e)) {
                    for (j = l.delegateType || q, na.test(j + q) || (i = i.parentNode); i; i = i.parentNode) p.push(i), 
                    m = i;
                    m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a);
                }
                o = 0;
                while ((i = p[o++]) && !b.isPropagationStopped()) b.type = o > 1 ? j : l.bindType || q, 
                g = (n._data(i, "events") || {})[b.type] && n._data(i, "handle"), g && g.apply(i, c), 
                g = h && i[h], g && g.apply && M(i) && (b.result = g.apply(i, c), b.result === !1 && b.preventDefault());
                if (b.type = q, !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
                    m = e[h], m && (e[h] = null), n.event.triggered = q;
                    try {
                        e[q]();
                    } catch (s) {}
                    n.event.triggered = void 0, m && (e[h] = m);
                }
                return b.result;
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, d, f, g, h = [], i = e.call(arguments), j = (n._data(this, "events") || {})[a.type] || [], k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) (!a.rnamespace || a.rnamespace.test(g.namespace)) && (a.handleObj = g, 
                    a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), 
                    void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (;i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [ i ]).length), 
                d[e] && d.push(f);
                d.length && g.push({
                    elem: i,
                    handlers: d
                });
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, c, e, f = a.type, g = a, h = this.fixHooks[f];
            h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}), 
            e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
            while (b--) c = e[b], a[c] = g[c];
            return a.target || (a.target = g.srcElement || d), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, e, f, g = b.button, h = b.fromElement;
                return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d, 
                f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), 
                a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), 
                !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), 
                a;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ra() && this.focus) try {
                        return this.focus(), !1;
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === ra() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c) {
            var d = n.extend(new n.Event(), c, {
                type: a,
                isSimulated: !0
            });
            n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault();
        }
    }, n.removeEvent = d.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
    }, n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a, 
        b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
    }, n.Event.prototype = {
        constructor: n.Event,
        isDefaultPrevented: qa,
        isPropagationStopped: qa,
        isImmediatePropagationStopped: qa,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = pa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = pa, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), 
            a.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = pa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), l.submit || (n.event.special.submit = {
        setup: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target, c = n.nodeName(b, "input") || n.nodeName(b, "button") ? n.prop(b, "form") : void 0;
                c && !n._data(c, "submit") && (n.event.add(c, "submit._submit", function(a) {
                    a._submitBubble = !0;
                }), n._data(c, "submit", !0));
            });
        },
        postDispatch: function(a) {
            a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a));
        },
        teardown: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit");
        }
    }), l.change || (n.event.special.change = {
        setup: function() {
            return ka.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (n.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._justChanged = !0);
            }), n.event.add(this, "click._change", function(a) {
                this._justChanged && !a.isTrigger && (this._justChanged = !1), n.event.simulate("change", this, a);
            })), !1) : void n.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                ka.test(b.nodeName) && !n._data(b, "change") && (n.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a);
                }), n._data(b, "change", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return n.event.remove(this, "._change"), !ka.test(this.nodeName);
        }
    }), l.focusin || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a));
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = n._data(d, b);
                e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = n._data(d, b) - 1;
                e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            }
        };
    }), n.fn.extend({
        on: function(a, b, c, d) {
            return sa(this, a, b, c, d);
        },
        one: function(a, b, c, d) {
            return sa(this, a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = qa), 
            this.each(function() {
                n.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var ta = / jQuery\d+="(?:null|\d+)"/g, ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"), va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, wa = /<script|<style|<link/i, xa = /checked\s*(?:[^=]|=\s*.checked.)/i, ya = /^true\/(.*)/, za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Aa = ca(d), Ba = Aa.appendChild(d.createElement("div"));
    function Ca(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function Da(a) {
        return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a;
    }
    function Ea(a) {
        var b = ya.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function Fa(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = n.extend({}, g.data));
        }
    }
    function Ga(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);
                for (d in e.events) n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando);
            }
            "script" === c && b.text !== a.text ? (Da(b).text = a.text, Ea(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), 
            l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function Ha(a, b, c, d) {
        b = f.apply([], b);
        var e, g, h, i, j, k, m = 0, o = a.length, p = o - 1, q = b[0], r = n.isFunction(q);
        if (r || o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)) return a.each(function(e) {
            var f = a.eq(e);
            r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
        });
        if (o && (k = ja(b, a[0].ownerDocument, !1, a, d), e = k.firstChild, 1 === k.childNodes.length && (k = e), 
        e || d)) {
            for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++) g = k, m !== p && (g = n.clone(g, !0, !0), 
            h && n.merge(i, ea(g, "script"))), c.call(a[m], g, m);
            if (h) for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++) g = i[m], 
            _.test(g.type || "") && !n._data(g, "globalEval") && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || "").replace(za, "")));
            k = e = null;
        }
        return a;
    }
    function Ia(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(ea(d)), 
        d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")), d.parentNode.removeChild(d));
        return a;
    }
    n.extend({
        htmlPrefilter: function(a) {
            return a.replace(va, "<$1></$2>");
        },
        clone: function(a, b, c) {
            var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
            if (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML, 
            Ba.removeChild(f = Ba.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (d = ea(f), 
            h = ea(a), g = 0; null != (e = h[g]); ++g) d[g] && Ga(e, d[g]);
            if (b) if (c) for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++) Fa(e, d[g]); else Fa(a, f);
            return d = ea(f, "script"), d.length > 0 && fa(d, !i && ea(a, "script")), d = h = e = null, 
            f;
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++) if ((b || M(d)) && (f = d[i], 
            g = f && j[f])) {
                if (g.events) for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], k || "undefined" == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i), 
                c.push(f));
            }
        }
    }), n.fn.extend({
        domManip: Ha,
        detach: function(a) {
            return Ia(this, a, !0);
        },
        remove: function(a) {
            return Ia(this, a);
        },
        text: function(a) {
            return Y(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a));
            }, null, a, arguments.length);
        },
        append: function() {
            return Ha(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function() {
            return Ha(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return Ha(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return Ha(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(ea(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && n.nodeName(a, "select") && (a.options.length = 0);
            }
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b);
            });
        },
        html: function(a) {
            return Y(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;
                if ("string" == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                    a = n.htmlPrefilter(a);
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ea(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = [];
            return Ha(this, arguments, function(b) {
                var c = this.parentNode;
                n.inArray(this, a) < 0 && (n.cleanData(ea(this)), c && c.replaceChild(b, this));
            }, a);
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), 
            n(f[d])[b](c), g.apply(e, c.get());
            return this.pushStack(e);
        };
    });
    var Ja, Ka = {
        HTML: "block",
        BODY: "block"
    };
    function La(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body), d = n.css(c[0], "display");
        return c.detach(), d;
    }
    function Ma(a) {
        var b = d, c = Ka[a];
        return c || (c = La(a, b), "none" !== c && c || (Ja = (Ja || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = (Ja[0].contentWindow || Ja[0].contentDocument).document, b.write(), b.close(), 
        c = La(a, b), Ja.detach()), Ka[a] = c), c;
    }
    var Na = /^margin/, Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"), Pa = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    }, Qa = d.documentElement;
    !function() {
        var b, c, e, f, g, h, i = d.createElement("div"), j = d.createElement("div");
        if (j.style) {
            j.style.cssText = "float:left;opacity:.5", l.opacity = "0.5" === j.style.opacity, 
            l.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", 
            l.clearCloneStyle = "content-box" === j.style.backgroundClip, i = d.createElement("div"), 
            i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
            j.innerHTML = "", i.appendChild(j), l.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, 
            n.extend(l, {
                reliableHiddenOffsets: function() {
                    return null == b && k(), f;
                },
                boxSizingReliable: function() {
                    return null == b && k(), e;
                },
                pixelMarginRight: function() {
                    return null == b && k(), c;
                },
                pixelPosition: function() {
                    return null == b && k(), b;
                },
                reliableMarginRight: function() {
                    return null == b && k(), g;
                },
                reliableMarginLeft: function() {
                    return null == b && k(), h;
                }
            });
            function k() {
                var k, l, m = d.documentElement;
                m.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
                b = e = h = !1, c = g = !0, a.getComputedStyle && (l = a.getComputedStyle(j), b = "1%" !== (l || {}).top, 
                h = "2px" === (l || {}).marginLeft, e = "4px" === (l || {
                    width: "4px"
                }).width, j.style.marginRight = "50%", c = "4px" === (l || {
                    marginRight: "4px"
                }).marginRight, k = j.appendChild(d.createElement("div")), k.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                k.style.marginRight = k.style.width = "0", j.style.width = "1px", g = !parseFloat((a.getComputedStyle(k) || {}).marginRight), 
                j.removeChild(k)), j.style.display = "none", f = 0 === j.getClientRects().length, 
                f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
                k = j.getElementsByTagName("td"), k[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
                f = 0 === k[0].offsetHeight, f && (k[0].style.display = "", k[1].style.display = "none", 
                f = 0 === k[0].offsetHeight)), m.removeChild(i);
            }
        }
    }();
    var Ra, Sa, Ta = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ra = function(b) {
        var c = b.ownerDocument.defaultView;
        return c.opener || (c = a), c.getComputedStyle(b);
    }, Sa = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), 
        !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width, e = h.minWidth, 
        f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, 
        h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "";
    }) : Qa.currentStyle && (Ra = function(a) {
        return a.currentStyle;
    }, Sa = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), 
        Oa.test(g) && !Ta.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), 
        h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), 
        void 0 === g ? g : g + "" || "auto";
    });
    function Ua(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    var Va = /alpha\([^)]*\)/i, Wa = /opacity\s*=\s*([^)]*)/i, Xa = /^(none|table(?!-c[ea]).+)/, Ya = new RegExp("^(" + T + ")(.*)$", "i"), Za = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, $a = {
        letterSpacing: "0",
        fontWeight: "400"
    }, _a = [ "Webkit", "O", "Moz", "ms" ], ab = d.createElement("div").style;
    function bb(a) {
        if (a in ab) return a;
        var b = a.charAt(0).toUpperCase() + a.slice(1), c = _a.length;
        while (c--) if (a = _a[c] + b, a in ab) return a;
    }
    function cb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && W(d) && (f[g] = n._data(d, "olddisplay", Ma(d.nodeName)))) : (e = W(d), 
        (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function db(a, b, c) {
        var d = Ya.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function eb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + V[f], !0, e)), 
        d ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + V[f] + "Width", !0, e))) : (g += n.css(a, "padding" + V[f], !0, e), 
        "padding" !== c && (g += n.css(a, "border" + V[f] + "Width", !0, e)));
        return g;
    }
    function fb(b, c, e) {
        var f = !0, g = "width" === c ? b.offsetWidth : b.offsetHeight, h = Ra(b), i = l.boxSizing && "border-box" === n.css(b, "boxSizing", !1, h);
        if (d.msFullscreenElement && a.top !== a && b.getClientRects().length && (g = Math.round(100 * b.getBoundingClientRect()[c])), 
        0 >= g || null == g) {
            if (g = Sa(b, c, h), (0 > g || null == g) && (g = b.style[c]), Oa.test(g)) return g;
            f = i && (l.boxSizingReliable() || g === b.style[c]), g = parseFloat(g) || 0;
        }
        return g + eb(b, c, e || (i ? "border" : "content"), f, h) + "px";
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Sa(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": l.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], 
                void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e), 
                f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), 
                l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c;
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], 
            g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Sa(a, b, d)), "normal" === f && b in $a && (f = $a[b]), 
            "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f;
        }
    }), n.each([ "height", "width" ], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth ? Pa(a, Za, function() {
                    return fb(a, b, d);
                }) : fb(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return db(a, c, d ? eb(a, b, d, l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), l.opacity || (n.cssHooks.opacity = {
        get: function(a, b) {
            return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Va, "")) && c.removeAttribute && (c.removeAttribute("filter"), 
            "" === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e);
        }
    }), n.cssHooks.marginRight = Ua(l.reliableMarginRight, function(a, b) {
        return b ? Pa(a, {
            display: "inline-block"
        }, Sa, [ a, "marginRight" ]) : void 0;
    }), n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function(a, b) {
        return b ? (parseFloat(Sa(a, "marginLeft")) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, {
            marginLeft: 0
        }, function() {
            return a.getBoundingClientRect().left;
        }) : 0)) + "px" : void 0;
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, Na.test(a) || (n.cssHooks[a + b].set = db);
    }), n.fn.extend({
        css: function(a, b) {
            return Y(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return cb(this, !0);
        },
        hide: function() {
            return cb(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                W(this) ? n(this).show() : n(this).hide();
            });
        }
    });
    function gb(a, b, c, d, e) {
        return new gb.prototype.init(a, b, c, d, e);
    }
    n.Tween = gb, gb.prototype = {
        constructor: gb,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, 
            this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = gb.propHooks[this.prop];
            return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = gb.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : gb.propHooks._default.set(this), this;
        }
    }, gb.prototype.init.prototype = gb.prototype, gb.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0);
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit);
            }
        }
    }, gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, n.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        },
        _default: "swing"
    }, n.fx = gb.prototype.init, n.fx.step = {};
    var hb, ib, jb = /^(?:toggle|show|hide)$/, kb = /queueHooks$/;
    function lb() {
        return a.setTimeout(function() {
            hb = void 0;
        }), hb = n.now();
    }
    function mb(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = V[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function nb(a, b, c) {
        for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function ob(a, b, c) {
        var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && W(a), r = n._data(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, 
        h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, m.always(function() {
            m.always(function() {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
        j = n.css(a, "display"), k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j, 
        "inline" === k && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), 
        c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function() {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], jb.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;
                q = !0;
            }
            o[d] = r && r[d] || n.style(a, d);
        } else j = void 0;
        if (n.isEmptyObject(o)) "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j); else {
            r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), 
            q ? n(a).show() : m.done(function() {
                n(a).hide();
            }), m.done(function() {
                var b;
                n._removeData(a, "fxshow");
                for (b in o) n.style(a, b, o[b]);
            });
            for (d in o) g = nb(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function pb(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function qb(a, b, c) {
        var d, e, f = 0, g = qb.prefilters.length, h = n.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {
                specialEasing: {},
                easing: n.easing._default
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: hb || lb(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [ j, 1, 0 ]), h.resolveWith(a, [ j, b ])) : h.rejectWith(a, [ j, b ]), 
                this;
            }
        }), k = j.props;
        for (pb(k, j.opts.specialEasing); g > f; f++) if (d = qb.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), 
        d;
        return n.map(k, nb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    n.Animation = n.extend(qb, {
        tweeners: {
            "*": [ function(a, b) {
                var c = this.createTween(a, b);
                return X(c.elem, a, U.exec(b), c), c;
            } ]
        },
        tweener: function(a, b) {
            n.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.match(G);
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], qb.tweeners[c] = qb.tweeners[c] || [], 
            qb.tweeners[c].unshift(b);
        },
        prefilters: [ ob ],
        prefilter: function(a, b) {
            b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
        }
    }), n.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
        }, d;
    }, n.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(W).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function() {
                var b = qb(this, n.extend({}, a), f);
                (e || n._data(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = n._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = n._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), n.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = n.fn[b];
        n.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e);
        };
    }), n.each({
        slideDown: mb("show"),
        slideUp: mb("hide"),
        slideToggle: mb("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        n.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), n.timers = [], n.fx.tick = function() {
        var a, b = n.timers, c = 0;
        for (hb = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(), hb = void 0;
    }, n.fx.timer = function(a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }, n.fx.interval = 13, n.fx.start = function() {
        ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
    }, n.fx.stop = function() {
        a.clearInterval(ib), ib = null;
    }, n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, n.fn.delay = function(b, c) {
        return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function() {
                a.clearTimeout(e);
            };
        });
    }, function() {
        var a, b = d.createElement("input"), c = d.createElement("div"), e = d.createElement("select"), f = e.appendChild(d.createElement("option"));
        c = d.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), 
        a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== c.className, 
        l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), 
        l.checkOn = !!b.value, l.optSelected = f.selected, l.enctype = !!d.createElement("form").enctype, 
        e.disabled = !0, l.optDisabled = !f.disabled, b = d.createElement("input"), b.setAttribute("value", ""), 
        l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), 
        l.radioValue = "t" === b.value;
    }();
    var rb = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                        return null == a ? "" : a + "";
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, 
                "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c);
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a));
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
                        if (b = n(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--) if (d = e[g], n.inArray(n.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0;
                    } catch (h) {
                        d.scrollHeight;
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e;
                }
            }
        }
    }), n.each([ "radio", "checkbox" ], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0;
            }
        }, l.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var sb, tb, ub = n.expr.attrHandle, vb = /^(?:checked|selected)$/i, wb = l.getSetAttribute, xb = l.input;
    n.fn.extend({
        attr: function(a, b) {
            return Y(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a);
            });
        }
    }), n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), 
            e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? tb : sb)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), 
            c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), 
            null == d ? void 0 : d));
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(G);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? xb && wb || !vb.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), 
            a.removeAttribute(wb ? c : d);
        }
    }), tb = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : xb && wb || !vb.test(c) ? a.setAttribute(!wb && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, 
            c;
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = ub[b] || n.find.attr;
        xb && wb || !vb.test(b) ? ub[b] = function(a, b, d) {
            var e, f;
            return d || (f = ub[b], ub[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            ub[b] = f), e;
        } : ub[b] = function(a, b, c) {
            return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null;
        };
    }), xb && wb || (n.attrHooks.value = {
        set: function(a, b, c) {
            return n.nodeName(a, "input") ? void (a.defaultValue = b) : sb && sb.set(a, b, c);
        }
    }), wb || (sb = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", 
            "value" === c || b === a.getAttribute(c) ? b : void 0;
        }
    }, ub.id = ub.name = ub.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
    }, n.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
        },
        set: sb.set
    }, n.attrHooks.contenteditable = {
        set: function(a, b, c) {
            sb.set(a, "" === b ? !1 : b, c);
        }
    }, n.each([ "width", "height" ], function(a, b) {
        n.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            }
        };
    })), l.style || (n.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    });
    var yb = /^(?:input|select|textarea|button|object)$/i, zb = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return Y(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = n.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {}
            });
        }
    }), n.extend({
        prop: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, 
            e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = n.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : yb.test(a.nodeName) || zb.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), l.hrefNormalized || n.each([ "href", "src" ], function(a, b) {
        n.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4);
            }
        };
    }), l.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    }), n.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        n.propFix[this.toLowerCase()] = this;
    }), l.enctype || (n.propFix.enctype = "encoding");
    var Ab = /[\t\r\n\f]/g;
    function Bb(a) {
        return n.attr(a, "class") || "";
    }
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, Bb(this)));
            });
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++]) if (e = Bb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Ab, " ")) {
                    g = 0;
                    while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                    h = n.trim(d), e !== h && n.attr(c, "class", h);
                }
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, Bb(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++]) if (e = Bb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Ab, " ")) {
                    g = 0;
                    while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
                    h = n.trim(d), e !== h && n.attr(c, "class", h);
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function(c) {
                n(this).toggleClass(a.call(this, c, Bb(this), b), b);
            }) : this.each(function() {
                var b, d, e, f;
                if ("string" === c) {
                    d = 0, e = n(this), f = a.match(G) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                } else (void 0 === a || "boolean" === c) && (b = Bb(this), b && n._data(this, "__className__", b), 
                n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""));
            });
        },
        hasClass: function(a) {
            var b, c, d = 0;
            b = " " + a + " ";
            while (c = this[d++]) if (1 === c.nodeType && (" " + Bb(c) + " ").replace(Ab, " ").indexOf(b) > -1) return !0;
            return !1;
        }
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    });
    var Cb = a.location, Db = n.now(), Eb = /\?/, Fb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    n.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null, e = n.trim(b + "");
        return e && !n.trim(e.replace(Fb, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
        })) ? Function("return " + e)() : n.error("Invalid JSON: " + b);
    }, n.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new a.DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"), 
            c.async = "false", c.loadXML(b));
        } catch (e) {
            c = void 0;
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), 
        c;
    };
    var Gb = /#.*$/, Hb = /([?&])_=[^&]*/, Ib = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Jb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Kb = /^(?:GET|HEAD)$/, Lb = /^\/\//, Mb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Nb = {}, Ob = {}, Pb = "*/".concat("*"), Qb = Cb.href, Rb = Mb.exec(Qb.toLowerCase()) || [];
    function Sb(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function Tb(a, b, c, d) {
        var e = {}, f = a === Ob;
        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                g(j), !1);
            }), i;
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*");
    }
    function Ub(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c), a;
    }
    function Vb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Wb(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), 
        i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b);
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Qb,
            type: "GET",
            isLocal: Jb.test(Rb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Pb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Ub(Ub(a, n.ajaxSettings), b) : Ub(n.ajaxSettings, a);
        },
        ajaxPrefilter: Sb(Nb),
        ajaxTransport: Sb(Ob),
        ajax: function(b, c) {
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var d, e, f, g, h, i, j, k, l = n.ajaxSetup({}, c), m = l.context || l, o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event, p = n.Deferred(), q = n.Callbacks("once memory"), r = l.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === u) {
                        if (!k) {
                            k = {};
                            while (b = Ib.exec(g)) k[b[1].toLowerCase()] = b[2];
                        }
                        b = k[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === u ? g : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return u || (a = t[c] = t[c] || a, s[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return u || (l.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > u) for (b in a) r[b] = [ r[b], a[b] ]; else w.always(a[w.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || v;
                    return j && j.abort(b), y(0, b), this;
                }
            };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, l.url = ((b || l.url || Qb) + "").replace(Gb, "").replace(Lb, Rb[1] + "//"), 
            l.type = c.method || c.type || l.method || l.type, l.dataTypes = n.trim(l.dataType || "*").toLowerCase().match(G) || [ "" ], 
            null == l.crossDomain && (d = Mb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Rb[1] && d[2] === Rb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Rb[3] || ("http:" === Rb[1] ? "80" : "443")))), 
            l.data && l.processData && "string" != typeof l.data && (l.data = n.param(l.data, l.traditional)), 
            Tb(Nb, l, c, w), 2 === u) return w;
            i = n.event && l.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), 
            l.type = l.type.toUpperCase(), l.hasContent = !Kb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Eb.test(f) ? "&" : "?") + l.data, 
            delete l.data), l.cache === !1 && (l.url = Hb.test(f) ? f.replace(Hb, "$1_=" + Db++) : f + (Eb.test(f) ? "&" : "?") + "_=" + Db++)), 
            l.ifModified && (n.lastModified[f] && w.setRequestHeader("If-Modified-Since", n.lastModified[f]), 
            n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", l.contentType), 
            w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Pb + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u)) return w.abort();
            v = "abort";
            for (e in {
                success: 1,
                error: 1,
                complete: 1
            }) w[e](l[e]);
            if (j = Tb(Ob, l, c, w)) {
                if (w.readyState = 1, i && o.trigger("ajaxSend", [ w, l ]), 2 === u) return w;
                l.async && l.timeout > 0 && (h = a.setTimeout(function() {
                    w.abort("timeout");
                }, l.timeout));
                try {
                    u = 1, j.send(s, y);
                } catch (x) {
                    if (!(2 > u)) throw x;
                    y(-1, x);
                }
            } else y(-1, "No Transport");
            function y(b, c, d, e) {
                var k, s, t, v, x, y = c;
                2 !== u && (u = 2, h && a.clearTimeout(h), j = void 0, g = e || "", w.readyState = b > 0 ? 4 : 0, 
                k = b >= 200 && 300 > b || 304 === b, d && (v = Vb(l, w, d)), v = Wb(l, v, w, k), 
                k ? (l.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (n.lastModified[f] = x), 
                x = w.getResponseHeader("etag"), x && (n.etag[f] = x)), 204 === b || "HEAD" === l.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = v.state, 
                s = v.data, t = v.error, k = !t)) : (t = y, (b || !y) && (y = "error", 0 > b && (b = 0))), 
                w.status = b, w.statusText = (c || y) + "", k ? p.resolveWith(m, [ s, y, w ]) : p.rejectWith(m, [ w, y, t ]), 
                w.statusCode(r), r = void 0, i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [ w, l, k ? s : t ]), 
                q.fireWith(m, [ w, y ]), i && (o.trigger("ajaxComplete", [ w, l ]), --n.active || n.event.trigger("ajaxStop")));
            }
            return w;
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script");
        }
    }), n.each([ "get", "post" ], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, n.isPlainObject(a) && a));
        };
    }), n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        });
    }, n.fn.extend({
        wrapAll: function(a) {
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    function Xb(a) {
        return a.style && a.style.display || n.css(a, "display");
    }
    function Yb(a) {
        while (a && 1 === a.nodeType) {
            if ("none" === Xb(a) || "hidden" === a.type) return !0;
            a = a.parentNode;
        }
        return !1;
    }
    n.expr.filters.hidden = function(a) {
        return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Yb(a);
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a);
    };
    var Zb = /%20/g, $b = /\[\]$/, _b = /\r?\n/g, ac = /^(?:submit|button|image|reset|file)$/i, bc = /^(?:input|select|textarea|keygen)/i;
    function cc(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || $b.test(a) ? d(a, e) : cc(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== n.type(b)) d(a, b); else for (e in b) cc(a + "[" + e + "]", b[e], c, d);
    }
    n.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) cc(c, a[c], b, e);
        return d.join("&").replace(Zb, "+");
    }, n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && bc.test(this.nodeName) && !ac.test(a) && (this.checked || !Z.test(a));
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(_b, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(_b, "\r\n")
                };
            }).get();
        }
    }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return this.isLocal ? hc() : d.documentMode > 8 ? gc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && gc() || hc();
    } : gc;
    var dc = 0, ec = {}, fc = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in ec) ec[a](void 0, !0);
    }), l.cors = !!fc && "withCredentials" in fc, fc = l.ajax = !!fc, fc && n.ajaxTransport(function(b) {
        if (!b.crossDomain || l.cors) {
            var c;
            return {
                send: function(d, e) {
                    var f, g = b.xhr(), h = ++dc;
                    if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (f in b.xhrFields) g[f] = b.xhrFields[f];
                    b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                    g.send(b.hasContent && b.data || null), c = function(a, d) {
                        var f, i, j;
                        if (c && (d || 4 === g.readyState)) if (delete ec[h], c = void 0, g.onreadystatechange = n.noop, 
                        d) 4 !== g.readyState && g.abort(); else {
                            j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);
                            try {
                                i = g.statusText;
                            } catch (k) {
                                i = "";
                            }
                            f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404;
                        }
                        j && e(f, i, j, g.getAllResponseHeaders());
                    }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = ec[h] = c : c();
                },
                abort: function() {
                    c && c(void 0, !0);
                }
            };
        }
    });
    function gc() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function hc() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    n.ajaxPrefilter(function(a) {
        a.crossDomain && (a.contents.script = !1);
    }), n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a;
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = d.head || n("head")[0] || d.documentElement;
            return {
                send: function(e, f) {
                    b = d.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), 
                    b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, 
                        b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, "success"));
                    }, c.insertBefore(b, c.firstChild);
                },
                abort: function() {
                    b && b.onload(void 0, !0);
                }
            };
        }
    });
    var ic = [], jc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ic.pop() || n.expando + "_" + Db++;
            return this[a] = !0, a;
        }
    }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (jc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && jc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(jc, "$1" + e) : b.jsonp !== !1 && (b.url += (Eb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || n.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, 
            ic.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
        }), "script") : void 0;
    }), l.createHTMLDocument = function() {
        if (!d.implementation.createHTMLDocument) return !1;
        var a = d.implementation.createHTMLDocument("");
        return a.body.innerHTML = "<form></form><form></form>", 2 === a.body.childNodes.length;
    }(), n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || (l.createHTMLDocument ? d.implementation.createHTMLDocument("") : d);
        var e = x.exec(a), f = !c && [];
        return e ? [ b.createElement(e[1]) ] : (e = ja([ a ], b, f), f && f.length && n(f).remove(), 
        n.merge([], e.childNodes));
    };
    var kc = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && kc) return kc.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = n.trim(a.slice(h, a.length)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
        }).always(c && function(a, b) {
            g.each(function() {
                c.apply(g, f || [ a.responseText, b, a ]);
            });
        }), this;
    }, n.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    function lc(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), 
            i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [ f, i ]) > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, n.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                n.offset.setOffset(this, a, b);
            });
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), 
            c = lc(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0) - a.scrollTop(), 
                c.left += n.css(a[0], "borderLeftWidth", !0) - a.scrollLeft()), {
                    top: b.top - c.top - n.css(d, "marginTop", !0),
                    left: b.left - c.left - n.css(d, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || Qa;
            });
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function(d) {
            return Y(this, function(a, d, e) {
                var f = lc(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), n.each([ "top", "left" ], function(a, b) {
        n.cssHooks[b] = Ua(l.pixelPosition, function(a, c) {
            return c ? (c = Sa(a, b), Oa.test(c) ? n(a).position()[b] + "px" : c) : void 0;
        });
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Y(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), n.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    }), n.fn.size = function() {
        return this.length;
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return n;
    });
    var mc = a.jQuery, nc = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = nc), b && a.jQuery === n && (a.jQuery = mc), n;
    }, b || (a.jQuery = a.$ = n), n;
});

/*!


 * fullPage 2.7.7


 * https://github.com/alvarotrigo/fullPage.js


 * @license MIT licensed


 *


 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo


 */
!function(e, n) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], function(o) {
        return n(o, e, e.document, e.Math);
    }) : "undefined" != typeof exports ? module.exports = n(require("jquery"), e, e.document, e.Math) : n(jQuery, e, e.document, e.Math);
}("undefined" != typeof window ? window : this, function(e, n, o, t, i) {
    "use strict";
    var l, a = "fullpage-wrapper", r = "." + a, s = "fp-scrollable", c = "." + s, f = ".slimScrollBar", d = ".slimScrollRail", u = "fp-responsive", p = "fp-notransition", h = "fp-destroyed", v = "fp-enabled", m = "fp-viewing", g = "active", S = "." + g, w = ".section", y = "fp-section", x = "." + y, b = x + S, T = x + ":first", C = x + ":last", k = "fp-tableCell", A = "." + k, B = "fp-auto-height", M = "fp-normal-scroll", L = "fp-nav", E = "#" + L, R = "fp-tooltip", F = "." + R, H = "fp-show-active", q = ".slide", O = "fp-slide", z = "." + O, D = z + S, I = "fp-slides", P = "." + I, V = "fp-slidesContainer", W = "." + V, Y = "fp-table", U = "fp-slidesNav", X = "." + U, N = X + " a", K = "fp-controlArrow", j = "." + K, Q = "fp-prev", G = "." + Q, J = K + " " + Q, Z = j + G, $ = "fp-next", _ = "." + $, ee = K + " " + $, ne = j + _, oe = e(n), te = e(o);
    e.fn.fullpage = function(s) {
        function c() {
            s.css3 && (s.css3 = mn()), s.scrollBar = s.scrollBar || s.hybrid, d(), K(), Hn.setAllowScrolling(!0), 
            Wn = oe.height(), Hn.setAutoScrolling(s.autoScrolling, "internal");
            var n = e(b).find(D);
            n.length && (0 !== e(b).index(x) || 0 === e(b).index(x) && 0 !== n.index()) && Tn(n), 
            je(), vn(), oe.on("load", function() {
                Fe();
            });
        }
        function f() {
            oe.on("scroll", ce).on("hashchange", He).blur(Ve).resize(Ke), Vn.mousedown(De).mouseup(Ie), 
            te.keydown(qe).keyup(ze).on("click touchstart", E + " a", We).on("click touchstart", N, Ye).on("click", F, Oe), 
            e(x).on("click touchstart", j, Pe), s.normalScrollElements && (te.on("mouseenter", s.normalScrollElements, function() {
                Hn.setMouseWheelScrolling(!1);
            }), te.on("mouseleave", s.normalScrollElements, function() {
                Hn.setMouseWheelScrolling(!0);
            }));
        }
        function d() {
            s.anchors.length || (s.anchors = e(s.sectionSelector + "[data-anchor]").map(function() {
                return e(this).data("anchor").toString();
            }).get()), s.navigationTooltips.length || (s.navigationTooltips = e(s.sectionSelector + "[data-tooltip]").map(function() {
                return e(this).data("tooltip").toString();
            }).get());
        }
        function K() {
            Vn.css({
                height: "100%",
                position: "relative"
            }), Vn.addClass(a), e("html").addClass(v), Vn.removeClass(h), ie(), e(x).each(function(n) {
                var o = e(this), t = o.find(z), i = t.length;
                $(o, n), _(o, n), i > 0 ? G(o, t, i) : s.verticalCentered && tn(o);
            }), s.fixedElements && s.css3 && e(s.fixedElements).appendTo(Fn), s.navigation && ae(), 
            s.scrollOverflow ? ("complete" === o.readyState && re(), oe.on("load", re)) : se();
        }
        function G(n, o, t) {
            var i = 100 * t, l = 100 / t;
            o.wrapAll('<div class="' + V + '" />'), o.parent().wrap('<div class="' + I + '" />'), 
            n.find(W).css("width", i + "%"), t > 1 && (s.controlArrows && le(n), s.slidesNavigation && dn(n, t)), 
            o.each(function(n) {
                e(this).css("width", l + "%"), s.verticalCentered && tn(e(this));
            });
            var a = n.find(D);
            a.length && (0 !== e(b).index(x) || 0 === e(b).index(x) && 0 !== a.index()) ? Tn(a) : o.eq(0).addClass(g);
        }
        function $(n, o) {
            o || 0 !== e(b).length || n.addClass(g), n.css("height", Wn + "px"), s.paddingTop && n.css("padding-top", s.paddingTop), 
            s.paddingBottom && n.css("padding-bottom", s.paddingBottom), "undefined" != typeof s.sectionsColor[o] && n.css("background-color", s.sectionsColor[o]), 
            "undefined" != typeof s.anchors[o] && n.attr("data-anchor", s.anchors[o]);
        }
        function _(n, o) {
            "undefined" != typeof s.anchors[o] && n.hasClass(g) && _e(s.anchors[o], o), s.menu && s.css3 && e(s.menu).closest(r).length && e(s.menu).appendTo(Fn);
        }
        function ie() {
            e(s.sectionSelector).each(function() {
                e(this).addClass(y);
            }), e(s.slideSelector).each(function() {
                e(this).addClass(O);
            });
        }
        function le(e) {
            e.find(P).after('<div class="' + J + '"></div><div class="' + ee + '"></div>'), 
            "#fff" != s.controlArrowColor && (e.find(ne).css("border-color", "transparent transparent transparent " + s.controlArrowColor), 
            e.find(Z).css("border-color", "transparent " + s.controlArrowColor + " transparent transparent")), 
            s.loopHorizontal || e.find(Z).hide();
        }
        function ae() {
            Fn.append('<div id="' + L + '"><ul></ul></div>');
            var n = e(E);
            n.addClass(function() {
                return s.showActiveTooltip ? H + " " + s.navigationPosition : s.navigationPosition;
            });
            for (var o = 0; o < e(x).length; o++) {
                var t = "";
                s.anchors.length && (t = s.anchors[o]);
                var i = '<li><a href="#' + t + '"><span></span></a>', l = s.navigationTooltips[o];
                "undefined" != typeof l && "" !== l && (i += '<div class="' + R + " " + s.navigationPosition + '">' + l + "</div>"), 
                i += "</li>", n.find("ul").append(i);
            }
            e(E).css("margin-top", "-" + e(E).height() / 2 + "px"), e(E).find("li").eq(e(b).index(x)).find("a").addClass(g);
        }
        function re() {
            e(x).each(function() {
                var n = e(this).find(z);
                n.length ? n.each(function() {
                    on(e(this));
                }) : on(e(this));
            }), se();
        }
        function se() {
            var n = e(b);
            n.addClass("completely"), s.scrollOverflowHandler.afterRender && s.scrollOverflowHandler.afterRender(n), 
            Me(n), Le(n), e.isFunction(s.afterLoad) && s.afterLoad.call(n, n.data("anchor"), n.index(x) + 1), 
            e.isFunction(s.afterRender) && s.afterRender.call(Vn);
        }
        function ce() {
            var n;
            if (!s.autoScrolling || s.scrollBar) {
                for (var t = oe.scrollTop(), i = de(t), l = 0, a = t + oe.height() / 2, r = o.querySelectorAll(x), c = 0; c < r.length; ++c) {
                    var f = r[c];
                    f.offsetTop <= a && (l = c);
                }
                if (fe(i) && (e(b).hasClass("completely") || e(b).addClass("completely").siblings().removeClass("completely")), 
                n = e(r).eq(l), !n.hasClass(g)) {
                    eo = !0;
                    var d = e(b), u = d.index(x) + 1, p = en(n), h = n.data("anchor"), v = n.index(x) + 1, m = n.find(D);
                    if (m.length) var S = m.data("anchor"), w = m.index();
                    Xn && (n.addClass(g).siblings().removeClass(g), e.isFunction(s.onLeave) && s.onLeave.call(d, u, v, p), 
                    e.isFunction(s.afterLoad) && s.afterLoad.call(n, h, v), Me(n), _e(h, v - 1), s.anchors.length && (qn = h, 
                    un(w, S, h, v))), clearTimeout(Jn), Jn = setTimeout(function() {
                        eo = !1;
                    }, 100);
                }
                s.fitToSection && (clearTimeout(Zn), Zn = setTimeout(function() {
                    Xn && s.fitToSection && (e(b).is(n) && requestAnimFrame(function() {
                        Yn = !0;
                    }), be(n), requestAnimFrame(function() {
                        Yn = !1;
                    }));
                }, s.fitToSectionDelay));
            }
        }
        function fe(n) {
            var o = e(b).position().top, t = o + oe.height();
            return "up" == n ? t >= oe.scrollTop() + oe.height() : o <= oe.scrollTop();
        }
        function de(e) {
            var n = e > no ? "down" : "up";
            return no = e, n;
        }
        function ue(e, n) {
            if (Kn.m[e]) {
                var o, t;
                if ("down" == e ? (o = "bottom", t = Hn.moveSectionDown) : (o = "top", t = Hn.moveSectionUp), 
                n.length > 0) {
                    if (!s.scrollOverflowHandler.isScrolled(o, n)) return !0;
                    t();
                } else t();
            }
        }
        function pe(n) {
            var o = n.originalEvent;
            if (!he(n.target) && ve(o)) {
                s.autoScrolling && n.preventDefault();
                var i = e(b), l = s.scrollOverflowHandler.scrollable(i);
                if (Xn && !Dn) {
                    var a = bn(o);
                    io = a.y, lo = a.x, i.find(P).length && t.abs(to - lo) > t.abs(oo - io) ? t.abs(to - lo) > oe.outerWidth() / 100 * s.touchSensitivity && (to > lo ? Kn.m.right && Hn.moveSlideRight() : Kn.m.left && Hn.moveSlideLeft()) : s.autoScrolling && t.abs(oo - io) > oe.height() / 100 * s.touchSensitivity && (oo > io ? ue("down", l) : io > oo && ue("up", l));
                }
            }
        }
        function he(n, o) {
            o = o || 0;
            var t = e(n).parent();
            return o < s.normalScrollElementTouchThreshold && t.is(s.normalScrollElements) ? !0 : o == s.normalScrollElementTouchThreshold ? !1 : he(t, ++o);
        }
        function ve(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType;
        }
        function me(e) {
            var n = e.originalEvent;
            if (s.fitToSection && Rn.stop(), ve(n)) {
                var o = bn(n);
                oo = o.y, to = o.x;
            }
        }
        function ge(e, n) {
            for (var o = 0, i = e.slice(t.max(e.length - n, 1)), l = 0; l < i.length; l++) o += i[l];
            return t.ceil(o / n);
        }
        function Se(o) {
            var i = new Date().getTime(), l = e(".completely").hasClass(M);
            if (s.autoScrolling && !zn && !l) {
                o = o || n.event;
                var a = o.wheelDelta || -o.deltaY || -o.detail, r = t.max(-1, t.min(1, a)), c = "undefined" != typeof o.wheelDeltaX || "undefined" != typeof o.deltaX, f = t.abs(o.wheelDeltaX) < t.abs(o.wheelDelta) || t.abs(o.deltaX) < t.abs(o.deltaY) || !c;
                Nn.length > 149 && Nn.shift(), Nn.push(t.abs(a)), s.scrollBar && (o.preventDefault ? o.preventDefault() : o.returnValue = !1);
                var d = e(b), u = s.scrollOverflowHandler.scrollable(d), p = i - ao;
                if (ao = i, p > 200 && (Nn = []), Xn) {
                    var h = ge(Nn, 10), v = ge(Nn, 70), m = h >= v;
                    m && f && (0 > r ? ue("down", u) : ue("up", u));
                }
                return !1;
            }
            s.fitToSection && Rn.stop();
        }
        function we(n, o) {
            var t = "undefined" == typeof o ? e(b) : o, i = t.find(P), l = i.find(z).length;
            if (!(!i.length || Dn || 2 > l)) {
                var a = i.find(D), r = null;
                if (r = "prev" === n ? a.prev(z) : a.next(z), !r.length) {
                    if (!s.loopHorizontal) return;
                    r = "prev" === n ? a.siblings(":last") : a.siblings(":first");
                }
                Dn = !0, Ne(i, r);
            }
        }
        function ye() {
            e(D).each(function() {
                Tn(e(this), "internal");
            });
        }
        function xe(e, n) {
            var o = e.top;
            return e.top > ro && (o = o - Wn + n.outerHeight()), ro = o, o;
        }
        function be(n, o, t) {
            requestAnimFrame(function() {
                var i = n.position();
                if ("undefined" != typeof i) {
                    var l = xe(i, n), a = {
                        element: n,
                        callback: o,
                        isMovementUp: t,
                        dest: i,
                        dtop: l,
                        yMovement: en(n),
                        anchorLink: n.data("anchor"),
                        sectionIndex: n.index(x),
                        activeSlide: n.find(D),
                        activeSection: e(b),
                        leavingSection: e(b).index(x) + 1,
                        localIsResizing: Yn
                    };
                    if (!(a.activeSection.is(n) && !Yn || s.scrollBar && oe.scrollTop() === a.dtop && !n.hasClass(B))) {
                        if (a.activeSlide.length) var r = a.activeSlide.data("anchor"), c = a.activeSlide.index();
                        s.autoScrolling && s.continuousVertical && "undefined" != typeof a.isMovementUp && (!a.isMovementUp && "up" == a.yMovement || a.isMovementUp && "down" == a.yMovement) && (a = ke(a)), 
                        (!e.isFunction(s.onLeave) || a.localIsResizing || s.onLeave.call(a.activeSection, a.leavingSection, a.sectionIndex + 1, a.yMovement) !== !1) && (Ee(a.activeSection), 
                        n.addClass(g).siblings().removeClass(g), Me(n), Xn = !1, un(c, r, a.anchorLink, a.sectionIndex), 
                        Te(a), qn = a.anchorLink, _e(a.anchorLink, a.sectionIndex));
                    }
                }
            });
        }
        function Te(n) {
            if (s.css3 && s.autoScrolling && !s.scrollBar) {
                var o = "translate3d(0px, -" + n.dtop + "px, 0px)";
                an(o, !0), s.scrollingSpeed ? Qn = setTimeout(function() {
                    Be(n);
                }, s.scrollingSpeed) : Be(n);
            } else {
                var t = Ce(n);
                e(t.element).animate(t.options, s.scrollingSpeed, s.easing).promise().done(function() {
                    s.scrollBar ? setTimeout(function() {
                        Be(n);
                    }, 30) : Be(n);
                });
            }
        }
        function Ce(e) {
            var n = {};
            return s.autoScrolling && !s.scrollBar ? (n.options = {
                top: -e.dtop
            }, n.element = r) : (n.options = {
                scrollTop: e.dtop
            }, n.element = "html, body"), n;
        }
        function ke(n) {
            return n.isMovementUp ? e(b).before(n.activeSection.nextAll(x)) : e(b).after(n.activeSection.prevAll(x).get().reverse()), 
            Cn(e(b).position().top), ye(), n.wrapAroundElements = n.activeSection, n.dest = n.element.position(), 
            n.dtop = n.dest.top, n.yMovement = en(n.element), n;
        }
        function Ae(n) {
            n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(T).before(n.wrapAroundElements) : e(C).after(n.wrapAroundElements), 
            Cn(e(b).position().top), ye());
        }
        function Be(n) {
            Ae(n), n.element.find(".fp-scrollable").mouseover(), e.isFunction(s.afterLoad) && !n.localIsResizing && s.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1), 
            Le(n.element), n.element.addClass("completely").siblings().removeClass("completely"), 
            Xn = !0, e.isFunction(n.callback) && n.callback.call(this);
        }
        function Me(n) {
            var n = Re(n);
            n.find("img[data-src], source[data-src], audio[data-src]").each(function() {
                e(this).attr("src", e(this).data("src")), e(this).removeAttr("data-src"), e(this).is("source") && e(this).closest("video").get(0).load();
            });
        }
        function Le(n) {
            var n = Re(n);
            n.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("autoplay") && "function" == typeof n.play && n.play();
            });
        }
        function Ee(n) {
            var n = Re(n);
            n.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("data-ignore") || "function" != typeof n.pause || n.pause();
            });
        }
        function Re(n) {
            var o = n.find(D);
            return o.length && (n = e(o)), n;
        }
        function Fe() {
            var e = n.location.hash.replace("#", "").split("/"), o = e[0], t = e[1];
            o && (s.animateAnchor ? cn(o, t) : Hn.silentMoveTo(o, t));
        }
        function He() {
            if (!eo && !s.lockAnchors) {
                var e = n.location.hash.replace("#", "").split("/"), o = e[0], t = e[1], i = "undefined" == typeof qn, l = "undefined" == typeof qn && "undefined" == typeof t && !Dn;
                o.length && (o && o !== qn && !i || l || !Dn && On != t) && cn(o, t);
            }
        }
        function qe(n) {
            clearTimeout($n);
            var o = e(":focus");
            if (!o.is("textarea") && !o.is("input") && !o.is("select") && s.keyboardScrolling && s.autoScrolling) {
                var t = n.which, i = [ 40, 38, 32, 33, 34 ];
                e.inArray(t, i) > -1 && n.preventDefault(), zn = n.ctrlKey, $n = setTimeout(function() {
                    Ue(n);
                }, 150);
            }
        }
        function Oe() {
            e(this).prev().trigger("click");
        }
        function ze(e) {
            Un && (zn = e.ctrlKey);
        }
        function De(e) {
            2 == e.which && (so = e.pageY, Vn.on("mousemove", Xe));
        }
        function Ie(e) {
            2 == e.which && Vn.off("mousemove");
        }
        function Pe() {
            var n = e(this).closest(x);
            e(this).hasClass(Q) ? Kn.m.left && Hn.moveSlideLeft(n) : Kn.m.right && Hn.moveSlideRight(n);
        }
        function Ve() {
            Un = !1, zn = !1;
        }
        function We(n) {
            n.preventDefault();
            var o = e(this).parent().index();
            be(e(x).eq(o));
        }
        function Ye(n) {
            n.preventDefault();
            var o = e(this).closest(x).find(P), t = o.find(z).eq(e(this).closest("li").index());
            Ne(o, t);
        }
        function Ue(n) {
            var o = n.shiftKey;
            switch (n.which) {
              case 38:
              case 33:
                Kn.k.up && Hn.moveSectionUp();
                break;

              case 32:
                if (o && Kn.k.up) {
                    Hn.moveSectionUp();
                    break;
                }

              case 40:
              case 34:
                Kn.k.down && Hn.moveSectionDown();
                break;

              case 36:
                Kn.k.up && Hn.moveTo(1);
                break;

              case 35:
                Kn.k.down && Hn.moveTo(e(x).length);
                break;

              case 37:
                Kn.k.left && Hn.moveSlideLeft();
                break;

              case 39:
                Kn.k.right && Hn.moveSlideRight();
                break;

              default:
                return;
            }
        }
        function Xe(e) {
            Xn && (e.pageY < so ? Hn.moveSectionUp() : e.pageY > so && Hn.moveSectionDown()), 
            so = e.pageY;
        }
        function Ne(n, o) {
            var i = o.position(), l = o.index(), a = n.closest(x), r = a.index(x), c = a.data("anchor"), f = a.find(X), d = hn(o), u = a.find(D), p = Yn;
            if (s.onSlideLeave) {
                var h = u.index(), v = nn(h, l);
                if (!p && "none" !== v && e.isFunction(s.onSlideLeave) && s.onSlideLeave.call(u, c, r + 1, h, v, l) === !1) return void (Dn = !1);
            }
            Ee(u), o.addClass(g).siblings().removeClass(g), p || Me(o), !s.loopHorizontal && s.controlArrows && (a.find(Z).toggle(0 !== l), 
            a.find(ne).toggle(!o.is(":last-child"))), a.hasClass(g) && un(l, d, c, r);
            var m = function() {
                p || e.isFunction(s.afterSlideLoad) && s.afterSlideLoad.call(o, c, r + 1, d, l), 
                Le(o), Dn = !1;
            };
            if (s.css3) {
                var w = "translate3d(-" + t.round(i.left) + "px, 0px, 0px)";
                Qe(n.find(W), s.scrollingSpeed > 0).css(kn(w)), Gn = setTimeout(function() {
                    m();
                }, s.scrollingSpeed, s.easing);
            } else n.animate({
                scrollLeft: t.round(i.left)
            }, s.scrollingSpeed, s.easing, function() {
                m();
            });
            f.find(S).removeClass(g), f.find("li").eq(l).find("a").addClass(g);
        }
        function Ke() {
            if (je(), In) {
                var n = e(o.activeElement);
                if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
                    var i = oe.height();
                    t.abs(i - co) > 20 * t.max(co, i) / 100 && (Hn.reBuild(!0), co = i);
                }
            } else clearTimeout(jn), jn = setTimeout(function() {
                Hn.reBuild(!0);
            }, 350);
        }
        function je() {
            var e = s.responsive || s.responsiveWidth, n = s.responsiveHeight, o = e && oe.outerWidth() < e, t = n && oe.height() < n;
            e && n ? Hn.setResponsive(o || t) : e ? Hn.setResponsive(o) : n && Hn.setResponsive(t);
        }
        function Qe(e) {
            var n = "all " + s.scrollingSpeed + "ms " + s.easingcss3;
            return e.removeClass(p), e.css({
                "-webkit-transition": n,
                transition: n
            });
        }
        function Ge(e) {
            return e.addClass(p);
        }
        function Je(e, n) {
            var o = 825, i = 900;
            if (o > e || i > n) {
                var l = 100 * e / o, a = 100 * n / i, r = t.min(l, a), s = r.toFixed(2);
                Fn.css("font-size", s + "%");
            } else Fn.css("font-size", "100%");
        }
        function Ze(n, o) {
            s.navigation && (e(E).find(S).removeClass(g), n ? e(E).find('a[href="#' + n + '"]').addClass(g) : e(E).find("li").eq(o).find("a").addClass(g));
        }
        function $e(n) {
            s.menu && (e(s.menu).find(S).removeClass(g), e(s.menu).find('[data-menuanchor="' + n + '"]').addClass(g));
        }
        function _e(e, n) {
            $e(e), Ze(e, n);
        }
        function en(n) {
            var o = e(b).index(x), t = n.index(x);
            return o == t ? "none" : o > t ? "up" : "down";
        }
        function nn(e, n) {
            return e == n ? "none" : e > n ? "left" : "right";
        }
        function on(e) {
            e.css("overflow", "hidden");
            var n, o = s.scrollOverflowHandler, t = o.wrapContent(), i = e.closest(x), l = o.scrollable(e);
            l.length ? n = o.scrollHeight(e) : (n = e.get(0).scrollHeight, s.verticalCentered && (n = e.find(A).get(0).scrollHeight));
            var a = Wn - parseInt(i.css("padding-bottom")) - parseInt(i.css("padding-top"));
            n > a ? l.length ? o.update(e, a) : (s.verticalCentered ? e.find(A).wrapInner(t) : e.wrapInner(t), 
            o.create(e, a)) : o.remove(e), e.css("overflow", "");
        }
        function tn(e) {
            e.addClass(Y).wrapInner('<div class="' + k + '" style="height:' + ln(e) + 'px;" />');
        }
        function ln(e) {
            var n = Wn;
            if (s.paddingTop || s.paddingBottom) {
                var o = e;
                o.hasClass(y) || (o = e.closest(x));
                var t = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"));
                n = Wn - t;
            }
            return n;
        }
        function an(e, n) {
            n ? Qe(Vn) : Ge(Vn), Vn.css(kn(e)), setTimeout(function() {
                Vn.removeClass(p);
            }, 10);
        }
        function rn(n) {
            var o = Vn.find(x + '[data-anchor="' + n + '"]');
            return o.length || (o = e(x).eq(n - 1)), o;
        }
        function sn(e, n) {
            var o = n.find(P), t = o.find(z + '[data-anchor="' + e + '"]');
            return t.length || (t = o.find(z).eq(e)), t;
        }
        function cn(e, n) {
            var o = rn(e);
            "undefined" == typeof n && (n = 0), e === qn || o.hasClass(g) ? fn(o, n) : be(o, function() {
                fn(o, n);
            });
        }
        function fn(e, n) {
            if ("undefined" != typeof n) {
                var o = e.find(P), t = sn(n, e);
                t.length && Ne(o, t);
            }
        }
        function dn(e, n) {
            e.append('<div class="' + U + '"><ul></ul></div>');
            var o = e.find(X);
            o.addClass(s.slidesNavPosition);
            for (var t = 0; n > t; t++) o.find("ul").append('<li><a href="#"><span></span></a></li>');
            o.css("margin-left", "-" + o.width() / 2 + "px"), o.find("li").first().find("a").addClass(g);
        }
        function un(e, n, o, t) {
            var i = "";
            s.anchors.length && !s.lockAnchors && (e ? ("undefined" != typeof o && (i = o), 
            "undefined" == typeof n && (n = e), On = n, pn(i + "/" + n)) : "undefined" != typeof e ? (On = n, 
            pn(o)) : pn(o)), vn();
        }
        function pn(e) {
            if (s.recordHistory) location.hash = e; else if (In || Pn) n.history.replaceState(i, i, "#" + e); else {
                var o = n.location.href.split("#")[0];
                n.location.replace(o + "#" + e);
            }
        }
        function hn(e) {
            var n = e.data("anchor"), o = e.index();
            return "undefined" == typeof n && (n = o), n;
        }
        function vn() {
            var n = e(b), o = n.find(D), t = hn(n), i = hn(o), l = (n.index(x), String(t));
            o.length && (l = l + "-" + i), l = l.replace("/", "-").replace("#", "");
            var a = new RegExp("\\b\\s?" + m + "-[^\\s]+\\b", "g");
            Fn[0].className = Fn[0].className.replace(a, ""), Fn.addClass(m + "-" + l);
        }
        function mn() {
            var e, t = o.createElement("p"), l = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            o.body.insertBefore(t, null);
            for (var a in l) t.style[a] !== i && (t.style[a] = "translate3d(1px,1px,1px)", e = n.getComputedStyle(t).getPropertyValue(l[a]));
            return o.body.removeChild(t), e !== i && e.length > 0 && "none" !== e;
        }
        function gn() {
            o.addEventListener ? (o.removeEventListener("mousewheel", Se, !1), o.removeEventListener("wheel", Se, !1), 
            o.removeEventListener("MozMousePixelScroll", Se, !1)) : o.detachEvent("onmousewheel", Se);
        }
        function Sn() {
            var e, t = "";
            n.addEventListener ? e = "addEventListener" : (e = "attachEvent", t = "on");
            var l = "onwheel" in o.createElement("div") ? "wheel" : o.onmousewheel !== i ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == l ? o[e](t + "MozMousePixelScroll", Se, !1) : o[e](t + l, Se, !1);
        }
        function wn() {
            if (In || Pn) {
                var n = xn();
                e(r).off("touchstart " + n.down).on("touchstart " + n.down, me), e(r).off("touchmove " + n.move).on("touchmove " + n.move, pe);
            }
        }
        function yn() {
            if (In || Pn) {
                var n = xn();
                e(r).off("touchstart " + n.down), e(r).off("touchmove " + n.move);
            }
        }
        function xn() {
            var e;
            return e = n.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            };
        }
        function bn(e) {
            var n = [];
            return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, 
            n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, 
            Pn && ve(e) && s.scrollBar && (n.y = e.touches[0].pageY, n.x = e.touches[0].pageX), 
            n;
        }
        function Tn(e, n) {
            Hn.setScrollingSpeed(0, "internal"), "undefined" != typeof n && (Yn = !0), Ne(e.closest(P), e), 
            "undefined" != typeof n && (Yn = !1), Hn.setScrollingSpeed(_n.scrollingSpeed, "internal");
        }
        function Cn(e) {
            if (s.scrollBar) Vn.scrollTop(e); else if (s.css3) {
                var n = "translate3d(0px, -" + e + "px, 0px)";
                an(n, !1);
            } else Vn.css("top", -e);
        }
        function kn(e) {
            return {
                "-webkit-transform": e,
                "-moz-transform": e,
                "-ms-transform": e,
                transform: e
            };
        }
        function An(e, n, o) {
            switch (n) {
              case "up":
                Kn[o].up = e;
                break;

              case "down":
                Kn[o].down = e;
                break;

              case "left":
                Kn[o].left = e;
                break;

              case "right":
                Kn[o].right = e;
                break;

              case "all":
                "m" == o ? Hn.setAllowScrolling(e) : Hn.setKeyboardScrolling(e);
            }
        }
        function Bn() {
            Cn(0), e(E + ", " + X + ", " + j).remove(), e(x).css({
                height: "",
                "background-color": "",
                padding: ""
            }), e(z).css({
                width: ""
            }), Vn.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), Rn.css({
                overflow: "",
                height: ""
            }), e("html").removeClass(v), e.each(Fn.get(0).className.split(/\s+/), function(e, n) {
                0 === n.indexOf(m) && Fn.removeClass(n);
            }), e(x + ", " + z).each(function() {
                s.scrollOverflowHandler.remove(e(this)), e(this).removeClass(Y + " " + g);
            }), Ge(Vn), Vn.find(A + ", " + W + ", " + P).each(function() {
                e(this).replaceWith(this.childNodes);
            }), Rn.scrollTop(0);
            var n = [ y, O, V ];
            e.each(n, function(n, o) {
                e("." + o).removeClass(o);
            });
        }
        function Mn(e, n, o) {
            s[e] = n, "internal" !== o && (_n[e] = n);
        }
        function Ln() {
            s.continuousVertical && (s.loopTop || s.loopBottom) && (s.continuousVertical = !1, 
            En("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), 
            s.scrollBar && s.scrollOverflow && En("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), 
            s.continuousVertical && s.scrollBar && (s.continuousVertical = !1, En("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), 
            e.each(s.anchors, function(n, o) {
                (e("#" + o).length || e('[name="' + o + '"]').length) && En("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
            });
        }
        function En(e, n) {
            console && console[e] && console[e]("fullPage: " + n);
        }
        var Rn = e("html, body"), Fn = e("body"), Hn = e.fn.fullpage;
        s = e.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            hybrid: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1e3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            scrollOverflowHandler: l,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !1,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            sectionSelector: w,
            slideSelector: q,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, s), Ln(), e.extend(e.easing, {
            easeInOutCubic: function(e, n, o, t, i) {
                return (n /= i / 2) < 1 ? t / 2 * n * n * n + o : t / 2 * ((n -= 2) * n * n + 2) + o;
            }
        }), e.extend(e.easing, {
            easeInQuart: function(e, n, o, t, i) {
                return t * (n /= i) * n * n * n + o;
            }
        }), Hn.setAutoScrolling = function(n, o) {
            Mn("autoScrolling", n, o);
            var t = e(b);
            s.autoScrolling && !s.scrollBar ? (Rn.css({
                overflow: "hidden",
                height: "100%"
            }), Hn.setRecordHistory(_n.recordHistory, "internal"), Vn.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), t.length && Cn(t.position().top)) : (Rn.css({
                overflow: "visible",
                height: "initial"
            }), Hn.setRecordHistory(!1, "internal"), Vn.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), Cn(0), t.length && Rn.scrollTop(t.position().top));
        }, Hn.setRecordHistory = function(e, n) {
            Mn("recordHistory", e, n);
        }, Hn.setScrollingSpeed = function(e, n) {
            Mn("scrollingSpeed", e, n);
        }, Hn.setFitToSection = function(e, n) {
            Mn("fitToSection", e, n);
        }, Hn.setLockAnchors = function(e) {
            s.lockAnchors = e;
        }, Hn.setMouseWheelScrolling = function(e) {
            e ? Sn() : gn();
        }, Hn.setAllowScrolling = function(n, o) {
            "undefined" != typeof o ? (o = o.replace(/ /g, "").split(","), e.each(o, function(e, o) {
                An(n, o, "m");
            })) : n ? (Hn.setMouseWheelScrolling(!0), wn()) : (Hn.setMouseWheelScrolling(!1), 
            yn());
        }, Hn.setKeyboardScrolling = function(n, o) {
            "undefined" != typeof o ? (o = o.replace(/ /g, "").split(","), e.each(o, function(e, o) {
                An(n, o, "k");
            })) : s.keyboardScrolling = n;
        }, Hn.moveSectionUp = function() {
            var n = e(b).prev(x);
            n.length || !s.loopTop && !s.continuousVertical || (n = e(x).last()), n.length && be(n, null, !0);
        }, Hn.moveSectionDown = function() {
            var n = e(b).next(x);
            n.length || !s.loopBottom && !s.continuousVertical || (n = e(x).first()), n.length && be(n, null, !1);
        }, Hn.silentMoveTo = function(e, n) {
            requestAnimFrame(function() {
                Hn.setScrollingSpeed(0, "internal");
            }), Hn.moveTo(e, n), requestAnimFrame(function() {
                Hn.setScrollingSpeed(_n.scrollingSpeed, "internal");
            });
        }, Hn.moveTo = function(e, n) {
            var o = rn(e);
            "undefined" != typeof n ? cn(e, n) : o.length > 0 && be(o);
        }, Hn.moveSlideRight = function(e) {
            we("next", e);
        }, Hn.moveSlideLeft = function(e) {
            we("prev", e);
        }, Hn.reBuild = function(n) {
            if (!Vn.hasClass(h)) {
                Yn = !0, requestAnimFrame(function() {
                    Yn = !0;
                });
                var o = oe.outerWidth();
                Wn = oe.height(), s.resize && Je(Wn, o), e(x).each(function() {
                    var n = e(this).find(P), o = e(this).find(z);
                    s.verticalCentered && e(this).find(A).css("height", ln(e(this)) + "px"), e(this).css("height", Wn + "px"), 
                    s.scrollOverflow && (o.length ? o.each(function() {
                        on(e(this));
                    }) : on(e(this))), o.length > 1 && Ne(n, n.find(D));
                });
                var t = e(b), i = t.index(x);
                i && Hn.silentMoveTo(i + 1), Yn = !1, requestAnimFrame(function() {
                    Yn = !1;
                }), e.isFunction(s.afterResize) && n && s.afterResize.call(Vn), e.isFunction(s.afterReBuild) && !n && s.afterReBuild.call(Vn);
            }
        }, Hn.setResponsive = function(n) {
            var o = Fn.hasClass(u);
            n ? o || (Hn.setAutoScrolling(!1, "internal"), Hn.setFitToSection(!1, "internal"), 
            e(E).hide(), Fn.addClass(u)) : o && (Hn.setAutoScrolling(_n.autoScrolling, "internal"), 
            Hn.setFitToSection(_n.autoScrolling, "internal"), e(E).show(), Fn.removeClass(u));
        };
        var qn, On, zn, Dn = !1, In = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/), Pn = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints, Vn = e(this), Wn = oe.height(), Yn = !1, Un = !0, Xn = !0, Nn = [], Kn = {};
        Kn.m = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, Kn.k = e.extend(!0, {}, Kn.m);
        var jn, Qn, Gn, Jn, Zn, $n, _n = e.extend(!0, {}, s);
        e(this).length && (c(), f());
        var eo = !1, no = 0, oo = 0, to = 0, io = 0, lo = 0, ao = new Date().getTime();
        n.requestAnimFrame = function() {
            return n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame || function(e) {
                e();
            };
        }();
        var ro = 0, so = 0, co = Wn;
        Hn.destroy = function(n) {
            Hn.setAutoScrolling(!1, "internal"), Hn.setAllowScrolling(!1), Hn.setKeyboardScrolling(!1), 
            Vn.addClass(h), clearTimeout(Gn), clearTimeout(Qn), clearTimeout(jn), clearTimeout(Jn), 
            clearTimeout(Zn), oe.off("scroll", ce).off("hashchange", He).off("resize", Ke), 
            te.off("click", E + " a").off("mouseenter", E + " li").off("mouseleave", E + " li").off("click", N).off("mouseover", s.normalScrollElements).off("mouseout", s.normalScrollElements), 
            e(x).off("click", j), clearTimeout(Gn), clearTimeout(Qn), n && Bn();
        };
    };
    var ie = {
        afterRender: function(e) {
            var n = e.find(I), o = e.find(c);
            n.length && (o = n.find(D)), o.mouseover();
        },
        create: function(e, n) {
            e.find(c).slimScroll({
                allowPageScroll: !0,
                height: n + "px",
                size: "10px",
                alwaysVisible: !0
            });
        },
        isScrolled: function(e, n) {
            return "top" === e ? !n.scrollTop() : "bottom" === e ? n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0;
        },
        scrollable: function(e) {
            return e.find(P).length ? e.find(D).find(c) : e.find(c);
        },
        scrollHeight: function(e) {
            return e.find(c).get(0).scrollHeight;
        },
        remove: function(e) {
            e.find(c).children().first().unwrap().unwrap(), e.find(f).remove(), e.find(d).remove();
        },
        update: function(e, n) {
            e.find(c).css("height", n + "px").parent().css("height", n + "px");
        },
        wrapContent: function() {
            return '<div class="' + s + '"></div>';
        }
    };
    l = ie;
});

/*!


 * jQuery Mousewheel 3.1.13


 *


 * Copyright 2015 jQuery Foundation and other contributors


 * Released under the MIT license.


 * http://jquery.org/license


 */
!function(a) {
    "function" == typeof define && define.amd ? define([ "jquery" ], a) : "object" == typeof exports ? module.exports = a : a(jQuery);
}(function(a) {
    function b(b) {
        var g = b || window.event, h = i.call(arguments, 1), j = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), 
        "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), 
        "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, 
        m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 
        0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q;
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r;
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), 
            d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), 
            l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), 
            k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top;
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, 
            b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), 
            (a.event.dispatch || a.event.handle).apply(this, h);
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e, f, g = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], h = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ], i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1); else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function() {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1); else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function(b) {
            var c = a(b), d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function(b) {
            return a(b).height();
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a);
        }
    });
});

/*! lightgallery - v1.2.14 - 2016-01-18


* http://sachinchoolur.github.io/lightGallery/


* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a, b, c, d) {
    "use strict";
    function e(b, d) {
        if (this.el = b, this.$el = a(b), this.s = a.extend({}, f, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, 
        this.isTouch = "ontouchstart" in c.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), 
        this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), 
        this.$slide = "", this.$outer = "", this.init(), this;
    }
    var f = {
        mode: "lg-slide",
        cssEasing: "ease",
        easing: "linear",
        speed: 600,
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 150,
        hideBarsDelay: 6e3,
        useLeft: !1,
        closable: !0,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimatoin: !0,
        hideControlOnEnd: !1,
        mousewheel: !0,
        appendSubHtmlTo: ".lg-sub-html",
        preload: 1,
        showAfterLoad: !0,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: !1,
        iframeMaxWidth: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        galleryId: 1
    };
    e.prototype.init = function() {
        var c = this;
        c.s.preload > c.$items.length && (c.s.preload = c.$items.length);
        var d = b.location.hash;
        d.indexOf("lg=" + this.s.galleryId) > 0 && (c.index = parseInt(d.split("&slide=")[1], 10), 
        a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || setTimeout(function() {
            c.build(c.index), a("body").addClass("lg-on");
        })), c.s.dynamic ? (c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || 0, 
        a("body").hasClass("lg-on") || setTimeout(function() {
            c.build(c.index), a("body").addClass("lg-on");
        })) : c.$items.on("click.lgcustom", function(b) {
            try {
                b.preventDefault(), b.preventDefault();
            } catch (d) {
                b.returnValue = !1;
            }
            c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || c.$items.index(this), a("body").hasClass("lg-on") || (c.build(c.index), 
            a("body").addClass("lg-on"));
        });
    }, e.prototype.build = function(b) {
        var c = this;
        c.structure(), a.each(a.fn.lightGallery.modules, function(b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
        }), c.slide(b, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 && (c.arrow(), 
        setTimeout(function() {
            c.enableDrag(), c.enableSwipe();
        }, 50), c.s.mousewheel && c.mousewheel()), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), 
        c.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
            c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function() {
                c.$outer.addClass("lg-hide-items");
            }, c.s.hideBarsDelay);
        });
    }, e.prototype.structure = function() {
        var c, d = "", e = "", f = 0, g = "", h = this;
        for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), 
        f = 0; f < this.$items.length; f++) d += '<div class="lg-item"></div>';
        if (this.s.controls && this.$items.length > 1 && (e = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), 
        ".lg-sub-html" === this.s.appendSubHtmlTo && (g = '<div class="lg-sub-html"></div>'), 
        c = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + d + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + e + g + "</div></div>", 
        a("body").append(c), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), 
        this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), 
        h.setTop(), a(b).on("resize.lg orientationchange.lg", function() {
            setTimeout(function() {
                h.setTop();
            }, 100);
        }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), 
        this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), 
        this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
            var i = this.$outer.find(".lg-inner");
            i.css("transition-timing-function", this.s.cssEasing), i.css("transition-duration", this.s.speed + "ms");
        }
        a(".lg-backdrop").addClass("in"), setTimeout(function() {
            h.$outer.addClass("lg-visible");
        }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), 
        this.prevScrollTop = a(b).scrollTop();
    }, e.prototype.setTop = function() {
        if ("100%" !== this.s.height) {
            var c = a(b).height(), d = (c - parseInt(this.s.height, 10)) / 2, e = this.$outer.find(".lg");
            c >= parseInt(this.s.height, 10) ? e.css("top", d + "px") : e.css("top", "0px");
        }
    }, e.prototype.doCss = function() {
        var a = function() {
            var a = [ "transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition" ], b = c.documentElement, d = 0;
            for (d = 0; d < a.length; d++) if (a[d] in b.style) return !0;
        };
        return a() ? !0 : !1;
    }, e.prototype.isVideo = function(a, b) {
        var c;
        if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), 
        !a && c) return {
            html5: !0
        };
        var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i), e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i), f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);
        return d ? {
            youtube: d
        } : e ? {
            vimeo: e
        } : f ? {
            dailymotion: f
        } : void 0;
    }, e.prototype.counter = function() {
        this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>");
    }, e.prototype.addHtml = function(b) {
        var c, d = null;
        if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : d = this.s.dynamicEl[b].subHtml : this.$items.eq(b).attr("data-sub-html-url") ? c = this.$items.eq(b).attr("data-sub-html-url") : d = this.$items.eq(b).attr("data-sub-html"), 
        !c) if ("undefined" != typeof d && null !== d) {
            var e = d.substring(0, 1);
            d = "." === e || "#" === e ? a(d).html() : d;
        } else d = "";
        ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(d) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(d), 
        "undefined" != typeof d && null !== d && ("" === d ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), 
        this.$el.trigger("onAfterAppendSubHtml.lg", [ b ]);
    }, e.prototype.preload = function(a) {
        var b = 1, c = 1;
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
        for (c = 1; c <= this.s.preload && !(0 > a - c); c++) this.loadContent(a - c, !1, 0);
    }, e.prototype.loadContent = function(c, d, e) {
        var f, g, h, i, j, k, l = this, m = !1, n = function(c) {
            for (var d = [], e = [], f = 0; f < c.length; f++) {
                var h = c[f].split(" ");
                "" === h[0] && h.splice(0, 1), e.push(h[0]), d.push(h[1]);
            }
            for (var i = a(b).width(), j = 0; j < d.length; j++) if (parseInt(d[j], 10) > i) {
                g = e[j];
                break;
            }
        };
        if (l.s.dynamic) {
            if (l.s.dynamicEl[c].poster && (m = !0, h = l.s.dynamicEl[c].poster), k = l.s.dynamicEl[c].html, 
            g = l.s.dynamicEl[c].src, l.s.dynamicEl[c].responsive) {
                var o = l.s.dynamicEl[c].responsive.split(",");
                n(o);
            }
            i = l.s.dynamicEl[c].srcset, j = l.s.dynamicEl[c].sizes;
        } else {
            if (l.$items.eq(c).attr("data-poster") && (m = !0, h = l.$items.eq(c).attr("data-poster")), 
            k = l.$items.eq(c).attr("data-html"), g = l.$items.eq(c).attr("href") || l.$items.eq(c).attr("data-src"), 
            l.$items.eq(c).attr("data-responsive")) {
                var p = l.$items.eq(c).attr("data-responsive").split(",");
                n(p);
            }
            i = l.$items.eq(c).attr("data-srcset"), j = l.$items.eq(c).attr("data-sizes");
        }
        var q = !1;
        l.s.dynamic ? l.s.dynamicEl[c].iframe && (q = !0) : "true" === l.$items.eq(c).attr("data-iframe") && (q = !0);
        var r = l.isVideo(g, c);
        if (!l.$slide.eq(c).hasClass("lg-loaded")) {
            if (q) l.$slide.eq(c).prepend('<div class="lg-video-cont" style="max-width:' + l.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + g + '"  allowfullscreen="true"></iframe></div></div>'); else if (m) {
                var s = "";
                s = r && r.youtube ? "lg-has-youtube" : r && r.vimeo ? "lg-has-vimeo" : "lg-has-html5", 
                l.$slide.eq(c).prepend('<div class="lg-video-cont ' + s + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + h + '" /></div></div>');
            } else r ? (l.$slide.eq(c).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), 
            l.$el.trigger("hasVideo.lg", [ c, g, k ])) : l.$slide.eq(c).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + g + '" /></div>');
            if (l.$el.trigger("onAferAppendSlide.lg", [ c ]), f = l.$slide.eq(c).find(".lg-object"), 
            j && f.attr("sizes", j), i) {
                f.attr("srcset", i);
                try {
                    picturefill({
                        elements: [ f[0] ]
                    });
                } catch (t) {
                    console.error("Make sure you have included Picturefill version 2");
                }
            }
            ".lg-sub-html" !== this.s.appendSubHtmlTo && l.addHtml(c), l.$slide.eq(c).addClass("lg-loaded");
        }
        l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function() {
            var b = 0;
            e && !a("body").hasClass("lg-from-hash") && (b = e), setTimeout(function() {
                l.$slide.eq(c).addClass("lg-complete"), l.$el.trigger("onSlideItemLoad.lg", [ c, e || 0 ]);
            }, b);
        }), r && r.html5 && !m && l.$slide.eq(c).addClass("lg-complete"), d === !0 && (l.$slide.eq(c).hasClass("lg-complete") ? l.preload(c) : l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function() {
            l.preload(c);
        }));
    }, e.prototype.slide = function(b, c, d) {
        var e = this.$outer.find(".lg-current").index(), f = this;
        if (!f.lGalleryOn || e !== b) {
            var g = this.$slide.length, h = f.lGalleryOn ? this.s.speed : 0, i = !1, j = !1;
            if (!f.lgBusy) {
                if (this.s.download) {
                    var k;
                    k = f.s.dynamic ? f.s.dynamicEl[b].downloadUrl !== !1 && (f.s.dynamicEl[b].downloadUrl || f.s.dynamicEl[b].src) : "false" !== f.$items.eq(b).attr("data-download-url") && (f.$items.eq(b).attr("data-download-url") || f.$items.eq(b).attr("href") || f.$items.eq(b).attr("data-src")), 
                    k ? (a("#lg-download").attr("href", k), f.$outer.removeClass("lg-hide-download")) : f.$outer.addClass("lg-hide-download");
                }
                if (this.$el.trigger("onBeforeSlide.lg", [ e, b, c, d ]), f.lgBusy = !0, clearTimeout(f.hideBartimeout), 
                ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                    f.addHtml(b);
                }, h), this.arrowDisable(b), c) {
                    var l = b - 1, m = b + 1;
                    0 === b && e === g - 1 ? (m = 0, l = g - 1) : b === g - 1 && 0 === e && (m = 0, 
                    l = g - 1), this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), f.$slide.eq(l).addClass("lg-prev-slide"), 
                    f.$slide.eq(m).addClass("lg-next-slide"), f.$slide.eq(b).addClass("lg-current");
                } else f.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), 
                e > b ? (j = !0, 0 !== b || e !== g - 1 || d || (j = !1, i = !0)) : b > e && (i = !0, 
                b !== g - 1 || 0 !== e || d || (j = !0, i = !1)), j ? (this.$slide.eq(b).addClass("lg-prev-slide"), 
                this.$slide.eq(e).addClass("lg-next-slide")) : i && (this.$slide.eq(b).addClass("lg-next-slide"), 
                this.$slide.eq(e).addClass("lg-prev-slide")), setTimeout(function() {
                    f.$slide.removeClass("lg-current"), f.$slide.eq(b).addClass("lg-current"), f.$outer.removeClass("lg-no-trans");
                }, 50);
                f.lGalleryOn ? (setTimeout(function() {
                    f.loadContent(b, !0, 0);
                }, this.s.speed + 50), setTimeout(function() {
                    f.lgBusy = !1, f.$el.trigger("onAfterSlide.lg", [ e, b, c, d ]);
                }, this.s.speed)) : (f.loadContent(b, !0, f.s.backdropDuration), f.lgBusy = !1, 
                f.$el.trigger("onAfterSlide.lg", [ e, b, c, d ])), f.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1);
            }
        }
    }, e.prototype.goToNextSlide = function(a) {
        var b = this;
        b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [ b.index ]), 
        b.slide(b.index, a, !1)) : b.s.loop ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [ b.index ]), 
        b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-right-end"), 
        setTimeout(function() {
            b.$outer.removeClass("lg-right-end");
        }, 400)));
    }, e.prototype.goToPrevSlide = function(a) {
        var b = this;
        b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [ b.index, a ]), 
        b.slide(b.index, a, !1)) : b.s.loop ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [ b.index, a ]), 
        b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-left-end"), 
        setTimeout(function() {
            b.$outer.removeClass("lg-left-end");
        }, 400)));
    }, e.prototype.keyPress = function() {
        var c = this;
        this.$items.length > 1 && a(b).on("keyup.lg", function(a) {
            c.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), c.goToPrevSlide()), 
            39 === a.keyCode && (a.preventDefault(), c.goToNextSlide()));
        }), a(b).on("keydown.lg", function(a) {
            c.s.escKey === !0 && 27 === a.keyCode && (a.preventDefault(), c.$outer.hasClass("lg-thumb-open") ? c.$outer.removeClass("lg-thumb-open") : c.destroy());
        });
    }, e.prototype.arrow = function() {
        var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function() {
            a.goToPrevSlide();
        }), this.$outer.find(".lg-next").on("click.lg", function() {
            a.goToNextSlide();
        });
    }, e.prototype.arrowDisable = function(a) {
        !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), 
        a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"));
    }, e.prototype.setTranslate = function(a, b, c) {
        this.s.useLeft ? a.css("left", b) : a.css({
            transform: "translate3d(" + b + "px, " + c + "px, 0px)"
        });
    }, e.prototype.touchMove = function(b, c) {
        var d = c - b;
        Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), 
        this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), 
        this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0));
    }, e.prototype.touchEnd = function(a) {
        var b = this;
        "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), 
        setTimeout(function() {
            b.$outer.removeClass("lg-dragging"), 0 > a && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), 
            b.$slide.removeAttr("style");
        }), setTimeout(function() {
            b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide");
        }, b.s.speed + 100);
    }, e.prototype.enableSwipe = function() {
        var a = this, b = 0, c = 0, d = !1;
        a.s.enableSwipe && a.isTouch && a.doCss() && (a.$slide.on("touchstart.lg", function(c) {
            a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), 
            b = c.originalEvent.targetTouches[0].pageX);
        }), a.$slide.on("touchmove.lg", function(e) {
            a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, 
            a.touchMove(b, c), d = !0);
        }), a.$slide.on("touchend.lg", function() {
            a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"));
        }));
    }, e.prototype.enableDrag = function() {
        var c = this, d = 0, e = 0, f = !1, g = !1;
        c.s.enableDrag && !c.isTouch && c.doCss() && (c.$slide.on("mousedown.lg", function(b) {
            c.$outer.hasClass("lg-zoomed") || (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && (b.preventDefault(), 
            c.lgBusy || (c.manageSwipeClass(), d = b.pageX, f = !0, c.$outer.scrollLeft += 1, 
            c.$outer.scrollLeft -= 1, c.$outer.removeClass("lg-grab").addClass("lg-grabbing"), 
            c.$el.trigger("onDragstart.lg")));
        }), a(b).on("mousemove.lg", function(a) {
            f && (g = !0, e = a.pageX, c.touchMove(d, e), c.$el.trigger("onDragmove.lg"));
        }), a(b).on("mouseup.lg", function(b) {
            g ? (g = !1, c.touchEnd(e - d), c.$el.trigger("onDragend.lg")) : (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && c.$el.trigger("onSlideClick.lg"), 
            f && (f = !1, c.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
        }));
    }, e.prototype.manageSwipeClass = function() {
        var a = this.index + 1, b = this.index - 1, c = this.$slide.length;
        this.s.loop && (0 === this.index ? b = c - 1 : this.index === c - 1 && (a = 0)), 
        this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), 
        this.$slide.eq(a).addClass("lg-next-slide");
    }, e.prototype.mousewheel = function() {
        var a = this;
        a.$outer.on("mousewheel.lg", function(b) {
            b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault());
        });
    }, e.prototype.closeGallery = function() {
        var b = this, c = !1;
        this.$outer.find(".lg-close").on("click.lg", function() {
            b.destroy();
        }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) {
            c = a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap") ? !0 : !1;
        }), b.$outer.on("mouseup.lg", function(d) {
            (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy());
        }));
    }, e.prototype.destroy = function(c) {
        var d = this;
        c || d.$el.trigger("onBeforeClose.lg"), a(b).scrollTop(d.prevScrollTop), c && (d.s.dynamic || this.$items.off("click.lg click.lgcustom"), 
        a.removeData(d.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) {
            d.modules[a] && d.modules[a].destroy();
        }), this.lGalleryOn = !1, clearTimeout(d.hideBartimeout), this.hideBartimeout = !1, 
        a(b).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), d.$outer && d.$outer.removeClass("lg-visible"), 
        a(".lg-backdrop").removeClass("in"), setTimeout(function() {
            d.$outer && d.$outer.remove(), a(".lg-backdrop").remove(), c || d.$el.trigger("onCloseAfter.lg");
        }, d.s.backdropDuration + 50);
    }, a.fn.lightGallery = function(b) {
        return this.each(function() {
            if (a.data(this, "lightGallery")) try {
                a(this).data("lightGallery").init();
            } catch (c) {
                console.error("lightGallery has not initiated properly");
            } else a.data(this, "lightGallery", new e(this, b));
        });
    }, a.fn.lightGallery.modules = {};
}(jQuery, window, document);

/*! lightslider - v1.1.5 - 2015-10-31


* https://github.com/sachinchoolur/lightslider


* Copyright (c) 2015 Sachin N; Licensed MIT */
!function(a, b) {
    "use strict";
    var c = {
        item: 3,
        autoWidth: !1,
        slideMove: 1,
        slideMargin: 10,
        addClass: "",
        mode: "slide",
        useCSS: !0,
        cssEasing: "ease",
        easing: "linear",
        speed: 400,
        auto: !1,
        pauseOnHover: !1,
        loop: !1,
        slideEndAnimation: !0,
        pause: 2e3,
        keyPress: !1,
        controls: !0,
        prevHtml: "",
        nextHtml: "",
        rtl: !1,
        adaptiveHeight: !1,
        vertical: !1,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: !0,
        gallery: !1,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: "middle",
        enableTouch: !0,
        enableDrag: !0,
        freeMove: !0,
        swipeThreshold: 40,
        responsive: [],
        onBeforeStart: function(a) {},
        onSliderLoad: function(a) {},
        onBeforeSlide: function(a, b) {},
        onAfterSlide: function(a, b) {},
        onBeforeNextSlide: function(a, b) {},
        onBeforePrevSlide: function(a, b) {}
    };
    a.fn.lightSlider = function(b) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            a(this).lightSlider(b);
        }), this;
        var d = {}, e = a.extend(!0, {}, c, b), f = {}, g = this;
        d.$el = this, "fade" === e.mode && (e.vertical = !1);
        var h = g.children(), i = a(window).width(), j = null, k = null, l = 0, m = 0, n = !1, o = 0, p = "", q = 0, r = e.vertical === !0 ? "height" : "width", s = e.vertical === !0 ? "margin-bottom" : "margin-right", t = 0, u = 0, v = 0, w = 0, x = null, y = "ontouchstart" in document.documentElement, z = {};
        return z.chbreakpoint = function() {
            if (i = a(window).width(), e.responsive.length) {
                var b;
                if (e.autoWidth === !1 && (b = e.item), i < e.responsive[0].breakpoint) for (var c = 0; c < e.responsive.length; c++) i < e.responsive[c].breakpoint && (j = e.responsive[c].breakpoint, 
                k = e.responsive[c]);
                if ("undefined" != typeof k && null !== k) for (var d in k.settings) k.settings.hasOwnProperty(d) && (("undefined" == typeof f[d] || null === f[d]) && (f[d] = e[d]), 
                e[d] = k.settings[d]);
                if (!a.isEmptyObject(f) && i > e.responsive[0].breakpoint) for (var g in f) f.hasOwnProperty(g) && (e[g] = f[g]);
                e.autoWidth === !1 && t > 0 && v > 0 && b !== e.item && (q = Math.round(t / ((v + e.slideMargin) * e.slideMove)));
            }
        }, z.calSW = function() {
            e.autoWidth === !1 && (v = (o - (e.item * e.slideMargin - e.slideMargin)) / e.item);
        }, z.calWidth = function(a) {
            var b = a === !0 ? p.find(".lslide").length : h.length;
            if (e.autoWidth === !1) m = b * (v + e.slideMargin); else {
                m = 0;
                for (var c = 0; b > c; c++) m += parseInt(h.eq(c).width()) + e.slideMargin;
            }
            return m;
        }, d = {
            doCss: function() {
                var a = function() {
                    for (var a = [ "transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition" ], b = document.documentElement, c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
                };
                return e.useCSS && a() ? !0 : !1;
            },
            keyPress: function() {
                e.keyPress && a(document).on("keyup.lightslider", function(b) {
                    a(":focus").is("input, textarea") || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, 
                    37 === b.keyCode ? g.goToPrevSlide() : 39 === b.keyCode && g.goToNextSlide());
                });
            },
            controls: function() {
                e.controls && (g.after('<div class="lSAction"><a class="lSPrev">' + e.prevHtml + '</a><a class="lSNext">' + e.nextHtml + "</a></div>"), 
                e.autoWidth ? z.calWidth(!1) < o && p.find(".lSAction").hide() : l <= e.item && p.find(".lSAction").hide(), 
                p.find(".lSAction a").on("click", function(b) {
                    return b.preventDefault ? b.preventDefault() : b.returnValue = !1, "lSPrev" === a(this).attr("class") ? g.goToPrevSlide() : g.goToNextSlide(), 
                    !1;
                }));
            },
            initialStyle: function() {
                var a = this;
                "fade" === e.mode && (e.autoWidth = !1, e.slideEndAnimation = !1), e.auto && (e.slideEndAnimation = !1), 
                e.autoWidth && (e.slideMove = 1, e.item = 1), e.loop && (e.slideMove = 1, e.freeMove = !1), 
                e.onBeforeStart.call(this, g), z.chbreakpoint(), g.addClass("lightSlider").wrap('<div class="lSSlideOuter ' + e.addClass + '"><div class="lSSlideWrapper"></div></div>'), 
                p = g.parent(".lSSlideWrapper"), e.rtl === !0 && p.parent().addClass("lSrtl"), e.vertical ? (p.parent().addClass("vertical"), 
                o = e.verticalHeight, p.css("height", o + "px")) : o = g.outerWidth(), h.addClass("lslide"), 
                e.loop === !0 && "slide" === e.mode && (z.calSW(), z.clone = function() {
                    if (z.calWidth(!0) > o) {
                        for (var b = 0, c = 0, d = 0; d < h.length && (b += parseInt(g.find(".lslide").eq(d).width()) + e.slideMargin, 
                        c++, !(b >= o + e.slideMargin)); d++) ;
                        var f = e.autoWidth === !0 ? c : e.item;
                        if (f < g.find(".clone.left").length) for (var i = 0; i < g.find(".clone.left").length - f; i++) h.eq(i).remove();
                        if (f < g.find(".clone.right").length) for (var j = h.length - 1; j > h.length - 1 - g.find(".clone.right").length; j--) q--, 
                        h.eq(j).remove();
                        for (var k = g.find(".clone.right").length; f > k; k++) g.find(".lslide").eq(k).clone().removeClass("lslide").addClass("clone right").appendTo(g), 
                        q++;
                        for (var l = g.find(".lslide").length - g.find(".clone.left").length; l > g.find(".lslide").length - f; l--) g.find(".lslide").eq(l - 1).clone().removeClass("lslide").addClass("clone left").prependTo(g);
                        h = g.children();
                    } else h.hasClass("clone") && (g.find(".clone").remove(), a.move(g, 0));
                }, z.clone()), z.sSW = function() {
                    l = h.length, e.rtl === !0 && e.vertical === !1 && (s = "margin-left"), e.autoWidth === !1 && h.css(r, v + "px"), 
                    h.css(s, e.slideMargin + "px"), m = z.calWidth(!1), g.css(r, m + "px"), e.loop === !0 && "slide" === e.mode && n === !1 && (q = g.find(".clone.left").length);
                }, z.calL = function() {
                    h = g.children(), l = h.length;
                }, this.doCss() && p.addClass("usingCss"), z.calL(), "slide" === e.mode ? (z.calSW(), 
                z.sSW(), e.loop === !0 && (t = a.slideValue(), this.move(g, t)), e.vertical === !1 && this.setHeight(g, !1)) : (this.setHeight(g, !0), 
                g.addClass("lSFade"), this.doCss() || (h.fadeOut(0), h.eq(q).fadeIn(0))), e.loop === !0 && "slide" === e.mode ? h.eq(q).addClass("active") : h.first().addClass("active");
            },
            pager: function() {
                var a = this;
                if (z.createPager = function() {
                    w = (o - (e.thumbItem * e.thumbMargin - e.thumbMargin)) / e.thumbItem;
                    var b = p.find(".lslide"), c = p.find(".lslide").length, d = 0, f = "", h = 0;
                    for (d = 0; c > d; d++) {
                        "slide" === e.mode && (e.autoWidth ? h += (parseInt(b.eq(d).width()) + e.slideMargin) * e.slideMove : h = d * (v + e.slideMargin) * e.slideMove);
                        var i = b.eq(d * e.slideMove).attr("data-thumb");
                        if (f += e.gallery === !0 ? '<li style="width:100%;' + r + ":" + w + "px;" + s + ":" + e.thumbMargin + 'px"><a href="#"><img src="' + i + '" /></a></li>' : '<li><a href="#">' + (d + 1) + "</a></li>", 
                        "slide" === e.mode && h >= m - o - e.slideMargin) {
                            d += 1;
                            var j = 2;
                            e.autoWidth && (f += '<li><a href="#">' + (d + 1) + "</a></li>", j = 1), j > d ? (f = null, 
                            p.parent().addClass("noPager")) : p.parent().removeClass("noPager");
                            break;
                        }
                    }
                    var k = p.parent();
                    k.find(".lSPager").html(f), e.gallery === !0 && (e.vertical === !0 && k.find(".lSPager").css("width", e.vThumbWidth + "px"), 
                    u = d * (e.thumbMargin + w) + .5, k.find(".lSPager").css({
                        property: u + "px",
                        "transition-duration": e.speed + "ms"
                    }), e.vertical === !0 && p.parent().css("padding-right", e.vThumbWidth + e.galleryMargin + "px"), 
                    k.find(".lSPager").css(r, u + "px"));
                    var l = k.find(".lSPager").find("li");
                    l.first().addClass("active"), l.on("click", function() {
                        return e.loop === !0 && "slide" === e.mode ? q += l.index(this) - k.find(".lSPager").find("li.active").index() : q = l.index(this), 
                        g.mode(!1), e.gallery === !0 && a.slideThumb(), !1;
                    });
                }, e.pager) {
                    var b = "lSpg";
                    e.gallery && (b = "lSGallery"), p.after('<ul class="lSPager ' + b + '"></ul>');
                    var c = e.vertical ? "margin-left" : "margin-top";
                    p.parent().find(".lSPager").css(c, e.galleryMargin + "px"), z.createPager();
                }
                setTimeout(function() {
                    z.init();
                }, 0);
            },
            setHeight: function(a, b) {
                var c = null, d = this;
                c = e.loop ? a.children(".lslide ").first() : a.children().first();
                var f = function() {
                    var d = c.outerHeight(), e = 0, f = d;
                    b && (d = 0, e = 100 * f / o), a.css({
                        height: d + "px",
                        "padding-bottom": e + "%"
                    });
                };
                f(), c.find("img").length ? c.find("img")[0].complete ? (f(), x || d.auto()) : c.find("img").load(function() {
                    setTimeout(function() {
                        f(), x || d.auto();
                    }, 100);
                }) : x || d.auto();
            },
            active: function(a, b) {
                this.doCss() && "fade" === e.mode && p.addClass("on");
                var c = 0;
                if (q * e.slideMove < l) {
                    a.removeClass("active"), this.doCss() || "fade" !== e.mode || b !== !1 || a.fadeOut(e.speed), 
                    c = b === !0 ? q : q * e.slideMove;
                    var d, f;
                    b === !0 && (d = a.length, f = d - 1, c + 1 >= d && (c = f)), e.loop === !0 && "slide" === e.mode && (c = b === !0 ? q - g.find(".clone.left").length : q * e.slideMove, 
                    b === !0 && (d = a.length, f = d - 1, c + 1 === d ? c = f : c + 1 > d && (c = 0))), 
                    this.doCss() || "fade" !== e.mode || b !== !1 || a.eq(c).fadeIn(e.speed), a.eq(c).addClass("active");
                } else a.removeClass("active"), a.eq(a.length - 1).addClass("active"), this.doCss() || "fade" !== e.mode || b !== !1 || (a.fadeOut(e.speed), 
                a.eq(c).fadeIn(e.speed));
            },
            move: function(a, b) {
                e.rtl === !0 && (b = -b), this.doCss() ? a.css(e.vertical === !0 ? {
                    transform: "translate3d(0px, " + -b + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -b + "px, 0px)"
                } : {
                    transform: "translate3d(" + -b + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -b + "px, 0px, 0px)"
                }) : e.vertical === !0 ? a.css("position", "relative").animate({
                    top: -b + "px"
                }, e.speed, e.easing) : a.css("position", "relative").animate({
                    left: -b + "px"
                }, e.speed, e.easing);
                var c = p.parent().find(".lSPager").find("li");
                this.active(c, !0);
            },
            fade: function() {
                this.active(h, !1);
                var a = p.parent().find(".lSPager").find("li");
                this.active(a, !0);
            },
            slide: function() {
                var a = this;
                z.calSlide = function() {
                    m > o && (t = a.slideValue(), a.active(h, !1), t > m - o - e.slideMargin ? t = m - o - e.slideMargin : 0 > t && (t = 0), 
                    a.move(g, t), e.loop === !0 && "slide" === e.mode && (q >= l - g.find(".clone.left").length / e.slideMove && a.resetSlide(g.find(".clone.left").length), 
                    0 === q && a.resetSlide(p.find(".lslide").length)));
                }, z.calSlide();
            },
            resetSlide: function(a) {
                var b = this;
                p.find(".lSAction a").addClass("disabled"), setTimeout(function() {
                    q = a, p.css("transition-duration", "0ms"), t = b.slideValue(), b.active(h, !1), 
                    d.move(g, t), setTimeout(function() {
                        p.css("transition-duration", e.speed + "ms"), p.find(".lSAction a").removeClass("disabled");
                    }, 50);
                }, e.speed + 100);
            },
            slideValue: function() {
                var a = 0;
                if (e.autoWidth === !1) a = q * (v + e.slideMargin) * e.slideMove; else {
                    a = 0;
                    for (var b = 0; q > b; b++) a += parseInt(h.eq(b).width()) + e.slideMargin;
                }
                return a;
            },
            slideThumb: function() {
                var a;
                switch (e.currentPagerPosition) {
                  case "left":
                    a = 0;
                    break;

                  case "middle":
                    a = o / 2 - w / 2;
                    break;

                  case "right":
                    a = o - w;
                }
                var b = q - g.find(".clone.left").length, c = p.parent().find(".lSPager");
                "slide" === e.mode && e.loop === !0 && (b >= c.children().length ? b = 0 : 0 > b && (b = c.children().length));
                var d = b * (w + e.thumbMargin) - a;
                d + o > u && (d = u - o - e.thumbMargin), 0 > d && (d = 0), this.move(c, d);
            },
            auto: function() {
                e.auto && (clearInterval(x), x = setInterval(function() {
                    g.goToNextSlide();
                }, e.pause));
            },
            pauseOnHover: function() {
                var b = this;
                e.auto && e.pauseOnHover && (p.on("mouseenter", function() {
                    a(this).addClass("ls-hover"), g.pause(), e.auto = !0;
                }), p.on("mouseleave", function() {
                    a(this).removeClass("ls-hover"), p.find(".lightSlider").hasClass("lsGrabbing") || b.auto();
                }));
            },
            touchMove: function(a, b) {
                if (p.css("transition-duration", "0ms"), "slide" === e.mode) {
                    var c = a - b, d = t - c;
                    if (d >= m - o - e.slideMargin) if (e.freeMove === !1) d = m - o - e.slideMargin; else {
                        var f = m - o - e.slideMargin;
                        d = f + (d - f) / 5;
                    } else 0 > d && (e.freeMove === !1 ? d = 0 : d /= 5);
                    this.move(g, d);
                }
            },
            touchEnd: function(a) {
                if (p.css("transition-duration", e.speed + "ms"), "slide" === e.mode) {
                    var b = !1, c = !0;
                    t -= a, t > m - o - e.slideMargin ? (t = m - o - e.slideMargin, e.autoWidth === !1 && (b = !0)) : 0 > t && (t = 0);
                    var d = function(a) {
                        var c = 0;
                        if (b || a && (c = 1), e.autoWidth) for (var d = 0, f = 0; f < h.length && (d += parseInt(h.eq(f).width()) + e.slideMargin, 
                        q = f + c, !(d >= t)); f++) ; else {
                            var g = t / ((v + e.slideMargin) * e.slideMove);
                            q = parseInt(g) + c, t >= m - o - e.slideMargin && g % 1 !== 0 && q++;
                        }
                    };
                    a >= e.swipeThreshold ? (d(!1), c = !1) : a <= -e.swipeThreshold && (d(!0), c = !1), 
                    g.mode(c), this.slideThumb();
                } else a >= e.swipeThreshold ? g.goToPrevSlide() : a <= -e.swipeThreshold && g.goToNextSlide();
            },
            enableDrag: function() {
                var b = this;
                if (!y) {
                    var c = 0, d = 0, f = !1;
                    p.find(".lightSlider").addClass("lsGrab"), p.on("mousedown", function(b) {
                        return o > m && 0 !== m ? !1 : void ("lSPrev" !== a(b.target).attr("class") && "lSNext" !== a(b.target).attr("class") && (c = e.vertical === !0 ? b.pageY : b.pageX, 
                        f = !0, b.preventDefault ? b.preventDefault() : b.returnValue = !1, p.scrollLeft += 1, 
                        p.scrollLeft -= 1, p.find(".lightSlider").removeClass("lsGrab").addClass("lsGrabbing"), 
                        clearInterval(x)));
                    }), a(window).on("mousemove", function(a) {
                        f && (d = e.vertical === !0 ? a.pageY : a.pageX, b.touchMove(d, c));
                    }), a(window).on("mouseup", function(g) {
                        if (f) {
                            p.find(".lightSlider").removeClass("lsGrabbing").addClass("lsGrab"), f = !1, d = e.vertical === !0 ? g.pageY : g.pageX;
                            var h = d - c;
                            Math.abs(h) >= e.swipeThreshold && a(window).on("click.ls", function(b) {
                                b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopImmediatePropagation(), 
                                b.stopPropagation(), a(window).off("click.ls");
                            }), b.touchEnd(h);
                        }
                    });
                }
            },
            enableTouch: function() {
                var a = this;
                if (y) {
                    var b = {}, c = {};
                    p.on("touchstart", function(a) {
                        c = a.originalEvent.targetTouches[0], b.pageX = a.originalEvent.targetTouches[0].pageX, 
                        b.pageY = a.originalEvent.targetTouches[0].pageY, clearInterval(x);
                    }), p.on("touchmove", function(d) {
                        if (o > m && 0 !== m) return !1;
                        var f = d.originalEvent;
                        c = f.targetTouches[0];
                        var g = Math.abs(c.pageX - b.pageX), h = Math.abs(c.pageY - b.pageY);
                        e.vertical === !0 ? (3 * h > g && d.preventDefault(), a.touchMove(c.pageY, b.pageY)) : (3 * g > h && d.preventDefault(), 
                        a.touchMove(c.pageX, b.pageX));
                    }), p.on("touchend", function() {
                        if (o > m && 0 !== m) return !1;
                        var d;
                        d = e.vertical === !0 ? c.pageY - b.pageY : c.pageX - b.pageX, a.touchEnd(d);
                    });
                }
            },
            build: function() {
                var b = this;
                b.initialStyle(), this.doCss() && (e.enableTouch === !0 && b.enableTouch(), e.enableDrag === !0 && b.enableDrag()), 
                a(window).on("focus", function() {
                    b.auto();
                }), a(window).on("blur", function() {
                    clearInterval(x);
                }), b.pager(), b.pauseOnHover(), b.controls(), b.keyPress();
            }
        }, d.build(), z.init = function() {
            z.chbreakpoint(), e.vertical === !0 ? (o = e.item > 1 ? e.verticalHeight : h.outerHeight(), 
            p.css("height", o + "px")) : o = p.outerWidth(), e.loop === !0 && "slide" === e.mode && z.clone(), 
            z.calL(), "slide" === e.mode && g.removeClass("lSSlide"), "slide" === e.mode && (z.calSW(), 
            z.sSW()), setTimeout(function() {
                "slide" === e.mode && g.addClass("lSSlide");
            }, 1e3), e.pager && z.createPager(), e.adaptiveHeight === !0 && e.vertical === !1 && g.css("height", h.eq(q).outerHeight(!0)), 
            e.adaptiveHeight === !1 && ("slide" === e.mode ? e.vertical === !1 ? d.setHeight(g, !1) : d.auto() : d.setHeight(g, !0)), 
            e.gallery === !0 && d.slideThumb(), "slide" === e.mode && d.slide(), e.autoWidth === !1 ? h.length <= e.item ? p.find(".lSAction").hide() : p.find(".lSAction").show() : z.calWidth(!1) < o && 0 !== m ? p.find(".lSAction").hide() : p.find(".lSAction").show();
        }, g.goToPrevSlide = function() {
            if (q > 0) e.onBeforePrevSlide.call(this, g, q), q--, g.mode(!1), e.gallery === !0 && d.slideThumb(); else if (e.loop === !0) {
                if (e.onBeforePrevSlide.call(this, g, q), "fade" === e.mode) {
                    var a = l - 1;
                    q = parseInt(a / e.slideMove);
                }
                g.mode(!1), e.gallery === !0 && d.slideThumb();
            } else e.slideEndAnimation === !0 && (g.addClass("leftEnd"), setTimeout(function() {
                g.removeClass("leftEnd");
            }, 400));
        }, g.goToNextSlide = function() {
            var a = !0;
            if ("slide" === e.mode) {
                var b = d.slideValue();
                a = b < m - o - e.slideMargin;
            }
            q * e.slideMove < l - e.slideMove && a ? (e.onBeforeNextSlide.call(this, g, q), 
            q++, g.mode(!1), e.gallery === !0 && d.slideThumb()) : e.loop === !0 ? (e.onBeforeNextSlide.call(this, g, q), 
            q = 0, g.mode(!1), e.gallery === !0 && d.slideThumb()) : e.slideEndAnimation === !0 && (g.addClass("rightEnd"), 
            setTimeout(function() {
                g.removeClass("rightEnd");
            }, 400));
        }, g.mode = function(a) {
            e.adaptiveHeight === !0 && e.vertical === !1 && g.css("height", h.eq(q).outerHeight(!0)), 
            n === !1 && ("slide" === e.mode ? d.doCss() && (g.addClass("lSSlide"), "" !== e.speed && p.css("transition-duration", e.speed + "ms"), 
            "" !== e.cssEasing && p.css("transition-timing-function", e.cssEasing)) : d.doCss() && ("" !== e.speed && g.css("transition-duration", e.speed + "ms"), 
            "" !== e.cssEasing && g.css("transition-timing-function", e.cssEasing))), a || e.onBeforeSlide.call(this, g, q), 
            "slide" === e.mode ? d.slide() : d.fade(), p.hasClass("ls-hover") || d.auto(), setTimeout(function() {
                a || e.onAfterSlide.call(this, g, q);
            }, e.speed), n = !0;
        }, g.play = function() {
            g.goToNextSlide(), e.auto = !0, d.auto();
        }, g.pause = function() {
            e.auto = !1, clearInterval(x);
        }, g.refresh = function() {
            z.init();
        }, g.getCurrentSlideCount = function() {
            var a = q;
            if (e.loop) {
                var b = p.find(".lslide").length, c = g.find(".clone.left").length;
                a = c - 1 >= q ? b + (q - c) : q >= b + c ? q - b - c : q - c;
            }
            return a + 1;
        }, g.getTotalSlideCount = function() {
            return p.find(".lslide").length;
        }, g.goToSlide = function(a) {
            q = e.loop ? a + g.find(".clone.left").length - 1 : a, g.mode(!1), e.gallery === !0 && d.slideThumb();
        }, g.destroy = function() {
            g.lightSlider && (g.goToPrevSlide = function() {}, g.goToNextSlide = function() {}, 
            g.mode = function() {}, g.play = function() {}, g.pause = function() {}, g.refresh = function() {}, 
            g.getCurrentSlideCount = function() {}, g.getTotalSlideCount = function() {}, g.goToSlide = function() {}, 
            g.lightSlider = null, z = {
                init: function() {}
            }, g.parent().parent().find(".lSAction, .lSPager").remove(), g.removeClass("lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right").removeAttr("style").unwrap().unwrap(), 
            g.children().removeAttr("style"), h.removeClass("lslide active"), g.find(".clone").remove(), 
            h = null, x = null, n = !1, q = 0);
        }, setTimeout(function() {
            e.onSliderLoad.call(this, g);
        }, 10), a(window).on("resize orientationchange", function(a) {
            setTimeout(function() {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1, z.init();
            }, 200);
        }), this;
    };
}(jQuery);

!function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), 
        this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), 
        this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, 
        this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], 
        this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], 
        a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
        }, this)), a.each(e.Pipe, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            });
        }, this)), this.setup(), this.initialize();
    }
    function f(a) {
        if (a.touches !== d) return {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        if (a.touches === d) {
            if (a.pageX !== d) return {
                x: a.pageX,
                y: a.pageY
            };
            if (a.pageX === d) return {
                x: a.clientX,
                y: a.clientY
            };
        }
    }
    function g(a) {
        var b, d, e = c.createElement("div"), f = a;
        for (b in f) if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [ d, b ];
        return [ !1 ];
    }
    function h() {
        return g([ "transition", "WebkitTransition", "MozTransition", "OTransition" ])[1];
    }
    function i() {
        return g([ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ])[0];
    }
    function j() {
        return g([ "perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective" ])[0];
    }
    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
    }
    function l() {
        return b.navigator.msPointerEnabled;
    }
    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [ {
        filter: [ "width", "items", "settings" ],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)];
        }
    }, {
        filter: [ "items", "settings" ],
        run: function() {
            var a = this._clones, b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), 
            this._clones = []);
        }
    }, {
        filter: [ "items", "settings" ],
        run: function() {
            var a, b, c = this._clones, d = this._items, e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), 
            c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), 
            this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), 
            this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")));
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function() {
            var a, b, c, d = this.settings.rtl ? 1 : -1, e = (this.width() / this.settings.items).toFixed(3), f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], 
            a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, 
            this._coordinates.push(f);
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function() {
            var b, c, d = (this.width() / this.settings.items).toFixed(3), e = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(e), e = {
                width: this.settings.autoWidth ? "auto" : d - this.settings.margin
            }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, 
            !this.settings.autoWidth && a.grep(this._mergers, function(a) {
                return a > 1;
            }).length > 0) for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, 
            this.$stage.children().eq(b).css(e); else this.$stage.children().css(e);
        }
    }, {
        filter: [ "width", "items", "settings" ],
        run: function(a) {
            a.current && this.reset(this.$stage.children().index(a.current));
        }
    }, {
        filter: [ "position" ],
        run: function() {
            this.animate(this.coordinates(this._current));
        }
    }, {
        filter: [ "width", "position", "items", "settings" ],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, 
            b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), 
            this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), 
            this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), 
            this.$stage.children().eq(this.current()).addClass(this.settings.centerClass));
        }
    } ], e.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), 
        this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, 
            e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), 
            !1;
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), 
        this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), 
        this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), 
        this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized");
    }, e.prototype.setup = function() {
        var b = this.viewport(), c = this.options.responsive, d = -1, e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a));
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
            return b.replace(/\b owl-responsive-\S+/g, "");
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }));
    }, e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), 
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), 
        this.trigger("prepared", {
            content: c.data
        }), c.data;
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a];
        }, this._invalidated), e = {}; c > b; ) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), 
        b++;
        this._invalidated = {};
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
          case e.Width.Inner:
          case e.Width.Outer:
            return this._width;

          default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin;
        }
    }, e.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        new Date().getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), 
        this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, 
        this.watchVisibility(), this.trigger("refreshed");
    }, e.prototype.eventsCall = function() {
        this.e._onDragStart = a.proxy(function(a) {
            this.onDragStart(a);
        }, this), this.e._onDragMove = a.proxy(function(a) {
            this.onDragMove(a);
        }, this), this.e._onDragEnd = a.proxy(function(a) {
            this.onDragEnd(a);
        }, this), this.e._onResize = a.proxy(function(a) {
            this.onResize(a);
        }, this), this.e._transitionEnd = a.proxy(function(a) {
            this.transitionEnd(a);
        }, this), this.e._preventClick = a.proxy(function(a) {
            this.preventClick(a);
        }, this);
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate);
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), 
        this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1;
    }, e.prototype.eventsRouter = function(a) {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a);
    }, e.prototype.internalEvents = function() {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
            this.eventsRouter(a);
        }, this)), this.$stage.on("dragstart", function() {
            return !1;
        }), this.$stage.get(0).onselectstart = function() {
            return !1;
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
            this.eventsRouter(a);
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), 
        this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this));
    }, e.prototype.onDragStart = function(d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), 
        this.drag.startTime = new Date().getTime(), this.speed(0), this.state.isTouch = !0, 
        this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, 
        g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, 
        this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), 
        this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, 
        this.animate(i), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, 
        !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, 
        this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, 
        this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), 
        a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
            this.eventsRouter(a);
        }, this));
    }, e.prototype.onDragMove = function(a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, 
        e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, 
        this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), 
        this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), 
        i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, 
        this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, 
        this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, 
        this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)));
    }, e.prototype.onDragEnd = function(b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), 
            this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, 
            this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, 
            !1;
            this.drag.endTime = new Date().getTime(), d = this.drag.endTime - this.drag.startTime, 
            e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), 
            f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), 
            this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), 
            this.drag.distance = 0, a(c).off(".owl.dragEvents");
        }
    }, e.prototype.removeClick = function(c) {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
            a(c).off("click.preventClick");
        }, 300);
    }, e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), 
        a(b.target).off("click.preventClick");
    }, e.prototype.getTransformProperty = function() {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), 
        a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12];
    }, e.prototype.closest = function(b) {
        var c = -1, d = 30, e = this.width(), f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), 
            -1 === c;
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), 
        c;
    }, e.prototype.animate = function(b) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
            this.state.inMotion && this.transitionEnd();
        }, this));
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), 
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            });
        }
        return this._current;
    }, e.prototype.invalidate = function(a) {
        this._invalidated[a] = !0;
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress([ "translate", "translated" ]), 
        this.animate(this.coordinates(a)), this.release([ "translate", "translated" ]));
    }, e.prototype.normalize = function(b, c) {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b));
    }, e.prototype.relative = function(a) {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0);
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = 0, f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1; else if (f.loop || f.center) if (f.loop || f.center) b = this._items.length + f.items; else {
            if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
            for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width(); (d = this.coordinates(e)) && !(d * revert >= c); ) b = ++e;
        } else b = this._items.length - f.items;
        return b;
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2;
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2, e = c + this._items.length, f = function(a) {
            return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b);
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null;
        });
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed;
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b);
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, 
        c);
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
    }, e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()), f = this.current(), g = this.current(), h = this.current() + e, i = 0 > g - h ? !0 : !1, j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, 
            this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update();
            }, this), 30);
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update();
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a);
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a);
    }, e.prototype.transitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, 
        void this.trigger("translated"));
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width(); else if (b.innerWidth) d = b.innerWidth; else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth;
        }
        return d;
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), 
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), 
        b.filter(function() {
            return 1 === this.nodeType;
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1);
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), 
        this.invalidate("items");
    }, e.prototype.add = function(a, b) {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), 
        this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), 
        this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), 
        this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        });
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), 
        this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }));
    }, e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) {
            return a.proxy(function(a) {
                a.relatedTarget !== this && (this.suppress([ c ]), b.apply(this, [].slice.call(arguments, 1)), 
                this.release([ c ]));
            }, this);
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function(a, c) {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
        }, this));
    }, e.prototype.watchVisibility = function() {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0;
        }
        function d() {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), 
            b.clearInterval(this.e._checkVisibile));
        }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), 
        this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500));
    }, e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function(g, h) {
            e = a(h), f = new Image(), f.onload = function() {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, 
                d.initialize());
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina");
        });
    }, e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), 
        this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), 
        a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1;
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, 
        this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), 
        this.$stage.children().unwrap(), this.$stage.unwrap();
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
          case "<":
            return d ? a > c : c > a;

          case ">":
            return d ? c > a : a > c;

          case ">=":
            return d ? c >= a : a >= c;

          case "<=":
            return d ? a >= c : c >= a;
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
    }, e.prototype.trigger = function(b, c, d) {
        var e = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }, f = a.camelCase(a.grep([ "on", b, d ], function(a) {
            return a;
        }).join("-").toLowerCase()), g = a.Event([ b, "owl", d || "carousel" ].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        }, e, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(g);
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), 
        g;
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0;
        }, this));
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b];
        }, this));
    }, e.prototype.browserSupport = function() {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = [ "transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd" ];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), 
            this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : "";
        }
        this.state.orientation = b.orientation;
    }, a.fn.owlCarousel = function(b) {
        return this.each(function() {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b));
        });
    }, a.fn.owlCarousel.Constructor = e;
}(window.Zepto || window.jQuery, window, document), function(a, b) {
    var c = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                    this.load(b);
                }, this); e++ < d; ) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h);
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers);
    };
    c.Defaults = {
        lazyLoad: !1
    }, c.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c), e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy");
            }, this)).attr("src", g) : (e = new Image(), e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy");
            }, this), e.src = g);
        }, this)), this._loaded.push(d.get(0)));
    }, c.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c;
}(window.Zepto || window.jQuery, window, document), function(a) {
    var b = function(c) {
        this._core = c, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                this._core.settings.autoHeight && this.update();
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                this._core.settings.autoHeight && "position" == a.property.name && this.update();
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update();
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers);
    };
    b.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, b.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass);
    }, b.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b;
}(window.Zepto || window.jQuery, window, document), function(a, b, c) {
    var d = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, 
        this._handlers = {
            "resize.owl.carousel": a.proxy(function(a) {
                this._core.settings.video && !this.isInFullScreen() && a.preventDefault();
            }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
                this._playing && this.stop();
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), 
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a);
        }, this));
    };
    d.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, d.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube", d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"), e = a.attr("data-width") || this._core.settings.videoWidth, f = a.attr("data-height") || this._core.settings.videoHeight, g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), 
        d[3].indexOf("youtu") > -1) c = "youtube"; else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo";
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
    }, d.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function(a) {
            e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', 
            b.after(d), b.after(e);
        };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", 
        j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void ("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", 
        l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f);
            }
        }));
    }, d.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), 
        this._playing.removeClass("owl-video-playing"), this._playing = null;
    }, d.prototype.play = function(b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement), f = e.closest("." + this._core.settings.itemClass), g = this._videos[f.attr("data-video")], h = g.width || "100%", i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), 
        f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), 
        e.after(d);
    }, d.prototype.isInFullScreen = function() {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), 
        d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, 
        !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, 
        !1) : !0;
    }, d.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d;
}(window.Zepto || window.jQuery, window, document), function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), 
        this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                this.swapping = "translated" == a.type;
            }, this),
            "translate.owl.carousel": a.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
            }, this)
        }, this.core.$element.on(this.handlers);
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), 
            d.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), 
            f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c));
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), 
        this.core.transitionEnd();
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
}(window.Zepto || window.jQuery, window, document), function(a, b, c) {
    var d = function(b) {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), 
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                this.autoplay();
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                this.play(b, c);
            }, this),
            "stop.owl.autoplay": a.proxy(function() {
                this.stop();
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause();
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay();
            }, this)
        }, this.core.$element.on(this.handlers);
    };
    d.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, d.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), 
        this.interval = b.setInterval(a.proxy(function() {
            this.play();
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval);
    }, d.prototype.play = function() {
        return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed);
    }, d.prototype.stop = function() {
        b.clearInterval(this.interval);
    }, d.prototype.pause = function() {
        b.clearInterval(this.interval);
    }, d.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d;
}(window.Zepto || window.jQuery, window, document), function(a) {
    "use strict";
    var b = function(c) {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], 
        this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"));
            }, this),
            "add.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"));
            }, this),
            "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
                this._core.settings.dotsData && this._templates.splice(a.position, 1);
            }, this),
            "change.owl.carousel": a.proxy(function(a) {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var b = this._core.current(), c = this._core.maximum(), d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value;
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && this.draw();
            }, this),
            "refreshed.owl.carousel": a.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), 
                this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation");
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers);
    };
    b.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: [ "prev", "next" ],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: [ "owl-prev", "owl-next" ],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, b.prototype.initialize = function() {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [ a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML") ]), 
        d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), 
        this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), 
        this._controls.$indicators.on("click", "div", a.proxy(function(b) {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed);
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), 
        this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), 
        this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
            this.prev(d.navSpeed);
        }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
            this.next(d.navSpeed);
        }, this));
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
    }, b.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
    }, b.prototype.update = function() {
        var a, b, c, d = this._core.settings, e = this._core.clones().length / 2, f = e + this._core.items().length, g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy) for (this._pages = [], 
        a = e, b = 0, c = 0; f > a; a++) (b >= g || 0 === b) && (this._pages.push({
            start: a - e,
            end: a - e + g - 1
        }), b = 0, ++c), b += this._core.mergers(this._core.relative(a));
    }, b.prototype.draw = function() {
        var b, c, d = "", e = this._core.settings, f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), 
        this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), 
        this._controls.$next.toggle(e.nav), e.dots) {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d);
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active");
        }
        this._controls.$indicators.toggle(e.dots);
    }, b.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
        };
    }, b.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, function(a) {
            return a.start <= b && a.end >= b;
        }).pop();
    }, b.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, 
        b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), 
        d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
    }, b.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
    }, b.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
    }, b.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c));
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b;
}(window.Zepto || window.jQuery, window, document), function(a, b) {
    "use strict";
    var c = function(d) {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content;
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), 
        a(b).on("hashchange.owl.navigation", a.proxy(function() {
            var a = b.location.hash.substring(1), c = this._core.$stage.children(), d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1;
        }, this));
    };
    c.Defaults = {
        URLhashListener: !1
    }, c.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c;
}(window.Zepto || window.jQuery, window, document);

/*!


 * parallax.js v1.3.1 (http://pixelcog.github.io/parallax.js/)


 * @copyright 2015 PixelCog, Inc.


 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)


 */
!function(t, i, e, s) {
    function o(i, e) {
        var h = this;
        "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), 
        this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        return r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), ("top" == r[0] || "bottom" == r[0] || "left" == r[1] || "right" == r[1]) && (r = [ r[1], r[0] ]), 
        this.positionX != s && (r[0] = this.positionX.toLowerCase()), this.positionY != s && (r[1] = this.positionY.toLowerCase()), 
        h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), 
        "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), 
        this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), 
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), 
        this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function() {
            h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, 
            h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, 
            o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender();
        }), this.$slider[0].src = this.imageSrc, void ((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")));
    }
    function h(s) {
        return this.each(function() {
            var h = t(this), r = "object" == typeof s && s;
            this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") || (r = t.extend({}, h.data(), r), 
            h.data("px.parallax", new o(this, r))), "string" == typeof s && o[s]();
        });
    }
    !function() {
        for (var t = 0, e = [ "ms", "moz", "webkit", "o" ], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], 
        i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
        i.requestAnimationFrame || (i.requestAnimationFrame = function(e) {
            var s = new Date().getTime(), o = Math.max(0, 16 - (s - t)), h = i.setTimeout(function() {
                e(s + o);
            }, o);
            return t = s + o, h;
        }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function(t) {
            clearTimeout(t);
        });
    }(), t.extend(o.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        refresh: function() {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, 
            this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, 
            this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var t = o.winHeight, i = o.docHeight, e = Math.min(this.boxOffsetTop, i - t), s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0), h = this.boxHeight + (e - s) * (1 - this.speed) | 0, r = (this.boxOffsetTop - e) * (1 - this.speed) | 0;
            if (h * this.aspectRatio >= this.boxWidth) {
                this.imageWidth = h * this.aspectRatio | 0, this.imageHeight = h, this.offsetBaseTop = r;
                var n = this.imageWidth - this.boxWidth;
                this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -n : isNaN(this.positionX) ? -n / 2 | 0 : Math.max(this.positionX, -n);
            } else {
                this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, 
                this.offsetLeft = 0;
                var n = this.imageHeight - h;
                this.offsetBaseTop = "top" == this.positionY ? r : "bottom" == this.positionY ? r - n : isNaN(this.positionY) ? r - n / 2 | 0 : r + Math.max(this.positionY, -n);
            }
        },
        render: function() {
            var t = o.scrollTop, i = o.scrollLeft, e = this.overScrollFix ? o.overScroll : 0, s = t + o.winHeight;
            this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < s ? "visible" : "hidden", 
            this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, 
            this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
                transform: "translate3d(0px, 0px, 0px)",
                visibility: this.visibility,
                top: this.mirrorTop - e,
                left: this.mirrorLeft,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                transform: "translate3d(0px, 0px, 0px)",
                position: "absolute",
                top: this.offsetTop,
                left: this.offsetLeft,
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: "none"
            });
        }
    }), t.extend(o, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function() {
            if (!this.isReady) {
                var s = t(e), h = t(i);
                h.on("scroll.px.parallax load.px.parallax", function() {
                    var t = o.docHeight - o.winHeight, i = o.docWidth - o.winWidth;
                    o.scrollTop = Math.max(0, Math.min(t, h.scrollTop())), o.scrollLeft = Math.max(0, Math.min(i, h.scrollLeft())), 
                    o.overScroll = Math.max(h.scrollTop() - t, Math.min(h.scrollTop(), 0)), o.requestRender();
                }).on("resize.px.parallax load.px.parallax", function() {
                    o.winHeight = h.height(), o.winWidth = h.width(), o.docHeight = s.height(), o.docWidth = s.width(), 
                    o.isFresh = !1, o.requestRender();
                }), this.isReady = !0;
            }
        },
        configure: function(i) {
            "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i));
        },
        refresh: function() {
            t.each(this.sliders, function() {
                this.refresh();
            }), this.isFresh = !0;
        },
        render: function() {
            this.isFresh || this.refresh(), t.each(this.sliders, function() {
                this.render();
            });
        },
        requestRender: function() {
            var t = this;
            this.isBusy || (this.isBusy = !0, i.requestAnimationFrame(function() {
                t.render(), t.isBusy = !1;
            }));
        }
    });
    var r = t.fn.parallax;
    t.fn.parallax = h, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function() {
        return t.fn.parallax = r, this;
    }, t(e).on("ready.px.parallax.data-api", function() {
        t('[data-parallax="scroll"]').parallax();
    });
}(jQuery, window, document);

/*! skrollr 0.6.30 (2015-08-12) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
!function(a, b, c) {
    "use strict";
    function d(c) {
        if (e = b.documentElement, f = b.body, T(), ha = this, c = c || {}, ma = c.constants || {}, 
        c.easing) for (var d in c.easing) W[d] = c.easing[d];
        ta = c.edgeStrategy || "set", ka = {
            beforerender: c.beforerender,
            render: c.render,
            keyframe: c.keyframe
        }, la = c.forceHeight !== !1, la && (Ka = c.scale || 1), na = c.mobileDeceleration || y, 
        pa = c.smoothScrolling !== !1, qa = c.smoothScrollingDuration || A, ra = {
            targetTop: ha.getScrollTop()
        }, Sa = (c.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || a.opera);
        })(), Sa ? (ja = b.getElementById(c.skrollrBody || z), ja && ga(), X(), Ea(e, [ s, v ], [ t ])) : Ea(e, [ s, u ], [ t ]), 
        ha.refresh(), wa(a, "resize orientationchange", function() {
            var a = e.clientWidth, b = e.clientHeight;
            (b !== Pa || a !== Oa) && (Pa = b, Oa = a, Qa = !0);
        });
        var g = U();
        return function h() {
            $(), va = g(h);
        }(), ha;
    }
    var e, f, g = {
        get: function() {
            return ha;
        },
        init: function(a) {
            return ha || new d(a);
        },
        VERSION: "0.6.30"
    }, h = Object.prototype.hasOwnProperty, i = a.Math, j = a.getComputedStyle, k = "touchstart", l = "touchmove", m = "touchcancel", n = "touchend", o = "skrollable", p = o + "-before", q = o + "-between", r = o + "-after", s = "skrollr", t = "no-" + s, u = s + "-desktop", v = s + "-mobile", w = "linear", x = 1e3, y = .004, z = "skrollr-body", A = 200, B = "start", C = "end", D = "center", E = "bottom", F = "___skrollable_id", G = /^(?:input|textarea|button|select)$/i, H = /^\s+|\s+$/g, I = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, J = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, K = /^(@?[a-z\-]+)\[(\w+)\]$/, L = /-([a-z0-9_])/g, M = function(a, b) {
        return b.toUpperCase();
    }, N = /[\-+]?[\d]*\.?[\d]+/g, O = /\{\?\}/g, P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, Q = /[a-z\-]+-gradient/g, R = "", S = "", T = function() {
        var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (j) {
            var b = j(f, null);
            for (var c in b) if (R = c.match(a) || +c == c && b[c].match(a)) break;
            if (!R) return void (R = S = "");
            R = R[0], "-" === R.slice(0, 1) ? (S = R, R = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            }[R]) : S = "-" + R.toLowerCase() + "-";
        }
    }, U = function() {
        var b = a.requestAnimationFrame || a[R.toLowerCase() + "RequestAnimationFrame"], c = Ha();
        return (Sa || !b) && (b = function(b) {
            var d = Ha() - c, e = i.max(0, 1e3 / 60 - d);
            return a.setTimeout(function() {
                c = Ha(), b();
            }, e);
        }), b;
    }, V = function() {
        var b = a.cancelAnimationFrame || a[R.toLowerCase() + "CancelAnimationFrame"];
        return (Sa || !b) && (b = function(b) {
            return a.clearTimeout(b);
        }), b;
    }, W = {
        begin: function() {
            return 0;
        },
        end: function() {
            return 1;
        },
        linear: function(a) {
            return a;
        },
        quadratic: function(a) {
            return a * a;
        },
        cubic: function(a) {
            return a * a * a;
        },
        swing: function(a) {
            return -i.cos(a * i.PI) / 2 + .5;
        },
        sqrt: function(a) {
            return i.sqrt(a);
        },
        outCubic: function(a) {
            return i.pow(a - 1, 3) + 1;
        },
        bounce: function(a) {
            var b;
            if (.5083 >= a) b = 3; else if (.8489 >= a) b = 9; else if (.96208 >= a) b = 27; else {
                if (!(.99981 >= a)) return 1;
                b = 91;
            }
            return 1 - i.abs(3 * i.cos(a * b * 1.028) / b);
        }
    };
    d.prototype.refresh = function(a) {
        var d, e, f = !1;
        for (a === c ? (f = !0, ia = [], Ra = 0, a = b.getElementsByTagName("*")) : a.length === c && (a = [ a ]), 
        d = 0, e = a.length; e > d; d++) {
            var g = a[d], h = g, i = [], j = pa, k = ta, l = !1;
            if (f && F in g && delete g[F], g.attributes) {
                for (var m = 0, n = g.attributes.length; n > m; m++) {
                    var p = g.attributes[m];
                    if ("data-anchor-target" !== p.name) if ("data-smooth-scrolling" !== p.name) if ("data-edge-strategy" !== p.name) if ("data-emit-events" !== p.name) {
                        var q = p.name.match(I);
                        if (null !== q) {
                            var r = {
                                props: p.value,
                                element: g,
                                eventType: p.name.replace(L, M)
                            };
                            i.push(r);
                            var s = q[1];
                            s && (r.constant = s.substr(1));
                            var t = q[2];
                            /p$/.test(t) ? (r.isPercentage = !0, r.offset = (0 | t.slice(0, -1)) / 100) : r.offset = 0 | t;
                            var u = q[3], v = q[4] || u;
                            u && u !== B && u !== C ? (r.mode = "relative", r.anchors = [ u, v ]) : (r.mode = "absolute", 
                            u === C ? r.isEnd = !0 : r.isPercentage || (r.offset = r.offset * Ka));
                        }
                    } else l = !0; else k = p.value; else j = "off" !== p.value; else if (h = b.querySelector(p.value), 
                    null === h) throw 'Unable to find anchor target "' + p.value + '"';
                }
                if (i.length) {
                    var w, x, y;
                    !f && F in g ? (y = g[F], w = ia[y].styleAttr, x = ia[y].classAttr) : (y = g[F] = Ra++, 
                    w = g.style.cssText, x = Da(g)), ia[y] = {
                        element: g,
                        styleAttr: w,
                        classAttr: x,
                        anchorTarget: h,
                        keyFrames: i,
                        smoothScrolling: j,
                        edgeStrategy: k,
                        emitEvents: l,
                        lastFrameIndex: -1
                    }, Ea(g, [ o ], []);
                }
            }
        }
        for (Aa(), d = 0, e = a.length; e > d; d++) {
            var z = ia[a[d][F]];
            z !== c && (_(z), ba(z));
        }
        return ha;
    }, d.prototype.relativeToAbsolute = function(a, b, c) {
        var d = e.clientHeight, f = a.getBoundingClientRect(), g = f.top, h = f.bottom - f.top;
        return b === E ? g -= d : b === D && (g -= d / 2), c === E ? g += h : c === D && (g += h / 2), 
        g += ha.getScrollTop(), g + .5 | 0;
    }, d.prototype.animateTo = function(a, b) {
        b = b || {};
        var d = Ha(), e = ha.getScrollTop(), f = b.duration === c ? x : b.duration;
        return oa = {
            startTop: e,
            topDiff: a - e,
            targetTop: a,
            duration: f,
            startTime: d,
            endTime: d + f,
            easing: W[b.easing || w],
            done: b.done
        }, oa.topDiff || (oa.done && oa.done.call(ha, !1), oa = c), ha;
    }, d.prototype.stopAnimateTo = function() {
        oa && oa.done && oa.done.call(ha, !0), oa = c;
    }, d.prototype.isAnimatingTo = function() {
        return !!oa;
    }, d.prototype.isMobile = function() {
        return Sa;
    }, d.prototype.setScrollTop = function(b, c) {
        return sa = c === !0, Sa ? Ta = i.min(i.max(b, 0), Ja) : a.scrollTo(0, b), ha;
    }, d.prototype.getScrollTop = function() {
        return Sa ? Ta : a.pageYOffset || e.scrollTop || f.scrollTop || 0;
    }, d.prototype.getMaxScrollTop = function() {
        return Ja;
    }, d.prototype.on = function(a, b) {
        return ka[a] = b, ha;
    }, d.prototype.off = function(a) {
        return delete ka[a], ha;
    }, d.prototype.destroy = function() {
        var a = V();
        a(va), ya(), Ea(e, [ t ], [ s, u, v ]);
        for (var b = 0, d = ia.length; d > b; b++) fa(ia[b].element);
        e.style.overflow = f.style.overflow = "", e.style.height = f.style.height = "", 
        ja && g.setStyle(ja, "transform", "none"), ha = c, ja = c, ka = c, la = c, Ja = 0, 
        Ka = 1, ma = c, na = c, La = "down", Ma = -1, Oa = 0, Pa = 0, Qa = !1, oa = c, pa = c, 
        qa = c, ra = c, sa = c, Ra = 0, ta = c, Sa = !1, Ta = 0, ua = c;
    };
    var X = function() {
        var d, g, h, j, o, p, q, r, s, t, u, v;
        wa(e, [ k, l, m, n ].join(" "), function(a) {
            var e = a.changedTouches[0];
            for (j = a.target; 3 === j.nodeType; ) j = j.parentNode;
            switch (o = e.clientY, p = e.clientX, t = a.timeStamp, G.test(j.tagName) || a.preventDefault(), 
            a.type) {
              case k:
                d && d.blur(), ha.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                break;

              case l:
                G.test(j.tagName) && b.activeElement !== j && a.preventDefault(), r = o - q, v = t - u, 
                ha.setScrollTop(Ta - r, !0), q = o, u = t;
                break;

              default:
              case m:
              case n:
                var f = g - o, w = h - p, x = w * w + f * f;
                if (49 > x) {
                    if (!G.test(d.tagName)) {
                        d.focus();
                        var y = b.createEvent("MouseEvents");
                        y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), 
                        d.dispatchEvent(y);
                    }
                    return;
                }
                d = c;
                var z = r / v;
                z = i.max(i.min(z, 3), -3);
                var A = i.abs(z / na), B = z * A + .5 * na * A * A, C = ha.getScrollTop() - B, D = 0;
                C > Ja ? (D = (Ja - C) / B, C = Ja) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, 
                ha.animateTo(C + .5 | 0, {
                    easing: "outCubic",
                    duration: A
                });
            }
        }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden";
    }, Y = function() {
        var a, b, c, d, f, g, h, j, k, l, m, n = e.clientHeight, o = Ba();
        for (j = 0, k = ia.length; k > j; j++) for (a = ia[j], b = a.element, c = a.anchorTarget, 
        d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], l = h.offset, m = o[h.constant] || 0, 
        h.frame = l, h.isPercentage && (l *= n, h.frame = l), "relative" === h.mode && (fa(b), 
        h.frame = ha.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, fa(b, !0)), 
        h.frame += m, la && !h.isEnd && h.frame > Ja && (Ja = h.frame);
        for (Ja = i.max(Ja, Ca()), j = 0, k = ia.length; k > j; j++) {
            for (a = ia[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], m = o[h.constant] || 0, 
            h.isEnd && (h.frame = Ja - h.offset + m);
            a.keyFrames.sort(Ia);
        }
    }, Z = function(a, b) {
        for (var c = 0, d = ia.length; d > c; c++) {
            var e, f, i = ia[c], j = i.element, k = i.smoothScrolling ? a : b, l = i.keyFrames, m = l.length, n = l[0], s = l[l.length - 1], t = k < n.frame, u = k > s.frame, v = t ? n : s, w = i.emitEvents, x = i.lastFrameIndex;
            if (t || u) {
                if (t && -1 === i.edge || u && 1 === i.edge) continue;
                switch (t ? (Ea(j, [ p ], [ r, q ]), w && x > -1 && (za(j, n.eventType, La), i.lastFrameIndex = -1)) : (Ea(j, [ r ], [ p, q ]), 
                w && m > x && (za(j, s.eventType, La), i.lastFrameIndex = m)), i.edge = t ? -1 : 1, 
                i.edgeStrategy) {
                  case "reset":
                    fa(j);
                    continue;

                  case "ease":
                    k = v.frame;
                    break;

                  default:
                  case "set":
                    var y = v.props;
                    for (e in y) h.call(y, e) && (f = ea(y[e].value), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f));
                    continue;
                }
            } else 0 !== i.edge && (Ea(j, [ o, q ], [ p, r ]), i.edge = 0);
            for (var z = 0; m - 1 > z; z++) if (k >= l[z].frame && k <= l[z + 1].frame) {
                var A = l[z], B = l[z + 1];
                for (e in A.props) if (h.call(A.props, e)) {
                    var C = (k - A.frame) / (B.frame - A.frame);
                    C = A.props[e].easing(C), f = da(A.props[e].value, B.props[e].value, C), f = ea(f), 
                    0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f);
                }
                w && x !== z && ("down" === La ? za(j, A.eventType, La) : za(j, B.eventType, La), 
                i.lastFrameIndex = z);
                break;
            }
        }
    }, $ = function() {
        Qa && (Qa = !1, Aa());
        var a, b, d = ha.getScrollTop(), e = Ha();
        if (oa) e >= oa.endTime ? (d = oa.targetTop, a = oa.done, oa = c) : (b = oa.easing((e - oa.startTime) / oa.duration), 
        d = oa.startTop + b * oa.topDiff | 0), ha.setScrollTop(d, !0); else if (!sa) {
            var f = ra.targetTop - d;
            f && (ra = {
                startTop: Ma,
                topDiff: d - Ma,
                targetTop: d,
                startTime: Na,
                endTime: Na + qa
            }), e <= ra.endTime && (b = W.sqrt((e - ra.startTime) / qa), d = ra.startTop + b * ra.topDiff | 0);
        }
        if (sa || Ma !== d) {
            La = d > Ma ? "down" : Ma > d ? "up" : La, sa = !1;
            var h = {
                curTop: d,
                lastTop: Ma,
                maxTop: Ja,
                direction: La
            }, i = ka.beforerender && ka.beforerender.call(ha, h);
            i !== !1 && (Z(d, ha.getScrollTop()), Sa && ja && g.setStyle(ja, "transform", "translate(0, " + -Ta + "px) " + ua), 
            Ma = d, ka.render && ka.render.call(ha, h)), a && a.call(ha, !1);
        }
        Na = e;
    }, _ = function(a) {
        for (var b = 0, c = a.keyFrames.length; c > b; b++) {
            for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = J.exec(h.props)); ) f = g[1], 
            e = g[2], d = f.match(K), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? aa(e) : [ e.slice(1) ], 
            i[f] = {
                value: e,
                easing: W[d]
            };
            h.props = i;
        }
    }, aa = function(a) {
        var b = [];
        return P.lastIndex = 0, a = a.replace(P, function(a) {
            return a.replace(N, function(a) {
                return a / 255 * 100 + "%";
            });
        }), S && (Q.lastIndex = 0, a = a.replace(Q, function(a) {
            return S + a;
        })), a = a.replace(N, function(a) {
            return b.push(+a), "{?}";
        }), b.unshift(a), b;
    }, ba = function(a) {
        var b, c, d = {};
        for (b = 0, c = a.keyFrames.length; c > b; b++) ca(a.keyFrames[b], d);
        for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) ca(a.keyFrames[b], d);
    }, ca = function(a, b) {
        var c;
        for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
        for (c in a.props) b[c] = a.props[c];
    }, da = function(a, b, c) {
        var d, e = a.length;
        if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
        var f = [ a[0] ];
        for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
        return f;
    }, ea = function(a) {
        var b = 1;
        return O.lastIndex = 0, a[0].replace(O, function() {
            return a[b++];
        });
    }, fa = function(a, b) {
        a = [].concat(a);
        for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = ia[d[F]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, 
        Ea(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Da(d), 
        d.style.cssText = c.styleAttr, Ea(d, c.classAttr)));
    }, ga = function() {
        ua = "translateZ(0)", g.setStyle(ja, "transform", ua);
        var a = j(ja), b = a.getPropertyValue("transform"), c = a.getPropertyValue(S + "transform"), d = b && "none" !== b || c && "none" !== c;
        d || (ua = "");
    };
    g.setStyle = function(a, b, c) {
        var d = a.style;
        if (b = b.replace(L, M).replace("-", ""), "zIndex" === b) isNaN(c) ? d[b] = c : d[b] = "" + (0 | c); else if ("float" === b) d.styleFloat = d.cssFloat = c; else try {
            R && (d[R + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c;
        } catch (e) {}
    };
    var ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa = g.addEvent = function(b, c, d) {
        var e = function(b) {
            return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() {
                b.returnValue = !1, b.defaultPrevented = !0;
            }), d.call(this, b);
        };
        c = c.split(" ");
        for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), 
        Ua.push({
            element: b,
            name: f,
            listener: d
        });
    }, xa = g.removeEvent = function(a, b, c) {
        b = b.split(" ");
        for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c);
    }, ya = function() {
        for (var a, b = 0, c = Ua.length; c > b; b++) a = Ua[b], xa(a.element, a.name, a.listener);
        Ua = [];
    }, za = function(a, b, c) {
        ka.keyframe && ka.keyframe.call(ha, a, b, c);
    }, Aa = function() {
        var a = ha.getScrollTop();
        Ja = 0, la && !Sa && (f.style.height = ""), Y(), la && !Sa && (f.style.height = Ja + e.clientHeight + "px"), 
        Sa ? ha.setScrollTop(i.min(ha.getScrollTop(), Ja)) : ha.setScrollTop(a, !0), sa = !0;
    }, Ba = function() {
        var a, b, c = e.clientHeight, d = {};
        for (a in ma) b = ma[a], "function" == typeof b ? b = b.call(ha) : /p$/.test(b) && (b = b.slice(0, -1) / 100 * c), 
        d[a] = b;
        return d;
    }, Ca = function() {
        var a, b = 0;
        return ja && (b = i.max(ja.offsetHeight, ja.scrollHeight)), a = i.max(b, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight), 
        a - e.clientHeight;
    }, Da = function(b) {
        var c = "className";
        return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c];
    }, Ea = function(b, d, e) {
        var f = "className";
        if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"), e === c) return void (b[f] = d);
        for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Ga(g).replace(Ga(e[h]), " ");
        g = Fa(g);
        for (var j = 0, k = d.length; k > j; j++) -1 === Ga(g).indexOf(Ga(d[j])) && (g += " " + d[j]);
        b[f] = Fa(g);
    }, Fa = function(a) {
        return a.replace(H, "");
    }, Ga = function(a) {
        return " " + a + " ";
    }, Ha = Date.now || function() {
        return +new Date();
    }, Ia = function(a, b) {
        return a.frame - b.frame;
    }, Ja = 0, Ka = 1, La = "down", Ma = -1, Na = Ha(), Oa = 0, Pa = 0, Qa = !1, Ra = 0, Sa = !1, Ta = 0, Ua = [];
    "function" == typeof define && define.amd ? define([], function() {
        return g;
    }) : "undefined" != typeof module && module.exports ? module.exports = g : a.skrollr = g;
}(window, document);