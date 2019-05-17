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
 const select=document.getElementById("product-select");
 
    listaLekara.lekari.forEach((lekar) =>  { 
    let option=document.createElement("option");
    option.innerHTML=lekar.ime+" "+lekar.prezime+" ("+lekar.zvanje+")";
    option.value=lekar.korisnickoIme;
    select.appendChild(option);
    ratings[lekar.korisnickoIme]="5.0";
    
});
//dodeliKlase();

   
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

      // Make sure 5 or under
      if (rating > 5) {
        alert('Please rate 1 - 5');
        return;
      }

      // Change rating
      ratings[product] = rating;

      getRatings();
    });

    // Get ratings
    function getRatings() {
      for (let rating in ratings) {
        // Get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100;

        // Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        // Set width of stars-inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

        // Add number rating
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
      }
    }
    
    function dodeliKlase()
    {
       let i=1;
       var tabela=document.getElementById("dataTable");
       
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