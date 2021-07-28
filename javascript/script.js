//Sets up empty arrays to add saved recipe objects, comments, and liked recipes to
let savedRecipes = [];
let allComments = [];
let likedRecipes = [];

function myLoad() {

    /*checks whether the page has been loaded before. If it has, it retrieves array objects from session storage, or otherwise it initializes objects
    objects in sessions storage for saved recipes, comments, and liked recipes
    */

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {

        sessionStorage.setItem("recipes", JSON.stringify(savedRecipes));
        sessionStorage.setItem("comments", JSON.stringify(allComments));
        sessionStorage.setItem("liked", JSON.stringify(likedRecipes));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        savedRecipes = JSON.parse(sessionStorage.getItem("recipes"));
        allComments = JSON.parse(sessionStorage.getItem("comments"));
        likedRecipes = JSON.parse(sessionStorage.getItem("liked"));
    }


    //this loop displays all comments on recipes as new child <div> elements of the recipe that was commented on
    allComments.forEach(function(comment) {

        let recipeDiv = document.getElementById(comment.recipeID);

        if (recipeDiv !== null) {

            let newComment = document.createElement("div");
            newComment.className = "comment";
            newComment.innerHTML = `<p>${comment.username} says: </p>
        <p>${comment.text}</p>`

            recipeDiv.appendChild(newComment);

        }
    });



    //for all liked artciles, the like button is removed and replaced by a static "liked" button

    likedRecipes.forEach(function(liked) {

        let recipeDiv = document.getElementById(liked);


        if (recipeDiv !== null) {

            let liked = document.createElement("button")
            liked.innerHTML = `Liked`;
            recipeDiv.children[2].replaceWith(liked);

        }
    })

    //assigns the main body div in the saved-articles page to the variable yourRecipes
    let yourRecipes = document.getElementById("saved-recipes");

    //this loop displays all saved recipes as new child <div> elements of the recipes on the saved-articles page main <div>
    savedRecipes.forEach(function(recipe) {

        if (yourRecipes !== null) {

            let newRecipe = document.createElement("div");
            newRecipe.className = "card";
            newRecipe.innerHTML = `<h3> ${recipe.title} </h3>
        <img class="card-img" src="${recipe.image}">
        <button><a href="${recipe.id}.html">See recipe</a></button>
        `
            yourRecipes.appendChild(newRecipe);
        }
    })

}


$(function() {

    //animates the dropdown menu to show on hover
    $("#recipes").hover(function() {
            $(".dropdown-content", this).slideDown(100);
            $(".dropdown-content").css("display", "block");
        },
        function() {
            $(".dropdown-content", this).stop().slideUp(100);
        }
    )

    //shows the comment form when its heading is clicked
    $(".comment-heading").click(function() {
        $(this).siblings("form").toggle();
    })

    //animates all h2 elements on hover to change their color and size
    $("h2").hover(function() {
        $("h2").animate({
            fontSize: '43px'
        }, "slow").css("color", "#957DAD").animate({
            fontSize: '40px'
        }, "slow");

    })

});


//constructor function for new recipe objects
function Recipe(title, image, id) {
    this.title = title;
    this.image = image;
    this.id = id;
}
//constructor function for new comment objects
function Comment(username, email, text, recipeID) {
    this.username = username;
    this.email = email;
    this.text = text;
    this.recipeID = recipeID;
}

//allows user to save recipe to their recipe box. The function adds a new recipe object to the savedRecipes array.
function saveRecipe(event) {

    savedRecipes = JSON.parse(sessionStorage.getItem("recipes"));

    let recipe = event.target.parentElement;

    let newRecipe = new Recipe(
        recipe.getElementsByTagName("h3")[0].innerHTML,
        recipe.getElementsByTagName("img")[0].src,
        recipe.id,

    );

    savedRecipes.push(newRecipe);
    sessionStorage.setItem("recipes", JSON.stringify(savedRecipes));

    alert(`You just saved a new recipe to your Recipe Box! Recipes in your box: ${savedRecipes.length}`);

}

//the function validates the information entered into the contact form
function contactValidation() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value
    let message = document.getElementById("subject").value

    if (validateEmail(email) == false) {
        alert(`You have entered an invalid address. Please try again.`);
    } else if (message === "") {
        alert(`You have not entered a message. Please try again`)
    } else {
        alert(`Thanks for your message ${name}! We will get back to you soon.`);
    }

}
//the function validated email addresses entered into forms. source = Adriendums
function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

//adds recipe ids to the likedRecipes array and alerts the user that they have liked a recipe.
function likeRecipe(form) {

    likedRecipes = JSON.parse(sessionStorage.getItem("liked"));


    let recipeID = form.parentElement.id;

    likedRecipes.push(recipeID);

    alert(`You just liked a new recipe.`);

    sessionStorage.setItem("liked", JSON.stringify(likedRecipes));


}

//creates a new comment object based on user inputs and saves this to the allComments array
function addComment(event) {

    allComments = JSON.parse(sessionStorage.getItem("comments"));

    let recipe = event.target.parentElement.parentElement.parentElement;

    let newComment = new Comment(
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("comment").value,
        recipe.id,
    )

    allComments.push(newComment);
    sessionStorage.setItem("comments", JSON.stringify(allComments));

}