import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from './Header'
import Footer from './Footer'
import { theme } from '../theme'

export default class Layout extends React.PureComponent {

    render () {
        const { children } = this.props

        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.mainLayout)}>

                    <Header />

                    <div className={css(styles.content)}>
                        { children }
                    </div>

                </div>

                <Footer />

            </div>

        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        fontFamily: `${theme.font_family_base}`,
    },

    mainLayout: {
        // height: '100vh',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        display: 'grid',
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

})
