
// const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";


const tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
const SortBymktCapBtn = document.getElementById("sortbymktcapbtn");
const SortByPercentageBtn = document.getElementById("sortbypercentagebtn");
const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById('searchbar');

async function fetchData() { //if i have url then we need to pass url as parameter in fetchData
  try {

    //converting json file into array format
    const response = await fetch('data.json'); 
    const data = await response.json(); 
    renderData(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
// adding eventlistener for sorting by market_caps
SortBymktCapBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByMarketCap();
  });

// adding eventlistener for sorting by percentageChange
  SortByPercentageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByChange();
  });

// debounce
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    const searchInput = document.getElementById('searchbar');
    let debounceTimeout;

    searchInput.addEventListener('input', function(event) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(searchByName, 300); 
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            clearTimeout(debounceTimeout);  
            searchByName();          
        }
    });
});




// Function to sort data by market cap
async function sortByMarketCap() {

  
    try {
      const response = await fetch('data.json'); 
      const data = await response.json();
      const sortedData = data.sort((a, b) => Number(b.market_cap) - Number(a.market_cap)); 
      console.log(sortedData);
      renderData(sortedData);
    } catch (error) {
      console.error("Error:", error);
    }
  
}

// Function to sort data by percentage change
async function sortByChange() {
  try {
    const response = await fetch('data.json'); 
    const data = await response.json();
    const sortedData = data.sort(
      (a, b) => Number(b.price_change_percentage_24h) - Number(a.price_change_percentage_24h));
      console.log(sortedData);
    renderData(sortedData);
  } catch (error) {
    console.error("Error:", error);
  }
}


// function to search data by name or symbol as an input using async await
async function searchByName() {
    const searchInput = document.getElementById('searchbar').value.toLowerCase();
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const filteredData = data.filter(coin => 
          coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput)
        );
        renderData(filteredData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderData(data) {
  tableBody.innerHTML = ""; // Clear existing data
  for (let coin of data) {
    const row = document.createElement("tr");
    row.innerHTML = `

        <td>${coin.name}</td>
        <td>${coin.id}</td>
        <td><img src="${coin.image}" id="image" alt="${coin.name}"></td>
        <td>${coin.symbol}</td>
        <td>$ ${coin.current_price}</td>
        <td>${coin.total_volume}</td>
      `;
    tableBody.appendChild(row);
  }
} 



