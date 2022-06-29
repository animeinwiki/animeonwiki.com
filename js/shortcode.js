function shortCodeIfy(e,t,a){for(var o=e.split("$"),s=/[^{\}]+(?=})/g,r=0;r<o.length;r++){var i=o[r].split("=");if(i[0].trim()==t)return null!=(a=i[1]).match(s)&&String(a.match(s)).trim()}return!1}function msgError(){return'<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'}function beforeLoader(){return'<div class="loader"></div>'}function getFeedUrl(e,t,a,o){switch(a){case"recent":o="/feeds/posts/default?alt=json&max-results="+t;break;case"comments":o="list1"==e?"/feeds/comments/default?alt=json&max-results="+t:"/feeds/posts/default/-/"+a+"?alt=json&max-results="+t;break;default:o="/feeds/posts/default/-/"+a+"?alt=json&max-results="+t}return o}function getPostLink(e,t){for(var a=0;a<e[t].link.length;a++)if("alternate"==e[t].link[a].rel){var o=e[t].link[a].href;break}return o}function getPostTitle(e,t,a){return e[t].title.$t?e[t].title.$t:exportify.noTitle}function getFirstImage(e,t){var a=$("<div>").html(e).find("img:first").attr("src"),o=a.lastIndexOf("/")||0,s=a.lastIndexOf("/",o-1)||0,r=a.substring(0,s),i=a.substring(s,o),n=a.substring(o);return(i.match(/\/s[0-9]+/g)||i.match(/\/w[0-9]+/g)||"/d"==i)&&(i="/w72-h72-p-k-no-nu"),r+i+n}function getPostImage(e,t,a,o){var s=e[t].content.$t;return a=e[t].media$thumbnail?e[t].media$thumbnail.url:"https://resources.blogblog.com/img/blank.gif",s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))>-1?s.indexOf("<img")>-1?s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))<s.indexOf("<img")?a.replace("/default.","/maxresdefault."):getFirstImage(s):a.replace("/default.","/maxresdefault."):s.indexOf("<img")>-1?getFirstImage(s):"https://resources.blogblog.com/img/blank.gif"}function getPostImageType(e,t){return e.match("img.youtube.com")?"is-video":"is-image"}function getPostComments(e,t,a,o){var s=e[t].author[0].name.$t,r=e[t].author[0].gd$image.src.replace("/s113","/w35-h35-p-k-no-nu"),i=e[t].title.$t;return(r.match("//img1.blogblog.com/img/blank.gif")||r.match("//img1.blogblog.com/img/b16-rounded.gif"))&&(r="//lh3.googleusercontent.com/-NnKlkUHljk8/Yq7NY3-lzuI/AAAAAAAAF4I/vPx7WDRVG6M6lhcLX5FcRA0qCAiCAW1CwCNcBGAsYHQ/w35-h35-p-k-no-nu/avatar.jpg"),'<div class="cmm1-item item-'+t+'"><a class="entry-inner wrap-all-link" href="'+a+'" title="'+s+'"><span class="entry-image-wrap cmm-avatar"><span class="entry-thumb" data-image="'+r+'"></span></span><div class="entry-header"><h2 class="entry-title cmm-title">'+s+'</h2><p class="cmm-snippet excerpt">'+i+"</p></div></a></div>"}function getAjax(e,t,a,o){switch(t){case"msimple":case"list1":case"related":0==o&&(o="geterror404");var s=getFeedUrl(t,a,o);$.ajax({url:s,type:"GET",dataType:"json",cache:!0,beforeSend:function(a){switch(t){case"list1":e.html(beforeLoader());break;case"related":e.html(beforeLoader()).parent().addClass("show-ify")}},success:function(a){var s="";switch(t){case"msimple":s='<div class="ul mega-items">';break;case"list1":s="comments"!=o?'<div class="list1-items sidebar-posts">':'<div class="cmm1-items">';break;case"related":s='<div class="related-posts">'}var r=a.feed.entry;if(null!=r)for(var i=0,n=r;i<n.length;i++){var l=getPostLink(n,i),c=getPostTitle(n,i),d=getPostImage(n,i),m=getPostImageType(d,i),h="";switch(t){case"msimple":h+='<div class="mega-item post"><div class="mega-content"><a title="'+c+'" class="entry-image-wrap '+m+'" href="'+l+'"><span class="entry-thumb" data-image="'+d+'"></span></a><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2></div></div>";break;case"list1":switch(o){case"comments":h+=getPostComments(n,i,l);break;default:h+='<div class="list1-item post item-'+i+'"><a title="'+c+'" class="entry-image-wrap '+m+'" href="'+l+'"><span class="entry-thumb" data-image="'+d+'"/></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2></div></div>"}break;case"related":h+='<div class="related-item post item-'+i+'"><a title="'+c+'" class="entry-image-wrap '+m+'" href="'+l+'"><span class="entry-thumb" data-image="'+d+'"></span></a><div class="entry-header"><h2 class="entry-title"><a href="'+l+'" title="'+c+'">'+c+"</a></h2></div></div>"}s+=h}else switch(t){case"msimple":s='<div class="ul mega-items no-items">'+msgError()+"</div>";break;default:s=msgError()}switch(t){case"msimple":s+="</div>",e.append(s).addClass("msimple"),e.find("a:first").attr("href",function(e,t){switch(o){case"recent":t=t.replace(t,"/search");break;default:t=t.replace(t,"/search/label/"+o)}return t});break;default:s+="</div>",e.html(s)}e.find("span.entry-thumb").lazyify()},error:function(){switch(t){case"msimple":e.append('<div class="ul mega-items no-items">'+msgError()+"</div>");break;default:e.html(msgError())}}})}}function ajaxMega(e,t,a,o,s){if(s.match("getmega")){if("msimple"==t)return getAjax(e,t,a,o);e.append('<div class="ul mega-items no-items">'+msgError()+"</div>")}}function ajaxWidget(e,t,a,o,s){if(s.match("getwidget")){if("list1"==t)return getAjax(e,t,a,o);e.html(msgError())}}function ajaxRelated(e,t,a,o,s){if(s.match("getrelated"))return getAjax(e,t,a,o)}function fixedSidebarIfy(){$("#main-wrapper, #sidebar-wrapper").each(function(){1==fixedSidebar&&$(this).theiaStickySidebarIfy({containerSelector:"#content-wrapper > .container",additionalMarginTop:20,additionalMarginBottom:20})})}function disqusComments(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//"+e+".disqus.com/blogger_item.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)}function beautiAvatar(e){$(e).attr("src",function(e,t){return t=t.replace("//resources.blogblog.com/img/blank.gif","https://resources.blogblog.com/img/blank.gif")})}$("#seopro-pro-main-nav").menuify(),$("#seopro-pro-main-nav .widget").addClass("show-menu"),$(".show-search").on("click",function(){$("body").addClass("search-active"),$("#main-search-wrap").fadeIn(170).find("input").focus()}),$(".hide-search").on("click",function(){$("body").removeClass("search-active"),$("#main-search-wrap").fadeOut(170).find("input").val("").blur()}),$("html").each(function(){var e=$(this);1!=darkMode&&0!=userDarkMode&&("dark"==localStorage.themeColor&&e.addClass("is-dark"),$(".darkmode-toggle").on("click",function(){"dark"!=localStorage.themeColor?(e.addClass("is-dark"),localStorage.themeColor="dark"):(e.removeClass("is-dark"),localStorage.themeColor="light")}))}),$(".FollowByEmail .widget-content").each(function(e,t){var a=$(this),o=a.data("shortcode");null!=o&&(e=shortCodeIfy(o,"title"),t=shortCodeIfy(o,"text"),0!=e&&a.find(".follow-by-email-title").text(e),0!=t&&a.find(".follow-by-email-text").text(t))}),$(".post-body a").each(function(){var e=$(this),t=e.html(),a=t.toLowerCase(),o=shortCodeIfy(t,"text"),s=shortCodeIfy(t,"icon"),r=shortCodeIfy(t,"color");a.match("getbutton")&&0!=o&&(e.addClass("button btn").text(o),0!=s&&e.addClass(s),0!=r&&e.addClass("colored-button").attr("style","background-color:"+r+";"))}),$(".post-body b").each(function(){var e=$(this),t=e.text(),a=t.toLowerCase().trim();a.match(/(?:\$ads\=\{1\})/g)&&e.replaceWith('<div id="seopro-pro-new-before-ad"/>'),a.match(/(?:\$ads\=\{2\})/g)&&e.replaceWith('<div id="seopro-pro-new-after-ad"/>'),a.match("{tocify}")&&(t=0!=shortCodeIfy(t,"title")?shortCodeIfy(t,"title"):"Table of Contents",e.replaceWith('<div class="tocify-wrap"><div class="tocify-inner"><a href="javascript:;" class="tocify-title" role="button" title="'+t+'">'+t+'</a><ol id="tocify"></ol></div></div>'),$(".tocify-title").each(function(e){(e=$(this)).on("click",function(){e.toggleClass("is-expanded"),$("#tocify").slideToggle(170)})}),$("#tocify").toc({content:"#post-body",headings:"h2,h3,h4"}),$("#tocify li a").each(function(e){(e=$(this)).click(function(){return $("html,body").animate({scrollTop:$(e.attr("href")).offset().top-20},500),!1})})),a.match("{contactform}")&&(e.replaceWith('<div class="contact-form"/>'),$(".contact-form").append($("#ContactForm1"))),a.match("{leftsidebar}")&&e.replaceWith("<style>#main-wrapper,.is-left #main-wrapper{float:right}#sidebar-wrapper,.is-left #sidebar-wrapper{float:left}</style>"),a.match("{rightsidebar}")&&e.replaceWith("<style>#main-wrapper,.is-left #main-wrapper{float:left}#sidebar-wrapper,.is-left #sidebar-wrapper{float:right}</style>"),a.match("{fullwidth}")&&e.replaceWith("<style>.is-single #main-wrapper{width:100%}.is-single #sidebar-wrapper{display:none}</style>")}),$("#seopro-pro-new-before-ad").each(function(){var e=$(this);e.length&&$("#before-ad").appendTo(e)}),$("#seopro-pro-new-after-ad").each(function(){var e=$(this);e.length&&$("#after-ad").appendTo(e)}),$("#seopro-pro-main-before-ad .widget").each(function(){var e=$(this);e.length&&e.appendTo($("#before-ad"))}),$("#seopro-pro-main-after-ad .widget").each(function(){var e=$(this);e.length&&e.appendTo($("#after-ad"))}),$(".post-body blockquote").each(function(){var e=$(this),t=e.text().toLowerCase().trim(),a=e.html();if(t.match("{alertsuccess}")){const t=a.replace("{alertSuccess}","");e.replaceWith('<div class="alert-message alert-success">'+t+"</div>")}if(t.match("{alertinfo}")){const t=a.replace("{alertInfo}","");e.replaceWith('<div class="alert-message alert-info">'+t+"</div>")}if(t.match("{alertwarning}")){const t=a.replace("{alertWarning}","");e.replaceWith('<div class="alert-message alert-warning">'+t+"</div>")}if(t.match("{alerterror}")){const t=a.replace("{alertError}","");e.replaceWith('<div class="alert-message alert-error">'+t+"</div>")}if(t.match("{codebox}")){const t=a.replace("{codeBox}","");e.replaceWith('<pre class="code-box">'+t+"</pre>")}}),$(".seopro-pro-share-links .window-ify").on("click",function(){var e=$(this),t=e.data("url"),a=e.data("width"),o=e.data("height"),s=window.screen.width,r=window.screen.height,i=Math.round(s/2-a/2),n=Math.round(r/2-o/2);window.open(t,"_blank","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width="+a+",height="+o+",left="+i+",top="+n).focus()}),$(".seopro-pro-share-links").each(function(){var e=$(this);e.find(".show-hid a").on("click",function(){e.toggleClass("show-hidden")})}),$(".about-author .author-text").each(function(){var e=$(this),t=e.find("a");t.each(function(){var e=$(this),t=e.text().trim(),a=e.attr("href");e.replaceWith('<li class="'+t+'"><a href="'+a+'" title="'+t+'" rel="noopener noreferrer" target="_blank"/></li>')}),t.length&&e.parent().append('<ul class="author-links social social-color"></ul>'),e.find("li").appendTo(".author-links")}),$("#seopro-pro-main-nav-menu li.mega-menu").each(function(e,t){var a=$(this),o=a.find("a").data("shortcode");null!=o&&(e=o.toLowerCase(),ajaxMega(a,"msimple",5,shortCodeIfy(o,"label"),e))}),$(".seopro-pro-widget-ready .HTML .widget-content").each(function(e,t,a){var o=$(this),s=$(window),r=o.data("shortcode");null!=r&&(e=r.toLowerCase(),t=shortCodeIfy(r,"results"),a=shortCodeIfy(r,"label"),s.on("scroll",function r(){s.scrollTop()+s.height()>=o.offset().top&&(s.off("scroll",r),ajaxWidget(o,"list1",t,a,e))}).trigger("scroll"))}),$("#seopro-pro-related-posts .HTML").each(function(e,t){var a=$(this).data("shortcode");if(null!=a){function o(){return e=shortCodeIfy(a,"title"),t=shortCodeIfy(a,"results"),[e,t]}$("#related-wrap").each(function(e,t){var a=$(this),s=$(window),r=a.find(".seopro-pro-related-content"),i=o();e=0!=i[1]?i[1]:3,0!=i[0]&&a.find(".related-title .title").text(i[0]),t=a.find(".related-tag").data("label"),s.on("scroll",function a(){s.scrollTop()+s.height()>=r.offset().top&&(s.off("scroll",a),ajaxRelated(r,"related",e,t,"getrelated"))}).trigger("scroll")})}}),$(".seopro-pro-blog-post-comments").each(function(){1!=darkMode&&"dark"==localStorage.themeColor&&(fbCommentsTheme="dark");var e=$(this),t=e.data("shortcode"),a=shortCodeIfy(t,"type"),o="comments-system-"+a,s=e.find("#top-continue .comment-reply");switch(a){case"blogger":e.addClass(o).show(),$(".entry-meta .entry-comments-link").addClass("show"),s.addClass("btn"),beautiAvatar(".avatar-image-container img");break;case"disqus":var r=shortCodeIfy(t,"shortname");0!=r&&(disqus_shortname=r),disqusComments(disqus_shortname),e.addClass(o).show();break;case"facebook":e.addClass(o).find("#comments").html('<div class="fb-comments" data-width="100%" data-href="'+disqus_blogger_current_url+'" order_by="time" data-colorscheme="'+fbCommentsTheme+'" data-numposts="5" data-lazy="true"></div>'),e.show();break;case"hide":e.hide();break;default:e.addClass("comments-system-blogger").show(),$(".entry-meta .entry-comments-link").addClass("show"),s.addClass("btn"),beautiAvatar(".avatar-image-container img")}var i=e.find(".comments .comment-reply"),n=e.find(".comments #top-continue"),l=e.find("#show-comment-form");i.on("click",function(){n.show(),e.addClass("comment-form-visible"),l.remove()}),n.on("click",function(){n.hide()}),l.on("click",function(){e.addClass("comment-form-visible"),l.remove(),fixedSidebarIfy()})}),$(function(){$(".index-post .entry-image-wrap .entry-thumb, .PopularPosts .entry-image-wrap .entry-thumb, .FeaturedPost .entry-image-wrap .entry-thumb,.entry-author .author-avatar,.about-author .author-avatar").lazyify(),$("#seopro-pro-mobile-menu").each(function(){var e=$(this),t=$("#seopro-pro-main-nav-menu").clone();t.attr("id","main-mobile-nav"),t.find(".mega-items").remove(),t.find(".mega-menu > a").each(function(e,t){var a=$(this);t="recent"==(e=shortCodeIfy(a.data("shortcode").trim(),"label"))?"/search":"/search/label/"+e,a.attr("href",t)}),t.appendTo(e),$(".mobile-menu-toggle, .hide-seopro-pro-mobile-menu, .overlay").on("click",function(){$("body").toggleClass("nav-active")}),$(".seopro-pro-mobile-menu .has-sub").append('<div class="submenu-toggle"/>'),$(".seopro-pro-mobile-menu .mega-menu").find(".submenu-toggle").remove(),$(".seopro-pro-mobile-menu ul li .submenu-toggle").on("click",function(e){$(this).parent().hasClass("has-sub")&&(e.preventDefault(),$(this).parent().hasClass("show")?$(this).parent().removeClass("show").find("> .m-sub").slideToggle(170):$(this).parent().addClass("show").children(".m-sub").slideToggle(170))})}),$(".mobile-navbar-social").each(function(){var e=$(this);$("#seopro-pro-about-section ul.social").clone().appendTo(e)}),$(".mobile-navbar-menu").each(function(){var e=$(this);$("#footer-menu ul.link-list").clone().appendTo(e)}),$(".header-inner").each(function(){var e=$(this);if(1==fixedMenu&&e.length>0){var t=$(document).scrollTop(),a=e.offset().top,o=e.height(),s=a+o+o;$(window).scroll(function(){var a=$(document).scrollTop();a<$("#footer-wrapper").offset().top-o&&(a>s?e.addClass("is-fixed"):a<=0&&e.removeClass("is-fixed"),a>t?e.removeClass("show"):e.addClass("show"),t=$(document).scrollTop())})}}),fixedSidebarIfy(),$("#post-body iframe").each(function(){var e=$(this);e.attr("src").match("www.youtube.com")&&e.wrap('<div class="responsive-video-wrap"/>')}),$("p.comment-content").each(function(){var e=$(this);e.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g,'<img src="$1"/>'),e.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,'<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')}),$("#seopro-pro-load-more-link").each(function(){var e=$(this).data("load");e&&$("#seopro-pro-load-more-link").show(),$("#seopro-pro-load-more-link").on("click",function(t){$("#seopro-pro-load-more-link").hide(),$.ajax({url:e,success:function(t){var a=$(t).find(".blog-posts");a.find(".index-post").addClass("post-animated post-fadeInUp"),$(".blog-posts").append(a.html()),(e=$(t).find("#seopro-pro-load-more-link").data("load"))?$("#seopro-pro-load-more-link").show():($("#seopro-pro-load-more-link").hide(),$("#blog-pager .no-more").addClass("show"))},beforeSend:function(){$("#blog-pager .loading").show()},complete:function(){$("#blog-pager .loading").hide(),fixedSidebarIfy(),$(".index-post .entry-image-wrap .entry-thumb").lazyify()}}),t.preventDefault()})}),     $("#cookie-ify").each(function(){var e=$(this),t=e.find(".widget.Text").data("shortcode");null!=t&&(ok=shortCodeIfy(t,"ok"),days=shortCodeIfy(t,"days"),0!=ok&&e.find("#cookie-ify-accept").text(ok),0!=days?days=Number(days):days=7),e.length>0&&("1"!==$.cookie("cookie_ify_consent")&&(e.css("display","block"),setTimeout(function(){e.addClass("is-visible")},10)), $("#cookie-ify-accept").off("click").on("click",function(t){t.preventDefault(),t.stopPropagation(),$.cookie("cookie_ify_consent","1",{expires:days,path:"/"}),e.removeClass("is-visible"),setTimeout(function(){e.css("display","none")},500)}))})   ,$("#back-top").each(function(){var e=$(this);$(window).on("scroll",function(){$(this).scrollTop()>=100?e.fadeIn(170):e.fadeOut(170),e.offset().top>=$("#footer-wrapper").offset().top-34?e.addClass("on-footer"):e.removeClass("on-footer")}),e.on("click",function(){$("html, body").animate({scrollTop:0},500)})})});