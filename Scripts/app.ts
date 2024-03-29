export const router = {
    ActiveLink: "",
    LinkData: "",
};
import { core } from './contact';
let contact = new core.Contact();
"use strict";

(function () {
    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"> <i class="fas fa-sign-out-alt"></i>Logout</a>`)
        }

        $("#logout").on("click",function (){
            sessionStorage.clear();
            location.href = "login.html"
        });
    }
    function Load_header(html_data) {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("area-current", "page")
        CheckLogin()
    }
    function AjaxRequest(method,url,callback){


        //     Step 1: Instantiate an XHR object
        let xhr = new XMLHttpRequest();

        //     Step 2 : Open a connection to the server.
        xhr.open(method,url);

        // Step 3 : Add event listener for readystatechange event
        // The readystate event os being triggered when the
        // state of teh document being fetched changes.
        xhr.addEventListener("readystatechange",() => {
            if(xhr.readyState === 4 && xhr.status === 200){


                //     response succeeded - data is available in here only
                if(typeof callback == "function"){
                    callback(xhr.responseText)
                }else{
                    console.error("ERROR: callback not a function");
                }

            }

        });
        //     Step 4 : Send the request.
        xhr.send();
    }


    function RegisterFormValidation() {
        ValidateRegisterField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name");
        ValidateRegisterField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name");
        ValidateRegisterField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address");
        ValidateRegisterField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Phone Number");
        ValidateRegisterField("#username", /^[a-zA-Z0-9_-]{3,16}$/, "Please enter a valid Username (3-16 characters alphanumeric, underscores, or dashes)");
        ValidateRegisterField("#password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Please enter a valid Password (at least 8 characters, including uppercase, lowercase, and numbers)");
        ValidateConfirmPassword("#password", "#confirmPassword", "Passwords do not match");
    }
    function ValidateRegisterField(input_filed_id, regular_expression, error_message){

        let messageRegisterArea = $("#messageRegisterArea").hide();

        $(input_filed_id).on("blur", function(){
            // fail validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageRegisterArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageRegisterArea.removeAttr("class").hide();
            }
        })

    }

    function ValidateConfirmPassword(passwordField, confirmPasswordField, errorMessage) {
        let messageRegisterArea = $("#messageRegisterArea").hide();

        $(confirmPasswordField).on("blur", function() {
            let password = $(passwordField).val();
            let confirmPassword = $(this).val();
            if (password !== confirmPassword) {
                // Passwords do not match
                $(this).trigger("focus").trigger("select");
                messageRegisterArea.addClass("alert alert-danger").text(errorMessage).show();
            } else {
                // Passwords match
                messageRegisterArea.removeAttr("class").hide();
            }
        });
    }
    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
        RegisterFormValidation();

    }


    function DisplayHomepage() {
        console.log("Called DisplayHomePage()");
        let ExploreButton = document.getElementById("ExploreButton");
        ExploreButton.addEventListener("click", function () {
            LoadLink("blog");
        });
    }

    function DisplayPortfolioPage() {
        const projectsData = [
            { title: 'Community Classes', description: 'Explore a variety of classes for all ages and backgrounds.', image: "../Pictures/port1.jpg" },
            { title: 'Events & Workshops', description: 'Join exciting events and workshops happening at Harmony Hub.', image: "../Pictures/port2.jpg" },
            { title: 'Community Projects', description: 'Get involved in meaningful projects that benefit the community.', image: "../Pictures/port3.jpg" },
            // Add more projects as needed
        ];

        const projectsContainer = document.getElementById('projects-container');
        const loadMoreButton = document.getElementById('load-more-btn');

        let lastIndexDisplayed = 0;

        function createProjectCard(project) {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const projectImg = document.createElement('img');
            projectImg.src = project.image;
            projectImg.alt = project.title;
            projectImg.classList.add('project-img');

            const title = document.createElement('h3');
            title.innerText = project.title;

            const description = document.createElement('p');
            description.innerText = project.description;

            // Append the image at the top and the text at the bottom of the card
            projectCard.appendChild(projectImg);
            projectCard.appendChild(title);
            projectCard.appendChild(description);

            return projectCard;
        }




        function loadProjects(numProjects) {
            const endIndex = Math.min(lastIndexDisplayed + numProjects, projectsData.length);

            for (let i = lastIndexDisplayed; i < endIndex; i++) {
                const projectCard = createProjectCard(projectsData[i]);
                projectsContainer.appendChild(projectCard);
                lastIndexDisplayed++;
            }

            if (lastIndexDisplayed === projectsData.length) {
                loadMoreButton.style.display = 'none';
            }
        }

        loadMoreButton.addEventListener('click', function () {
            loadProjects(1); // Change 1 to the number of projects you want to load each time
        });

        // Load initial projects
        loadProjects(1); // Change 1 to the number of projects you want to load initially
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage()");
        let popupButton = document.getElementById("popupButton");
        popupButton.addEventListener("click", function () {
            alert("Student at Durham college.\nComputer Programming");
        });
        let popupButton1 = document.getElementById("popupButton1");
        popupButton1.addEventListener("click", function () {
            alert("Student at Durham college.\nComputer Programming and Analysis");
        });
    }

    function DisplayServicePage() {
        console.log("Called DisplayServicePage()");
        let acc = document.getElementsByClassName("accordion");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage()");
        search();
    }
    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid First Name and Last Name");
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a valid Contact Number");
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address");
    }

    /**
     * This function validates input from text field
     * @param input_filed_id
     * @param regular_expression
     * @param error_message
     *
     */
    function ValidateField(input_filed_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_filed_id).on("blur", function(){
            // fail validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeAttr("class").hide();
            }
        })

    }
    function AddFeedback(fullName:string, contactNumber:string, emailAddress:string, feedback:string, rating:string) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, feedback, rating);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById("contactForm") as HTMLFormElement;
        const messageArea = document.getElementById("messageArea");
        const ratingInput = document.getElementById("rating") as HTMLInputElement;
        const stars = document.querySelectorAll(".star");
        const cancelButton = document.getElementById("cancelButton");

        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = parseInt(star.getAttribute("data-value"));

                // Toggle 'active' class for clicked star and set rating value
                stars.forEach(s => {
                    if (parseInt(s.getAttribute("data-value")) <= value) {
                        s.classList.add("active");
                    } else {
                        s.classList.remove("active");
                    }
                });

                ratingInput.value = value.toString();
            });
        });

        // Event listener for cancel button
        cancelButton.addEventListener("click", function () {
            contactForm.reset(); // Reset form fields

            // Remove error message and hide message area
            messageArea.innerHTML = "";
            messageArea.style.display = "none";

            // Remove 'active' class from all stars
            stars.forEach(star => star.classList.remove("active"));
        });

        // Event listener for form submission
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Display feedback and rating
            let message = "<p><strong>Feedback:</strong> " + (formData.get('feedback') as string) + "</p>";
            message += "<p><strong>Rating:</strong> " + (formData.get('rating') as string) + "</p>";
            messageArea.innerHTML = message;

            // Validate feedback and rating
            if (!formData.get('feedback')) {
                messageArea.innerHTML += "<p>Please enter your feedback.</p>";
                return;
            }

            if (!formData.get('rating')) {
                messageArea.innerHTML += "<p>Please provide a rating.</p>";
                return;
            }

            // Clear form fields
            contactForm.reset();

            // Remove 'active' class from all stars
            stars.forEach(star => star.classList.remove("active"));

            // Add contact with feedback and rating
            AddFeedback(
                formData.get('fullName') as string,
                formData.get('contactNumber') as string,
                formData.get('emailAddress') as string,
                formData.get('feedback') as string,
                formData.get('rating') as string
            );

            // Redirect to contact list page
            window.location.href = "review_list.html";
        });
    });

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();


    }

    function DisplayReviewListPage() {
        console.log("Called DisplayReviewListPage()");

        if (localStorage.length > 0) {
            let reviewList = document.getElementById("reviewList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr>
                        <th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>${contact.feedback}</td>
                        <td>${contact.rating}</td>
                        <td class="text-center">
                             <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm"> Delete </i>                                                    
                             </button>
                        </td>
                    </tr>`;
                index++;
            }
            reviewList.innerHTML = data;
        }
        $("button.delete").on("click", function(){
            if(confirm("Delete Contact, Please confirm")){
                localStorage.removeItem($(this).val().toString());
            }
            location.href = "review_list.html";
        });

    }


    document.addEventListener("DOMContentLoaded", function () {
        DisplayContactUsPage();
        DisplayReviewListPage();
    });

    function DisplayLoginPage(){
        console.log("DisplayLoginPage() Called..");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click",function () {

            let success = false;
            let newUser = new core.User() ;


            // Ajax request using get.
            $.get( "./data/users.json", function(data){

                for(const user of data.users){
                    console.log(user);

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;
                    if(username=== user.Username && password=== user.Password){

                        success = true;
                        newUser.fromJSON(user);
                        break;

                    }

                } //for ends
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    // Show welcome message
                    messageArea
                        .removeClass("alert-danger")
                        .addClass("alert alert-success")
                        .text("Welcome, " + newUser.username + "!. You have Successfully Logged in.")
                        .show();

                    // Hide welcome message after 5 seconds
                    setTimeout(function () {
                        messageArea.hide();
                    }, 3000);

                    // Redirect to index.html after 5 seconds
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 3000);
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .removeClass("alert-success")
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });

        });


        $("#cancelButton").on("click",function () {
            document.forms[0].reset();
            location.href ="index.html";

        });

    }


    //Search function
    function search() {
        let searchText = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
        let searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = ""; // Clear previous results

        if (searchText.trim() === "") {
            searchResults.style.display = "none";
            return;
        }

        let found = false;
        let blogCards = document.querySelectorAll(".card");

        blogCards.forEach(function (card) {
            let cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                found = true;
                let link = document.createElement("a");
                link.href = "#" + card.id;
                link.textContent = card.querySelector("h2").textContent;
                searchResults.appendChild(link);
            }
        });

        if (found) {
            searchResults.style.display = "block";
        } else {
            searchResults.style.display = "none";
        }
    }

    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function AddNavigationEvents() {
        let navlinks = $("ul>li>a");
        navlinks.off("click");
        navlinks.off("hover");
        navlinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navlinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }

    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstLetter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $(`li>a>:contains(${document.title})`).addClass("active");
        LoadContent();
    }

    function Display404Page() {
        console.log("Called Display404Page");
    }

    function DisplayEventPlaning() {
        console.log("Called DisplayEventPlaning");
    }

    function DisplayEventPage() {
        console.log("Called DisplayEventPage");
        let eventButton = document.getElementById("EventButton");

        // Add event listener for button click
        eventButton.addEventListener("click", function () {

            LoadLink("eventplanning");
        });

        (function () {
            function loadEvents() {
                // AJAX request to load events from JSON file
                $.getJSON("./data/events.json", function(data) {
                    // Process the event data and display it
                    data.events.forEach(function(event) {
                        let locationHtml = event.location_link ? `<a href="${event.location_link}">${event.location}</a>` : event.location;
                        $('#events-container').append(`
                    <div class="event">
                        <h2>${event.title}</h2>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <p><strong>Location:</strong> ${locationHtml}</p>
                        <p><strong>Description:</strong> ${event.description}</p>
                    </div>
                    <hr>
                `);
                    });
                });
            }

            // Call loadEvents when the page is loaded
            $(document).ready(function() {
                loadEvents();
            });
        })();



    }

    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage");

    }

    function DisplaySerachPage() {
        console.log("Called DisplaySerachPage");
    }

    function DisplayMapPage() {
        console.log("Called DisplayMapPage");
        let map;
        let durhamCollegeMarker;

        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 43.9452, lng: -78.8959 },
                zoom: 14,
            });

            // Create a marker at Durham College
            durhamCollegeMarker = new google.maps.Marker({
                position: { lat: 43.9452, lng: -78.8959 },
                map: map,
                title: "Durham College"
            });
        }

        initMap();
    }
    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomepage;
            case "portfolio": return DisplayPortfolioPage;
            case "services": return DisplayServicePage;
            case "team": return DisplayTeamPage;
            case "blog": return DisplayBlogPage;
            case "events": return DisplayEventPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "map": return DisplayMapPage;
            case "eventplanning": return DisplayEventPlaning;
            case "serach": return DisplaySerachPage;
            case "404": return Display404Page;
            default:
                console.error("Error: callback does not exist" + router.ActiveLink);
                return Function();
        }
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader() {
        $.get("/views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li > a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get(`/views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }

    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadLink("home");

    }
    window.addEventListener("load", Start);
})();