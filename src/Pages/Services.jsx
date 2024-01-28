import userContext from "../context/userContext"
import Base from "../components/Base";

const Services=()=>{
    return (
        <userContext.Consumer>
        {
            (object) => (

                <Base>
                <div className="flex-grow">
                    <h1 className="mt-5">
                        This is services page
                    </h1>
                    <h1>Welcome {  object.user.login && object.user.data.name}</h1>
                    </div>
                </Base>
            )
        }
    </userContext.Consumer>
    )
}

export default Services;