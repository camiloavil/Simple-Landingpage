const userName = 'camiloavil';
const API = 'https://instagram28.p.rapidapi.com/user_info?user_name=${userName}';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '47e11bfa3fmshbcb3b00f70439a0p1ef550jsn362c96170fd9',
		'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
	}
};

const content = null || document.getElementById('content');

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const userData = await fetchData(API).data;
    console.log(`full name: ${userData.full_name}`);
    console.log(`profile picture: ${userData.hd_profile_pic_versions[-1].url}`);
    console.log(`profile picture: ${userData.profile_pic_url_hd}`);
    console.log(`profile picture: ${userData.username}`);
    console.log(`Array Content: ${userData.edge_owner_to_timeline_media.edges}`);
    
    document.getElementById("profile_picture").attr("src", userData.hd_profile_pic_versions[-1].url);
    let view = `
    ${userData.edge_owner_to_timeline_media.edges.map(pic => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${pic.node.display_url}" alt="${pic.node.id}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${pic.node.edge_liked_by.count}
          </h3>
        </div>
      </div>
    `).slice(0,5).join('')}
    `;
    content.innerHTML = view;
  }catch(error){
    console.log(`KmiError: ${error}`);
    document.getElementById("text_description").textContent = "Contenido no disponible";
  }
})();