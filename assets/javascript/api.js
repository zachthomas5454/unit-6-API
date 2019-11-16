// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "ferret", "turtle",
    "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "hamster", "teacup pig", "serval", "salamander", "frog"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=8IPskPmMDVCclpQLtNK20EcgFMN64Jxd&limit=10";

    // Creating an AJAX call for the specific animal button
    $.ajax({
        url: queryURL,
        method: "GET"
    })// After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                animalDiv.attr("class", "animalsdiv");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");


                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#animals-view" div
                $("#animals-view").prepend(animalDiv);
            }

            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });

}


// This function handles events where an animal name submit is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of ouranimal array
    renderButtons();
});

// Function for displaying animal data
function renderButtons() {

    // Deleting the animals prior to adding new animals to avoid repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then generates buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal-btn to our button
        a.addClass("alert btn-info animal-btn");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding a format-attribute
        a.attr("height", "50px");
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

renderButtons();
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".alert", displayAnimalInfo);
