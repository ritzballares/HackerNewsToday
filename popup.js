let updateListButton = document.getElementById("updateList");

updateListButton.addEventListener("click", () => {
    fetchData();
});

function fetchData() {
    fetch("http://hn.algolia.com/api/v1/search?tags=front_page")
        .then(response => response.json())
        .then(data => {    
            // If a has more points, a gets assigned a lower index value
            let sortedStoriesList = data.hits.sort((a,b) => (a.points > b.points ? -1 : 1));

            let numStories = document.getElementById("numberOfStories");
            let storiesList = document.getElementById("storiesList");

            storiesList.innerHTML = ""

            for (i = 0; i < numStories.value; i++) { 
                let storyLink = document.createElement("a");
                storyLink.href = sortedStoriesList[i].url;
                storyLink.text = sortedStoriesList[i].title;
                storyLink.target = "_blank";

                let storiesListItem = document.createElement("li");
                storiesListItem.appendChild(storyLink);

                storiesList.appendChild(storiesListItem);
            }
        });
}
