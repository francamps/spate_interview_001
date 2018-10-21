import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

import { theme } from '../theme'

export default class Grid extends React.PureComponent {

    render () {
        const { children } = this.props;

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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

})
