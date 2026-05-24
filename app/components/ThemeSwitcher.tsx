"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const themes = [
    {id: "light", name: "Light"},
    {id: "dark", name: "Dark"},
    {id: "neon", name: "Neon"},
]

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-20">
            <Listbox value={theme} onChange={setTheme}>
                <ListboxButton className={"w-full rounded-md backdrop-blur-md px-2 py-1 border"}>
                    {themes.find((t) => t.id === theme)?.name || "Choose Theme"}
                </ListboxButton>

                <ListboxOptions className={"absolute mt-1 w-full rounded-md border border-white/10 bg-background p-1 backdrop-blur-lg shadow-md shadow-theme-accent focus:outline-none z-50"}>
                    {themes.map((t) => (
                        <ListboxOption
                            key={t.id}
                            value={t.id}
                            className={({ active }) => 
                                `cursor-pointer select-none rounded-md p-2 transition-colors 
                                ${active ? "bg-white/20" : "bg-transparent"}`
                            }    
                        >
                            {t.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    )
}