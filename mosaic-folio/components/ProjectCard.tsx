"use client";

interface Project {
  id: number;
  title: string;
  github: string;
  demolink: string;
  thumbnail: string | null;
  createdAt: string;
  projectId: number;
  projectName: number;
  gitUsername: string;
}

interface ProjectCardProps {
  project: Project;
}

const projectNames: { [key: number]: string } = {
  1: "Ada Check Events",
  2: "Ada Quiz",
  3: "Adaence",
  4: "Adaopte",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectName = projectNames[project.projectName] || `Projet ${project.projectName}`;
  const imageUrl = project.thumbnail || `https://github.com/${project.gitUsername}/${project.title}/blob/main/thumbnail.png?raw=true`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
            {projectName}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>

        <p className="text-gray-600 text-sm mb-4">
          Par <span className="font-semibold">{project.gitUsername}</span>
        </p>

        <p className="text-gray-500 text-xs mb-4">
          Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}
        </p>

        <div className="flex gap-3">
          <a
            href={project.demolink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-amber-500 text-white text-center rounded-md hover:bg-amber-600 transition font-semibold"
          >
            Voir la démo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 text-white text-center rounded-md hover:bg-gray-900 transition font-semibold"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
