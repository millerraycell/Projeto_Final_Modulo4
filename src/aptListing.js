import { apiCall } from "./backendApi.js";

export async function listing(state, city){

    if(document.querySelector(".api-number-result")){
        document.querySelector(".city-state-search-container").remove()
        document.querySelector(".api-number-result").remove();
        document.querySelector(".breadcrumb").remove();
        document.querySelector(".city-state").remove();
        document.querySelector(".houses").remove();
    }
    
    if(state === undefined && city === undefined){
        return ;
    }

    const data = await apiCall(state, city);
    const searchDiv = document.querySelector(".search");

    if (state == "sp"){
        const main = document.querySelector("main");

        const topText = document.createElement("div");
        topText.className = "breadcrumb";
        topText.innerHTML = `
            <ol>
                <li>Viva Real</li> 
                <li>Venda</li>
                <li>SP</li>
                <li>Imoveis à venda em São Paulo</li>
            </ol>
        `;


        const divLocalizacao = document.querySelector(".localizacao");

        const cityText = document.createElement("div");
        cityText.className = "city-state";
        cityText.innerHTML = `<h5>São Paulo - SP</h5>`;

        const buttonSubmit = document.createElement("button");
        buttonSubmit.className = "button-city-state";
        buttonSubmit.type = "submit";
        buttonSubmit.innerHTML = "x";

        buttonSubmit.addEventListener("click", e => {
            listing();  
            cityText.remove();
            cityTextSearch.remove();
        })
        
        divLocalizacao.appendChild(cityText);
        cityText.appendChild(buttonSubmit);

        main.parentElement.insertBefore(topText, main);
        
        const resultNumbers = document.createElement("div");
        resultNumbers.className = "api-number-result";
        resultNumbers.innerHTML = `<h1><strong>${data['search']['totalCount']}</strong> Imóveis à venda em São Paulo - SP</h1>`
    
        searchDiv.appendChild(resultNumbers);

        const cityTextSearchContainer = document.createElement("div");
        cityTextSearchContainer.className = "city-state-search-container";

        searchDiv.appendChild(cityTextSearchContainer);

        const cityTextSearch = document.createElement("div");
        cityTextSearch.className = "city-state-search";
        cityTextSearch.innerHTML = `<h5>São Paulo - SP</h5>`;

        const cityTextSearchButton = document.createElement("button");
        cityTextSearchButton.className = "button-city-state";
        cityTextSearchButton.innerHTML = "x";

        cityTextSearch.appendChild(cityTextSearchButton);

        cityTextSearch.addEventListener("click", e => {
            listing();  
            cityTextSearch.remove();
        });
        
        cityTextSearchContainer.appendChild(cityTextSearch);
    }  

    if (state == "rj"){
        const main = document.querySelector("main");

        const topText = document.createElement("div");
        topText.className = "breadcrumb";
        topText.innerHTML = `
            <ol>
                <li>Viva Real</li> 
                <li>Venda</li>
                <li>RJ</li>
                <li>Imoveis à venda em Rio de Janeiro</li>
            </ol>
        `;


        const divLocalizacao = document.querySelector(".localizacao");

        const cityText = document.createElement("div");
        cityText.className = "city-state";
        cityText.innerHTML = `<h5>Rio de Janeiro - RJ</h5>`;

        const buttonSubmit = document.createElement("button");
        buttonSubmit.className = "button-city-state";
        buttonSubmit.type = "submit";
        buttonSubmit.innerHTML = "x";

        buttonSubmit.addEventListener("click", e => {
            listing();  
            cityText.remove();
            cityTextSearch.remove();
        })
        
        divLocalizacao.appendChild(cityText);
        cityText.appendChild(buttonSubmit);

        main.parentElement.insertBefore(topText, main);
        
        const resultNumbers = document.createElement("div");
        resultNumbers.className = "api-number-result";
        resultNumbers.innerHTML = `<h1><strong>${data['search']['totalCount']}</strong> Imóveis à venda em Rio de Janeiro - RJ</h1>`
    
        searchDiv.appendChild(resultNumbers);

        const cityTextSearchContainer = document.createElement("div");
        cityTextSearchContainer.className = "city-state-search-container";

        searchDiv.appendChild(cityTextSearchContainer);

        const cityTextSearch = document.createElement("div");
        cityTextSearch.className = "city-state-search";
        cityTextSearch.innerHTML = `<h5>Rio de Janeiro - RJ</h5>`;

        const cityTextSearchButton = document.createElement("button");
        cityTextSearchButton.className = "button-city-state";
        cityTextSearchButton.innerHTML = "x";

        cityTextSearch.appendChild(cityTextSearchButton);

        cityTextSearch.addEventListener("click", e => {
            listing();  
            cityTextSearch.remove();
        });
        
        cityTextSearchContainer.appendChild(cityTextSearch);
    }

    const houses = document.createElement("div");
    houses.className = "houses";

    data.search.result.listings.forEach(e => {
        const house = document.createElement("div");
        house.className = "house";

        const houseImg = document.createElement("div");
        houseImg.className = "houseImg";

        houseImg.innerHTML = `
            <img class="house-img" src="${e.medias[0].url}"/>
        `;

        const houseSpecs = document.createElement("div");
        houseSpecs.className = "house-specs";

        houseSpecs.innerHTML = `
            <span class="address">${e.link.data.street}, ${e.link.data.streetNumber} - ${e.link.data.neighborhood}, ${e.link.data.state} - ${state.toUpperCase()}</span>
            <h1>${e.link.name}</h1>
            <h5 class="specs"><strong>${e.listing.usableAreas}</strong> m<sup>2</sup> <strong>${e.listing.bedrooms[0]}</strong> quartos <strong>${e.listing.bathrooms[0]}</strong> Banheiros <strong>${e.listing.parkingSpaces[0]}</strong> Vaga(s)</h5>
        `;

        const amenities = document.createElement('div');
        amenities.className = "amenities";

        e.listing.amenities.forEach(j => {
            const amen = document.createElement("h5");
            amen.innerHTML = `${j}`;

            amenities.appendChild(amen);
        })

        houseSpecs.appendChild(amenities);

        const pricinginfo = document.createElement("h1");
        pricinginfo.className = "pricing-info";

        pricinginfo.innerHTML = `R$ ${e.listing.pricingInfos[0].price}`;

        houseSpecs.appendChild(pricinginfo);

        console.log(e);
        house.appendChild(houseImg);
        house.appendChild(houseSpecs);
        houses.appendChild(house);
    });

    searchDiv.appendChild(houses)
}