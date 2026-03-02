import BackgroundMusic from "../Components/BackgroundMusic";
import SoundEffects from "../Components/SoundEffects";
import { comicScenes } from "../configs/comicConfig";

export function Comic() {
    return (
        <section className="Comic">
            <div className="Contents">
                <BackgroundMusic />
                {comicScenes.map((scene, index) => {
                    if (scene.type === 'image') {
                        return <img key={index} src={scene.src} alt={`Scene ${index + 1}`} />;
                    } else if (scene.type === 'component') {
                        const SceneComponent = scene.component;
                        return <SceneComponent key={index} />;
                    } else if (scene.type === 'soundEffect') {
                        return <SoundEffects key={index} src={scene.src} soundSrc={scene.soundSrc} />;
                    }
                    return null;
                })}
            </div>
        </section>
    )
}
