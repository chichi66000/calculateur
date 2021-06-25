// declarer les variables

// ==> les chiffres <==
let chiffres = [...document.querySelectorAll('.chiffre')]

// ==> bouton décimal <==
const decimal = document.getElementById('bDecimal');

// ==> bouton opérations <==
const bOperation = [...document.querySelectorAll('.boutonOperation')]

// ==> écran affichage <==
const ecran = document.getElementById('ecran');

// input de tous les valeurs
let input = "";

// initialiser la memoire
let memoire ;
const memoireElt = document.getElementById("memoire")

//récupérer la mémoire dans le localStorage
memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
if (memoire != 0) {
    memoireElt.style.display = "initial"
}

// window.onload = () => {

//     for ( let chiffre of chiffres) {
//         chiffre.addEventListener('click', showValue)
//     }
//     ["keydown", "click"].forEach(function(event) {
//         decimal.addEventListener(event, () => {
//         uneFois();
//         }, false)
//     })

//     document.addEventListener('keydown', showValue);
// }


// afficher les values des boutons dans écran
function showValue(btn) {

    input = input + btn.innerText;
    ecran.innerHTML = input;
    // activer les boutons des opérations
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = false;
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
        input =""
    }
    // si le première caractère est : ou * => erreur
    let firstNumber = ecran.textContent.substr(0,1)
    if (firstNumber == "*" || firstNumber == "/" ) {
        ecran.textContent = "undefined";
        input =""
    }
    // si non faire le calcul avec eval()
    
        calcul = eval(ecran.textContent);
        // si le nombre est entier, afficher
        if ( Number.isInteger(calcul)) {
            ecran.textContent = calcul;
            input = ""
        } 
        // si le nombre est un nombre décimal, arrondir à 2 chiffres
        else {
            ecran.textContent = calcul.toFixed(2) ;
            input = ""
        }
    
}

// supprimer ecran avec le C
function del () {
    //réinitialiser écran
    ecran.innerHTML = 0;
    input ="";
}

// empecher le bouton decimal et chaque operation se click 2 fois de suite et l'un après l'autre
function uneFois () {
    decimal.disabled = true;
    console.log("true")
    // for (let i = 0; i <bOperation.length; i++) {
    //     bOperation[i].disabled = false;
    // }
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
function remov(btn) {
    ecran.textContent = ecran.textContent.substr(0, ecran.textContent.length -1);
    if (ecran.textContent == "") {
        input = ""
    }
}

// activer tous les boutons avec = , CE, C
function active() {
    decimal.disabled = false;
    for (let i = 0; i <bOperation.length; i++) {
        bOperation[i].disabled = false;
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

// function afficher mémoire
function showMemoire () {
    // on récupère la valeur stocké
    memoire = (localStorage.memoire)? parseFloat(localStorage.memoire) : 0; 
    ecran.innerText = memoire;
}

// function remove mémoire
function delMemoire() {
    localStorage.memoire = 0;
    memoireElt.style.display = "none" ;
    
}

// ==> changer le theme avec bouton <==

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