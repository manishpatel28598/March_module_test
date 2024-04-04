
const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";


const tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
const SortBymktCapBtn = document.getElementById("sortbymktcapbtn");
const SortByPercentageBtn = document.getElementById("sortbypercentagebtn");
const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById('searchbar');

async function fetchData(URL) {
  try {
    const response = await fetch('data.json'); 
    const data = await response.json();
    renderData(data);
    // return data;
  } catch (error) {
    console.error("Error:", error);
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

SortBymktCapBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByMarketCap();
  });


  SortByPercentageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByChange();
  });


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
function sortByMarketCap() {
  const sortedData = data.sort((a, b) => Number(b.market_cap) - Number(a.market_cap)); 
  renderData(sortedData);
}

// Function to sort data by percentage change
function sortByChange() {
  const sortedData = data.sort(
    (a, b) => Number(b.price_change_percentage_24h) - Number(a.price_change_percentage_24h));
  renderData(sortedData);
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



