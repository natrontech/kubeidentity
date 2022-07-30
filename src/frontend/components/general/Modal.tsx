import { XIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { classNames } from "../../lib/design"

const Modal = ({ children, title, isOpen, setIsOpen }: any) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <div
            className={classNames(
                open ? "z-40 opacity-100" : "opacity-0 -z-10",
                "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 backdrop-blur-md transition-opacity duration-150 ease-in-out",
            )}
            onClick={() => {
                setIsOpen(false);
            }}
        >
            <div
                className="bg-white w-4/5 sm:h-3/5 h-4/5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <XIcon
                    className="fixed text-gray-400 top-2 right-2 m-2 h-7 w-7 cursor-pointer sm:hover:scale-105 transition-all duration-150 ease-in-out"
                    onClick={() => {
                        setIsOpen(false)
                    }}
                />

                <div
                    className="h-16 w-full flex justify-center items-center"
                >
                    <h1
                        className="text-2xl font-bold text-center text-gray-900"
                    >
                        {title}
                    </h1>
                </div>
                <div
                    className=" h-5/6 overflow-y-scroll scrollbar-hide"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal