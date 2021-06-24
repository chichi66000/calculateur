// Declarer les buttons variables/ 
// Methode 1 avec KeyCode et eval(), déjà désapprécié , pour démontration seulement

// boutonChiffre les chiffres et =
const chiffre = document.querySelectorAll('.boutonChiffre')
// boutonOperation: les opérations
const bOperation = [...document.querySelectorAll('.boutonOperation')]

// bouton3: le . decimal
const decimal = document.getElementById('bDecimal');


const memoireElt = document.getElementById("memoire")
const touches = [...document.querySelectorAll('.boutonChiffre')];
console.log(touches, typeof touches)
// const listeKeycode = touches.map( touche => touche.dataset.key);
const ecran = document.getElementById('ecran');
const listTouches = ["7", "8", "9", "Delete", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0", "/", "*", "M+", "M-", "MR", "Enter", "C", "="];

// initialiser la memoire
let memoire ;


window.onload = () => {
    document.addEventListener('keydown', (e) => {
       // avec clavier, verifier que les touches sont autorisés
        if ( listTouches.includes(e.key)) {
            // empêcher action default du touche ( ex firefox /)
            e.preventDefault();
            let valeur = e.key; 
            calculer(valeur)
        }
    })

    // function verifier () {
    //     var nbClick=0;
    //     var nbClickMax=1;
    //     let valeur;
    //             // empecher cliquer 2 fois de suite sur le bouton decimal
    //     decimal.addEventListener('click', compterDecimal)
    //     function compterDecimal () {
            
    //         if (++nbClick > nbClickMax) {
    //             decimal.disabled = true
    //         }
    //         else {
    //             decimal.disabled = false;
    //             valeur = decimal.textContent
    //             console.log(valeur);
    //             return valeur
    //         }
    //     }

    //     // empêcher clic 2 fois de suite sur les boutons opérations
    //     for (let i = 0; i <bOperation.length; i++) {
    //         bOperation[i].addEventListener('click', () => {
    //             // si le bouton decimal est disabled, réactiver le
    //             if ( decimal.disabled == true) {
    //                 decimal.disabled = false;
    //             }
                
    //             console.log(decimal)
    //             if (++nbClick > nbClickMax) {
    //                 bOperation[i].disabled = true;
    //                 console.log(bOperation[i].textContent)
    //             }
    //             else {
    //                 valeur = bOperation.textContent; 
    //                 return valeur
    //             }
    //         } )
                
    //     }
    // }
    // verifier()

    
    // avec click, assurer de bien cibler dans le calculateur
    document.addEventListener('click', (e) => {
        if (listTouches.includes(e.target.innerText)) {
            var nbClick=0;
            var nbClickMax=1;
            decimal.addEventListener('click', compterDecimal)
            function compterDecimal () {
            
                if (++nbClick > nbClickMax) {
                    decimal.disabled = true
                }
                else {
                    decimal.disabled = false;
                    // valeur = decimal.textContent
                    // console.log(valeur);
                    // return valeur
                }
            }

            const valeur = e.target.innerText;
        
            calculer(valeur)
        }
    })

    //récupérer la mémoire dans le localStorage
    memoire = (localStorage.memoire) ? localStorage.memoire : 0;
    if (memoire != 0) {
        memoireElt.style.display = "initial"
    }
}




function calculer (valeur) {
   
    // // verifier si le touche pressé est dans la listeCode

    
        switch (valeur) {
            case 'C':
            case "Delete":
                ecran.textContent = "0"
                break;

            case "=":
            case "Enter":
                

                
                // affichage = ecran.textContent;
                // console.log(affichage.split(".").length)
                const calcul = eval(ecran.textContent);
                ecran.textContent = calcul ;
                break;
            
            case "M+":
                // touche M+  on stocke (en additionnant) à la valeur déjà en mémoire
                localStorage.memoire = (localStorage.memoire)? eval(localStorage.memoire + ecran.textContent ) : eval(ecran.textContent);

            default:
                // let affichage ;
                // affichage += valeur;
                // if (affichage.count('.'))
                ecran.textContent += valeur
                break;
        }
    
}