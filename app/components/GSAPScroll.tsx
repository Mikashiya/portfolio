"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

export default function GSAPScroll({ children }: { children:React.ReactNode }) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            smoothTouch: 0.5,
            effects: true,
        });
    });

    return (
        <div id="smooth-wrapper" className="w-full h-full overflow-hidden">
            <div id="smooth-content" className="w-full relative">
                {children}
            </div>
        </div>
    )
}