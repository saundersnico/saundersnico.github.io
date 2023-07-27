import { useState } from "react"
import Navigation from "../modules/nav"
import style from "../styles/leaguelore.css"
import lol from "../../src/lol/champs.json"

// ALL CHAMPS DATA URL: https://universe-meeps.leagueoflegends.com/v1/es_mx/search/index.json
// CHAMP INFO URL: https://universe-meeps.leagueoflegends.com/v1/es_mx/champions/teemo/index.json
// CHAMP COLOR STORY URL:  https://universe-meeps.leagueoflegends.com/v1/es_es/story/${slug}-color-story/index.json

let story;
let storyFull;
let storyTitle;
let storyImage;
let showMenu = false;
let storyFullArray;
const utters = Array(new SpeechSynthesisUtterance(), new SpeechSynthesisUtterance());

const voiceSelect = document.createElement('select');
voiceSelect.id = 'voice-select';
const moreVoices = Array();
moreVoices[221] = "Microsoft Elena Online (Natural) - Spanish (Argentina)"
moreVoices[222] = "Microsoft Tomas Online (Natural) - Spanish (Argentina)"
moreVoices[223] = "Microsoft Marcelo Online (Natural) - Spanish (Bolivia)"
moreVoices[224] = "Microsoft Sofia Online (Natural) - Spanish (Bolivia)"
moreVoices[225] = "Microsoft Catalina Online (Natural) - Spanish (Chile)"
moreVoices[226] = "Microsoft Lorenzo Online (Natural) - Spanish (Chile)"
moreVoices[227] = "Microsoft Gonzalo Online (Natural) - Spanish (Colombia)"
moreVoices[228] = "Microsoft Salome Online (Natural) - Spanish (Colombia)"
moreVoices[229] = "Microsoft Juan Online (Natural) - Spanish (Costa Rica)"
moreVoices[230] = "Microsoft Maria Online (Natural) - Spanish (Costa Rica)"
moreVoices[231] = "Microsoft Belkys Online (Natural) - Spanish (Cuba)"
moreVoices[232] = "Microsoft Manuel Online (Natural) - Spanish (Cuba)"
moreVoices[233] = "Microsoft Emilio Online (Natural) - Spanish (Dominican Republic)"
moreVoices[234] = "Microsoft Ramona Online (Natural) - Spanish (Dominican Republic)"
moreVoices[235] = "Microsoft Andrea Online (Natural) - Spanish (Ecuador)"
moreVoices[236] = "Microsoft Luis Online (Natural) - Spanish (Ecuador)"
moreVoices[237] = "Microsoft Lorena Online (Natural) - Spanish (El Salvador)"
moreVoices[238] = "Microsoft Rodrigo Online (Natural) - Spanish (El Salvador)"
moreVoices[239] = "Microsoft Javier Online (Natural) - Spanish (Equatorial Guinea)"
moreVoices[240] = "Microsoft Teresa Online (Natural) - Spanish (Equatorial Guinea)"
moreVoices[241] = "Microsoft Andres Online (Natural) - Spanish (Guatemala)"
moreVoices[242] = "Microsoft Marta Online (Natural) - Spanish (Guatemala)"
moreVoices[243] = "Microsoft Carlos Online (Natural) - Spanish (Honduras)"
moreVoices[244] = "Microsoft Karla Online (Natural) - Spanish (Honduras)"
moreVoices[245] = "Microsoft Dalia Online (Natural) - Spanish (Mexico)"
moreVoices[246] = "Microsoft Jorge Online (Natural) - Spanish (Mexico)"
moreVoices[247] = "Microsoft Federico Online (Natural) - Spanish (Nicaragua)"
moreVoices[248] = "Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)"
moreVoices[249] = "Microsoft Margarita Online (Natural) - Spanish (Panama)"
moreVoices[250] = "Microsoft Roberto Online (Natural) - Spanish (Panama)"
moreVoices[251] = "Microsoft Mario Online (Natural) - Spanish (Paraguay)"
moreVoices[252] = "Microsoft Tania Online (Natural) - Spanish (Paraguay)"
moreVoices[253] = "Microsoft Alex Online (Natural) - Spanish (Peru)"
moreVoices[254] = "Microsoft Camila Online (Natural) - Spanish (Peru)"
moreVoices[255] = "Microsoft Karina Online (Natural) - Spanish (Puerto Rico)"
moreVoices[256] = "Microsoft Victor Online (Natural) - Spanish (Puerto Rico)"
moreVoices[257] = "Microsoft Alvaro Online (Natural) - Spanish (Spain)"
moreVoices[258] = "Microsoft Elvira Online (Natural) - Spanish (Spain)"
moreVoices[259] = "Microsoft Alonso Online (Natural) - Spanish (United States)"
moreVoices[260] = "Microsoft Paloma Online (Natural) - Spanish (United States)"
moreVoices[261] = "Microsoft Mateo Online (Natural) - Spanish (Uruguay)"
moreVoices[262] = "Microsoft Valentina Online (Natural) - Spanish (Uruguay)"
moreVoices[263] = "Microsoft Paola Online (Natural) - Spanish (Venezuela)"
moreVoices[264] = "Microsoft Sebastian Online (Natural) - Spanish (Venezuela)"

