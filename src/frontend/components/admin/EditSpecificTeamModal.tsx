import { XIcon } from "@heroicons/react/outline";
import { forwardRef, useImperativeHandle, useState } from "react";
import { classNames } from "../../lib/design";

const EditSpecificTeamModal = forwardRef((props, ref) => {

    EditSpecificTeamModal.displayName = "EditSpecificTeamModal";

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(!isOpen);
        }
    }));

    return (
        <div
            className={classNames(
                isOpen ? "z-40 opacity-100" : "opacity-0 -z-10",
                "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 backdrop-blur-md transition-opacity duration-150 ease-in-out",
            )}
            onClick={() => {
                setIsOpen(!isOpen);
            }}
        >
            <div
                className="bg-white w-4/5 sm:h-3/5 h-4/5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <XIcon className="absolute top-0 right-0 m-2 h-10 w-10 cursor-pointer sm:hover:scale-105 transition-all duration-150 ease-in-out" onClick={() => {setIsOpen(!isOpen)}} />

            </div>
        </div>
    )
});

export default EditSpecificTeamModal;