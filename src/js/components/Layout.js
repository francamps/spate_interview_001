import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { theme } from '../theme'

export default class Layout extends React.PureComponent {
    render () {
        const { children, user } = this.props

        return (
            <div className={css(styles.mainLayout)}>
                <div className={css(styles.header)}>
                    <div className={css(styles.header_logotype)}>SPATE</div>
                    {
                        !!user ? (
                            <div>
                                <span className={css(styles.sessionNav)}>
                                    music
                                </span>
                                <span className={css(styles.sessionNav)}>
                                    {`hi ${user.user_firstname}` || ''}
                                </span>
                            </div>
                        ) : (
                            <div className={css(styles.sessionNav)}>
                                <span className={css(styles.login)}>log in</span>
                            </div>
                        )
                    }
                </div>
                <div className={css(styles.content)}>
                    { children }
                </div>
                <div className={css(styles.footer)}>
                    Footer
                </div>

            </div>
        )
    }
}

const styles = StyleSheet.create({
    mainLayout: {
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: '100vh',
        padding: `${theme.space_md}`,
        position: 'relative',
        display: 'grid',
        fontFamily: `${theme.font_family_base}`,
        gridTemplateColumns: 'auto',
        gridTemplateRows: '[header-start] auto [header-bottom] 1fr [content-bottom] auto [footer-bottom]',
        gridTemplateAreas: '"HEADER" "CONTENT" "FOOTER"'
    },

    header: {
        borderBottom: '1px solid',
        width: '100%',
        gridArea: 'HEADER',
        fontWeight: `${theme.font_weight_light}`,
        paddingBottom: `${theme.space_md}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    header_logotype: {
        textTransform: 'uppercase',
        fontSize: '18px',
        letterSpacing: `${theme.font_spacing_wide}`
    },

    sessionNav: {
        textTransform: 'uppercase',
        fontSize: `${theme.font_size_md}`,
        fontWeight: `${theme.font_weight_base}`,
        marginLeft: `${theme.space_md}`
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        gridArea: 'CONTENT',
        position: 'relative',
        padding: `${theme.space_xl}`
    },

    footer: {
        gridArea: 'FOOTER'
    }

})
