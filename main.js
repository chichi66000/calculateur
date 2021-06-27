

// variable globale
// element memoire
const memoireElt = document.getElementById("memoire")
const ecranElt = document.getElementById('ecran')

// on stock la valeur de ecran "précédent"
let precedent = 0;

// on stock la valeur d'affichage
let affichage = "";

// variable des opérations;
let operation = null;

// initialiser la memoire
let memoire ;

// attendre que window se charge
window.onload = () => {
    let touches = document.querySelectorAll('.bouton');
    
    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }
    
    document.addEventListener('keydown', gererTouches);

    //récupérer la mémoire dans le localStorage
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if (memoire != 0) {
        memoireElt.style.display = "initial"
    }
}

// fonction gerer les touches au clic
function gererTouches (e) {
    let touche ;
    const listTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Delete", ".", "+", "-", "*", "/"];

    // on vérifie si évènement est de type keydown
    if (e.type == "keydown" ) {
        // on compare la touche appuyé dans la liste autorisé
        if ( listTouches.includes(e.key)) {
            // empêcher action default du touche ( ex firefox /)
            e.preventDefault();
            // on stock la valeur dans variable touche
            touche = e.key;
            console.log(touche)
        }
    }
    else {
        touche = this.innerText;    // sinon c'est du clic
    }

    // vérifier si la touche est chiffre ou .
    if (parseFloat(touche) >= 0 || touche ==".") {
        // verifier si la chaine n'a plus d'1 .

        // verifier si y a un chifre avant?
        affichage = (affichage =="") ? touche.toString() : affichage + touche.toString();
        // afficher dans ecran
        ecranElt.innerText = affichage;
    }
    // si c'est pas les chiffres => les opérations
    else {
        switch (touche) {
            // touche C; on supprime tout
            case "C":
            case "Delete":
                precedent = 0;
                operation = null;
                affichage = "";
                ecranElt.innerText = 0;
                break;
            
            // Calcul
            case "+":
            case "-":
            case "*":
            case "/":
                // on calcul la valeur de opération précédente:
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);

                // on met à jour ecran
                ecranElt.innerText = precedent;
                // on stock operation
                operation = touche;
                // reinitialiser affichage
                affichage = "";
                break;
            // resultat
            case "=":
            case "Enter":
                // on calcule étape précedent + operation
                precedent = (precedent === 0) ? parseFloat (affichage) : calculer (precedent , parseFloat(affichage), operation);
                // on met à jour ecran
                ecranElt.innerText = precedent;
                // on stock le resultat dans variable affichage
                affichage = precedent;
                // reinitialiser precedent
                precedent = 0;
                break;

            // on gère la memoire
            case "M+":
                // touche M+  on stocke (en additionnant) à la valeur déjà en mémoire
                localStorage.memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                // afficher lettre M+ au écran
                memoireElt.style.display = "initial" ;
                break;
            
            case "M-":
                localStorage.memoire = 0;
                memoireElt.style.display = "none" ;
                break;

            case "MR":
                // on récupère la valeur stocké
                memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) : 0;
                affichage = memoire;
                ecranElt.innerText = memoire;
                break;
            
            default:
                break;
        }
    }
}

// fonction calculer avec les opérations
// nb1, nb2 = Number ; operation = String; result = number
function calculer (nb1, nb2, operation) {
    
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    
    if ( operation === "+") {return nb1 + nb2}
    if ( operation === "-") {return nb1 - nb2}
    if ( operation === "*") {return nb1 * nb2}
    if ( operation === "/") {return nb1 / nb2}
}

