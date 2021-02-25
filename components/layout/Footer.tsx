import packageJson from "package.json";
import style from "./Footer.module.scss";

const Footer = (): JSX.Element => {
    return (
        <div className={style.footer}>
            <div className="container">
                <p>&copy; ScriptAxis 2020</p>
                <p>v{packageJson.version}</p>
            </div>
        </div>
    );
};

export default Footer;
