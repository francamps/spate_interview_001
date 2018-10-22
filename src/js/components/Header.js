import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../state/actions/user.actions'

import { theme } from '../theme'

class Header extends React.PureComponent {

    onLogin = () => {
        const { getUserData } = this.props;
        getUserData()
    }

    render() {
        const { user } = this.props

        return (
            <div className={css(styles.header)}>
                <div className={css(styles.header_logotype)}>SPATE</div>
                {
                    !!user.user_id ? (
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
                            <span onClick={this.onLogin} className={css(styles.link)}>log in</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...UserActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
    header: {
        margin: `${theme.space_md}`,
        borderBottom: '1px solid',
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

    link: {
        fontWeight: `${theme.font_weight_medium}`,
        color: `${theme.color_primary}`,
        cursor: 'pointer',
        transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
        ':hover': {
            color: `${theme.color_secondary}`
        }
    },
})
