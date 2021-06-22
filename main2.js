// Declarer les buttons variables/ 
// Methode 1 avec KeyCode et eval(), déjà désapprécié , pour démontration seulement

const memoireElt = document.getElementById("memoire")
const touches = [...document.querySelectorAll('.bouton')];
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
            const valeur = e.key; 
            calculer(valeur)
        }
    })

    // avec click, assurer de bien cibler dans le calculateur
    document.addEventListener('click', (e) => {
        if (listTouches.includes(e.target.innerText)) {
            const valeur = e.target.innerText;
        // ecran.innerText = valeur;
        
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
                const calcul = eval(ecran.textContent)
                ecran.textContent = calcul ;
                break;
            
            case "M+":
                // touche M+  on stocke (en additionnant) à la valeur déjà en mémoire
                localStorage.memoire = (localStorage.memoire)? eval(localStorage.memoire + ecran.textContent ) : eval(ecran.textContent);

            default:
                ecran.textContent += valeur
                break;
            
        }
    
}