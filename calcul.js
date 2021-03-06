// declarer les variables

// ==> les chiffres <==
let chiffres = [...document.querySelectorAll('.boutonChiffre')]

// ==> bouton décimal <==
const decimal = document.getElementById('bDecimal');

// ==> bouton opérations <==
const bOperation = [...document.querySelectorAll('.boutonOperation')]

// ==> bouton = <==
const egale = document.getElementById('bEgale')

// ==> écran affichage <==
const ecran = document.getElementById('ecran');
// commencer par 0
ecran.innerText = "0"

// input de tous les valeurs
let input = "0";

// initialiser la memoire
let memoire ;
const memoireElt = document.getElementById("memoire")

//récupérer la mémoire dans le localStorage
memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
if (memoire != 0) {
    memoireElt.style.display = "initial"
}

window.onload = () => {

    let touches = document.getElementsByTagName('button');

    // calculer avec clic
    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }
    // assurer que opération se clique juste 1 fois 
    for ( let i = 0; i<bOperation.length; i++) {
        bOperation[i].addEventListener('click', oneClick)
    }

    // assurer qu'un seul décimal dans le nombre 
    decimal.addEventListener("click", uneFois)

    // event pour calculer avec clavier
    document.addEventListener('keydown', gererTouches);
}

function gererTouches (e) {
    let touche ;
    const listTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Delete", "Backspace", ".", "+", "-", "*", "/"];

    // on vérifie si évènement est de type keydown
    if (e.type == "keydown" ) {
        // on compare la touche appuyé dans la liste autorisé
        if ( listTouches.includes(e.key)) {
            // empêcher action default du touche ( ex firefox ave touche /)
            e.preventDefault();
            // on stock la valeur dans variable touche
            touche = e.key;
        }
    }
    else {
        touche = this.innerText;    // sinon c'est du clic
    }

    // affichage chiffre, opération, décimal
    if (parseFloat(touche) >= 0 || touche == "." || touche == "*" || touche == "/" || touche == "+" || touche == "-"  ) {

        if ( parseFloat(touche) >= 0 || touche == "." ) {
            var inputchiffre = touche;
            console.log("chiffre " + inputchiffre)
            input = (input == "0")? touche : input + touche
            
            // // limiter à 16 caracteres, si dépasse enlever dernier chiffre
            // if ( input.length > 15) {
            //     console.log("15")
            //     input = input.substr(0, 15)
            // }
            ecran.innerText = input;
        }

        else {
            var inputOpera = touche;
            console.log("ope  " + inputOpera)
            input = input + touche.toString();
            ecran.innerText = input;
        }
        
        
        // activer les touches opérations quand on click sur les bouton chiffres
        if ( parseFloat(touche) >= 0) {
            // activer les boutons des opérations
            for (let i = 0; i <bOperation.length; i++) {
                bOperation[i].disabled = false;
            }
        }

        // les boutons opérations va desactiver les boutons chiffres
        // if ( touche == "*" || touche == "/" || touche == "+" || touche == "-" ) {
        //     for (let i = 0; i <chiffre.length; i++) {
        //         chiffre[i].disabled = false;
        //     }
        // }

        
    }
    // pour les autres boutons 
    else {
        switch (touche) {
            // touche C; on supprime tout
            case "C":
            case "Delete":
                input = "0";
                ecran.innerText = 0;
                // activer tous les boutons
                active()
                break;

            // resultat
            case "=":
            case "Enter":
                //  faire le calcul
                calcul();
                break;

            // case CE
            case "CE":
            case "Backspace":
                // effacer dernier chiffre entrée
                remouv()
        }
    }
}


// calculer ecran
function calcul() {
    let calcul ;
    // si le dernière caractère est une opération ou . décimal
    let lastNumber = ecran.textContent.charAt(ecran.textContent.length -1);
    
    if (isNaN (parseFloat(lastNumber)) || lastNumber == ".") {
        // on enlève opération ou "." pour faire le calcul
        calcul = ecran.textContent.substr(0, ecran.textContent.length -1);
        ecran.textContent = calcul; 
        input ="0"
    }

    // si le première caractère est : ou * => erreur
    let firstNumber = ecran.textContent.substr(0,1)
    if (firstNumber == "*" || firstNumber == "/" ) {
        ecran.textContent = "undefined";
        input ="0"
    }
    // si non faire le calcul avec eval()
    
        calcul = eval(ecran.textContent);
        // si le nombre est entier, afficher
        if ( Number.isInteger(calcul)) {
            ecran.textContent = calcul;
            input = "0"
        } 
        // si le nombre est un nombre décimal, arrondir à 2 chiffres
        else {
            ecran.textContent = calcul.toFixed(2) ;
            input = "0"
        }
    
}


// empecher le bouton decimal se click 2 fois de suite 
function uneFois () {
    decimal.disabled = true;
}

// assurer que opération se clique juste 1 fois
function oneClick (btn) {
    // desactiver cette bouton pour éviter 2 clic en même temps
    btn.disabled = true;
    // desactiver les autres opérations pour éviter une opération l'un après l'autre
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = true;
    }
    //activer le bouton decimal
    decimal.disabled = false;
}

