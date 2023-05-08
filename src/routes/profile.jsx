import Navigation from "../modules/nav";

const Profile = ()=>{
    return(
        <>
        <Navigation/>
        <div className="profile-cont">
        <figure className="profile-img">
            <img src="img/yoanim.png" draggable="false"/>
        </figure>
        <p>Contacto: <span style={{userSelect:'text'}}>nicolasagustinsaunders@gmail.com</span></p>
        <div className="icon-bar">
            <figure>
                <img src="img/icons8-css3-96.png"/>
                <img src="img/icons8-html-5-96.png"/>
                <img src="img/icons8-javascript-96.png"/>
                <img src="img/icons8-my-sql-96.png"/>
                <img src="img/icons8-php-96.png"/>
                <img src="img/icons8-nodejs-96.png"/>
                <img src="img/icons8-react-native-96.png"/>
                <img src="img/icons8-next.js-96.png"/>
                <img src="img/icons8-git-96.png"/>
            </figure>
        </div>
        <p>
        Soy Nicolás, un desarrollador web con experiencia en una variedad de lenguajes de programación y frameworks, incluyendo HTML, CSS, JavaScript, PHP, SQL, Node.js, Tailwind, React y Next. He trabajado en varios proyectos web, desde sitios de comercio electrónico hasta aplicaciones web complejas. Me enorgullece mi habilidad para traducir los diseños creativos en interfaces de usuario interactivas y atractivas.
        </p>
        <p>
En mi carrera, he trabajado en diferentes roles de desarrollo, incluyendo el desarrollo de back-end, front-end y full-stack. Además, tengo habilidades en la implementación de pruebas de unidad y de integración para garantizar la calidad del código. Soy un apasionado de la tecnología y me encanta aprender y experimentar con nuevas tecnologías y herramientas para mejorar mi trabajo.
        </p>
        <p>
En resumen, mi experiencia en desarrollo web y mi conocimiento en diferentes lenguajes de programación y frameworks me permiten crear soluciones únicas y eficientes para cualquier tipo de proyecto. Estoy comprometido a ofrecer productos de alta calidad y siempre estoy dispuesto a aprender y crecer profesionalmente.
        </p>
        </div>
        </>
    );
}
export default Profile;