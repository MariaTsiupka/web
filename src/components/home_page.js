import React from "react";


const HomePage = () => {
    const logo = process.env.PUBLIC_URL + '/img/perfume-logo (1).png';
    return (
        <main className="home">
            <img className="home-logo" src={logo} alt="Brand Logo" />
            <div className="home-description">
                <h1 className="title">World of Fragrances</h1>
                <p className="description">Our Fragrance Wheel helps reveal the connection between your<br /> 
                natural fragrance preferences and various fragrance families. <br />
                Discover the scents that perfectly match your style and personality. </p>
            </div>
        </main>
    )
}

export default HomePage;