

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
let input = "0"

// on stock la valeur d'affichage
let affichage = "0";

// variable des opérations;
let operation = null;

// initialiser la memoire
let memoire ;

// list des touches clavier autorisé
const listTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Delete", "Backspace", ".", "+", "-", "*", "/"];

// tous les boutons 
let touches = document.getElementsByTagName('button');

// ecran commence par 0
ecranResul.innerText = "0";
ecranElt.textContent = "0";

// attendre que window se charge
window.onload = () => {

    // 1 seul decimal
    decimal.addEventListener("click", uneFois);

    // assurer que opération se clique juste 1 fois 
    for ( let i = 0; i<bOperation.length; i++) {
        bOperation[i].addEventListener('click', oneClick)
    }

    
    document.addEventListener('keydown', function (event) {
        // si la touche appuyé est dans la liste autorisés, on associé avec action du clic
        if (listTouches.includes(event.key)) {
            event.preventDefault();

            // pour les chiffres
            for(let i = 0 ; i< chiffre.length; i++){
                // si la valeur du clavier = valeur du bouton, on associer action du clavier avec le clic
                if (event.key == chiffre[i].innerText ) {
                    
                    chiffre[i].click()
                }
            }

            // pour les opérations
            for(let i = 0 ; i< bOperation.length; i++){
                // si la valeur du clavier = valeur du bouton, on associer action du clavier avec le clic
                if (event.key == bOperation[i].innerText ) {
                    
                    bOperation[i].click()
                }
            }

            // pour le . décimal
            if (event.key == ".") {
                console.log(event.key)

                // associer à bouton C
            decimal.click()
            }

                // pour la touche Delete au clavier
            if (event.key == "Delete") {
                    console.log(event.key)

                    // associer à bouton C
            document.getElementById("bDel").click()
                }
                // pour la touche Backspace au clavier
            if (event.key == "Backspace") {
                    console.log(event.key)

                    // associer à bouton C
                    document.getElementById("bD").click()
                }
                // pour la touche Enter au clavier
            if (event.key == "Enter") {
                    
                    // associer à bouton C
                    document.getElementById("bEgale").click()
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
    // if (e.type == "keydown" ) {
    //     // on compare la touche appuyé dans la liste autorisé
    //     if ( listTouches.includes(e.key)) {
    //         // empêcher action default du touche ( ex firefox /)
    //         e.preventDefault();
    //         // on stock la valeur dans variable touche
    //         touche = e.key;
            
    //     }
    // }
    // else {
        touche = this.innerText;    // sinon c'est du clic
    // }

    // vérifier si la touche est chiffre ou .
    if (parseFloat(touche) >= 0 || touche ==".") {
        // regex pour chiffre decimal, et chiffre entier
        // let regex = /^(-?\d*)((\.(\d*)?)?)$/g;
        // verifier si la chaine n'a plus d'1 .
        
        // verifier si y a un chifre avant?
        affichage = (affichage =="0") ? touche.toString() : affichage + touche.toString()
        ;
        // on stock les nombres dans input
        input =  input + touche.toString();
        // if (input == "0" && touche == ".") {
        //     input = input + touche
        // }
    
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
            // case "Delete":
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
                let regexO = /^(\d)/g;
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
                affichage = "0";
                oneClick()
                break;

            // resultat
            case "=":
            // case "Enter":
                // on calcule étape précedent + operation
                precedent = (precedent === 0) ? parseFloat (affichage) : calculer (precedent , parseFloat(affichage), operation);
                
                // ecran en haut affiche tous les opérations
                ecranElt.innerText = input;

                let calcul ;
                
                // si le dernière caractère est une opération ou . décimal
                let lastNumber = ecranElt.innerText.charAt(ecranElt.innerText.length -1);
                console.log("last " + lastNumber)
                if (isNaN (parseFloat(lastNumber)) || lastNumber == ".") {
                    // on enlève opération ou "." pour faire le calcul
                    
                    calcul = ecranElt.innerText.substr(0, input.length -1);
                    ecranElt.innerText = calcul; 
                    input ="0"
                }
                // si non faire le calcul avec eval()
                    
                calcul = eval(ecranElt.textContent);
                // si le nombre est entier, afficher
                if ( Number.isInteger(calcul)) {
                    ecranResul.textContent = calcul;
                    input = "0"
                } 
                // si le nombre est un nombre décimal, arrondir à 2 chiffres
                else {
                    ecranResul.textContent = calcul.toFixed(2) ;
                    input = "0"
                }

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
                // ajoute dans input
                input = input + memoire;
                ecranElt.innerText = input;
                break;

            case "CE":
            // case "Backspace":
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
    //activer le bouton decimal
    decimal.disabled = false;

    // desactiver les autres opérations pour éviter une opération l'un après l'autre
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = true;
    }
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
        chiffre[i].disabled = false;
    }
}

// bouton CE , effacer 1 chiffre dans écran
function remouv() {
    ecranElt.textContent = ecranElt.textContent.substr(0, ecranElt.textContent.length -1);
    input = input.substr(0, input.length -1);
    ecranResul.innerText = eval(input)
    if (ecranElt.textContent == "") {
        input = "0";
        ecranResul.innerText = "0"
    }
}