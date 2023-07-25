import { useState } from "react"
import Navigation from "../modules/nav"
import style from "../styles/leaguelore.css"
import lol from "../../src/lol/champs.json"

// ALL CHAMPS DATA URL: https://universe-meeps.leagueoflegends.com/v1/es_mx/search/index.json
// CHAMP INFO URL: https://universe-meeps.leagueoflegends.com/v1/es_mx/champions/teemo/index.json
// CHAMP COLOR STORY URL:  https://universe-meeps.leagueoflegends.com/v1/es_es/story/${slug}-color-story/index.json

let hasStory = false;
let story;
let storyFull;
let storyTitle;
let storyImage;

const ChampMenu = ()=>{
    return(
        <div className="champ-menu"></div>
    )
}

const getChampData = async(slug)=>{
    try{
        const champData = await fetch(`https://universe-meeps.leagueoflegends.com/v1/es_mx/champions/${slug}/index.json`)
        const response = await champData.json()
        console.log(response);
       // console.log(response.modules);
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
            storyImage = story.story['story-sections'][0]['background-image'].uri;
        }

        const menu = document.getElementsByClassName('champ-menu')[0];

        const container = document.createElement('div');

        menu.style.display = 'block';
        
        const champName = document.createElement('p');
        champName.innerHTML = response.name;
        
        const champTitle = document.createElement('p');
        champTitle.innerHTML = response.title;

        const champImg = document.createElement('img');
        champImg.src = response.champion.image.uri;

        const bioRep = document.createElement('button');
        bioRep.innerHTML = "Escuchar Biografia";

        container.appendChild(champName);
        container.appendChild(champTitle);
        container.appendChild(champImg);
        container.appendChild(bioRep);

        if(hasStory){
            const storyRep = document.createElement('button');
            storyRep.innerHTML = "Escuchar Historia";

            container.appendChild(storyRep);
        }

        menu.appendChild(container);

        menu.onclick = ()=>{
            container.remove();
            menu.style.display = 'none';
        }
        //return response;

    }
    catch(error){
        console.log(error);
    }
}

const Lore = ()=>{
    return(
        <>
        <Navigation/>
        <div className="champ-menu"></div>
        <div className="container">
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