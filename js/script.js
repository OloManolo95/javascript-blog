{


  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      titles: '.post-title',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };




  const generateTitleLinks = function(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(select.all.articles + customSelector);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(select.all.titles).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into html variable */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  const calculateTagsParams = function(tags){

    let params = {
      'min': 999999,
      'max': 0,
    };
    for(let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max) {
        params.max = Math.max(tags[tag], params.max);
      }
      if(tags[tag] < params.min) {
        params.min = Math.min(tags[tag], params.min);
      }
    }


    return params;

  };

  const calculateTagClass = function(count, params){

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

    return `${opts.tagSizes.classPrefix}${classNumber}`;
  };

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* [DONE] generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [DONE] add generated code to html variable */
        html = html + tagHTML;
        console.log(html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(html);

      /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
    }

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTagsHTML;

  };


  generateTags();

  const tagClickHandler = function(event){

    /*[DONE] prevent default action for this event */

    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);

    /*[DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /*[DONE] find all tag links with class active */

    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /*[DONE] START LOOP: for each active tag link */

    for(let link of tagLinks){

      /* remove class active */

      link.classList.remove('active');

      /*[DONE] END LOOP: for each active tag link */

    }

    /*[DONE] find all tag links with "href" attribute equal to the "href" constant */

    const clickedTags = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found tag link */

    for(let clicked of clickedTags){

      /*[DONE] add class active */

      clicked.classList.add('active');

      /* END LOOP: for each found tag link */

    }

    /*[DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){

    /*[DONE] find all links to tags */

    const links = document.querySelectorAll(select.all.linksTo.tags);

    /*[DONE] START LOOP: for each link */

    for(let link of links){

      /*[DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /*[DONE] END LOOP: for each link */

    }
  };

  addClickListenersToTags();

  const generateAuthors = function() {

    let allAuthors = {};

    const articles = document.querySelectorAll(select.all.articles);
    for (let article of articles) {

      const authorWrapper = article.querySelector(select.article.author);

      let html = '';

      const articleAuthor = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      html = html + authorHTML;

      if(!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      authorWrapper.innerHTML = html;

      const authorList = document.querySelector(select.listOf.authors);

      let allAuthorsHtml = '';

      // eslint-disable-next-line no-undef
      for(author in allAuthors) {

        // eslint-disable-next-line no-undef
        allAuthorsHtml += `<li><a href="#author-${author}">${author}</a> (${allAuthors[author]})</li>`;
      }

      authorList.innerHTML = allAuthorsHtml;
    }

  };

  generateAuthors();

  const authorClickHandler = function(event) {

    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '');

    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for (let link of authorLinks) {

      link.classList.remove('active');

    }

    const clickedAuthors = document.querySelectorAll('a[href="' + href +'"]');

    for (let clicked of clickedAuthors) {

      clicked.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function() {

    const authors = document.querySelectorAll(select.all.linksTo.authors);

    for (let author of authors) {

      author.addEventListener('click', authorClickHandler);
    }

  };

  addClickListenersToAuthors();




}
