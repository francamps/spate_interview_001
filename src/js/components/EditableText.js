import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

import { theme } from '../theme'

export default class EditableTest extends React.PureComponent {

    saveInput = (node) => {
        this.input = node;
    }

    onChange = (e) => {
        e.preventDefault();
        const { name, onChange } = this.props;
        onChange(name, e.target.value)
    }

    render() {
        const {
            label, value, editing
        } = this.props;

        return (
            <div className={css(styles.wrapper)}>

                <div className={css(label ? styles.label : styles.hidden)}>
                    { label }
                </div>

                {
                    editing ? (
                        <input
                            value={value || ''}
                            onChange={this.onChange}
                            className={
                                css(
                                    styles.input,
                                )}
                            ref={this.saveInput}
                        />
                    ) : (
                        <div className={css(styles.text)}>
                            {value || ''}
                        </div>
                    )
                }


            </div>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        // width: '100%',
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
        fontFamily: `${theme.font_family_base}`,
        color: `${theme.color_darkGray}`,
        transition: 'all .3s',
        padding: `${theme.space_xs} ${theme.space_sm}`,
        outline: `0px`,
        width: 240,
        '::placeholder': {
            color: `${theme.color_lightGray}`,
        }
    },
    text: {
        fontFamily: `${theme.font_family_other}`,
        fontWeight: 100
    },
    hidden: {
        display: 'none'
    }
})