const chromeVoices = Array();
chromeVoices[4] = "Google español"
chromeVoices[5] = "Google español de Estados Unidos"

voiceSelect.id = 'voiceSelect';

const speak = (arr = false, voice = 0, ima = false, current = 0, utter = 0)=>{
    if(arr == false) return;
    if(current > arr.length-1){
        document.getElementById('voice-text').innerHTML = "FIN";
        return;
    }
    if(ima){
        document.getElementsByClassName('champ-menu')[0].style.background = `url('${ima}') no-repeat center fixed`;
        document.getElementsByClassName('champ-menu')[0].style.backgroundSize = "contain";
    }
    if(voice != 0) utters[utter].voice = speechSynthesis.getVoices()[voice];
    speechSynthesis.cancel();
    if(current === 0) utters[utter].text = arr[current];
    document.getElementById('voice-text').innerHTML = utters[utter].text;
    speechSynthesis.speak(utters[utter]);
    let currentUtter = utter;
    utter === 0 ? utter = 1 : utter = 0;
    if(typeof(arr[current+1]) != 'undefined') utters[utter].text = arr[current+1];
    utters[currentUtter].onend = ()=>{

        speak(arr, voice, ima, current+1, utter);
    }
}

const ChampMenu = ()=>{
    return(
        <div className="champ-menu"></div>
    )
}

