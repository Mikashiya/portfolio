// import { getMarkdownData } from "./lib/markdown";

// export default async function Home() {
//   const { metadata, contentHtml } = await getMarkdownData("profile.md");

//   return (
//     <>
//       <div className="h-[50vh] flex flex-col gap-2 justify-center">
//         <p className="text-xl md:text-3xl font-bold">{metadata.title}</p>
//         <p className="text-md md:text-xl font-semibold italic">{metadata.role}</p>
//       </div>

//       <div 
//         className="prose dark:prose-invert mt-6 leading-relaxed text-foreground/80 text-prettier text-sm md:text-base"
//         dangerouslySetInnerHTML={{ __html: contentHtml }} 
//       />
//     </>
//   );
// }

// src/app/[locale]/page.tsx
import { getMarkdownData, getAllProjectsData } from "./lib/markdown";
import ProjectCard from "./components/ProjectCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  
  // Ambil data profil dan list proyek secara paralel
  const profile = await getMarkdownData(`profile.id.md`);
  const projects = await getAllProjectsData(locale);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="space-y-3 mb-10">
        <p className="text-3xl font-bold">{profile.metadata.title}</p>
        <p className="text-l font-semibold">{profile.metadata.role}</p>
      </div>

      {/* AREA BIO UTAMA */}
      <section id="about">
        <div dangerouslySetInnerHTML={{ __html: profile.contentHtml }} />
      </section>

      <div className="my-10"></div>

      {/* AREA DAFTAR PROYEK */}
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          // Bungkus pakai komponen client yang bisa di-click tadi
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}