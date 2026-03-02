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
import Scene_14 from '../Components/Comic Assets/images/14.png'
import Scene_15 from '../Components/Comic Assets/images/15.png'
import Scene_16 from '../Components/Comic Assets/images/16.png'
import Scene_17 from "../Components/Comic Assets/Animated_Scenes/Scene_17";
import Scene_18 from "../Components/Comic Assets/Animated_Scenes/Scene_18";
import Scene_19 from "../Components/Comic Assets/Animated_Scenes/Scene_19";
import Scene_20 from "../Components/Comic Assets/Animated_Scenes/Scene_20";
import Scene_21 from '../Components/Comic Assets/images/21.png'
import Black_scene from '../Components/Comic Assets/images/กระดาษดำ_21.png'
import ClockTicking from '../Components/Comic Assets/Sound/Sound Effects/ClockTicking4.mp3'

export const comicScenes = [
    { type: 'image', src: Scene_01 },
    { type: 'image', src: Scene_02 },
    { type: 'component', component: Scene_03 },
    { type: 'component', component: Scene_04 },
    { type: 'image', src: Scene_05 },
    { type: 'image', src: Scene_06 },
    { type: 'image', src: Scene_07 },
    { type: 'image', src: Scene_08 },
    { type: 'soundEffect', src: Scene_09, soundSrc: ClockTicking },
    { type: 'component', component: Scene_10 },
    { type: 'image', src: Scene_11 },
    { type: 'image', src: Scene_12 },
    { type: 'component', component: Scene_13 },
    { type: 'image', src: Scene_14 },
    { type: 'image', src: Scene_15 },
    { type: 'image', src: Scene_16 },
    { type: 'component', component: Scene_17 },
    { type: 'component', component: Scene_18 },
    { type: 'component', component: Scene_19 },
    { type: 'component', component: Scene_20 },
    { type: 'image', src: Black_scene },
    { type: 'image', src: Scene_21 },
];
