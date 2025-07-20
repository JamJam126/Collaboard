
const Avatar = ({ src, alt = "User", size = 32 }) => {

    return(
        <img 
            src={src}
            alt={alt}
            className="rounded-full object-cover bg-blue-800"
            style={{ width: size, height: size }}
        />
    )
}

export default Avatar