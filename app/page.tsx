import { getMarkdownData } from "./lib/markdown";

export default async function Home() {
  const { metadata, contentHtml } = await getMarkdownData("profile.md");

  return (
    <>
      <div className="h-[50vh] flex flex-col gap-2 justify-center">
        <p className="text-xl md:text-3xl font-bold">{metadata.title}</p>
        <p className="text-md md:text-xl font-semibold italic">{metadata.role}</p>
      </div>

      <div 
        className="prose dark:prose-invert mt-6 leading-relaxed text-foreground/80 text-prettier text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </>
  );
}