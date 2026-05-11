$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });

    // Bilingual CV: replace each nav-link's text with lang-en/lang-zh spans,
    // and dynamically swap href to the matching anchor when language changes.
    var $cvEn = $(".cv.lang-en h3.card-title");
    var $cvZh = $(".cv.lang-zh h3.card-title");
    if ($cvEn.length && $cvZh.length) {
      $("#toc-sidebar .nav-link").each(function (i) {
        var enText = $.trim($(this).text());
        var enHref = $(this).attr("href") || "";
        var zhText = $.trim($cvZh.eq(i).attr("data-cv-zh-title") || $cvZh.eq(i).text());
        var zhHref = enHref + "-zh";
        $(this)
          .empty()
          .append($('<span class="lang-en"></span>').text(enText))
          .append($('<span class="lang-zh"></span>').text(zhText))
          .attr("data-href-en", enHref)
          .attr("data-href-zh", zhHref);
      });
      var updateTocHrefs = function () {
        var lang = document.documentElement.getAttribute("data-lang") || "en";
        $("#toc-sidebar .nav-link").each(function () {
          var target = $(this).attr(lang === "zh" ? "data-href-zh" : "data-href-en");
          if (target) $(this).attr("href", target);
        });
      };
      updateTocHrefs();
      new MutationObserver(updateTocHrefs).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-lang"],
      });
    }
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
