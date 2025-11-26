import { NextResponse } from "next/server";
import { db } from "@/db";
import { projectsDetails, students, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    // Construire la requête de base
    const queryBuilder = db
      .select({
        id: projectsDetails.id,
        title: projectsDetails.title,
        github: projectsDetails.github,
        demolink: projectsDetails.demolink,
        thumbnail: projectsDetails.thumbnail,
        createdAt: projectsDetails.createdAt,
        updatedAt: projectsDetails.updatedAt,
        projectId: projectsDetails.projectId,
        projectName: projects.name,
        gitUsername: students.gitUsername,
        studentId: students.id,
      })
      .from(projectsDetails)
      .innerJoin(students, eq(projectsDetails.gitUsernameId, students.id))
      .innerJoin(projects, eq(projectsDetails.projectId, projects.id));

    // Appliquer le filtre si projectId est fourni
    const allProjects = projectId
      ? await queryBuilder.where(eq(projectsDetails.projectId, Number(projectId)))
      : await queryBuilder;

    return NextResponse.json({
      projects: allProjects,
      count: allProjects.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des projets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, github, demolink, gitUsername, projectId } = body;

    // Validation des champs requis
    if (!title || !github || !demolink || !gitUsername || !projectId) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'étudiant existe, sinon le créer
    const existingStudents = await db
      .select()
      .from(students)
      .where(eq(students.gitUsername, gitUsername))
      .limit(1);

    let student = existingStudents[0];

    if (!student) {
      const [newStudent] = await db
        .insert(students)
        .values({ gitUsername })
        .returning();
      student = newStudent;
    }

    // Insertion du projet dans projects-details
    const newProject = await db
      .insert(projectsDetails)
      .values({
        title,
        github,
        demolink,
        thumbnail: null, // Sera ajouté plus tard si nécessaire
        gitUsernameId: student.id,
        projectId: Number(projectId),
      })
      .returning();

    return NextResponse.json(
      {
        message: "Projet soumis avec succès",
        project: newProject[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la soumission du projet:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la soumission du projet" },
      { status: 500 }
    );
  }
}
