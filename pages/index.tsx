import Head from "next/head";
import Header from "../components/Header";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { GetStaticProps } from "next";
import { fetchExperiences } from "../utils/fetchExperiences";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchSocial } from "../utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ projects, skills, pageInfo, experiences, socials }: Props) => {
  return (
    <>
      <Head>
        <title>ABDULLAH ALKHAREJI || PORTFOLIO</title>
      </Head>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 bg-[rgb(36,36,36)] text-white z-0">
        <Header socials={socials} />

        {/* Hero Banner Section */}
        <section id="hero" className="snap-start">
          <Hero pageInfo={pageInfo} />
        </section>

        {/* About Section */}
        <section id="about" className="snap-start">
          <About pageInfo={pageInfo} />
        </section>

        {/* Experience Section */}
        <section id="experience" className="snap-center">
          <WorkExperience experiences={experiences} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="snap-start">
          <Skills skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projects" className="snap-start">
          <Projects projects={projects} />
        </section>

        {/* Contact Me Section */}
        <section id="contact" className="snap-start">
          <ContactMe />
        </section>

        <Link href="#hero">
          <footer className="sticky bottom-5 w-full cursor-pointer">
            <div className="flex items-center justify-center">
              <ArrowUpCircleIcon className="h-10 w-10 text-[#F7AB0A]" />
            </div>
          </footer>
        </Link>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocial();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};
