import AuthenticatedLayout from "../layout/AuthenticatedLayout"

const HomePage = () => {
    return(
        <AuthenticatedLayout>
            <div className="bg-[#2D3142] h-[695px]">
                HomePage
            </div>
        </AuthenticatedLayout>
    )
}

export default HomePage