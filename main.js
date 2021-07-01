

// variable globale
// element memoire
const memoireElt = document.getElementById("memoire")
const ecranElt = document.getElementById('ecran')
const ecranResul = document.getElementById('ecranB')

// ==> bouton décimal <==
const decimal = document.getElementById('bDecimal');

// ==> bouton opérations <==
const bOperation = [...document.querySelectorAll('.boutonOperation')]

// ==> les chiffres <==
let chiffre = [...document.querySelectorAll('.boutonChiffre')]

// on stock la valeur de ecran "précédent"
let precedent = 0;

// on stock tous les opérations
let input = ""

// on stock la valeur d'affichage
let affichage = "";

// variable des opérations;
let operation = null;

// initialiser la memoire
let memoire ;

// list des touches clavier autorisé
const listTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Delete", "Backspace", ".", "+", "-", "*", "/"];

// tous les boutons 
let touches = document.getElementsByTagName('button');

// ecran commence par 0
ecranB.innerText = "0";
ecran.textContent = "";

// attendre que window se charge
window.onload = () => {

    // 1 seul decimal
    decimal.addEventListener("click", uneFois);

    // assurer que opération se clique juste 1 fois 
    for ( let i = 0; i<bOperation.length; i++) {
        bOperation[i].addEventListener('click', oneClick)
    }

    
    document.addEventListener('keydown', function (event) {
        if (listTouches.includes(event.key)) {
            event.preventDefault();
            // si la valeur du clavier = valeur du bouton, on déclenche le clic
            for(let touche of touches){
                if (event.key == touche.innerText) {
                    console.log(event.key, touche.innerText)
                    touche.click()
                }
            }
        }
    });

    // calculer avec clic
    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }

    //récupérer la mémoire dans le localStorage
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if (memoire != 0) {
        memoireElt.style.display = "initial"
    }
}

// fonction gerer les touches au clic
function gererTouches (e) {
    let touche ;
    

    // on vérifie si évènement est de type keydown
    if (e.type == "keydown" ) {
        // on compare la touche appuyé dans la liste autorisé
        if ( listTouches.includes(e.key)) {
            // empêcher action default du touche ( ex firefox /)
            e.preventDefault();
            // on stock la valeur dans variable touche
            touche = e.key;
            
        }
    }
    else {
        touche = this.innerText;    // sinon c'est du clic
    }

    // vérifier si la touche est chiffre ou .
    if (parseFloat(touche) >= 0 || touche ==".") {
        // regex pour chiffre decimal, et chiffre entier
        let regex = /^(-?\d*)((\.(\d*)?)?)$/g;
        // verifier si la chaine n'a plus d'1 .
        
        // verifier si y a un chifre avant?
        affichage = (affichage =="") ? touche.toString() : affichage + touche.toString()
        ;
        // on stock les nombres dans input
        input = (input =="") ? touche.toString() : input + touche.toString();

        // s'il y a plus 2 . decimal, garder que 1 seul
        if ( !input.match(regex)) {console.log("no")}
        else {console.log("yes")}
    
        ecranElt.innerText = input;

        console.log("input chiffre " + input)
        // afficher dans ecran
        ecranResul.innerText = eval(input);

        // activer les boutons des opérations
        for (let i = 0; i <bOperation.length; i++) {
            bOperation[i].disabled = false;
        }
        return input
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
                ecranResul.innerText = 0;

                input = "0";
                active();
                break;
            
            // Calcul
            case "+":
            case "-":
            case "*":
            case "/":
                // on ajoute opération dans input
                input += touche;
                console.log("input2 " + input);
                // affichage les opérations dans écran haut
                ecranElt.innerText = input;

                // on calcul la valeur de opération précédente:
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);

                // on met à jour ecran
                // ecranResul.innerText = precedent;

                // on stock operation
                operation = touche;

                console.log(input)
                
                // reinitialiser affichage
                affichage = "";
                oneClick()
                break;

            // resultat
            case "=":
            case "Enter":
                // on calcule étape précedent + operation
                precedent = (precedent === 0) ? parseFloat (affichage) : calculer (precedent , parseFloat(affichage), operation);
                console.log("input resultat " + input)
                console.log("resultat " + eval(input))
                ecranElt.innerText = input;

                // on met à jour ecran
                ecranResul.innerText = eval(input);
                // on stock le resultat dans variable affichage
                affichage = 0;

                // reinitialiser precedent
                precedent = 0;
                input = "0";
                active()
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

            case "CE":
            case "Backspace":
                // effacer dernier chiffre entrée
                remouv()
            
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

// empecher le bouton decimal se click 2 fois de suite 
function uneFois () {
    decimal.disabled = true;
}

// assurer que opération se clique juste 1 fois
function oneClick () {
    // desactiver cette bouton pour éviter 2 clic en même temps
    this.disabled = true;
    // desactiver les autres opérations pour éviter une opération l'un après l'autre
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = true;
    }
    //activer le bouton decimal
    decimal.disabled = false;
}

// activer tous les boutons avec = , CE, C
function active() {
    // decimal
    decimal.disabled = false;
    // oprération
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = false;
    }
    // chiffres
    for (let i = 0; i <chiffre.length; i++) {
        chiffre[i].disabled = true;
    }
}

// bouton CE , effacer 1 chiffre dans écran
function remouv() {
    ecran.textContent = ecran.textContent.substr(0, ecran.textContent.length -1);
    input = input.substr(0, input.length -1)
    if (ecran.textContent == "0") {
        input = "0"
    }
}