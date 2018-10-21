import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from './Header'
import { theme } from '../theme'

export default class Layout extends React.PureComponent {

    render () {
        const { children } = this.props

        return (
            <div className={css(styles.mainLayout)}>

                <Header />

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
