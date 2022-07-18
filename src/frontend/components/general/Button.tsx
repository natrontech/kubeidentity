import { classNames } from "../../lib/design";

export enum ButtonType {
    Primary = "primary",
    Secondary = "secondary",
    PrimaryOutline = "primaryOutline",
    SecondaryOutline = "secondaryOutline",
}

export default function Button({ buttonType, buttonText, onClick }: { buttonType: ButtonType, buttonText: string, onClick?: () => void }) {

    const hoverAnimationClasses = "sm:hover:-translate-x-2 sm:hover:translate-y-2 active:hover:-translate-x-2 active:hover:translate-y-2 transition-all duration-150 ease-in-out";
    const defaultStyleClasses = "font-GilroyBold text-lg py-4 px-12 w-full focus:outline-none"

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
                    {buttonText}
                </button >
            )
        case ButtonType.PrimaryOutline:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "border-primary border-4 text-primary"
                    )}
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            )
        case ButtonType.SecondaryOutline:
            return (
                <button
                    className={classNames(
                        hoverAnimationClasses,
                        defaultStyleClasses,
                        "border-white border-4 text-white"
                    )}
                    onClick={onClick}
                >
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