import spriteUrl from '/images/icon-sprites.svg';

function createBaseMarkup(arr, normalize = true) {
  let normalizedArr = normalize ? arrHandler(arr) : arr
  const markup = normalizedArr
    .map(article => {
      if (!article) {
        return;
      }

      const { section, title, description, url, date, img, imgCaption, id } =
        article;

      return `<li class="article" data-id="${id}">
     <div class="article_img_wrapper">
       <p class="already-read is-hidden">Already read</p>
       <p class="article_category">${section}</p>
       <img class="article_img" src="${img}" alt="${imgCaption}" width="395" height="395">
       <div class="article_flag">
       <button class="favorites-button article_flag--add"><span class="article_flag_text">Add to favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_contur" width="16" height="16"></use>
        </svg>
         </button>
         <button class="favorites-button article_flag--remove is-hidden"><span class="article_flag_text">Remove from favorite</span>
         <svg width="16" height="16">
         <use href="${spriteUrl}#heart_fill" width="16" height="16"></use>
       </svg>
          </button>
         </div>
     </div>
     <div class="article_text_wrapper">
       <h2 class="article_title">${title}</h2>
       <p class="article_text">${description}</p>
     </div>
     <div class="article_info_wrapper">
       <p class="article_date">${date}</p>
       <a href="${url}" class="read-more" target="_blank">Read more</a>
     </div>
     </li>`;
    })
    .join('');

  return markup;
}

function arrHandler(arr) {
  try {
    const objArr = arr.map(el => {
      if (el.media.length === 0) {
        return {
          section: el.section_name || el.section,
          title: el.title || el.headline.main,
          description: el.abstract,
          url: el.web_url || el.url,
          date: el.pub_date || el.created_date || el.published_date,
          img: `https://cdn.pixabay.com/photo/2013/03/30/00/10/news-97862_960_720.png`,
          imgCaption: 'image',
          id: el.id
        };
      }
      return {
        section: el.section_name || el.section,
        title: el.title || el.headline.main,
        description: el.abstract,
        url: el.web_url || el.url,
        date: el.pub_date || el.created_date || el.published_date,
        img: el.media[0]['media-metadata'][2].url,
        imgCaption: el.media[0].caption,
        id: el.id
      };
    });
    console.log(objArr);
    return objArr;
  } catch (error) {
    console.error(error);
  }
}

export { arrHandler, createBaseMarkup };
