let mainBoxColor = document.querySelector('.active > .colors');
let nameOfColor = document.querySelector('.active > .colors-hex');
const btnRandomColor = document.querySelector('.active > button');
const listOfColors = document.getElementById('list-colors');
const latestColorName = document.querySelector('.colors-el > h2');
const nameOfColorHistory = document.querySelector('.colors-el > .colors-names-history');

//Bouttons générateur de couleurs

const btnAnyColorGenerator = document.getElementById('btn-any-color-generator');
const btnPastelColorGenerator = document.getElementById('btn-pastel-color-generator');
const btnBrightColorGenerator = document.getElementById('btn-bright-color-generator');
const btnDarkColorGenerator = document.getElementById('btn-dark-color-generator');

//Bouttons dégradés

const btnAnyGradientColorGenerator = document.getElementById('btn-anygradient-color-generator');
const btnPastelGradientColorGenerator = document.getElementById('btn-pastelgradient-color-generator');
const btnBrightGradientColorGenerator = document.getElementById('btn-brightgradient-color-generator');
const btnDarkGradientColorGenerator = document.getElementById('btn-darkgradient-color-generator');

//Box des couleurs

const boxAnyColorGenerator = document.getElementById('any-color-generator');
const boxPastelColorGenerator = document.getElementById('pastel-color-generator');
const boxBrightColorGenerator = document.getElementById('bright-color-generator');
const boxDarkColorGenerator = document.getElementById('dark-color-generator');

//Box des dégradés

const boxAnyGradientColorGenerator = document.getElementById('anygradient-color-generator');
const boxPastelGradientColorGenerator = document.getElementById('pastelgradient-color-generator');
const boxBrightGradientColorGenerator = document.getElementById('brightgradient-color-generator');
const boxDarkGradientColorGenerator = document.getElementById('darkgradient-color-generator');

//Fonction permettant de générer un canal de couleur aléatoirement (0,255)

const generateRVB = function(){
    return Math.floor(Math.random()*256);
}

//Fonction permettant de convertir un code RGB en code HEX

const hex = function (color = generateRVB()){
    let colorToConvert = color.toString(16);
    if (colorToConvert.length < 2){
        colorToConvert = "0" + colorToConvert;
    }
    return colorToConvert;
};

const randomHexCode = function(){
    return '#'+hex()+hex()+hex()
};

const convertRGBtoHex = function(rgb){
    let hexcode = '#'
    rgb.forEach(element => {
        let rgbInt = parseInt(element);
        let rgbToHex = rgbInt.toString(16);
        if (rgbToHex < 2){
            rgbToHex = "0" + rgbToHex;
        }
        hexcode += rgbToHex
    });
    return hexcode;
};

//Ajout de la couleur dans l'historique 


const createItemColorList = function(colors){
    const childItem = `<div class="colors-el">
    <div class="colors-box" style="background: ${colors}"></div>
    <h3 class="colors-names-history" onclick="copiedConfirm(this)">${colors}</h3>
    </div>`;
    return childItem;
}

//Génération d'une couleur aléatoire

const anyColorGenerator = function(){
    nameOfColor = document.querySelector('.active > .colors-hex');
    mainBoxColor = document.querySelector('.active > .colors');
    const colorsHex = randomHexCode()
    mainBoxColor.style.backgroundColor = colorsHex;
    nameOfColor.innerText = colorsHex;
    listOfColors.insertAdjacentHTML('afterbegin',createItemColorList(colorsHex));
}

const generateHSLPastel = function (){
    const h = Math.floor(Math.random()*361)
    const s = Math.floor(Math.random()*(95 - 25) + 25)
    const l = Math.floor(Math.random()*(95 - 85) + 85)
    return `hsl(${h},${s}%,${l}%)`
}

const generateHSLBright = function (){
    const h = Math.floor(Math.random()*361)
    const s = 100
    const l = 50
    return `hsl(${h},${s}%,${l}%)`
};

const generateHSLDark = function(){
    const h = Math.floor(Math.random()*361)
    const s = Math.floor(Math.random()*(35 - 0) + 0)
    const l = Math.floor(Math.random()*(35 - 0) + 0)
    return `hsl(${h},${s}%,${l}%)`
}

