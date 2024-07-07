import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {


    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });

    document.addEventListener("keydown", (e) => {


      if (e.key === 'Escape') {
        document.getElementById("details").classList.add("d-none");
        document.getElementById("games").classList.remove("d-none");
      }

    });

    this.loading = document.querySelector(".loading");


    this.getDetails(id);
  }

  async getDetails(id) {

    this.loading.classList.remove('d-none');

    const option = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '98a2630f11mshd161de8ef6b300fp1aadfcjsn95eff08308aa',

        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, option);

    const response = await api.json();
    this.loading.classList.add('d-none');

    console.log(response);

    this.ui = new Ui().displayDetails(response);
  }
}