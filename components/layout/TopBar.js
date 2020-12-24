import Link from 'next/link'

import style from './TopBar.module.css'

const TopBar = () => {
    return (
        <div className={style.topbar}>
            <div className="container">
            <p>
                Hi there! ScriptAxis is in early Beta. If you find bugs or have feedback, head to the&nbsp;
                <Link href="https://discuss.eroscripts.com/t/scriptaxis-a-searchable-sortable-filterable-funscript-directory/10409">
                    <a target="_blank">EroScripts thread</a>
                </Link>
                &nbsp;or the&nbsp;
                <Link href="https://github.com/defucilis/ScriptAxis/issues">
                    <a target="_blank">GitHub repository</a>
                </Link>
                .&nbsp;Enjoy!
            </p>
            </div>
        </div>
    )
}

export default TopBar;