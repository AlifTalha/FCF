// Simple Search Filter
document.getElementById("searchBox").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let newsItems = document.querySelectorAll("#newsContainer .news-item");

  newsItems.forEach(item => {
    let text = item.innerText.toLowerCase();
    if (text.includes(filter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});



