const apiUrl = "https://bookbunny-backend.onrender.com"; // replace this!

document.getElementById("loadBooks").addEventListener("click", async () => {
  const res = await fetch(`${apiUrl}/books`);
  const books = await res.json();
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  books.forEach(b => {
    const item = document.createElement("li");
    item.textContent = `${b.title} by ${b.author}`;
    list.appendChild(item);
  });
});
