import {
    Briefcase,
    GraduationCap,
    Sparkles
} from "lucide-react";

import { useGrow } from "../../context/GrowContext";

import EEEMixWidget from "../../components/grow/EEEMixWidget";
import GrowCard from "../../components/grow/GrowCard";

function SectionHeader({ icon: Icon, title, subtitle, accent }) {

    return (

        <div className="mb-6 flex items-center gap-4">

            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
                <Icon size={20}/>
            </div>

            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
            </div>

        </div>

    );

}

function Grow() {

    const {

        jobRotations,

        gemsProjects,

        externalEvents,

        openRotationModal,

        openActivityModal

    } = useGrow();

    return (

        <div className="mx-auto max-w-[1850px] space-y-10 px-8 py-8">

            <div>

                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    Education isn't the whole story
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    Grow Beyond the Classroom
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-500">
                    Real career growth is hands-on. Tap a card to get started.
                </p>

            </div>

            <EEEMixWidget/>

            <section>

                <SectionHeader
                    icon={Briefcase}
                    title="Try a New Role"
                    subtitle="Spend real time in a different team and build hands-on experience."
                    accent="bg-amber-500/15 text-amber-400"
                />

                <div className="flex gap-6 overflow-x-auto pb-4">

                    {

                        jobRotations.map(rotation => (

                            <GrowCard
                                key={rotation.id}
                                item={rotation}
                                kind="rotation"
                                onClick={() => openRotationModal(rotation.id)}
                            />

                        ))

                    }

                </div>

            </section>

            <section>

                <SectionHeader
                    icon={Sparkles}
                    title="Side Quests"
                    subtitle="Take on a project outside your day job."
                    accent="bg-pink-500/15 text-pink-400"
                />

                <div className="flex gap-6 overflow-x-auto pb-4">

                    {

                        gemsProjects.map(project => (

                            <GrowCard
                                key={project.id}
                                item={project}
                                kind="gems"
                                onClick={() => openActivityModal(project.id, "gems")}
                            />

                        ))

                    }

                </div>

            </section>

            <section>

                <SectionHeader
                    icon={GraduationCap}
                    title="Beyond the Plant"
                    subtitle="Tata Innovista, Tata InFuse, and other company-wide events."
                    accent="bg-violet-500/15 text-violet-400"
                />

                <div className="flex gap-6 overflow-x-auto pb-4">

                    {

                        externalEvents.map(event => (

                            <GrowCard
                                key={event.id}
                                item={event}
                                kind="event"
                                onClick={() => openActivityModal(event.id, "event")}
                            />

                        ))

                    }

                </div>

            </section>

        </div>

    );

}

export default Grow;
