async function fetchData() {
    try {
        const response = await fetch("./data.json");
        
        if (!response.ok) {
            console.log("Something went wrong");
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
    
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-');
}

async function cardContent(period) {
    let cards = document.querySelector('.cards');

    const data = await fetchData();
    cards.innerHTML = '';
    
    
    data.forEach(item => {
      const titleClass = item.title === "Self Care" ? toKebabCase(item.title) : item.title.toLowerCase();
        cards.innerHTML += `<div class="activity-card ${titleClass}">
        <div class="activity-card-info">
          <div class="activity-title">
            <h3>${item.title}</h3>
            <img src="./images/icon-ellipsis.svg">
          </div>
          <div class="activity-content">
            <p class="hours">${item.timeframes[period].current}hrs</p>
            <p class="previous">${period === 'daily' ? 'Yesterday' : period === 'weekly' ? 'Last Week' : 'Last Month'} - ${item.timeframes[period].previous}hrs</p>
          </div>
      </div>
      `
    });


}

cardContent("weekly");

function periodButtons() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      cardContent(button.id.replace('-btn', ''));
    })
  })
}

periodButtons();



