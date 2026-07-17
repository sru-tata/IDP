import ProfileHero from "../../components/profile/ProfileHero";
import LearningDNA from "../../components/profile/LearningDNA";
import CertificatesCard from "../../components/profile/CertificatesCard";
import InterestsCard from "../../components/profile/InterestsCard";
import RecentActivityCard from "../../components/profile/RecentActivityCard";
import BadgesCard from "../../components/dashboard/BadgesCard";
import ProfileStatsStrip from "../../components/profile/ProfileStatsStrip";
import CompetencyOverview from "../../components/profile/CompetencyOverview";
import LearningPreferencesCard from "../../components/profile/LearningPreferencesCard";
import EEEMixWidget from "../../components/grow/EEEMixWidget";

function Profile() {

    return (

        <div
            className="
                mx-auto
                max-w-[1850px]
                space-y-6
                px-8
                py-8
            "
        >

            <ProfileHero />
            <ProfileStatsStrip/>

            <EEEMixWidget/>

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                "
            >

                <div className="col-span-6">

                    <CompetencyOverview />

                </div>

                <div className="col-span-6">

                    <LearningPreferencesCard />

                </div>

            </section>

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                "
            >

                <div className="col-span-6">

                    <BadgesCard
                        title="Achievements"
                        subtitle="Your Progress"
                    />

                </div>

                <div className="col-span-6">

                    <CertificatesCard />

                </div>

            </section>

            <section
                className="
                    grid
                    grid-cols-12
                    gap-6
                "
            >

                <div className="col-span-7">

                    <InterestsCard />

                </div>

                <div className="col-span-5">

                    <LearningDNA />

                </div>

            </section>

            <RecentActivityCard />

        </div>

    );

}

export default Profile;
