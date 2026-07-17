import {
    Award,
    BadgeCheck,
    ExternalLink
} from "lucide-react";

import Card from "../ui/Card";
import { useUser } from "../../context/UserContext";

function Certificate({

    certificate

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-5
                py-4
                transition
                hover:border-blue-500
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        rounded-xl
                        bg-blue-500/15
                        p-3
                        text-blue-400
                    "
                >

                    <Award size={20}/>

                </div>

                <div>

                    <h3 className="font-semibold">

                        {certificate.title}

                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">

                        {certificate.issuer}

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3">

                {

                    certificate.verified && (

                        <BadgeCheck

                            className="text-green-400"

                            size={18}

                        />

                    )

                }

                <ExternalLink

                    size={18}

                    className="text-zinc-500"

                />

            </div>

        </div>

    );

}

function CertificatesCard() {

    const {

        user

    } = useUser();

    if (!user) {

        return null;

    }

    return (

        <Card className="h-full p-6">

            <p className="font-semibold text-blue-400">

                Certifications

            </p>

            <h2 className="mt-2 text-2xl font-bold">

                Verified Learning

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

                Certifications earned through YouTube.

            </p>

            <div className="mt-6 space-y-3">

                {

                    user.certificates.map(certificate => (

                        <Certificate

                            key={certificate.id}

                            certificate={certificate}

                        />

                    ))

                }

            </div>

        </Card>

    );

}

export default CertificatesCard;