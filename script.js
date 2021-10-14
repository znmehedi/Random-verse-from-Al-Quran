

function randomVerse(){
    return Math.floor(Math.random() * (6236 - 1) + 1);
}
var random;
var audio=[];
var language;
var suraName;
var suraNo;
var suraAyah;
var sajDa;
    
function languageSelectFunction(rand){
    if(rand==null){
        rand=random;
    }
    
    let language = document.getElementById("language").value;

    let secondLanguageApi;
    let secondLanguageText
    let SurahInfo;
    if(language=='en')
    {
        secondLanguageApi = `https://api.alquran.cloud/v1/ayah/${rand}/en.ahmedraza`;
    }else{
        secondLanguageApi = `https://api.alquran.cloud/v1/ayah/${rand}/bn.bengali`;
    }
    
    
    fetch(secondLanguageApi).then(res=>res.json())
    .then(Data=>{
        secondLanguageText=Data.data.text;
        suraName=Data.data.surah.englishName;
        suraAyah=Data.data.numberInSurah;
        suraNo=Data.data.surah.number;
        SurahInfo='Surah: '+suraName+'  ◙ Verse No. '+suraAyah+'.';
        if(sajDa=='true')
            {
                SurahInfo+='(Sajdah verse).'
            }
        document.getElementById("otherLanguage").innerHTML=secondLanguageText;
        document.getElementById('suraInfoId').innerHTML=SurahInfo;
    });

}

function downloadImage(){
    let downloadFileName='AlQuranChapter'+suraNo+'Verse'+suraAyah+'.png';
    domtoimage.toBlob(document.getElementById('fullCanvas'))
    .then(function (blob) {
        window.saveAs(blob, downloadFileName);
    });
}


function randomVerseFunction(){
   
    if(audio.length>=1)    
        {
            let old=audio.shift();
            old.pause();
        }
    let ArabicText;
    
    random=randomVerse();

    let apiArabic=`https://api.alquran.cloud/v1/ayah/${random}/ar.alafasy `;
    
    //console.log("c"); 

    fetch(apiArabic).then(res=>res.json())
    .then(Data=>{
        //console.log(Data);
        //console.log(Data.data.text);
        ArabicText=Data.data.text;
        audio.push(new Audio(Data.data.audio));
        
        document.getElementById("arabicLanguage").innerHTML=ArabicText;
        
        languageSelectFunction(random);        
    });   
}


function playVerseFunction(){
    
    if(audio.length>1)    
        {
            let old=audio.shift();
            old.pause();
        }
        
        audio[0].play();
}


