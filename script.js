function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }
    document.getElementById("loginPage").style.display ="none";
    document.getElementById("homePage").style.display ="block";
}
function home() {
    alert("Home Page");
}
function explore() {
    alert("Explore Page");
}
function notifications() {
    alert("Notifications Page");
}
function messages() {
    alert("Messages Page");
}
function profile() {
    alert("Profile Page");
}
function settings() {
    alert("Settings Page");
}
function createPost() {
    document.getElementById("postInput").focus();
}
function addPost() {
    let text =document.getElementById("postInput").value;
    let image =document.getElementById("imageInput").files[0];
    if (text.trim() === "" && !image) {
        alert("Write something or select an image");
        return;
    }
    let post =document.createElement("div");
    post.className = "post";
    let postContent = `
        <h3>Kanishka</h3>
        <p>${text}</p>
    `;
    if (image) {
        let reader =new FileReader();
        reader.onload = function(event) {
            post.innerHTML = postContent +`
                <img src="${event.target.result}">
                <div class="actions">
                    <button onclick="likePost(this)">❤️ Like</button>
                    <button onclick="commentPost()">💬 Comment</button>
                    <button onclick="repostPost()">🔁 Repost</button>
                    <button onclick="sharePost()">📤 Share</button>
                </div>
                `;
            document.getElementById("posts").prepend(post);
        };
        reader.readAsDataURL(image);
    }
    else {
        post.innerHTML = postContent +
            `
            <div class="actions">
                <button onclick="likePost(this)">❤️ Like</button>
                <button onclick="commentPost()">💬 Comment</button>
                <button onclick="repostPost()">🔁 Repost</button>
                <button onclick="sharePost()"> 📤 Share</button>
            </div>
            `;
        document.getElementById("posts").prepend(post);
    }
    document.getElementById("postInput").value = "";
    document.getElementById("imageInput").value = "";
}
function likePost(button) {
    if (button.innerHTML.includes("Like")) {
        button.innerHTML = "❤️ Liked";
        button.style.color = "red";
    }
    else {
        button.innerHTML = "❤️ Like";
        button.style.color = "";
    }
}
function commentPost() {
    let comment =prompt("Write your comment");
    if (comment) {
        alert("Comment added: " + comment);
    }
}
function repostPost() {
    alert("Post Reposted 🔁");
}
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "PostVerse",
            text: "Check this post on PostVerse"
        });
    }
    else {
        alert("Post link copied!");
    }
}
let followingUsers = [];
let followersUsers = ["Arun","Priya","Rahul"];
function followUser(button, username) {
    if (button.innerText.trim() === "Follow") {
        followingUsers.push(username);
        button.innerText = "Following";
        button.style.background = "#64748b";
        document.getElementById("followingCount").innerText = followingUsers.length;
    }
    else {
        followingUsers =
            followingUsers.filter(function(user) {
                return user !== username;
            });
        button.innerText = "Follow";
        button.style.background = "#3156a3";
        document.getElementById("followingCount").innerText =followingUsers.length;
    }
}
function showFollowing() {
    let list =document.getElementById("followList");
    let title =document.getElementById("followTitle");
    let people =document.getElementById("peopleList");
    list.style.display = "block";
    title.innerText = "Following";
    people.innerHTML = "";
    if (followingUsers.length === 0) {
        people.innerHTML = "<p>You are not following anyone yet.</p>";
        return;
    }
    followingUsers.forEach(function(user) {
        let p = document.createElement("p");
        p.innerHTML = "👤 " + user;
        people.appendChild(p);
    });
}
function showFollowers() {
    let list = document.getElementById("followList");
    let title =document.getElementById("followTitle");
    let people =document.getElementById("peopleList");
    list.style.display = "block";
    title.innerText = "Followers";
    people.innerHTML = "";
    followersUsers.forEach(function(user) {
        let p =document.createElement("p");
        p.innerHTML ="👤 " + user;
        people.appendChild(p);
    });
}