import { listing } from "./aptListing.js";

export function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener("input", function(e) {
        let val = this.value;

        closeAllLists();

        if (!val) { 
            return false;
        }

        currentFocus = -1;

        const a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        arr.forEach(i => {
            if (i.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                const b = document.createElement("div");
                b.innerHTML = "<strong>" + i.substr(0, val.length) + "</strong>";
                b.innerHTML += i.substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + i + "'>";

                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;

                    if(inp.value === "São Paulo"){
                        listing('sp', 'sao-paulo')
                    }

                    if(inp.value === "Rio de Janeiro"){
                        listing('rj', 'rio-de-janeiro')
                    }
                    closeAllLists();
                });

                a.appendChild(b);
            }
        })
        
    });

    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
  
        if (x) {
            x = x.getElementsByTagName("div");
        } 
            
        if (e.keyCode == 40) {
            currentFocus++;

            addActive(x);
        } 
        else if (e.keyCode == 38) {
            currentFocus--;

            addActive(x);
        } 
        else if (e.keyCode == 13) {
            e.preventDefault()
            if (currentFocus > -1) {
                if (x) {
                    const inputValue = document.querySelector(".autocomplete-active").childNodes[2].value;
                    if(inputValue === "São Paulo"){
                        listing('sp', 'sao-paulo')
                    }

                    if(inputValue === "Rio de Janeiro"){
                        listing('rj', 'rio-de-janeiro')
                    }
                    x[currentFocus].click();
                }
            }
        }
    });

    function addActive(x) {
        if (!x){
            return false;
        } 

        removeActive(x);

        if (currentFocus >= x.length){
            currentFocus = 0;
        }
        
        if (currentFocus < 0){
            currentFocus = (x.length - 1);
        }

        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}