const colorGeneratorHSL = function (generator){
    nameOfColor = document.querySelector('.active > .colors-hex');
    mainBoxColor = document.querySelector('.active > .colors');
    const colorsHSL = generator
    mainBoxColor.style.backgroundColor = colorsHSL;
    const colorHSLVerRGB = mainBoxColor.style.backgroundColor.match(/\d+/g)
    const hexCode = convertRGBtoHex(colorHSLVerRGB);
    nameOfColor.innerText = hexCode;
    listOfColors.insertAdjacentHTML('afterbegin',createItemColorList(hexCode));
}




//Génération d'un dégradé

const generateGradient = function(typeOfColor1,typeOfColor2){
    const color1 = typeOfColor1;
    const color2 = typeOfColor2;
    return `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)`
};

const generateGradientType = function(color1,color2){
    nameOfColor = document.querySelector('.active > .colors-hex');
    mainBoxColor = document.querySelector('.active > .colors');
    const gradientColor = generateGradient(color1,color2);
    mainBoxColor.style.backgroundImage = gradientColor;
    nameOfColor.innerText = gradientColor;
    listOfColors.insertAdjacentHTML('afterbegin',createItemColorList(gradientColor));

};


//Changement du generateur

const generateColor = function(){
    /* Génération des couleurs basiques */

    if (boxAnyColorGenerator.classList.contains("active")){
        anyColorGenerator();
    };
    if (boxPastelColorGenerator.classList.contains("active")){
        colorGeneratorHSL(generateHSLPastel());
    };
    if (boxBrightColorGenerator.classList.contains("active")){
        colorGeneratorHSL(generateHSLBright());
    };
    if (boxDarkColorGenerator.classList.contains("active")){
        colorGeneratorHSL(generateHSLDark());;
    };

    /* Génération des dégradés*/

    if (boxAnyGradientColorGenerator.classList.contains("active")){
        generateGradientType(randomHexCode(),randomHexCode());
    };
    if (boxPastelGradientColorGenerator.classList.contains("active")){
        generateGradientType(generateHSLPastel(),generateHSLPastel());
    };
    if (boxBrightGradientColorGenerator.classList.contains("active")){
        generateGradientType(generateHSLBright(),generateHSLBright());
    };
    if (boxDarkGradientColorGenerator.classList.contains("active")){
        generateGradientType(generateHSLDark(),generateHSLDark());
    };

};

anyColorGenerator();

const changeGenerator = function(nextGenerator){
    const activeGenerator = document.querySelector('.active')
    activeGenerator.classList.remove("active");
    activeGenerator.classList.add("inactive");
    nextGenerator.classList.remove("inactive");
    nextGenerator.classList.add("active");
}


btnPastelColorGenerator.addEventListener('click', function (){
    changeGenerator(boxPastelColorGenerator);
    colorGeneratorHSL(generateHSLPastel());
})

btnAnyColorGenerator.addEventListener('click', function (){
    changeGenerator(boxAnyColorGenerator);
    anyColorGenerator();
})

btnBrightColorGenerator.addEventListener('click', function (){
    changeGenerator(boxBrightColorGenerator);
    colorGeneratorHSL(generateHSLBright());
})

btnDarkColorGenerator.addEventListener('click', function (){
    changeGenerator(boxDarkColorGenerator);
    colorGeneratorHSL(generateHSLDark());
})

/* Bouttons dégradés*/

btnAnyGradientColorGenerator.addEventListener('click',function(){
    changeGenerator(boxAnyGradientColorGenerator);
    generateGradientType(randomHexCode(),randomHexCode());
})

btnPastelGradientColorGenerator.addEventListener('click',function(){
    changeGenerator(boxPastelGradientColorGenerator);
    generateGradientType(generateHSLPastel(),generateHSLPastel());
})

btnBrightGradientColorGenerator.addEventListener('click',function(){
    changeGenerator(boxBrightGradientColorGenerator);
    generateGradientType(generateHSLBright(),generateHSLBright());
})

btnDarkGradientColorGenerator.addEventListener('click',function(){
    changeGenerator(boxDarkGradientColorGenerator);
    generateGradientType(generateHSLDark(),generateHSLDark());
})


//Copie + confirmation de la copie de la couleur


const copiedConfirm = function(element){
    let oldElement = element.innerText;
    navigator.clipboard.writeText(element.innerText);
    element.innerText = "Copied !"
    element.style.pointerEvents = "none"
    setTimeout(function () {element.innerText = element.innerText = oldElement; element.style.pointerEvents = "auto";}, 1000);
    ;
   
};