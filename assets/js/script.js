var joueur=1;
var nbcolonnes=3;
var nblignes=3;
var jeu=true;
var txt="";
var plateau = [];
// for(var i=0; i<nblignes;i++) plateau[i]=new Array();
for(var i=0; i<nblignes;i++){
	plateau[i]=[];
}

NewGame();

function NewGame(){
	//this.nblignes indique le contexte courant (les variables disponibles) on peut donc noter this.nblignes ou nblignes.

	for(var i=0; i<nblignes;i++){
		for(var j=0;j<nbcolonnes;j++){
			plateau[i][j]=0;
		}
	}
	joueur=1;
	afficheTextAnnonce("Le jeu commence, c'est au tour du joueur "+nomDuJoueur(joueur)+"!");
	jeu=true;
	creerTableau();
}

function afficheTextAnnonce(texte){
	document.getElementById("text-annonce").innerHTML=texte;
}

function nomDuJoueur(numjoueur){
	if(numjoueur==1){
		return "rouge";
	}else{
		return "bleu";
	}
}

function creerTableau(){
	txt="<table>";
	for(var i=0;i<nblignes;i++){
		txt+="<tr>";
		for(var j=0;j<nbcolonnes;j++){
			txt+="<td onclick='detecteclic("+i+', '+j+")' id='"+i+"-"+j+"'>";
			if(plateau[i][j]==1){
				txt+="<div class='joueur1'></div>";
			}else if(plateau[i][j]==2){
				txt+="<div class='joueur2'></div>";
			}
			txt+="</td>";
		}
		txt+="</tr>";
	}
	txt+="</table>";
	document.getElementById("puissance3").innerHTML=txt;
}

function detecteclic(lig, col){
	if(verifPosition(lig, col) && jeu){
		poseJeton(lig, col); /* numéro de la ligne en cours */
		var verifEnd = puissance3(lig, col, 0, 0);
		if(verifEnd){
			jeu=false;
			afficheTextAnnonce("Le joueur "+nomDuJoueur(this.joueur)+" a gagné la partie.");
		}
		else{
			/* condition binaire ? si ok : pas ok*/
			joueur==1? joueur=2 : joueur=1;
			afficheTextAnnonce("C'est au tour du joueur "+ nomDuJoueur(joueur));
		}
	}	
}

function verifPosition(lig, int){
	if(plateau[lig][int]==0) return true;

	else return false;

	/* si la case du haut de la colonne est vide */
}

function poseJeton(lig, int){
	//for(var i=nblignes-1 ; i>=0 ; i--){
		if(plateau[lig][int]==0){
			plateau[lig][int]=joueur;
			refreshTableau(lig, int, joueur);
			return (lig, int);
		}
	//}
}

function refreshTableau(x ,y ,i){
	/* permet de chercher l'élément qui a l'id="x-y" et lui met en value */
	document.getElementById(x+"-"+y).innerHTML="<div class='joueur"+i+"'></div>";
}

function puissance3(ligne, colonne, l, c){
	console.log("valeur:"+ligne+" "+colonne+" / increment "+l+" "+c);
	
	if (l==0 && c==0) {
		/* on vérifie la ligne à l'horizontale */
		var va =1 + puissance3(ligne, colonne-1, 0, -1) + puissance3(ligne, colonne+1, 0, 1);
		/* on vérifie la colonne à la verticale */
		var vb =1 + puissance3(ligne-1, colonne, -1, 0) + puissance3(ligne+1, colonne, 1, 0);
		/* On vérifie la diagonale droite (bas gauche haut droite) */
		var vc =1 + puissance3(ligne-1, colonne+1, -1, 1) + puissance3(ligne+1, colonne-1, 1, -1);
		/* Puis la diagonale gauche */
		var vd =1 + puissance3(ligne-1, colonne-1, -1, -1) + puissance3(ligne+1, colonne+1, 1, 1);
		/* si l'une des valeurs renvoie 4 c'est la fin de la partie  */
		if(va==3 || vb==3 || vc>=3 || vd ==3){
			return true;
			}else{
				return false;
			}
	}
	/* On ne calcule pas si on sort du tableau */
	if(ligne < nblignes && ligne >= 0 && colonne < nbcolonnes && colonne >= 0){
		if(plateau[ligne][colonne]==joueur) {
			return 1 + puissance3(ligne+l, colonne+c, l ,c);
		}else {
			return 0;
		}
	}
	return 0;
	//if(ligne > nblignes && ligne <= 0 && colonne > nbcolonnes && colonne <= 0){
	//	return false;
	//}
	
}
