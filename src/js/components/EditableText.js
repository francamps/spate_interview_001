import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

import { theme } from '../theme'

export default class EditableTest extends React.PureComponent {
    render() {
        const { label, text, editing } = this.props;
        return (
            <div className={css(styles.wrapper)}>

                <div className={css(label ? styles.label : styles.hidden)}>
                    { label }
                </div>

                {
                    editing ? (
                        <input />
                    ) : (
                        <div className={css(styles.text)}>
                            {text || ''}
                        </div>
                    )
                }


            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: `${theme.space_md}`
    },
    label: {
        fontSize: `${theme.font_size_md}`,
        fontWeight: `${theme.font_weight_base}`,
        letterSpacing: `${theme.font_spacing_base}`,
        textTransform: 'uppercase',
        marginBottom: `${theme.space_xs}`
    },
    input: {

    },
    text: {
        fontFamily: `${theme.font_family_other}`,
        fontWeight: 100
    },
    hidden: {
        display: 'none'
    }
})
