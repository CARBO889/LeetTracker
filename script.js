document.addEventListener("DOMContentLoaded",function(){

    // yaani jab pura dom loaded ho jae tab iss function ke andar aana he
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

// phele ye check karenge ki user ne sahi input daala he ki 

function validateUsername(username){
    if(username.trim() == ""){
        alert("Username should not empty");
        return false;
    }

    const regex = /^[a-zA-Z0-9_-]{3,16}$/;

    const isMatching =regex.test(username);

    if(!isMatching){
        alert("Invalid User-Name");
    }
    return isMatching;


}


async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
        searchButton.textContent = "searching...";
        searchButton.disabled = true;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch the user details");
        }

        const parsedData = await response.json();
        console.log("Logging data: ", parsedData);
        displayUserData(parsedData);


        // You can now process the 'data' further
    } catch (error) {
        console.error("Error fetching user details: ", error);
        statsContainer.innerHTML='<p>No Data Found</p>';
        // Display error message to user if needed
    } finally {
        // Re-enable the search button after request is complete
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}


function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved/total)*100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    circle.textContent = `${solved}/${total}`;
}


function displayUserData(parsedData){
    // json formatoter and validator naam ki website ka use kia 
    const solvedTotalQues = parsedData.totalSolved;
    const totalQues = parsedData.totalQuestions;
    const solvedTotalEasyQues  = parsedData.easySolved;
    const totalEasyQues =parsedData.totalEasy;
    const solvedTotalMediumQues = parsedData.mediumSolved;
    const totalMediumQues =parsedData.totalMedium;
    const solvedTotalHardQues = parsedData.hardSolved;
    const totalHardQues=parsedData.totalHard;
    const acceptanceRate = parsedData.acceptanceRate;
    const ranking = parsedData.ranking;
    const contributionPoints = parsedData.contributionPoints;
    const reputation = parsedData.reputation;

    console.log("the total question solved=",solvedTotalQues);

    updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
    updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
    updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);


    const statsCardsContainer = document.querySelector('.stats-cards');
    statsCardsContainer.innerHTML = `
        <div class="extra">
            <h3>Acceptance Rate</h3>
            <p>${acceptanceRate}%</p>
        </div>
        <div class="extra">
            <h3>Ranking</h3>
            <p>${ranking}</p>
        </div>
        <div class="extra">
            <h3>Contribution Points</h3>
            <p>${contributionPoints}</p>
        </div>
        <div class="extra">
            <h3>Reputation</h3>
            <p>${reputation}</p>
        </div>
    `;

}

    // sabse phele user aaega and search button par click karege to uske lia ek event listener hona chaie
    searchButton.addEventListener('click', function(){
        const username=usernameInput.value;
        // console.log(username);  console me jaake dekh jabhi name enter karung to console hoga

        if(validateUsername(username)){
                fetchUserDetails(username);
        }
    })


})

