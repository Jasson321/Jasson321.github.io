document.addEventListener("DOMContentLoaded", function(){

    const botones = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".destino-card");

    botones.forEach(boton => {

        boton.addEventListener("click", function(){

            // ACTIVAR BOTON
            botones.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const filtro = this.dataset.filter;

            cards.forEach(card => {

                const categoria = card.dataset.category;

                if(filtro === "all" || filtro === categoria){

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

}); 