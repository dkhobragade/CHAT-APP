
const Loading = () =>
{
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-4">
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>
            <span className="loading loading-dots loading-xl"></span>
        </div>
    )
}

export default Loading