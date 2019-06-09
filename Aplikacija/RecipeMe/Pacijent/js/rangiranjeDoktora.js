//prilikom ucitavanja stranice se izvrsava...
prikaziLekare();
// Initial Ratings
 var ratings={} ;


//popunjavanje select polja i tabele sa lekarima
function prikaziLekare(){
   fetch("../../Administrator/php/lekari.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaLekara=>prikaziPodatke(listaLekara))
           .catch(error => console.log(error));
    
}
function prikaziPodatke(listaLekara)
{
 let nizVrednosti=[];
 const select=document.getElementById("product-select");
 
    listaLekara.lekari.forEach((lekar) =>  { 
    let option=document.createElement("option");
    option.innerHTML=lekar.ime+" "+lekar.prezime+" ("+lekar.zvanje+")";
    option.value=lekar.korisnickoIme;
    select.appendChild(option);
    nizVrednosti.push(lekar.korisnickoIme);
    
    
});

//nizVrednosti.sort();
nizVrednosti.forEach(x => ratings[x]="0.0");
izracunavanjeOcenaLekara();


   
}

function izracunavanjeOcenaLekara()
{
    fetch("../php/vratiOcene.php")
            .then(response =>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((response) => {
        {
            
            for(let key in ratings)
            {
                let suma=0;
                let brojac=0;
                response.forEach((o)=>
                {
                    if(o.lekar==key)
                    {
                        suma+=parseFloat(o.ocena);
                        brojac++;
                        
                    }
                });
                if(brojac!=0)
                ratings[key]=(suma/brojac).toFixed(2);
            else
                ratings[key]=(suma/1).toFixed(2);
            }
            getRatings();
        }
    }).catch(error => console.log(error));
    
}





    // Total Stars
    const starsTotal = 5;

    // Run getRatings when DOM loads
    document.addEventListener('DOMContentLoaded', getRatings);

    // Form Elements
    const productSelect = document.getElementById('product-select');
    const ratingControl = document.getElementById('rating-control');

    // Init product
    let product;

    // Product select change
    productSelect.addEventListener('change', (e) => {
      product = e.target.value;
      // Enable rating control
      ratingControl.disabled = false;
      ratingControl.value = ratings[product];
    });
    
    

    // Rating control change
    ratingControl.addEventListener('blur', (e) => {
     const rating = e.target.value;
     unesiOcenu(rating);
     
      // Make sure 5 or under
      if (rating > 5) {
        alert('Please rate 1 - 5');
        return;
      }
     // ratings[product] = rating;
    izracunavanjeOcenaLekara();
      //getRatings();
  });
  
  ratingControl.addEventListener('keypress', (e) => {
    if(e.key==='Enter')
    {
        const rating = e.target.value;
    
        unesiOcenu(rating);
        izracunavanjeOcenaLekara();
        // Make sure 5 or under
        if (rating > 5) {
         alert('Please rate 1 - 5');
        return;
        }
     // ratings[product] = rating;

      getRatings();
  }
  });
      
   function unesiOcenu(rating)
   {
      var username = sessionStorage.getItem("name");
    
       const formData = new FormData();
       formData.append("pacijent",username);
       formData.append("lekar",product);
       formData.append("ocena",rating);
   
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
    fetch("../php/oceniLekara.php",fetchData)
            .then(response =>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(() => {})
    
            .catch(error => console.log(error));
    

   }

    // Get ratings
    function getRatings() {
      for (let rating in ratings) {
        // Get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100;

        // Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        // Set width of stars-inner to percentage\
        if(document.querySelector(`.${rating} .stars-inner`)!=null)
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

        // Add number rating
        if(document.querySelector(`.${rating} .number-rating`)!=null)
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
      }
    }
    
    function dodeliKlase()
    {
       
       var tabela=document.getElementById("dataTable");
       let i=1;
       for(let rating in ratings)
       {
           if(i%2==1)
           tabela.rows[i].classList.remove("odd");  
       else
             tabela.rows[i].classList.remove("even"); 
  
	tabela.rows[i].classList.add(rating);
        i++;
			
       }
	
    }