// bouton CE , effacer 1 chiffre dans écran
function remouv(btn) {
    ecran.textContent = ecran.textContent.substr(0, ecran.textContent.length -1);
    input = input.substr(0, input.length -1)
    if (ecran.textContent == "0") {
        input = "0"
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
        chiffre[i].disabled = true;
    }
}

// function mettre en mémoire M+
function addMemoire (btn) {
    // récupérer le total dans écran affichage
    mem = eval(ecran.textContent)
    // touche M+  on stocke (en additionnant) à la valeur déjà en mémoire
    localStorage.memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) + parseFloat(mem) : parseFloat(mem);
    // afficher lettre M+ au écran
    memoireElt.style.display = "initial" ;
}

// function afficher mémoire avec MR
function showMemoire () {
    // on récupère la valeur stocké
    memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) : 0; 
    ecran.innerText = memoire;
}

// function remove mémoire avec M-
function delMemoire() {
    localStorage.memoire = 0;
    memoireElt.style.display = "none" ;
    
}



// ==> changer le theme avec bouton THEME <==

// accéder aux différent partie du calculateur
let bodytheme = document.querySelector('.bodytheme');
let seg1 = document.querySelector('.seg1');
let seg2 = document.querySelector('.seg2');
let seg3 = document.querySelector('.seg3');
let chiffre = document.querySelectorAll('.chiffre');
let blueKey = document.querySelectorAll('.blue-key');
let redKey = document.querySelector('.red-key');
let b7 = document.getElementById('b7')

// accéder au input range
let range = document.getElementById('range');

// ajouter les évènement de l'input
range.addEventListener('input', () => {
    // ==> pour changement de style, enlever la classe active puis ajouter nouvelle class

    //theme 1
    if (range.value == 1) {
        bodytheme.classList.remove('bodytheme2', 'bodytheme1')
        bodytheme.classList.add('bodytheme1')
        // document.body.style.backgroundColor = "hsl(222, 26%, 31%)"

        seg1.classList.remove('seg1theme2', 'seg1theme3')
        seg1.classList.add('seg1theme1');

        seg2.classList.remove('seg2theme2', 'seg2theme3')
        seg2.classList.add('seg2theme1');

        seg3.classList.remove('seg3theme2', 'seg3theme3')
        seg3.classList.add('seg3theme1');

        for ( let i= 0; i< chiffre.length; i++) {
            chiffre[i].classList.remove('chiffretheme2', 'chiffretheme3')
            chiffre[i].classList.add('chiffretheme1')
        }

        for ( let i= 0; i< blueKey.length; i++) {
            blueKey[i].classList.remove('blue-keytheme2', 'blue-keytheme3')
            blueKey[i].classList.add('blue-keytheme1')
        }
       
        redKey.classList.remove('red-keytheme2', 'red-keytheme3')
        redKey.classList.add('red-keytheme1')
    }

    // theme 2
    if (range.value == 2) {
        bodytheme.classList.remove('bodytheme1', 'bodytheme3')
        bodytheme.classList.add('bodytheme2')
        // document.body.style.backgroundColor = "hsl(0, 0%, 90%)"
        
        seg1.classList.remove('seg1theme1', 'seg1theme3')
        seg1.classList.add('seg1theme2')

        seg2.classList.remove('seg2theme1', 'seg2theme3')
        seg2.classList.add('seg2theme2');

        seg3.classList.remove('seg3theme1', 'seg3theme3')
        seg3.classList.add('seg3theme2');

        for ( let i= 0; i< chiffre.length; i++) {
            chiffre[i].classList.remove('chiffretheme1', 'chiffretheme3')
            chiffre[i].classList.add('chiffretheme2')
        }

        for ( let i= 0; i< blueKey.length; i++) {
            blueKey[i].classList.remove('blue-keytheme1', 'blue-keytheme3')
            blueKey[i].classList.add('blue-keytheme2')
        }
       
        redKey.classList.remove('red-keytheme1', 'red-keytheme3')
        redKey.classList.add('red-keytheme2')
    }

    // theme 3
    if (range.value == 3) {
        bodytheme.classList.remove('bodytheme1', 'bodytheme2')
        bodytheme.classList.add('bodytheme3')
        // document.body.style.backgroundColor = "hsl(268, 75%, 9%)"

        seg1.classList.remove('seg1theme1', 'seg1theme2')
        seg1.classList.add('seg1theme3');

        seg2.classList.remove('seg2theme1', 'seg2theme2')
        seg2.classList.add('seg2theme3');

        seg3.classList.remove('seg3theme1', 'seg3theme2')
        seg3.classList.add('seg3theme3');

        for ( let i= 0; i< chiffre.length; i++) {
            chiffre[i].classList.remove('chiffretheme1', 'chiffretheme2')
            chiffre[i].classList.add('chiffretheme3')
        }

        for ( let i= 0; i< blueKey.length; i++) {
            blueKey[i].classList.remove('blue-keytheme1', 'blue-keytheme2')
            blueKey[i].classList.add('blue-keytheme3')
        }
       
        redKey.classList.remove('red-keytheme1', 'red-keytheme2')
        redKey.classList.add('red-keytheme3')
    }

})