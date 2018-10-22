import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

import { theme } from '../theme'

export default class GridItem extends React.PureComponent {

    render() {
        const { children } = this.props
        return (
            <div className={css(styles.wrapper)}>
                {
                    React.Children.map(children, child => child)
                }
            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 100,
        width: 180,
        marginRight: `${theme.space_md}`,
        marginBottom: `${theme.space_md}`,
    }
})
