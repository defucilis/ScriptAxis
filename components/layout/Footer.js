import packageJson from 'package.json'
import style from './Footer.module.css'

const Footer = () => {
    console.log(packageJson);
    return (
        <div className={style.footer}>
            <div className="container">
                <p>&copy; ScriptAxis 2020</p>
                <p>v{packageJson.version}</p>
            </div>
        </div>
    )
}

export default Footer;