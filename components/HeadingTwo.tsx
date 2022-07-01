const HeadingTwo = ({ className = "", children }: { className?: string, children: string }) => {
    return(<h2 className={"inter-bold text-main-light dark:text-main-dark text-[28px] leading-tight pb-1 " + className}>
        { children }
    </h2>)
}

export default HeadingTwo;