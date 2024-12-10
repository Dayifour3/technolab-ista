const XLSX = require("xlsx");
const ExcelJS = require("exceljs");


cas1 = (event, filePath, directeur, emplacement, nom) => {
const emplacement_fich = emplacement
const directeur_nom = directeur
const name = nom
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet(`Resultat ${name}`);
// const excelFilePath = path.join(__dirname, filePath);
const workBook = XLSX.readFile(filePath);
const sheetNames = workBook.SheetNames;
var data = [];
let i,k;
var info_eleve ={}
var tab_de_matiere_non_valide = [];
var matiere_non_valide = [];
var taille_du_fichier = sheetNames.length;
var bloque_i;
var nom_complet;
var nom_complet_tab;
var nom;
var NameLength;
var filiere;
var classe;
var classe_tab;
var tab_filtrer;

/*Obtenier l'année scolaire*/

const date = new Date();
const annee = date.getFullYear();
const annee_scolaire = `${annee -1+"-"+annee}`

/*Fin Obtenier l'année scolaire*/


/* Les variables de l'en-tête */

var mots_exclus = ["de", "le", "les", "des", "du", "et"];
let filiere_lettre = [];
var classe_abrege;
let classe_filiere; 

/* Les variables de l'en-tête */


/*La fonction qui verifie le bulletin de chaque élève uniquement pour le premier semestre*/
async function appel(){


/* La Fonction pour vérifier la taille de l'objet */ 
    function countProperty(taille){
        var count =0;
        for(var prop in jsonData[taille]){
            if(jsonData[taille].hasOwnProperty(prop)){
                ++count;
            }
        }
        return count;
    }
/*Fin La Fonction pour vérifier la taille de l'objet */ 


/* Fonction Pour verifier si une matière est validé ou pas*/

    function verifier_la_validite(i){
        matiere_non_valide = [];
        if(jsonData[i].__EMPTY_9 === "Non Validée"){
            modules.push(jsonData[i].__EMPTY_1);
            matiere_non_valide.push(jsonData[i].__EMPTY_1);
            for(let j=1;j<5;j++){
                if(countProperty(i+j)===5){
                    
                    modules.push(jsonData[i+j].__EMPTY_1);
                    matiere_non_valide.push(jsonData[i+j].__EMPTY_1);

                }
                else if(countProperty(i+j)!==5){
                    j=5;
                }
            }
        }
        else if(jsonData[i].__EMPTY_9 === "Validée"){
            modules.push(jsonData[i].__EMPTY_1);
            if(jsonData[i].__EMPTY_4 <10){
                matiere_non_valide.push(jsonData[i].__EMPTY_1);
            }
            for(let j=1;j<5;j++){
                if(countProperty(i+j)===5){
                    modules.push(jsonData[i+j].__EMPTY_1);
                    if(jsonData[i+j].__EMPTY_4<10){
                        matiere_non_valide.push(jsonData[i+j].__EMPTY_1);
                    }
                }
                else if(countProperty(i+j)!==5){
                    j=5;
                }
            }
             

        }
        return matiere_non_valide;
    }






/*Fin Fonction Pour verifier si une matière est validé ou pas*/

    for(k=0;k<taille_du_fichier;k++){
        var selectedSheet = workBook.Sheets[sheetNames[k]];
        var jsonData = XLSX.utils.sheet_to_json(selectedSheet);
        var modules = [];

        info_eleve ={}
        tab_de_matiere_non_valide = [];
        bloque_i =0;

        /* Le numéro de l'élève dans le fichier*/

        info_eleve.N =k+1;

        /* Le numéro de l'élève dans le fichier*/

        // if(k == 0){
            //     console.log(jsonData);
            
            // }
            /* En-tête conditionnelle */

            
        /* Obtenir le nom et le prenom de l'élève*/
            
        nom_complet =jsonData[0].__EMPTY_1.toUpperCase();
        nom_complet_tab = nom_complet.split(" ");
        NameLength = nom_complet_tab.length;
        nom = nom_complet_tab[NameLength -1];
        nom_complet_tab.pop()
        info_eleve.Prenom = nom_complet_tab.join(" ")
        info_eleve.Nom = nom;
                
        /* Obtenir le nom et le prenom de l'élève*/


        
        filiere = jsonData[0].__EMPTY_3.toLowerCase();
        classe = jsonData[1].__EMPTY_1;
        classe_tab = classe.split(" ");
        tab_filtrer = filiere_tab = filiere.split(" ").slice(2);


        if(classe_tab[0].toLowerCase().trim() == "licence"){
            classe_abrege = "L"+ (classe_tab[1].trim());
        }
        else if(classe_tab[0].toLowerCase().trim() == "master"){
            classe_abrege = "M"+ (classe_tab[1].trim());
        }
        else if(classe_tab[0].toLowerCase().trim() == "doctorat"){
            classe_abrege = "D"+ (classe_tab[1].trim());
        }
        
        /* Le script qui permet de suppremier les mots exclus */
        
        tab_filtrer = tab_filtrer.filter((mot_inclus)=>{
            if(mots_exclus.includes(mot_inclus)){
                return false;
            }
            else{
                return true;
            }
        })

        /*Fin Le script qui permet de suppremier les mots exclus */
        

        /*Obtenir la classe et la filiere en format abréger*/
        if(k==0){
            tab_filtrer.forEach((word)=>{
            filiere_lettre.push(word.slice(0,1).toUpperCase())   
            })
            classe_filiere = classe_abrege +" "+ filiere_lettre.join("");
        }

        /*Obtenir la classe et la filiere en format abréger*/

        
        /*Fin En-tête conditionnelle */






        
        for(i=4;i<jsonData.length; i++){
            if(countProperty(i)===11){
                const verifier = verifier_la_validite(i)
                if(verifier !==""){
                    tab_de_matiere_non_valide.push(verifier);
                }
                    
                else {
                    tab_de_matiere_non_valide.push(verifier);
                }  
        
                }
            else  if( countProperty(i)===4){
                if (bloque_i==0){
                    i=i+11;
                    bloque_i=1;
                }
                else{
                    i += 6;
                    if(jsonData[i]["BULLETIN DE NOTES"] >= 10){
                        info_eleve.appreciation = "Admis(e)"
                    }
                    else{
                        info_eleve.appreciation = "Ajourné(e)"
                    }
                }
            }
        }

        
        function checkString(element, index) {
            return element !== "" && element != undefined;
        }

        let filterArr = tab_de_matiere_non_valide.flat().filter(checkString);

        for(matiere in filterArr){
            if(filterArr[matiere].endsWith("-1")){
                    filterArr[matiere] = filterArr[matiere].replace("-1", "").trim();
            }
            else if(filterArr[matiere].endsWith("-2")){
                    filterArr[matiere] = filterArr[matiere].replace("-2", "").trim();
            }
        }
        for(module in modules){
            if(modules[module].endsWith("-1")){
                    modules[module] = modules[module].replace("-1", "").trim();
            }
            else if(modules[module].endsWith("-2")){
                    modules[module] = modules[module].replace("-2", "").trim();
            }
        }

        const modules_unique = new Set(modules)

        const MSR = Array.from(modules_unique);
    
        const matiere_unique = new Set(filterArr);
        const tab_matiere_unique = Array.from(matiere_unique)

        
        
        info_eleve.matiere_en_session = tab_matiere_unique.join(", ");
        
        
        if(info_eleve.appreciation=="Admis(e)"){
            if(info_eleve.matiere_en_session !== ""){ 
                info_eleve.appreciation = "Admis(e) avec UE" ; 
            } 
        }
        if(MSR.length === tab_matiere_unique.length){
            info_eleve.matiere_en_session = "Tous les Modules"
        }
        
        data[k] = info_eleve;  
        /*Préparation de la  Création du fichier */

        if(i>=jsonData.length){
            worksheet.getColumn(1).width = 4
            worksheet.getColumn(2).width = 25
            worksheet.getColumn(3).width = 15
            worksheet.getColumn(4).width = 16
            worksheet.getColumn(5).width = 30
            /* En-tête*/
            
            worksheet.getRow(1).values = ["TECHNOLAB-ISTA/ANNEXE SOTUBA"]
            worksheet.getRow(2).values = [`ANNEE SCOLAIRE ${annee_scolaire}`]
            worksheet.getRow(3).values = ["RESULTAT DE LA DEUXIEME SESSION"]
            worksheet.getRow(4).values = [`CLASSE : ${classe_filiere}`]
            
            worksheet.getRow(6).values = ["N°", "PRENOM", "NOM", "Appreciation du jury", "UE à reprendre"]
            
            let insert_info_eleve = worksheet.getRow(7+k);

            if(info_eleve.matiere_en_session == ""){
                insert_info_eleve.values = [
                    info_eleve.N,
                    info_eleve.Prenom,
                    info_eleve.Nom,
                    info_eleve.appreciation,
                    " "
                    ]
            }
            else {
                insert_info_eleve.values = [
                    info_eleve.N,
                    info_eleve.Prenom,
                    info_eleve.Nom,
                    info_eleve.appreciation,
                    info_eleve.matiere_en_session
                    ]
            }

            /*Après que toutes les données soient enregistré*/

            if (k+1 == taille_du_fichier){


                 /*Fin Créaion de l'image*/

                 const imageId1 = workbook.addImage({
                    filename: 'logo-TECHNOLAB-ISTA.jpg',
                    extension: 'jpeg',
                });
                worksheet.addImage(imageId1, {
                    tl: { col: 4, row: 1 },
                    br: { col: 5, row: 5 }
                });

                /*Fin Créaion de l'image*/

                
                worksheet.getRow(7+ taille_du_fichier).values = [""]
                worksheet.getRow(7+taille_du_fichier+1).values = [""]
                worksheet.getRow(7+taille_du_fichier+2).values = ["","","", { formula: 'NOW()'}];
                worksheet.mergeCells(`${"D"+(7+taille_du_fichier+2)}:${"E"+(7+taille_du_fichier+2)}`)

                worksheet.getRow(7+taille_du_fichier+3).values = [""]
                worksheet.getRow(7+taille_du_fichier+4).values = ["","","","P/La Direction des Etudes et de la Formation/PO"]
                worksheet.mergeCells(`${"D"+(7+taille_du_fichier+4)}:${"E"+(7+taille_du_fichier+4)}`)

                worksheet.getRow(7+taille_du_fichier+5).values = ["","","","Responsable du Centre SOTUBA"]
                worksheet.mergeCells(`${"D"+(7+taille_du_fichier+5)}:${"E"+(7+taille_du_fichier+5)}`)

                worksheet.getRow(7+taille_du_fichier+6).values = [""]
                worksheet.getRow(7+taille_du_fichier+7).values = [""]

                worksheet.getRow(7+taille_du_fichier+8).values = ["","","",`${directeur_nom}`]
                worksheet.mergeCells(`${"D"+(7+taille_du_fichier+8)}:${"E"+(7+taille_du_fichier+8)}`)


                worksheet.getRow(7+taille_du_fichier+2).eachCell((cell)=>{
                    cell.numFmt = 'dddd, mmmm dd, yyyy',
                    cell.font = {
                    bold: true,
                    size: 10,
                    color: { theme: 1 },
                    name: 'Times New Roman',
                    family: 2
                    },
                    cell.border = {},
                    cell.fill = { type: 'pattern', pattern: 'none' },
                    cell.alignment = { horizontal: 'center' }
                })
                worksheet.getRow(7+taille_du_fichier+4).eachCell((cell)=>{
                    cell.numFmt = ',,',
                    cell.font = {
                        bold: true,
                        underline: true,
                        size: 10,
                        color: { theme: 1 },
                        name: 'Times New Roman',
                        family: 2
                    },
                    cell.border = {},
                    cell.fill = { type: 'pattern', pattern: 'none' },
                    cell.alignment = { horizontal: 'center' }
                })
                worksheet.getRow(7+taille_du_fichier+5).eachCell((cell)=>{
                    cell.numFmt = ',,',
                    cell.font = {
                        bold: true,
                        size: 10,
                        color: { theme: 1 },
                        name: 'Times New Roman',
                        family: 2
                    },
                    cell.border = {},
                    cell.fill = { type: 'pattern', pattern: 'none' },
                    cell.alignment = { horizontal: 'center' }
                })
                worksheet.getRow(7+taille_du_fichier+8).eachCell((cell)=>{
                    cell.numFmt = ',,',
                    cell.font = {
                        bold: true,
                        size: 10,
                        color: { theme: 1 },
                        name: 'Times New Roman',
                        family: 2
                    },
                    cell.border = {},
                    cell.fill = { type: 'pattern', pattern: 'none' },
                    cell.alignment = { horizontal: 'center' }
                })

             }
            /*Fin Après que toutes les données soient enregistré*/

            /*Styles de données élève*/

            insert_info_eleve.getCell(1).style = {
                numFmt: '#,##0',
                font: {
                bold: true,
                size: 11,
                color: { argb: 'FF000000' },
                name: 'Times New Roman',
                family: 2
                },
                border: {
                left: { style: 'medium', color: [Object] },
                top: { style: 'thin', color: [Object] },
                bottom: { style: 'thin', color: [Object] }
                },
                fill: { type: 'pattern', pattern: 'none' },
                alignment: { horizontal: 'center', vertical: 'middle', wrapText: true }
            }
            insert_info_eleve.getCell(2).style = {
                font: { size: 12,
                    color: { argb: 'FF000000' },
                    name: 'Arial', 
                    family: 2 
                },
                border: {
                left: { style: 'thin', color: [Object] },
                right: { style: 'thin', color: [Object] },
                bottom: { style: 'thin', color: [Object] }
                },
                fill: { type: 'pattern', pattern: 'none' },
                alignment: { horizontal: 'left', vertical: 'middle', wrapText: true }
            }
            insert_info_eleve.getCell(3).style = {
                font: { size: 12,
                    color: { argb: 'FF000000' },
                    name: 'Arial', 
                    family: 2 
                },
                border: {
                left: { style: 'thin', color: [Object] },
                right: { style: 'thin', color: [Object] },
                bottom: { style: 'thin', color: [Object] }
                },
                fill: { type: 'pattern', pattern: 'none' },
                alignment: { horizontal: 'left', vertical: 'middle', wrapText: true }
            }
            insert_info_eleve.getCell(4).style = {
                numFmt: ',,',
                font: {
                bold: true,
                size: 11,
                color: { argb: 'FF000000' },
                name: 'Times New Roman',
                family: 2
                },
                border: {
                left: { style: 'thin', color: [Object] },
                right: { style: 'thin', color: [Object] },
                top: { style: 'thin', color: [Object] },
                bottom: { style: 'thin', color: [Object] }
                },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFffffff' } },
                alignment: { horizontal: 'center', vertical: 'middle', wrapText: true }
            }
            insert_info_eleve.getCell(5).style = {
                font: {
                    bold: true,
                    size: 10,
                    color: { theme: 1 },
                    name: 'Times New Roman',
                    family: 2
                },
                border:{
                    left: { style: 'thin', color:{argb: 'FF000000'} },
                    right: { style: 'medium', color:{argb: 'FF000000'} },
                    top: { style: 'thin', color:{argb: 'FF000000'} },
                    bottom: { style: 'thin', color:{argb: 'FF000000'} }
                },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFffffff' } },
                alignment: { horizontal: '', vertical: 'middle', wrapText: true }
            }

            /*Fin Styles de données élève*/
    
    
            for(let compte_ligne =1; compte_ligne<5; compte_ligne++){
                worksheet.getRow(compte_ligne).eachCell((cell)=>{
                    cell.font  = {
                        bold : true,
                        size : 14,
                            color : { theme : 1 },
                            name : 'Times New Roman',
                            family : 2
                        },
                        cell.fill  = { type :'pattern', pattern : 'none' },
                        cell.border  = {},
                    cell.numFmt  = '#,##0',
                    cell.alignment  = { horizontal : 'left'}
                })
            }
            /* Styles de la collonne n° 6*/
                    
            worksheet.getRow(6).eachCell((cell)=>{
                {
                    cell.numFmt = '#,##0',
                    cell.font = {
                    bold: true,
                    size: 12,
                    color: { theme: 1 },
                    name: 'Times New Roman',
                    family: 2
                    },
                    cell.border = {
                    left: { style: 'medium', color:{argb: 'FF000000'} },
                    right: { style: 'medium', color:{argb: 'FF000000'} },
                    top: { style: 'medium', color:{argb: 'FF000000'} },
                    bottom: { style: 'medium', color:{argb: 'FF000000'} }
                    },
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFd9d9d9' } },
                    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
                }
            })

            /*Fin Styles de la collonne n° 6*/    



            /*Fin En-tête*/

            /* En fin, Création du fichier*/
           
        }
    }
    
    await workbook.xlsx.writeFile(`${emplacement_fich}/${name+"-Resultat"+Date.now()}.xlsx`);
     /*Fin En fin, Création du fichier*/
}

/*La fonction qui verifie le bulletin de chaque élève uniquement pour le premier semestre*/
appel();
// .then({
//     function(val){},
//     function(err){console.log(err);}
// });
}

module.exports = {
    cas1
};