import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {



  constructor() {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);
        const cat = link.getAttribute("data-category");
        this.getGames(cat);
      });
    });

    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");



    this.ui = new Ui();

    this.getGames("mmorpg");

  }


  changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");

  }


  async getGames(category) {


    this.loading.classList.remove("d-none");

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '98a2630f11mshd161de8ef6b300fp1aadfcjsn95eff08308aa',

        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };


    try {
      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);

      const response = await api.json();
      this.loading.classList.add("d-none");
      console.log(response);
      this.ui.displayDataGame(response);

    }
    catch (error) {
      console.log("error");
      return;
    }






    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        // console.log("hello");
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");

        this.detailsSection = new Details(card.dataset.id);
      });
    });
  }
}