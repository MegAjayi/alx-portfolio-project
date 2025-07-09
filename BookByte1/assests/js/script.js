function searchBook() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a book title.</p>";
    return;
  }

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items || data.items.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      const book = data.items[0].volumeInfo;
      resultsDiv.innerHTML = `
        <div>
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${
            book.authors ? book.authors.join(", ") : "Unknown"
          }</p>
          <img src="${book.imageLinks?.thumbnail || ""}" alt="${book.title}" />
          <p><a href="${
            data.items[0].volumeInfo.previewLink
          }" target="_blank">View / Download</a></p>
        </div>
      `;
    })
    .catch(() => {
      resultsDiv.innerHTML = "<p>Error fetching book data.</p>";
    });
}
