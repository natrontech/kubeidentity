import { ComponentProps } from "react";
import { classNames } from "../../lib/design";

export enum ButtonType {
    Primary = "primary",
    Secondary = "secondary",
    PrimaryOutline = "primaryOutline",
    SecondaryOutline = "secondaryOutline",
}

export default function Button({ widthString, inline, buttonType, buttonText, buttonIcon, onClick }: { widthString?: any | "", inline?: any, buttonType: ButtonType, buttonText: string, buttonIcon?: any, onClick?: () => void }) {

    const hoverAnimationClasses = "active:hover:scale-105 transition-all duration-150 ease-in-out";
    const buttonBackgroundHover = "absolute right-0 w-10 h-32 -mt-10 rotate-12 transition-all duration-700 translate-x-12 opacity-10 group-hover:-translate-x-96 ease"
    const defaultStyleClasses = classNames(
        "rounded-lg px-11 py-2 max-w-96 mx-auto block overflow-hidden group relative transition-all ease-out duration-300 shadow-lg",
        widthString,
        inline && "inline-block",
    )



    switch (buttonType) {
        case ButtonType.Primary:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "relative bg-primary text-white"
                    )}
                    onClick={onClick}
                >
                    <span
                        className={classNames(
                            "bg-white",
                            buttonBackgroundHover
                        )}

                    ></span>
                    <div
                        className={classNames(
                            buttonIcon ? "" : "hidden",
                            "absolute top-1/2 left-2 w-8"
                        )}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            {buttonIcon}
                        </div>
                    </div>
                    {buttonText}
                </button>
            )
        case ButtonType.Secondary:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "relative bg-white text-primary"
                    )}
                    onClick={onClick}
                >
                    <span
                        className={classNames(
                            "bg-primary",
                            buttonBackgroundHover
                        )}

                    ></span>
                    <div
                        className={classNames(
                            buttonIcon ? "" : "hidden",
                            "absolute top-1/2 left-2 w-8"
                        )}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            {buttonIcon}
                        </div>
                    </div>
                    {buttonText}
                </button >
            )
        case ButtonType.PrimaryOutline:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "bg-white outline outline-4 outline-inherit box-border text-primary",
                    )}
                    onClick={onClick}
                >
                    <span
                        className={classNames(
                            "bg-primary",
                            buttonBackgroundHover
                        )}

                    ></span>

                    <div
                        className={classNames(
                            buttonIcon ? "" : "hidden",
                            "absolute top-1/2 left-2 w-8"
                        )}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            {buttonIcon}
                        </div>
                    </div>
                    {buttonText}
                </button>
            )
        case ButtonType.SecondaryOutline:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "outline outline-4 outline-inherit box-border text-white bg-primary"
                    )}
                    onClick={onClick}
                >
                    <span
                        className={classNames(
                            "bg-white",
                            buttonBackgroundHover
                        )}

                    ></span>
                    <div
                        className={classNames(
                            buttonIcon ? "" : "hidden",
                            "absolute top-1/2 left-2 w-8"
                        )}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            {buttonIcon}
                        </div>
                    </div>
                    {buttonText}
                </button>
            )
        default:
            return (
                <>
                </>
            )
    }
}