const getChampData = async(slug)=>{
    if(showMenu) return;
    showMenu = true;
    let hasStory = false;
    try{
        const champData = await fetch(`https://universe-meeps.leagueoflegends.com/v1/es_mx/champions/${slug}/index.json`)
        const response = await champData.json()
        
        let champBio = response.champion.biography.full;
        champBio = champBio.replaceAll('<p>', '')
        champBio = champBio.replaceAll('<em>', '')
        champBio = champBio.replaceAll('</em>', '')
        champBio = champBio.replaceAll('<i>', '')
        champBio = champBio.replaceAll('</i>', '')
        champBio = champBio.replaceAll('<u>', '')
        champBio = champBio.replaceAll('</u>', '')
        champBio = champBio.replaceAll('</br>', '')
        champBio = champBio.replaceAll('<br>', '')
        champBio = champBio.replaceAll("\n\n", '')
        champBio = champBio.replaceAll('</p>', "@")

        let champBioQuote = response.champion.biography.quote;
        champBioQuote = champBioQuote.replaceAll("'", '');

        let champBioShort = response.champion.biography.short;
        champBioShort = champBioShort.replaceAll('<p>', '')
        champBioShort = champBioShort.replaceAll('</p>', "@")
        
        let champBioShortArray = champBioShort.split("@");
        let champBioArray = champBio.split("@");

        if(response.modules.length > 0){
            response.modules.forEach((e)=>{
                if(e['story-slug'] === slug+'-color-story'){
                    hasStory = true;
                }                
            });
        }
        if(hasStory){
            story = await fetch(`https://universe-meeps.leagueoflegends.com/v1/es_es/story/${slug}-color-story/index.json`);
            story = await story.json();

            storyTitle = story.story.title;
            storyFull = story.story['story-sections'][0]['story-subsections'][0].content;
            storyFull = storyFull.replaceAll('<p>', '')
            storyFull = storyFull.replaceAll('<em>', '')
            storyFull = storyFull.replaceAll('</em>', '')
            storyFull = storyFull.replaceAll('<i>', '')
            storyFull = storyFull.replaceAll('</i>', '')
            storyFull = storyFull.replaceAll('<u>', '')
            storyFull = storyFull.replaceAll('</u>', '')
            storyFull = storyFull.replaceAll('</br>', '')
            storyFull = storyFull.replaceAll('<br>', '')
            storyFull = storyFull.replaceAll("\n\n", '')
            storyFull = storyFull.replaceAll("<hr class='story-divider' />", '')
            storyFull = storyFull.replaceAll('</p>', "@")

            storyFullArray = storyFull.split("@");
            storyImage = story.story['story-sections'][0]['background-image'].uri;
        }
        const menu = document.getElementsByClassName('champ-menu')[0];
        menu.onmouseout = ()=>{
            onclick = (e)=>{
                if(e.target.id == 'root' || e.target.id == ''){
                    speechSynthesis.cancel();
                    container.remove();
                    menu.style.display = 'none';
                    showMenu = false;
                }
            }
        }
        menu.innerHTML = '';
        const container = document.createElement('div');
        container.id = 'vcon';

        const champImg = response.champion.image.uri;
        menu.style.background = `url(${champImg}) center no-repeat fixed`;
        menu.style.display = 'block';

        const closeButton = document.createElement('button');
        closeButton.id = "close-button";
        closeButton.innerHTML = 'X';
        closeButton.onclick = ()=>{
            speechSynthesis.cancel();
            container.remove();
            menu.style.display = 'none';
            showMenu = false;
        }
        
        const champName = document.createElement('p');
        champName.id = 'champ-name';
        champName.innerHTML = response.name;
        
        const champTitle = document.createElement('p');
        champTitle.id = 'champ-title';
        champTitle.innerHTML = response.title;


        const bioRep = document.createElement('button');
        bioRep.id = 'bio-rep';
        bioRep.innerHTML = "Escuchar Biografia";
        bioRep.onclick = ()=>{
            //console.log(champBioArray);
            speak(champBioArray, document.getElementById('voiceSelect').value, champImg);
        }

        if(window.navigator.userAgent.toLowerCase().includes('edg')){
            moreVoices.forEach((e,i)=>{
                const voice = document.createElement('option');
                voice.text = e;
                voice.value = i;
                voiceSelect.options.add(voice);
            });
        } else if(window.navigator.userAgent.toLowerCase().includes('chrome')){
            chromeVoices.forEach((e,i)=>{
                const voice = document.createElement('option');
                voice.text = e;
                voice.value = i;
                voiceSelect.options.add(voice);
            })
        } else {
            voiceSelect.style.display = 'none';
        }

        const showText = document.createElement('p');
        showText.id = "voice-text";

        container.appendChild(closeButton);
        container.appendChild(champName);
        container.appendChild(champTitle);
        container.appendChild(voiceSelect);
        container.appendChild(bioRep);

        if(hasStory){
            const storyRep = document.createElement('button');
            storyRep.id = 'story-rep';
            storyRep.innerHTML = "Escuchar Historia";
            storyRep.onclick = ()=>{
                speak(storyFullArray, document.getElementById('voiceSelect').value, storyImage);
            }
            container.appendChild(storyRep);
        }
        container.appendChild(showText);
        menu.appendChild(container);
    }
    catch(error){
    }
}

const Lore = ()=>{
    return(
        <>
        <Navigation/>
        <div className="champ-menu"></div>
        <div className="container">
        <h1>Preparate para disfrutar las historias de los campeones de League of Legends narradas por la tecnologia de speechSynthesis</h1>
        <p>Esta Seccion esta optimizada para Microsoft Edge, ya que este posee mayor cantidad de voces y mejor calidad en las mismas</p>
        {
            lol.champions.map((champ)=>{
                return(
                    <div className="champ-box" key={champ.slug} onClick={()=>{getChampData(champ.slug)}}>
                        <img src={champ.image.uri} alt={champ.name} title={champ.name}/>
                        <span>{champ.name}</span>
                    </div>
                )
            })
        }
        </div>
        </>
    )
    }
export default Lore;