import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export async function getMarkdownData(fileName: string) {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(content);
    
    const contentHtml = processedContent.toString();

    return {
        metadata: data,
        contentHtml,
    }
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjectsData(locale: string) {
  const fileNames = fs.readdirSync(projectsDirectory);
  
//const filteredFiles = fileNames.filter((fileName) => fileName.endsWith(`.${locale}.md`));

  const allProjects = await Promise.all(
    fileNames.map(async (fileName) => {
      // Buat ID proyek dari nama file (misal: "01-magang-a")
      const id = fileName.replace(/\.(id|en)\.md$/, "");

      // Baca isi file
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Gunakan gray-matter untuk memisahkan frontmatter dan konten teks
      const matterResult = matter(fileContents);

      // Ubah isi Markdown menjadi string HTML
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        id,
        contentHtml,
        ...(matterResult.data as {
          title: string;
          company?: string;
          category: string;
          stack: string[];
          screenshot?: string;
        }),
      };
    })
  );

  // Urutkan proyek berdasarkan nama file agar 01 muncul duluan, lalu 02, dst.
  return allProjects.sort((a, b) => (a.id > b.id ? 1 : -1));
}