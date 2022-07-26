import { ComponentProps } from "react";
import { classNames } from "../../lib/design";

export enum ButtonType {
    Primary = "primary",
    Secondary = "secondary",
    PrimaryOutline = "primaryOutline",
    SecondaryOutline = "secondaryOutline",
}

export default function Button({ buttonType, buttonText, buttonIcon, onClick }: { buttonType: ButtonType, buttonText: string, buttonIcon: any, onClick?: () => void }) {

    const hoverAnimationClasses = "active:hover:scale-105 transition-all duration-150 ease-in-out";
    const buttonBackgroundHover = "absolute right-0 w-10 h-32 -mt-10 rotate-12 transition-all duration-700 translate-x-12 opacity-10 group-hover:-translate-x-96 ease"
    const defaultStyleClasses = "rounded-lg px-5 py-2.5 max-w-96 mx-auto block overflow-hidden group relative transition-all ease-out duration-300 shadow-lg"

    switch (buttonType) {
        case ButtonType.Primary:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "bg-primary text-white"
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
                        className="inline mr-2.5"
                    >
                        {buttonIcon}
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
                        "bg-white text-primary"
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
                        className="inline mr-2.5"
                    >
                        {buttonIcon}
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
                        "border-primary bg-white border-4 text-primary",
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
                        className="inline mr-2.5"
                    >
                        {buttonIcon}
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
                        "border-white border-4 text-white bg-primary"
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
                        className="inline mr-2.5"
                    >
                        {buttonIcon}
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