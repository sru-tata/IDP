import {

    BaseEdge,

    getBezierPath

} from "reactflow";

function EnergyEdge(props) {

    const [

        path

    ] = getBezierPath({

        ...props,

        curvature: 0.18

    });

    return (

        <>

            <BaseEdge

                path={path}

                style={{

                    stroke:

                        props.data?.completed

                            ? "#4F9DFF"

                            : "#555",

                    strokeWidth:

                        props.data?.completed

                            ? 3

                            : 2,

                    opacity: .95

                }}

            />

        </>

    );

}

export default EnergyEdge;