chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text && request.text == "getReviews") {
    var reviews = document.querySelectorAll(
      '[id*="contribution-created-pull-request-review"]'
    );

    var parsedReviews = Array.from(reviews || [])
      .map(parseReview)
      .filter(justToday)
      .map(format);

    if (parsedReviews && parsedReviews.length) {
      window.prompt(
        `Press Ctrl+C to copy ${parsedReviews.length} PRs .`,
        parsedReviews.join("\n")
      );
    } else {
      alert("No Reviewed PR found.");
    }
  }
});

function parseReview(review) {
  return {
    title: (review.querySelector(".content-title").textContent || "").trim(),
    date: (review.querySelector("time").textContent || "").trim(),
    href: review.querySelector(".content-title").href
  };
}

function justToday(review) {
  var today = getToday();
  return review.date === today;
}

function format(review) {
  return `${review.href} ${review.title}`;
}

function getToday() {
  var objDate = new Date();
  var locale = "en-us";
  var monthShort = objDate.toLocaleString(locale, { month: "short" });
  var date = objDate.getDate();
  return `${monthShort} ${date}`;
}
