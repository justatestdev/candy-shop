import React from 'react'
import classnames, { Value } from 'classnames'

interface Props {
    className?: Value
}

const Footer: React.FC<Props> = ({ className }) => {
    return (
        <div className={'footer-container'}>
            <div className={'footer-inner'}>
                <div className={'footer-block'}>
                    <a className={'footer-logo'} href={'https://solice.io/'}>
                        <img src="https://solice.io/images/solice_logo_name_right_white.png" alt={'Solice Logo'} />
                    </a>
                </div>
                <div className={'footer-block'}>
                    <h4 className={'footer-heading'}>About</h4>
                    <a href={'https://docs.solice.io'} className={'footer-link'}>Documentation</a>
                    <a href={'https://docs.solice.io/more/roadmap'} className={'footer-link'}>Roadmap</a>
                    <a href={'https://docs.solice.io/more/team'} className={'footer-link'}>Team</a>
                </div>
                <div className={'footer-block'}>
                    <h4 className={'footer-heading'}>Solice</h4>
                    <a href={'https://staking.solice.io'} className={'footer-link'}>Genesis Staking</a>
                    <a href={'https://solice.io/play'} className={'footer-link'}>Play</a>
                    <a href={'https://solice.io/marketplace'} className={'footer-link'}>
                        Marketplace
                    </a>
                    <a href={'https://solice.io/map'} className={'footer-link'}>World map</a>
                    <a className={'footer-link'}>
                        Editor <small>(coming soon)</small>
                    </a>
                </div>
                <div className={'footer-block'}>
                    <h4 className={'footer-heading'}>Socials</h4>
                    <a href={'https://t.me/solice_io'} className={'footer-link'}>Telegram</a>
                    <a href={'https://medium.com/@solice_io'} className={'footer-link'}>Medium</a>
                    <a href={'https://discord.gg/hybrRStrKe'} className={'footer-link'}>Discord</a>
                    <a href={'https://twitter.com/solice_io'} className={'footer-link'}>Twitter</a>
                    <a href={'https://github.com/SoliceIO'} className={'footer-link'}>Github</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
