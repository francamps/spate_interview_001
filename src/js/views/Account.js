import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import _ from 'lodash'

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

    state = {
        user: {},
        editing: false
    }

    // componentDidMount() {
    //     const { getUserData, user } = this.props;
    //     setTimeout(() => {
    //         getUserData()
    //     }, 1000)
    // }

    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;

        if (!_.isEqual(prevProps, this.props)) {
            // This is ok because I am comparing equality
            this.setState({
                user
            })
        }
    }

    onEdit = () => {
        this.setState({editing: true})
    }

    onCancel = () => {
        const { user } = this.props
        this.setState({
            editing: false,
            user
        })

    }

    onSave = () => {
        const { updateUser } = this.props;
        const { user } = this.state;

        updateUser(user)
        this.onCancel()

    }

    onLogout = () => {
        // Let's pretend here I'm actually making a network request.
        // Session reducer could behave the same by also remove currentUser from state
        const { logoutUser } = this.props;
        logoutUser({})
    }

    handleChange = (field, value) => {
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [field]: value
            }
        })
    }

    render() {
        const { editing, user } = this.state;
        const { getUserData } = this.props;

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
            <Layout user={user} getUserData={getUserData}>
                <div className={css(styles.headline)}>My Account</div>
                <div className={css(styles.userInfo)}>
                    <EditableText
                        name="user_firstname"
                        label="First Name"
                        value={user.user_firstname}
                        editing={editing}
                        onChange={this.handleChange}
                    />
                    <EditableText
                        name="user_lastname"
                        label="Last Name"
                        value={user.user_lastname}
                        editing={editing}
                        onChange={this.handleChange}
                    />
                    <EditableText
                        name="company"
                        label="Company"
                        value={user.company}
                        editing={editing}
                        onChange={this.handleChange}
                    />
                    <EditableText
                        name="role"
                        label="Role"
                        value={user.role}
                        editing={editing}
                        onChange={this.handleChange}
                    />
                    <EditableText
                        name="created_at"
                        label="Created At"
                        value={user.created_at}
                        editing={editing}
                        onChange={this.handleChange}
                    />
                </div>
                <div className={css(styles.label)}>
                    You are subscribed to:
                </div>
                <div className={css(styles.userSubscriptions)}>
                    { subscriptions }
                </div>
                <div className={css(styles.userActions)}>
                    {
                        editing ? (
                            <div>
                                <Button type="secondary" onClick={this.onCancel}>Cancel</Button>
                                <Button onClick={this.onSave}>Save</Button>
                            </div>
                        )
                            : (
                                <div>
                                    <Button onClick={this.onEdit}>Update User Data</Button>
                                    <Button type="secondary" onClick={this.onLogout}>Log Out</Button>
                                </div>

                            )
                    }


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
        paddingTop: `${theme.space_md}`,
        width: '100%',
        padingTop: `${theme.space_lg}`,
        // display: 'flex',
        // flexDirection: 'column'
    }

})
