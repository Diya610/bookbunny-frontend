/* ✅ GLOBAL BOOK SEARCH — Updated Final Version */
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const list = document.getElementById("searchResults");
  list.innerHTML = "";

  if (!data.items) {
    list.innerHTML = "<p>No results found 😢</p>";
    return;
  }

  data.items.forEach(book => {
    const info = book.volumeInfo;
    const goodreadsQuery = encodeURIComponent(info.title + " " + (info.authors?.[0] || ""));

    const item = document.createElement("li");
    item.classList.add("book-card");
    item.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || ''}" class="book-img">
      <h3>${info.title}</h3>
      <p><strong>Author:</strong> ${info.authors?.join(", ") || "Unknown"}</p>
      <p><strong>Published:</strong> ${info.publishedDate || "N/A"}</p>
      <p><strong>Pages:</strong> ${info.pageCount || "N/A"}</p>

      <!-- ⭐ Rating UI -->
      <label><strong>Your Rating:</strong></label>
      <input type="number" min="0" max="5" step="0.25" class="ratingInput" placeholder="0-5"> ⭐

      <!-- ❤️ Favorites + Reviews -->
      <button class="favBtn">❤️ Add to Favorites</button>
      <button class="reviewBtn">✍ Add Review</button>

      <!-- 🔗 View on Goodreads -->
      <a href="https://www.goodreads.com/search?q=${goodreadsQuery}" target="_blank" class="goodreads-btn">
        View on Goodreads 🔗
      </a>
    `;

    list.appendChild(item);
  });

  console.log("✅ Search results updated with favorites, ratings & Goodreads");
});
