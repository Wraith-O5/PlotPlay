import Scene_01 from "../Components/Comic Assets/images/01.png";
import Scene_02 from "../Components/Comic Assets/images/02.png";
import Scene_03 from "../Components/Comic Assets/Animated_Scenes/LoweringBookScene";
import Scene_04 from "../Components/Comic Assets/Animated_Scenes/Scene_04";
import Scene_05 from "../Components/Comic Assets/images/05.png";
import Scene_06 from "../Components/Comic Assets/images/06.png";
import Scene_07 from "../Components/Comic Assets/images/07.png";
import Scene_08 from "../Components/Comic Assets/images/08.png";
import Scene_09 from "../Components/Comic Assets/Animated_Scenes/09_ver2.gif";
import Scene_10 from "../Components/Comic Assets/Animated_Scenes/Scene_10";
import Scene_11 from "../Components/Comic Assets/images/11.png";
import Scene_12 from "../Components/Comic Assets/images/12.png";
import Scene_13 from "../Components/Comic Assets/Animated_Scenes/Scene_13"
import "../Pages/Testing.css"
import BackgroundMusic from "../Components/BackgroundMusic";
import Scene_14 from '../Components/Comic Assets/images/14.png'
import Scene_15 from '../Components/Comic Assets/images/15.png'
import Scene_16 from '../Components/Comic Assets/images/16.png'
import Scene_17 from "../Components/Comic Assets/Animated_Scenes/Scene_17";

export function Comic() {

    return (
        <section className="Comic">
            <div className="Contents">
                <BackgroundMusic />
                <img src={Scene_01}/>
                <img src={Scene_02}/>
                <Scene_03 />
                
                <Scene_04 />
                <img src={Scene_05}/>
                <img src={Scene_06}/>
                <img src={Scene_07}/>
                <img src={Scene_08}/>
                <img src={Scene_09}/>
                <Scene_10/>
                <img src={Scene_11}/>
                <img src={Scene_12}/>
                <Scene_13/>
                <img src={Scene_14}/>
                <img src={Scene_15}/>
                <img src={Scene_16}/>
                <Scene_17/>
            </div>
        </section>
    )
}