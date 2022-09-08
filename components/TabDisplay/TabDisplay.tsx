import React, { useCallback, useState } from "react";
import Slide from "./Slide";
import Tab from "./Tab";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Section {
    tabTitle: string,
    skillGroups: SkillGroup[]
}

export interface SkillGroup {
    title: string,
    skills: [IconDefinition, string][]
}

// TODO: Accessibility: Left Right Arrow Keys, 
// TODO: Add animations.
const TabDisplay = ({ sections }: { sections: Section[] }) => {
    const [active, setActive] = useState(0);
    const handleArrowKeys = useCallback((event: globalThis.KeyboardEvent) => {
        if(event.key === "ArrowLeft") {
            setActive(prev => (prev - 1 + 3) % 3);
        } else if(event.key === "ArrowRight") {
            setActive(prev => (prev + 1) % 3);
        } 
    }, [])
    
    console.log(active);
    
    const tabs: JSX.Element[] = [];
    const slides: JSX.Element[] = [];
    for(let [i, {tabTitle, skillGroups}] of sections.entries()) {
        tabs.push(<Tab active={ i === active } setActiveFunction={i === active ? () => {} : () => setActive(i)} key={i}>
            {tabTitle}
        </Tab>);
        slides.push(<Slide key={i} skillGroups={skillGroups} active={active === i} />)
    }
    
    function focusHandler() {
        console.log("focus");
        document.addEventListener("keydown", handleArrowKeys);
    }
    
    function blurHandler() {
        console.log("blur");
        document.removeEventListener("keydown", handleArrowKeys);
    }

    return(
    // NOTE: Padding and negative margin should match wrapper div side margins
    <div tabIndex={-1} className="space-y-3 py-3 outline-none" onFocus={focusHandler} onBlur={blurHandler}>
        <div className="overflow-scroll flex -mx-7 px-7 space-x-2 no-scrollbar">
            { tabs }
        </div>
        <div className="relative no-scrollbar h-[168px]">
            { slides }
        </div>
    </div>
    )
}

export default TabDisplay;