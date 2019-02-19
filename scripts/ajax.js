loadAJAX("scripts/scalable-gallery.php", loadGalleryAJAX);
loadAJAX("scripts/scalable-news.php", loadNewsAJAX);

function loadAJAX(url, xhrFunction) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xhrFunction(this);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function loadGalleryAJAX(xhr) {
    let imageCreationIndex = 0;
    let slideCreationIndex = 0;
    let slideShowIndex = 0;
    let slideHideIndex = 0;
    let slides = [];

    //Grabs image names for <img> src paths and parses the string as a JSON to convert it to an array
    let imageArray = JSON.parse(xhr.responseText);
    console.log(imageArray);
    console.log(imageArray[0]);
    createSlideShow();

    function createSlideShow() {
        document.getElementById("default-image").style.display = "none";
        while (imageCreationIndex < imageArray.length || slideCreationIndex !== imageArray.length) {
            slides[slideCreationIndex] = document.createElement("div");

            //Container Dimensions and Style
            slides[slideCreationIndex].style.backgroundColor = "transparent";
            slides[slideCreationIndex].style.background = "contain";
            slides[slideCreationIndex].style.margin = "auto";
            slides[slideCreationIndex].style.display = "none";
            slides[slideCreationIndex].className = "slidesToBeShown";
            //Puts slide in encompassing DIV element
            document.getElementById("the-gallery").appendChild(slides[slideCreationIndex]);

            let dashImage = document.createElement("img");
            dashImage.src = "assets/images/galleryelement/" + imageArray[imageCreationIndex];
            dashImage.style.margin = "auto";
            dashImage.style.display = "block";
            dashImage.className = "dashImages";
            slides[slideCreationIndex].appendChild(dashImage);
            imageCreationIndex++;
            slideCreationIndex++;
        }
    }

    playSlideShow();

    function playSlideShow() {
        for (slideHideIndex; slideHideIndex < imageArray.length; slideHideIndex++) {
            slides[slideHideIndex].style.display = "none";
        }
        slideHideIndex = 0;
        console.log(slides[slideShowIndex]);
        slides[slideShowIndex].style.display = "block";
        slideShowIndex++;
        if (slideShowIndex === imageArray.length) {
            slideShowIndex = 0;
        }
        setTimeout(playSlideShow, 3500);
    }
}

function loadNewsAJAX(xhr){
            let newsEntries = [];
            let newsEntryIndex = 0;
            let newsStories = JSON.parse(xhr.responseText);
            let newsStoryIndex = 0;

            buildNewsStories();

            function buildNewsStories() {
                document.getElementById("default-news").style.display = "none";

                for(newsEntryIndex; newsEntryIndex < newsStories.length; newsEntryIndex++) {
                    console.log(newsStories[newsStoryIndex]);
                    newsEntries[newsEntryIndex] = document.createElement("div");
                    newsEntries[newsEntryIndex].className = "news-entries";
                    document.getElementById("news").appendChild(newsEntries[newsEntryIndex]);
                    newsEntries[newsEntryIndex].innerHTML = newsStories[newsStoryIndex];
                    newsStoryIndex++;
                }
                limitNewsStories();

                function limitNewsStories() {
                    if (newsStories.length >= 2) {
                        newsEntryIndex = 2;
                        for (newsEntryIndex; newsEntryIndex < newsStories.length; newsEntryIndex++) {
                            newsEntries[newsEntryIndex].style.display = "none";
                        }
                        if (newsStories.length >= 3) {
                            let readMore = document.createElement("button");
                            document.getElementById("news").appendChild(readMore);
                            readMore.innerText = "Read More";
                            readMore.style.marginRight = "8px";
                            readMore.style.marginBottom = "8px";
                            readMore.style.color = "#FFFFFF";
                            readMore.style.backgroundColor = "#0000FF";
                            readMore.style.fontFamily = "Century Gothic";
                            readMore.addEventListener("click", function() {
                                newsEntryIndex = 2;
                                readMore.style.display = "none";
                                for(newsEntryIndex; newsEntryIndex < newsStories.length; newsEntryIndex++){
                                    newsEntries[newsEntryIndex].style.display = "block";
                                }
                            });
                        }
                    }
                }
            }
}
