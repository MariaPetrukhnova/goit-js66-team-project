const header = document.querySelector('.page-header');

function makeMarkup(arr) {
  const newMarkup = arr.map(el => {
    const { section, title, description, url, date, img, imgCaption } = el;
    return `
            <div class="news-card">
                <img width="396" src="${img}" alt="${imgCaption}">
                <span>${section}</span>
                <h2>${title}</h2>
                <p>${description}</p>
                <span>${date}</span>
                <a href="${url}">Read more</a>
            </div>
        `;
  });
  const finalMarkup = newMarkup.join('');
  return finalMarkup;
}

function addMarkup(tagString) {
  header.insertAdjacentHTML('afterend', tagString);
}

// export { makeMarkup, addMarkup };
