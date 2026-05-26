// src/components/ProjectCard.tsx
"use client";

import { useState } from "react";

type ProjectProps = {
  project: {
    title: string;
    company?: string;
    category: string;
    stack: string[];
    contentHtml: string;
    screenshot?: string;
  };
};

export default function ProjectCard({ project }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-foreground/10 p-6 rounded-xl bg-background transition-all duration-300 hover:border-amber-500/50">
      {/* HEADER CARD */}
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <span className="text-sm uppercase text-amber-500 font-semibold">{project.category}</span>
          <h3 className="text-2xl font-bold mt-1">
            {project.title} {project.company && `— ${project.company}`}
          </h3>
        </div>
      </div>

      {/* TECH STACK CHIPS */}
      <div className="flex gap-2 my-4 flex-wrap">
        {project.stack.map((tech) => (
          <code key={tech} className="bg-foreground/5 px-2 py-1 rounded text-xs text-foreground/80">
            {tech}
          </code>
        ))}
      </div>

      {/* COLLAPSIBLE CONTENT (BAGIAN YANG BISA DISEMBUNYIKAN) */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {/* Render Screenshot jika ada */}
        {project.screenshot && (
          <img 
            src={project.screenshot} 
            alt={project.title} 
            className="w-full h-auto rounded-lg mb-4 border border-foreground/10 object-cover max-h-[350px]"
          />
        )}

        {/* Isi Teks Markdown */}
        <div 
          className="prose dark:prose-invert text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }} 
        />
      </div>

      {/* BUTTON TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
      >
        {isOpen ? (
          <>
            Tutup Detail <span>▲</span>
          </>
        ) : (
          <>
            Baca Selengkapnya <span>▼</span>
          </>
        )}
      </button>
    </div>
  );
}