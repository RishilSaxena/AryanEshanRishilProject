function updateSearchBox() {
  $(".quick-links").empty();
  $(".quick-links").append("<ul class='serach-res'>");
  const searchTerm = $(".nav-search").val();
  $.get("/pages", function (data) {
    data.forEach((page) => {
      const sim = similarity(searchTerm, page.title);
      if (sim > 0.3) {
        $(".search-res").append(
          `<li><a href="${page.path}">${page.title}</a></li>`
        );
      }
    });
  });
}
/*
{
  path: /public/index.html
  title: Home Page
}
*/
$(document).ready(function () {
  $("#search").on("click", function () {
    $(".menu-item").addClass("hide-item");
    $(".search-form").addClass("active");
    $(".close").addClass("active");
    $(".shadow").addClass("active");
    $(".search-box").addClass("active");
    $(".search-box section ul li").addClass("show");
    $(".settings-dropdown").removeClass("active");
  });
  $(".close").on("click", function () {
    close();
  });
  $(".shadow").on("click", function () {
    close();
  });
  $(".settings").on("click", function () {
    $(".settings-dropdown").toggleClass("active");
  });
  function close() {
    $(".menu-item").removeClass("hide-item");
    $(".search-form").removeClass("active");
    $(".close").removeClass("active");
    $(".shadow").removeClass("active");
    $(".search-box").removeClass("active");
    $(".search-box section ul li").removeClass("show");
    $(".settings-dropdown").removeClass("active");
  }
  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase().replace(/(\((.*?)\))/g, "");
    s2 = s2.toLowerCase().replace(/(\((.*?)\))/g, "");
    s1 = s1.replace(/(\<(.*?)\>)/g, "");
    s2 = s2.replace(/(\<(.*?)\>)/g, "");

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

});
