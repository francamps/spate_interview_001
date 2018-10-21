import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, css } from 'aphrodite/no-important';

import { theme } from '../theme'
import {
    Layout,
    EditableText,
    Grid,
    GridItem,
    Button
} from '../components'

import * as UserActions from '../state/actions/user.actions'

class AccountView extends React.PureComponent {

    componentDidMount() {
        const { getUserData, updateUser } = this.props;
        setTimeout(() => {
            getUserData()
        }, 1000)
    }

    render() {
        const { user } = this.props;

        if (!user.user_firstname) {
            return (
                <Layout>
                    <div className={css(styles.loading)}>
                    Please log in to continue.
                    </div>
                </Layout>
            )
        }


        const subscriptions = Object.values(user.subscriptions).map((sub) => {
            return (
                <Grid key={sub.plan.planId}>
                    <GridItem>
                        <div className={css(styles.thumb, styles.plan_bg)}>
                            <div className={css(styles.plan_title)}>
                                { sub.plan.label }
                            </div>
                        </div>
                        <div className={css(styles.plan_subtitle)}>
                          See Details &gt;
                        </div>
                    </GridItem>
                    {
                        Object.values(sub.industry).map((subscription) => {
                            return (
                                <GridItem key={subscription.key}>
                                    <div className={css(styles.thumb, styles.img_bg)}>
                                        <img src={subscription.image} alt="" className={css(styles.img)} />
                                    </div>
                                    <div className={css(styles.plan_subtitle)}>
                                        { subscription.label }
                                    </div>
                                </GridItem>
                            )
                        })
                    }
                </Grid>
            )
        })


        return (
            <Layout user={user}>
                <div className={css(styles.headline)}>My Account</div>
                <div className={css(styles.userInfo)}>
                    <EditableText
                        label="First Name"
                        text={user.user_firstname}
                        editing={false}
                    />
                    <EditableText
                        label="Last Name"
                        text={user.user_lastname}
                        editing={false}
                    />
                    <EditableText
                        label="Company"
                        text={user.company}
                        editing={false}
                    />
                    <EditableText
                        label="Role"
                        text={user.role}
                        editing={false}
                    />
                    <EditableText
                        label="Created At"
                        text={user.created_at}
                        editing={false}
                    />
                </div>
                <div className={css(styles.label)}>
                    You are subscribed to:
                </div>
                <div className={css(styles.userSubscriptions)}>
                    { subscriptions }
                </div>
                <div className={css(styles.userActions)}>
                    <Button onClick={() => {}}>Update User Data</Button>
                    <Button type="secondary" onClick={() => {}}>Log Out</Button>
                </div>
            </Layout>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)

const styles = StyleSheet.create({

    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontSize: `${theme.font_size_md}`,
        fontWeight: `${theme.font_weight_base}`,
        letterSpacing: `${theme.font_spacing_base}`,
        textTransform: 'uppercase',
        marginBottom: `${theme.space_xs}`
    },

    headline: {
        fontSize: `${theme.font_size_h1}`,
        marginBottom: `${theme.space_lg}`
    },

    thumb: {
        height: '100%',
        overflow: 'hidden',
        marginBottom: `${theme.space_sm}`
    },

    plan_bg: {
        background: `${theme.color_primary}`,
        fontWeight: `${theme.font_weight_base}`,
        padding: `${theme.space_sm}`
    },

    img_bg: {
        objectFit: 'center'
    },

    plan_title: {
        color: 'white',
        textTransform: 'uppercase'
    },

    plan_subtitle: {
        textTransform: 'uppercase',
        fontWeight: `${theme.font_weight_bold}`,
        letterSpacing: `${theme.font_pacing_narrow}`,
        fontSize: `${theme.font_size_md}`,
        paddingLeft: `${theme.space_xs}`
    },

    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '50% 50%'
    },

    userSubscriptions: {
        marginBottom: `${theme.space_lg}`
    },

    userActions: {
        borderTop: `1px dashed ${theme.color_lightGray}`,
        width: '100%',
        padingTop: `${theme.space_lg}`,
        // display: 'flex',
        // flexDirection: 'column'
    }

})
